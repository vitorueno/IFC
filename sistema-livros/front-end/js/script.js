$(function () {
  changePage("inicial");
  $("#link-listar").click(function () {
    $.ajax({
      url: "http://localhost:5000/get-books",
      method: "GET",
      dataType: "json", // we expect to receive a json response
      success: listBooks, // calling the main function
      error: function () {
        alert("erro ao ler dados, verifique o backend");
      },
    });
  });

  $("#link-inicial").click(function () {
    changePage("inicial");
  });

  $("#nav-brand").click(function () {
    changePage("inicial");
  });

  $("#btn-incluir").click(function () {
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

    $.ajax({
      url: "http://localhost:5000/create-books",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: bookData,
      success: createBook,
      error: createBookError,
    });
  });

  function createBook(resposta) {
    if (resposta.result == "ok") {
      alert("Livro adicionado com sucesso");
      $("#campo-titulo").val("");
      $("#campo-autor").val("");
      $("#campo-descricao").val("");
      $("#campo-genero").val("");
      $("#campo-editora").val("");
    } else {
      alert("Erro na adição do livro!");
    }
  }

  function createBookError(resposta) {
    alert("Erro na chamada do back-end");
  }

  function listBooks(books) {
    var rows = "";

    for (book of books) {
      // creating a line for each book in our backend
      newRow = `<tr> 
                  <td>${book.title}</td> 
                  <td>${book.author}</td> 
                  <td>${book.description}</td> 
                  <td>${book.genre}</td> 
                  <td>${book.publisher}</td> 
                </tr>`;
      rows += newRow;
      // adding the new book to the html
      $("#tableBody").html(rows);
    }
    changePage("listar");
  }

  function changePage(nextPage) {
    $("#container-inicial").addClass("invisible");
    $("#container-listar").addClass("invisible");
    $(`#container-${nextPage}`).removeClass("invisible");
  }
});
