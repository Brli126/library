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


function createCard(idx) {
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

    btnContainer.style.display = 'flex';
    btnContainer.style['justify-content'] = 'center';
    card.appendChild(btnContainer);


    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(readBtn);

    card.classList.add('card');
    card.setAttribute('data-index', `'${idx}'`);

    const myNewBook = myLibrary[idx]
    title.textContent = myNewBook.title;
    author.textContent = myNewBook.author;
    page.textContent = myNewBook.npage;

    card.style.height = '200px';
    card.style.backgroundColor = 'white';
    card.style.display = 'flex';
    card.style['flex-flow'] = 'column';
    card.style['align-content'] = 'center';

    return card;
}

function displayCard() {
    const contentArea = document.querySelector('#content');
    
    for (let i = 0; i < myLibrary.length; i++) {
        let newCard = createCard(i);
        contentArea.appendChild(newCard);

    }

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
        console.log(myLibrary[0]);
        displayCard();
    })
   

}

addBookToLibrary();