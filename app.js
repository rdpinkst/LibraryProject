let myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}



const btn = document.querySelector("#newBook");
const form = document.querySelector(".bookForm")
const body = document.querySelector("body");
const container = document.querySelector("#container");


function swapView() {

    if (form.style.display === "block") {
        form.style.display = "none";

    } else if (form.style.display !== "block") {
        form.style.display = "block";
        form.reset();
    }
}


function addBookToLibrary() {

    form.addEventListener("submit", function (e) {
        const title = this.elements.title.value;
        const author = this.elements.author.value;
        const pgs = this.elements.pages.value;
        let read = this.elements.read.checked;

        fillForm();
        if (title && author && pgs) {
            const book = new Book(title, author, pgs, read);
            myLibrary.push(book);
            clearDisplay();
            dispLibrary();
        }
        e.preventDefault();
    })

}


function dispLibrary() {
    let index = 0;

    for (let book of myLibrary) {

        const libraryBooks = document.createElement("div");
        const closeBook = document.createElement("div");
        const close = document.createElement("span");
        const title = document.createElement("div");
        const authorBook = document.createElement("div");
        const paraAuthor = document.createElement("p");
        const pagesBook = document.createElement("div");
        const readBook = document.createElement("div");
        const paraPages = document.createElement("p");
        const labelRead = document.createElement("label");
        const boolRead = document.createElement("input");


        libraryBooks.classList.add("libraryContainer");
        closeBook.classList.add("closeSpan");
        close.classList.add("close");
        title.classList.add("bookTitle");
        authorBook.classList.add("author");
        pagesBook.classList.add("pages");
        readBook.classList.add("read");
        boolRead.classList.add(index);


        close.dataset.cardIndex = index;

        labelRead.setAttribute("for", "read");

        boolRead.setAttribute("type", "checkbox");
        boolRead.setAttribute("name", "read");
        boolRead.setAttribute("id", "read");

        close.innerText = "x";
        title.innerText = book.title;
        paraAuthor.innerText = book.author;
        paraPages.innerText = book.pages + " pgs";
        labelRead.innerText = "Read";
        boolRead.checked = book.read;

        close.addEventListener("click", removeBook);
        boolRead.addEventListener("change", toggleRead);


        closeBook.appendChild(close);
        authorBook.appendChild(paraAuthor);
        pagesBook.appendChild(paraPages);
        readBook.appendChild(labelRead);
        readBook.appendChild(boolRead);

        libraryBooks.appendChild(closeBook);
        libraryBooks.appendChild(title);
        libraryBooks.appendChild(authorBook);
        libraryBooks.appendChild(pagesBook);
        libraryBooks.appendChild(readBook);


        container.appendChild(libraryBooks);

        index++;
    }


}

function clearDisplay() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function removeBook() {

    let index = this.dataset.cardIndex;
    myLibrary.splice(index, 1);
    

    clearDisplay();
    dispLibrary();
}

function toggleRead() {
    let index = parseInt(this.classList);

    myLibrary[index].read = this.checked;
}

function xClick() {
    form.style.display = "none";

}

function fillForm() {
    if (form.elements.title.value.length === 0) {
        form.style.display = "block";
        alert("Input a book into your library or close form.");
        
    }
    
}



const book1 = new Book("Malibu Rising", "Taylor Jenkins Reid", "356", false);
myLibrary.push(book1);
dispLibrary();

form.addEventListener("submit", swapView);
btn.addEventListener("click", swapView);
document.querySelector("span").addEventListener("click", xClick);
addBookToLibrary();
