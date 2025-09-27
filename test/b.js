const textInputEl = document.querySelector("input");
const form = document.querySelector("form");
const submitBtn = document.querySelector("button")

submitBtn.addEventListener("click", (e) => {
    showError();
    e.preventDefault();
})

textInputEl.addEventListener("input", (e) => {
    showError();
})

function showError() {
    if (textInputEl.value == "") {
        textInputEl.setCustomValidity("Bro!");
        textInputEl.reportValidity();
        e.preventDefault();
    } else {
        textInputEl.setCustomValidity("");
    }
}