// Page elements
const btn_add_book = document.getElementById('add-to-library');
const books_container = document.querySelector('.books-container');
const books_tile = document.querySelector('.book-tile');

let myLibrary=[];

btn_add_book.addEventListener('click',function(){

    let book_name_input2 = document.querySelector('#book-name').value;
    let book_author_input = document.querySelector('#author-name').value;
    let book_pages_input = document.querySelector('#no-pages').value;
    let book_read_status = document.querySelector('#read-status');   

    let newBook = new Book(book_name_input2,"me","232",false);

    myLibrary.push(newBook);
    
    console.log(myLibrary);
})

const book_tile_div = document.createElement('div');
book_tile_div.classList.add('book-tile');

function Book(title, author, pages, readStatus, info){
    this.title= title
    this.author= author
    this.pages= pages
    this.readStatus= readStatus
    this.info = function(info){
        info = title + " by " + author + ", " + pages + ", " + readStatus;
        return info;   
    }
}


function addBookToLibrary(){

    const book_tile_div = document.createElement('div');
    book_tile_div.classList.add('book-tile');

    const book_title_div = document.createElement('div');
    book_title_div.classList.add('tile-title');
    book_title_div.textContent = "Book.title";
    
    book_tile_div.appendChild(book_title_div);


    books_container.appendChild(book_tile_div);
    
}

let Book1 = new Book("Me", "You","232",true)
