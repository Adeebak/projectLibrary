class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleReadStatus() {
        this.isRead = !this.isRead;
        Library.displayCard();
    }

    getIndex() {
        return Library.myLibrary.indexOf(this);
    }
}

class Library {
    static myLibrary = [];

    static addBook(book) {
        this.myLibrary.push(book);
        this.displayCard();
    }

    static removeBook(index) {
        this.myLibrary.splice(index, 1);
        this.displayCard();
    }

    static toggleReadStatus(index) {
        this.myLibrary[index].toggleReadStatus();
    }

    static displayCard() {
        let cardContainer = document.querySelector('.cards');
        cardContainer.innerHTML = '';

        this.myLibrary.forEach((book, index) => {
            let card = document.createElement('div');
            card.classList.add('card');

            let titleElement = document.createElement('h1');
            titleElement.classList.add('card-title');
            titleElement.textContent = `${book.title}`;

            let authorElement = document.createElement('p');
            authorElement.classList.add('card-author');
            authorElement.textContent = `${book.author}`;

            let pagesElement = document.createElement('p');
            pagesElement.classList.add('card-pages');
            pagesElement.textContent = `${book.pages}`;

            let isReadElement = document.createElement('p');
            isReadElement.classList.add('card-read');
            isReadElement.textContent = `${book.isRead ? 'read' : 'not read yet'}`;

            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.dataset.index = index;

            let toggleReadButton = document.createElement('button');
            toggleReadButton.textContent = 'Toggle Read Status';
            toggleReadButton.classList.add('toggle-read-btn');
            toggleReadButton.dataset.index = index;

            card.appendChild(titleElement);
            card.appendChild(authorElement);
            card.appendChild(pagesElement);
            card.appendChild(isReadElement);
            card.appendChild(removeButton);
            card.appendChild(toggleReadButton);

            cardContainer.appendChild(card);

        });
        document.querySelector('#myForm').reset();

    }
}

document.querySelector('.btn').addEventListener('click', function () {
    let form = document.querySelector('.form-main');
    let button = document.querySelector('.btn');

    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');
        button.classList.add('hidden');
    } else {
        form.classList.add('hidden');
        button.classList.remove('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('.form-main');
    let button = document.querySelector('.btn');

    form.classList.add('hidden');
    button.classList.remove('hidden');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let isRead = document.querySelector('#read').checked;

        if (title.trim() === '' || author.trim() === '' || pages.trim() === '') {
            alert('Please Fill All The Fields');
            return;
        }

        let newBook = new Book(title, author, pages, isRead);
        Library.addBook(newBook);
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            Library.removeBook(event.target.dataset.index);
        } else if (event.target.classList.contains('toggle-read-btn')) {
            Library.toggleReadStatus(event.target.dataset.index);
        }
    });
});