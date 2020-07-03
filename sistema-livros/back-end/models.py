from config import *


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(254))
    author = db.Column(db.String(254))
    description = db.Column(db.String(254))
    

    def __str__(self):
        return f'Book({self.id}) - title: {self.title} - author: {self.author} - description: {self.description}'
    
    # expressao da classe no formato json
    def json(self):
        return ({
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "description": self.description
        })

