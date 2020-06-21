from config import *
from models import Book
import json


@app.route('/', methods=['get'])
def get_books():
    db_books = db.session.query(Book).all()
    json_books = [ book.json() for book in db_books ]
    return jsonify(json_books)


if __name__ == '__main__':
    app.run(debug=True)