const myLibrary = [];

function Book(title, author, npage, isRead) {
    this.title = title;
    this.author = author;
    this.npage = npage
    this.isRead = isRead;
    this.info = function() {
        return `'${this.title}' by '${this.author}', '${this.npage}' pages`
    };
}

// Every book in the library will be display as a card

function createCard(idx) {
    // create DOM for cards.
    const card = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const page = document.createElement('div');
    const btnContainer = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(page);

    // CSS styling for the card elements just created

    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '30px';
    card.appendChild(btnContainer);


    // CSS for remove button and read button

    removeBtn.style.flex = '1';
    removeBtn.style.height = '40px';
    removeBtn.style.border = 'none';
    removeBtn.style.borderRadius = '20px';
    removeBtn.style.backgroundColor = '#ef4444';
    removeBtn.style.color = 'white';
    removeBtn.textContent = 'Remove'
    removeBtn.style.fontSize = '20px';

    readBtn.style.flex = '1';
    readBtn.style.height = '40px';
    readBtn.style.border = 'none';
    readBtn.style.borderRadius = '20px';
    readBtn.style.backgroundColor = '#0ea5e9';
    readBtn.style.color = 'white';
    readBtn.textContent = 'Read';
    readBtn.style.fontSize = '20px';
    



    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(readBtn);

    card.classList.add('card');
    card.setAttribute('data-index', `'${idx}'`);

    const myNewBook = myLibrary[idx];
    title.textContent = myNewBook.title;
    author.textContent = myNewBook.author;
    page.textContent = `${myNewBook.npage} pages`;


    // Style for the "author" and "number of page" text
    author.style.fontSize = '20px';
    page.style.fontSize = '20px'

    // CSS for .card elements

    card.style.height = '250px';
    card.style.padding = '20px';
    card.style['font-size'] = '25px';
    card.style['text-align'] = 'center'
    card.style.backgroundColor = 'white';
    card.style.display = 'grid';
    card.style.gap = '30px';
    card.style['grid-templete-row'] = 'repeat(4, 1fr)';
    card.style['boxShadow'] = '4px 4px 2px -2px rgba(0, 0, 0, 0.1)';
    card.style.borderRadius = '10px';


    return card;
}

function displayCard(idx) {

    const contentArea = document.querySelector('#content');
    let newCard = createCard(idx);
    contentArea.appendChild(newCard);

}

function addBookToLibrary() {
    const addDialog = document.getElementById('addDialog');
    const addBtn = document.querySelector('#add');
    const confirmBtn = addDialog.querySelector('#confirmBtn');
    const titleBox = addDialog.querySelector('#title');
    const authorBox = addDialog.querySelector('#author');
    const npBox = addDialog.querySelector('#pageNumber');
    const readSelect = addDialog.querySelector('#isRead');
    
    
    // "add new book" button opens the <dialog> modally
    addBtn.addEventListener('click', () => addDialog.showModal() ) ;

    let titleValue = '';
    let authorValue = '';
    let pageValue = '';
    let readValue = '';

    titleBox.addEventListener('change', () =>  titleValue = titleBox.value);
    authorBox.addEventListener('change', () =>  authorValue = authorBox.value);
    npBox.addEventListener('change', () =>  pageValue = npBox.value);
    readSelect.addEventListener('change', () => readValue = readSelect.value);

    confirmBtn.addEventListener('click', (e) => {

        let newBook = new Book(titleValue, authorValue,
            pageValue, readValue);

        myLibrary.push(newBook);

        e.preventDefault();
        addDialog.close();


    })

    

    

    addDialog.addEventListener('close', (e) => {
        displayCard(myLibrary.length-1);
    })
   

}

addBookToLibrary();