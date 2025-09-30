const libraryApp = (function () {
  //array for storing registered books
  const bookList = [];

  class Book {
    constructor (author, title, genre, pages, read) {
      this.author = author;
      this.title = title;
      this.genre = genre;
      this.pages = pages;
      this.read = read;
    }

    toggleRead() {
      this.read = this.read ? false : true;
    }
  }

  // cacheDom
  const bookForm = {
    authorInput: document.querySelector("#book-author"),
    bookNameInput: document.querySelector("#book-name"),
    genreInput: document.querySelector("#book-genre"),
    pagesInput: document.querySelector("#book-pages"),
    hasRead: document.querySelector("#is-book-finished"),
  };

  const addBookButton = document.querySelector("#add-book");
  const addBookModal = document.querySelector("dialog");
  const modalCloseButton = document.querySelector("#modal-close-button");
  const submitBookBtn = document.querySelector("#submit-book");
  const booksTable = document.querySelector("#books-table");

  // bind events

  submitBookBtn.addEventListener("click", (e) => {
    const invalidInput = Object.values(bookForm).find((el) => el.value === "");


    if (invalidInput) {
      switch (invalidInput) {
        case bookForm.authorInput:
          invalidInput.setCustomValidity("Name of the author for this book must be provided");
          break;
        case bookForm.bookNameInput:
          invalidInput.setCustomValidity("The name of the book must be provided");
          break;
        case bookForm.genreInput:
          invalidInput.setCustomValidity("The genre of the book must be provided");
          break;
        case bookForm.pagesInput:
          invalidInput.setCustomValidity("The number of pages the book has must be provided");
          break;
      }
    } else {
      addBooktoList();
      e.preventDefault();
    }

  });

  for (const prop in bookForm) {
    bookForm[prop].addEventListener("input", () => {
      if (bookForm[prop].value !== "") {
        bookForm[prop].setCustomValidity("")
      }
    })
  }

  addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
  });

  modalCloseButton.addEventListener("click", () => {
    addBookModal.close();
  });

  bookForm.bookNameInput.addEventListener("input", () => {
    if (!bookForm.bookNameInput.validity.valid) {
      bookForm.bookNameInput.setCustomValidity("test")
    }
  })

  // render function

  function updateList() {
    booksTable.textContent = "";

    for (const book of bookList) {
      const bookRow = document.createElement("tr");

      bookRow.dataset.id = bookList.indexOf(book);

      for (prop in book) {
        const bookCell = document.createElement("td");
        if (prop === "read") {
          const toggleButton = createToggleButton(book);
          toggleButton.addEventListener("click", () => {
            bookList[bookRow.dataset.id].toggleRead();
            updateList();
          });

          bookCell.appendChild(toggleButton);
          bookRow.appendChild(bookCell);
          continue;
        }
        bookCell.textContent = book[prop];
        bookRow.appendChild(bookCell);        
      }

      const deleteBtn = createDeleteButton();
      deleteBtn.addEventListener("click", () => {
        deleteBook(bookRow.dataset.id);
      });

      const deleteCell = document.createElement("td");
      deleteCell.className = "delete-cell";

      deleteCell.appendChild(deleteBtn);
      bookRow.appendChild(deleteCell);

      booksTable.appendChild(bookRow);
    }
  }

  // auxiliary functions for creating buttons in render

  function createDeleteButton() {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    return deleteBtn;
  }

  function createToggleButton(bookObj) {
    const btn = document.createElement("button");
    btn.className = bookObj.read ? "has-been-read" : "has-not-been-read";
    btn.textContent = bookObj.read ? "Yes" : "No";
    return btn;
  }

  // Add and delete buttons functions

  function addBooktoList() {
    const bookArgs = [];
    for (input in bookForm) {
      bookArgs.push(bookForm[input].value);
    }
    let book = new Book(...bookArgs);
    book.read = book.read === "true";
    bookList.push(book);

    finishInput();
  }

  function finishInput() {
    updateList();
    clearInput();
    addBookModal.close();
  }

  function deleteBook(index) {
    bookList.splice(index, 1);
    updateList();
  }

  // clear form inputs

  function clearInput() {
    for (prop in bookForm) bookForm[prop].value = "";
    bookForm.hasRead.value = true;
  }
})();
