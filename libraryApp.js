const addBookButton = document.querySelector("#add-book");
const addBookModal = document.querySelector("dialog");
const modalCloseButton = document.querySelector("#modal-close-button");


addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
})

modalCloseButton.addEventListener("click", () => {
    addBookModal.close()
})