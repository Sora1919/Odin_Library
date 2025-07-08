const myLibrary = [];


//store the book data as object constructor
function Book(id, title, author, pages, isRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
};


//take parameters, create a book then store it in the array
function addBookLibrary(title, author, pages, isRead){
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, isRead)
    myLibrary.push(newBook);
}

addBookLibrary(`Harry Potter and the Philosopher's Stone`, "J.K.Rowling", 352, true);
addBookLibrary(`Harry Potter and the Chamber of Secrets`, "J.K.Rowling", 341, true);
addBookLibrary(`Harry Potter and the Prisoner of Azkaban`, "J.K.Rowling", 317, false);

//get the book datas from the dialog box
const openBtn = document.getElementById("btn_add_book");
const addBtn = document.getElementById("btn_dialog_add");
const closeBtn = document.getElementById("btn_dialog_close");
const d_box = document.getElementById("dialog_box");

openBtn.addEventListener("click", () =>{
    d_box.style.display = "flex";
} );

closeBtn.addEventListener("click", () => {
    d_box.style.display = "none";
} );

addBtn.addEventListener("click", () => {
    const title = document.getElementById("dialog_book_title").value;
    const author = document.getElementById("dialog_book_author").value;
    const page = document.getElementById("dialog_book_page").value;
    const isRead = document.getElementById("dialog_book_isread").checked;

    if(title && author && page ){
        addBookLibrary(title, author, page, isRead);
        displayBook();

        //after adding the book data, disable the dialog box and clear the form 
        d_box.style.display = "none";
        document.getElementById("dialog_book_title").value = "";
        document.getElementById("dialog_book_author").value = "";
        document.getElementById("dialog_book_page").value = "";
        document.getElementById("dialog_book_isread").checked = false;
    }
    else{
        alert("Please fill the book data");
    }
});





//make a function to display the books in the myLibrary array using DOM method
function displayBook(){
    const book_box = document.getElementById('book_container');
    book_box.innerHTML = "";


    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book_card");

        const title = document.createElement("h3");
        title.classList.add("card_title");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.classList.add("card_author");
        author.textContent = `by ${book.author}` ;

        const page = document.createElement("p");
        page.classList.add("card_page");
        page.textContent = `${book.pages} pages ` ;

        const isReadBtn = document.createElement("button");
        isReadBtn.classList.add("card_btn");
        isReadBtn.textContent = book.isRead ? "Read" : "Not Read Yet!";
        isReadBtn.style.backgroundColor = book.isRead ? "#00bb4e" : "#FF6F00";
        isReadBtn.addEventListener("click", () => {
            book.isRead = !book.isRead;
            displayBook();
        });

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("card_btn");
        removeBtn.textContent = "Remove";
        removeBtn.style.backgroundColor = "#B71C1C";
        removeBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if(index !== -1){
                myLibrary.splice(index, 1);
                displayBook();
            }
        });

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(page);
        card.appendChild(isReadBtn);
        card.appendChild(removeBtn);

    
        book_box.appendChild(card);
    })
}

displayBook();





