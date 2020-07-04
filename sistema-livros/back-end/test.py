import os
from models import Book
from config import db, db_file


if __name__ == '__main__':
    if os.path.exists(db_file):
        os.remove(db_file)

    # create tables
    db.create_all()

    # creating test instances
    book1 = Book(title='The Hobbit',
                author='J. R. R. Tolkien',
                description='The adventures of Bilbo',
                genre='adventure',
                publisher='Allen & Unwin')
    
    book2 = Book(title='Harry Potter', 
                author='J. K. Rowling',
                description='A book about magic',
                genre='fantasy',
                publisher='Bloomsbury Publishing')
    
    # commiting tests
    db.session.add(book1)
    db.session.add(book2)
    db.session.commit()
    
    # show one of the tests
    print(book2)

    # show the same test but in json format
    print(book2.json())
    