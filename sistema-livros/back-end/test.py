import os
from models import Book, Reader, Review
from config import db, db_file


if __name__ == '__main__':
    # remove old db so we can create it again 
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
    print(book1,'\n')

    # show the same test but in json format
    print(book1.json())

    print('='*140,'\n')

    # creating and commiting the reviewer
    reader = Reader(name ='Vítor Otto',
                    age = '18', 
                    profession = 'Estudante', 
                    fav_book = book1)

    db.session.add(reader)
    db.session.commit()
    
    print(reader,'\n')
    print(reader.json())

    print('='*140,'\n')

    # creating the review
    review = Review(rating = '8.5',
    date = '10/11/2020',
    opinion = '''Esse é meu livro favorito não por causa da história, mas porque foi um presente especial''',
    book = book1,
    author = reader)

    db.session.add(review)
    db.session.commit()

    print(review,'\n')
    print(review.json())
    