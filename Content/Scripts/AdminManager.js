function loadBookData(container) {
    let bookList = JSON.parse(localStorage['bookList']);

    loadData(container, bookList, 'book');
}

function loadMyBookData(container) {
    let bookList = JSON.parse(localStorage['bookList']);
    myBookList = bookList.filter(book => book.fullname == myUserName);

    loadData(container, myBookList, 'book');
}

function loadHobbyData(container) {
    let hobbyList = JSON.parse(localStorage['hobbyList']);

    loadData(container, hobbyList, 'hobby');
}

function loadMyHobbyData(container) {
    let hobbyList = JSON.parse(localStorage['hobbyList']),
        myHobbyList = hobbyList.filter(hobby => hobby.fullname == myUserName);

    loadData(container, myHobbyList, 'hobby');
}

function loadData(container, data, type) {
    let containerElement = container instanceof HTMLElement ? container : container.element;

    containerElement.innerHTML = '';

    data.forEach(item => new Item(container, item, type));
}