$(function() {
    $.ajax({
        url: 'http://localhost:5000/get-books',
        method: 'GET',
        dataType: 'json', // we expect to receive a json response
        success: listBooks, // calling the main function
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listBooks(books) {
        for (book of books) { // creating a line for each book in our backend
            newRow = `<tr> 
                        <td>${book.title}</td> 
                        <td>${book.author}</td> 
                        <td>${book.description}</td> 
                        <td>${book.genre}</td> 
                        <td>${book.publisher}</td> 
                      </tr>`;
            // adding the new book to the html
            $('#tableBody').append(newRow); 
        }
    }
});