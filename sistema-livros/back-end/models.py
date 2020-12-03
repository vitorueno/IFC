from config import *


class Book(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String(254))
    author = db.Column(db.String(254))
    description = db.Column(db.String(254))
    genre = db.Column(db.String(254))
    publisher = db.Column(db.String(254))

    def __str__(self):
        return f'''
                    - Book({self.id}) 
                    - title: {self.title} 
                    - author: {self.author} 
                    - description: {self.description}
                    - genre: {self.genre}
                    - publisher: {self.publisher}'''
    
    # expressao da classe no formato json
    def json(self):
        return ({
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "description": self.description,
            "genre": self.genre,
            "publisher": self.publisher
        })


class Reader(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(254))
    age = db.Column(db.String(254))
    profession = db.Column(db.String(254))
    fav_book_id = db.Column(db.Integer, db.ForeignKey(Book.id))
    fav_book = db.relationship("Book")

    def __str__(self):
        s = f'''
                * Reader({self.id})
                * name: {self.name}
                * age: {self.age}
                * profession: {self.profession}'''
        if self.fav_book is not None:
            s += f'''
                * favorite book: {self.fav_book}'''
        return s

    def json(self):
        if self.fav_book is None:
            book_id = ''
            book = ''
        else: 
            book_id = self.fav_book_id
            book = self.fav_book.json()
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "profession": self.profession,
            "fav_book_id": book_id,
            "fav_book": book
        }
 

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.String(254))
    date = db.Column(db.String(254))
    opinion = db.Column(db.String(254))
    book_id = db.Column(db.Integer, db.ForeignKey(Book.id), nullable=False)
    book = db.relationship("Book")
    author_id = db.Column(db.Integer, db.ForeignKey(Reader.id), nullable=False)
    author = db.relationship("Reader")

    def __str__(self):
        return f'''
        # Review({self.id})
        # rating: {self.rating}
        # date: {self.date}
        # opinion: {self.opinion}
        # book reviewed: {self.book}
        # wrote by: {self.author}
        '''
        
    def json(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "date": self.date,
            "opinion": self.opinion,
            "book_id": self.book_id,
            "book": self.book.json(),
            "author_id": self.author_id,
            "author": self.author.json()
        }