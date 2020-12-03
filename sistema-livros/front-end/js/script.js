$(function() {
    // function to handle the transitions from page to page
    function showContent(nextPage) {
        $("#inicio").addClass("d-none");
        $("#conteudo-livro").addClass("d-none");
        $("#conteudo-leitor").addClass("d-none");
        $("#conteudo-resenha").addClass("d-none");
        $(`#${nextPage}`).removeClass("d-none");
    }

    // initial content when page is loaded
    showContent("inicio");

    // linking the nav button to the listing page
    $("#link-listar-livro").click(function() {
        showBook();
    });

    $("#link-listar-leitor").click(function() {
        showReader();
    });

    $("#link-listar-resenha").click(function() {
        showReview();
    });

    // linking the nav button to the initial page
    $("#link-inicial").click(function() {
        showContent("inicio");
    });

    // linking the nav brand to the initial page
    $("#nav-brand").click(function() {
        showContent("inicio");
    });


    // BOOK 
    function showBook() {
        // calling the api to get the books
        $.ajax({
            url: "http://localhost:5000/get/Book",
            method: "GET",
            dataType: "json", // os dados são recebidos no formato json
            success: listBooks, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend ");
            },
        });

        // handling the books when the request succeeded
        function listBooks(books) {
            $("#livro-corpo-tabela").empty();
            showContent("conteudo-livro");
            for (book of books) {
                // creating a line for each book in our backend <img src="img/excluir.png">
                var newRow = `<tr id="book_line_${book.id}"> 
                                <td>${book.title}</td> 
                                <td>${book.author}</td> 
                                <td>${book.description}</td> 
                                <td>${book.genre}</td> 
                                <td>${book.publisher}</td> 
                                <td>
                                    <a href="#" id="delete_book_${book.id}" class="delete_book" title="Excluir Livro">
                                        <span class="material-icons">
                                            delete
                                        </span>
                                    </a>
                                </td>
                              </tr>`;
                // adding the new book to the html
                $("#livro-corpo-tabela").append(newRow);
            }
        }
    }

    // handling the creation of new books
    $(document).on("click", "#btn-incluir-livro", function() {
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
            url: "http://localhost:5000/create/Book",
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
                showBook();
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
    $('#modal-incluir-livro').on('hidden.bs.modal', function(e) {
        if (!$('#conteudo-livro').hasClass('d-none')) {
            showBook();
        }
    });

    // handling the remove book operation
    $(document).on("click", ".delete_book", function() {
        var component = $(this).attr("id");

        var icon_name = "delete_book_";
        var book_id = component.substring(icon_name.length);

        // calling the api (backend)
        $.ajax({
            url: 'http://localhost:5000/delete/Book/' + book_id,
            type: "DELETE",
            dataType: "json",
            success: deletedBook,
            error: deletedBookError
        });

        // function when the request succeeded
        function deletedBook(retorno) {
            if (retorno.result == "ok") {
                $('#book_line_' + book_id).fadeOut(1000, function() {
                    alert("Livro Removido com Sucesso!");
                    showBook();
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


    // REDAER
    function showReader() {
        $.ajax({
            url: "http://localhost:5000/get/Reader",
            method: "GET",
            dataType: "json",
            success: listReader,
            error: function() {
                alert("erro ao ler dados, verifique o backend ");
            },
        });

        function listReader(readers) {
            $("#leitor-corpo-tabela").empty();
            showContent("conteudo-leitor");
            for (reader of readers) {
                var newRow = `<tr id="reader_line_${reader.id}"> 
                                <td>${reader.name}</td> 
                                <td>${reader.age}</td> 
                                <td>${reader.profession}</td> 
                                <td>${reader.fav_book.title}</td> 
                                <td>
                                    <a href="#" id="delete_reader_${reader.id}" class="delete_reader" title="Excluir Leitor">
                                        <span class="material-icons">
                                            delete
                                        </span>
                                    </a>
                                </td>
                              </tr>`;
                $("#leitor-corpo-tabela").append(newRow);
            }
        }
    }

    // create reader
    $(document).on("click", "#btn-incluir-leitor", function() {
        const nome = $("#campo-nome").val();
        const idade = $("#campo-idade").val();
        const profissao = $("#campo-profissao").val();
        const favLivro = $("#campo-fav-livro").val();

        const readerData = JSON.stringify({
            name: nome,
            age: idade,
            profession: profissao,
            fav_book_id: favLivro,
        });

        $.ajax({
            url: "http://localhost:5000/create/Reader",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: readerData,
            success: createdReader,
            error: createdReaderError,
        });

        function createdReader(response) {
            if (response.result == "ok") {
                $("#campo-nome").val("");
                $("#campo-idade").val("");
                $("#campo-profissao").val("");
                $("#campo-fav-livro").val("");
                showReader();
                alert("Leitor criado com sucesso");
                $(".close").click();
            } else {
                alert(response.result + ':' + response.details);
            }
        }

        function createdReaderError(response) {
            alert("Erro na chamada do back-end");
        }
    });

    $('#modal-incluir-leitor').on('hidden.bs.modal', function(e) {
        if (!$('#conteudo-leitor').hasClass('d-none')) {
            showReader();
        }
    });

    // delete reader
    $(document).on("click", ".delete_reader", function() {
        var component = $(this).attr("id");

        var icon_name = "delete_reader_";
        var reader_id = component.substring(icon_name.length);

        $.ajax({
            url: 'http://localhost:5000/delete/Reader/' + reader_id,
            type: "DELETE",
            dataType: "json",
            success: deletedReader,
            error: deletedReaderError
        });

        function deletedReader(response) {
            if (response.result == "ok") {
                $('#reader_line_' + reader_id).fadeOut(1000, function() {
                    alert("Leitor removido com Sucesso!");
                    showReader();
                });
            } else {
                alert(`${response.result}: ${response.details}`);
            }
        }

        function deletedReaderError(response) {
            alert("Erro ao excluir dados, verifique o Backend!");
        }
    });






    // REVIEW

    function showReview() {
        $.ajax({
            url: "http://localhost:5000/get/Review",
            method: "GET",
            dataType: "json",
            success: listReview,
            error: function() {
                alert("erro ao ler dados, verifique o backend ");
            },
        });

        function listReview(reviews) {
            $("#resenha-corpo-tabela").empty();
            showContent("conteudo-resenha");
            for (review of reviews) {
                var newRow = `<tr id="review_line_${review.id}"> 
                                <td>${review.book.title}</td> 
                                <td>${review.author.name}</td> 
                                <td>${review.opinion}</td> 
                                <td>${review.rating}</td> 
                                <td>${review.date}</td> 
                                <td>
                                    <a href="#" id="delete_review_${review.id}" class="delete_review" title="Excluir Resenha">
                                        <span class="material-icons">
                                            delete
                                        </span>
                                    </a>
                                </td>
                              </tr>`;
                $("#resenha-corpo-tabela").append(newRow);
            }
        }
    }

    $(document).on("click", "#btn-incluir-resenha", function() {
        const autorId = $("#campo-leitor").val();
        const livroId = $("#campo-livro").val();
        const data = $("#campo-data").val();
        const opiniao = $("#campo-opiniao").val();
        const nota = $("#campo-nota").val();

        const reviewData = JSON.stringify({
            rating: nota,
            date: data,
            opinion: opiniao,
            book_id: livroId,
            author_id: autorId
        });

        $.ajax({
            url: "http://localhost:5000/create/Review",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: reviewData,
            success: createdReview,
            error: createdReviewError,
        });

        function createdReview(response) {
            console.log(response);
            if (response.result == "ok") {
                $("#campo-leitor").val("");
                $("#campo-livro").val("");
                $("#campo-data").val("");
                $("#campo-opiniao").val("");
                $("#campo-nota").val("");
                showReview();
                alert("Resenha criado com sucesso");
                $(".close").click();
            } else {
                alert(response.result + ':' + response.details);
            }
        }

        function createdReviewError(response) {
            alert("Erro na chamada do back-end");
        }
    });

    $('#modal-incluir-resenha').on('hidden.bs.modal', function(e) {
        if (!$('#conteudo-resenha').hasClass('d-none')) {
            showReview();
        }
    });


    $(document).on("click", ".delete_review", function() {
        var component = $(this).attr("id");

        var icon_name = "delete_review_";
        var review_id = component.substring(icon_name.length);

        $.ajax({
            url: 'http://localhost:5000/delete/Review/' + review_id,
            type: "DELETE",
            dataType: "json",
            success: deletedReview,
            error: deletedReviewError
        });

        function deletedReview(response) {
            if (response.result == "ok") {
                $('#review_line_' + review_id).fadeOut(1000, function() {
                    alert("Resenha removido com Sucesso!");
                    showReview();
                });
            } else {
                alert(`${response.result}: ${response.details}`);
            }
        }

        function deletedReviewError(response) {
            alert("Erro ao excluir dados, verifique o Backend!");
        }
    });


    function loadSelect(id, className) {
        $.ajax({
            url: `http://localhost:5000/get/${className}`,
            method: 'GET',
            dataType: 'json',
            success: load,
            error: function() {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });


        function load(data) {
            $(`#${id}`).empty();
            $(`#loading-${id}`).removeClass('d-none');

            for (i of data) {
                var opt_text;
                if (id == 'campo-livro' || id == 'campo-fav-livro') {
                    opt_text = i.title;
                } else if (id == 'campo-leitor') {
                    opt_text = i.name;
                }
                // id == 'campo-livro' || 'campo-fav-livro' ? opt_text = i.title : opt_text = i.name;
                $(`#${id}`).append(
                    $('<option></option>').attr('value', i.id).text(opt_text)
                );
            }

            setTimeout(() => {
                $(`#loading-${id}`).addClass('d-none');
            }, 1000);
        }
    }

    $('#modal-incluir-resenha').on('shown.bs.modal', function() {
        loadSelect("campo-livro", "Book");
        loadSelect("campo-leitor", "Reader");
    });

    $('#modal-incluir-leitor').on('shown.bs.modal', function() {
        loadSelect("campo-fav-livro", "Book");
    });
});