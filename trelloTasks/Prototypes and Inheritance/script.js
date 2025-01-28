// Завдання:
// Реалізуйте систему управління бібліотекою книг.Створіть конструктор Book, який має властивості title, author, і year.Потім створіть конструктор EBook, який наслідує Book і додає властивість fileSize та метод для завантаження книги.Додайте метод для виведення інформації про книгу(title і author) в прототип Book і переконайтесь, що EBook успадковує цей метод.
//     Вимоги:
// Використовуйте прототипи для наслідування.
// Додайте метод для виведення інформації про книгу до прототипу Book.
// Створіть метод для завантаження електронної книги в конструкторі EBook.
//     Переконайтесь, що метод для виведення інформації про книгу працює для об'єктів EBook.


// Створюємо конструктор Book

function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}
// Створюємо прототип getInfo
Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}`;
}
// Створюємо конструктор Ebook, вказую на те що він буде наслудувати Book та додаю до нього вагу файлу
function Ebook(title, author, year, fileSize) {
    Book.call(this, title, author, year);
    this.fileSize = fileSize;
}
// Додаємо метод для завантаження книги та налаштовую прототип так щоб він вказував на book.prototype і потім повертав Ebook
Ebook.prototype = Object.create(Book.prototype);
Ebook.prototype.constructor = Ebook;
Ebook.prototype.douwnload = function() {
    return`Downloading ${this.title}...`;
}
// Тестую код 
const myFavoriteBook = new Ebook(`Drakula`, `Bram Stoker`, 1897, "500MB");
console.log(myFavoriteBook.getInfo());
console.log(myFavoriteBook.douwnload());

