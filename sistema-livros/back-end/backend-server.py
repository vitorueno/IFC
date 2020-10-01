from config import *
from models import Book


@app.route('/get-books', methods=['GET'])
def get_books():
    db_books = db.session.query(Book).all()
    json_books = [ book.json() for book in db_books ]
    response = jsonify(json_books)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/create-books', methods=['POST'])
def create_book():
    response = jsonify({"status": "201", "result": "ok", "details": "Book created"})
    data = request.get_json()
    try:
        new_book = Book(**data)
        db.session.add(new_book)
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 

@app.route('/delete-books/<int:id>', methods=['DELETE'] )
def delete_books(id):
    response = jsonify({"status": "200", "result": "ok", "details": "Book deleted"})
    try:
        Book.query.filter(Book.id == id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"status": "400" ,"result": "error", "details": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
    
if __name__ == '__main__':
    app.run(debug=True)