# __init__.py
from flask import Flask

app = Flask(__name__)

from .landsat import *
from .notifications import *
