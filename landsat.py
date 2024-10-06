# landsat.py
from datetime import timedelta
import os
import requests
import json
from flask import app, jsonify, request
from skyfield.api import Topos, load
from osgeo import gdal # type: ignore
import numpy as np
from dotenv import load_dotenv # type: ignore

# Load environment variables
load_dotenv()

# API Keys
USGS_API_KEY = os.getenv('!XGuKrfm3NCoMulMXowkiHpgGBXEkV_oVFyX2B_JP2C1CANUIDgb4JqUMGFZHctg')

# Helper function to get TLE data
def get_tle_data(satellite_name='LANDSAT 9'):
    url = 'https://celestrak.com/NORAD/elements/landsat.txt'
    satellites = load.tle_file(url)
    return {sat.name: sat for sat in satellites}[satellite_name]

# Function to predict satellite passes over a location
def predict_satellite_passes(location_lat, location_lon, days=2):
    ts = load.timescale()
    satellite = get_tle_data()
    location = Topos(latitude_degrees=location_lat, longitude_degrees=location_lon)
    
    t0 = ts.now()
    t1 = ts.utc(t0.utc_datetime() + timedelta(days=days))
    
    passes = satellite.find_events(location, t0, t1, altitude_degrees=30.0)
    events = []
    for pass_time, event, altitude in passes:
        events.append({
            "event_type": "rise" if event == 0 else "culminate" if event == 1 else "set",
            "time": pass_time.utc_iso(),
            "altitude": altitude,
        })
    return events

# Helper function to request Landsat surface reflectance data
def get_landsat_data(location_lat, location_lon, start_date, end_date, cloud_cover_threshold=10):
    headers = {'Content-Type': 'application/json', 'X-API-Key': USGS_API_KEY}
    
    payload = {
        "datasetName": "LANDSAT_8_C1",
        "spatialFilter": {
            "filterType": "mbr",
            "lowerLeft": {"latitude": location_lat - 0.5, "longitude": location_lon - 0.5},
            "upperRight": {"latitude": location_lat + 0.5, "longitude": location_lon + 0.5}
        },
        "temporalFilter": {
            "startDate": start_date,
            "endDate": end_date
        },
        "additionalCriteria": {
            "filterType": "and",
            "childFilters": [
                {"filterType": "value", "fieldId": 20540, "value": cloud_cover_threshold, "operand": "<="}
            ]
        }
    }
    
    response = requests.post('https://m2m.cr.usgs.gov/api/apiKey/search', headers=headers, data=json.dumps(payload))
    landsat_results = response.json().get('data', {}).get('results', [])
    
    if landsat_results:
        return [
            {
                "scene_id": result["sceneID"],
                "acquisition_date": result["acquisitionDate"],
                "cloud_cover": result["cloudCover"],
                "download_url": result["downloadURL"]
            }
            for result in landsat_results
        ]
    return []

# API Endpoint for querying Landsat data and predicting satellite passes
@app.route('/get_landsat_data', methods=['POST'])
def get_landsat_data_api():
    data = request.json
    location_lat = data.get("latitude")
    location_lon = data.get("longitude")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    cloud_cover_threshold = data.get("cloud_cover_threshold", 10)
    
    passes = predict_satellite_passes(location_lat, location_lon)
    landsat_data = get_landsat_data(location_lat, location_lon, start_date, end_date, cloud_cover_threshold)
    
    return jsonify({
        "satellite_passes": passes,
        "landsat_data": landsat_data
    })
