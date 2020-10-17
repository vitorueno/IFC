$(function() {

    function showBooks() {
        // calling the api to get the books
        $.ajax({
            url: "http://localhost:5000/get-books",
            method: "GET",
            dataType: "json", // os dados são recebidos no formato json
            success: listBooks, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend ");
            },
        });

        // handling the books when the request succeeded
        function listBooks(books) {
            $("#tableBody").empty();
            showContent("book-table");
            for (book of books) {
                // creating a line for each book in our backend <img src="img/excluir.png">
                var newRow = `<tr id="line_${book.id}"> 
                                <td>${book.title}</td> 
                                <td>${book.author}</td> 
                                <td>${book.description}</td> 
                                <td>${book.genre}</td> 
                                <td>${book.publisher}</td> 
                                <td>
                                    <a href="#" id="delete_${book.id}" class="delete_book" title="Excluir Livro">
                                        <span class="material-icons">
                                            delete
                                        </span>
                                    </a>
                                </td>
                              </tr>`;
                // adding the new book to the html
                $("#tableBody").append(newRow);
            }
        }
    }

    // function to handle the transitions from page to page
    function showContent(nextPage) {
        $("#inicio").addClass("invisible");
        $("#book-table").addClass("invisible");
        $(`#${nextPage}`).removeClass("invisible");
    }

    // linking the nav button to the listing page
    $("#link-listar").click(function() {
        showBooks();
    });

    // linking the nav button to the initial page
    $("#link-inicial").click(function() {
        showContent("inicio");
    });

    // linking the nav brand to the initial page
    $("#nav-brand").click(function() {
        showContent("inicio");
    });

    // handling the creation of new books
    $(document).on("click", "#btn-incluir", function() {
        const titulo = $("#campo-titulo").val();
        const autor = $("#campo-autor").val();
        const descricao = $("#campo-descricao").val();
        const genero = $("#campo-genero").val();
        const editora = $("#campo-editora").val();

        const bookData = JSON.stringify({
            title: titulo,
            author: autor,
            description: descricao,
            genre: genero,
            publisher: editora,
        });

        // calling the api (backend)
        $.ajax({
            url: "http://localhost:5000/create-books",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: bookData,
            success: createdBook,
            error: createdBookError,
        });

        // function when the request succeeded
        function createdBook(resposta) {
            if (resposta.result == "ok") {
                $("#campo-titulo").val("");
                $("#campo-autor").val("");
                $("#campo-descricao").val("");
                $("#campo-genero").val("");
                $("#campo-editora").val("");
                showBooks();
                alert("Livro adicionado com sucesso");
                $(".close").click();

            } else {
                alert(resposta.result + ':' + resposta.details);
            }
        }

        // function when the request did not succeed
        function createdBookError(resposta) {
            alert("Erro na chamada do back-end");
        }
    });

    // showing books when the modal is closed
    $('#modal-incluir').on('hidden.bs.modal', function(e) {
        if (!$('#book-table').hasClass('invisible')) {
            showBooks();
        }
    });

    // initial content when page is loaded
    showContent("inicio");

    // handling the remove book operation
    $(document).on("click", ".delete_book", function() {
        var component = $(this).attr("id");

        var icon_name = "delete_";
        var book_id = component.substring(icon_name.length);

        // calling the api (backend)
        $.ajax({
            url: 'http://localhost:5000/delete-books/' + book_id,
            type: "DELETE",
            dataType: "json",
            success: deletedBook,
            error: deletedBookError
        });

        // function when the request succeeded
        function deletedBook(retorno) {
            if (retorno.result == "ok") {
                $('#line_' + book_id).fadeOut(1000, function() {
                    alert("Livro Removido com Sucesso!");
                    showBooks();
                });
            } else {
                alert(`${retorno.result}: ${retorno.details}`);
            }
        }

        // function when the request did not succeed
        function deletedBookError(response) {
            alert("Erro ao excluir dados, verifique o Backend!");
        }
    });

});