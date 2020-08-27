# importações
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


# configuration
app = Flask(__name__)
CORS(app)
# finding the path to the db file
path = os.path.dirname(os.path.abspath(__file__)) # directory path
db_file = os.path.join(path, 'books.db') # db file path

# sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remove warnings
db = SQLAlchemy(app)

