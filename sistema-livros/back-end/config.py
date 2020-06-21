# importações
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import json
import os


# configuration
app = Flask(__name__)

# finding the path to the db file
path = os.path.dirname(os.path.abspath(__file__)) # directory path
db_file = os.path.join(path, 'books.db') # db file path

# sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remove warnings
db = SQLAlchemy(app)

