const showForm = document.getElementById('showForm');
const contactForm = document.getElementById('contactForm');
const closeForm = document.getElementById('closeForm');
const addContact = document.getElementById('addContact');
const inputName = document.getElementById('inputName');
const inputNumber = document.getElementById('inputNumber');
const contactList = document.getElementById('contactList');
const searchContact = document.getElementById('searchContact'); // додаю зміні

document.addEventListener('DOMContentLoaded', localStorageContact);// Завантажуємо контакти з localStorage при завантаженні сторінки

// Показати форму для додавання нового контакту
showForm.addEventListener('click', () => {
    contactForm.style.display = 'block';
});// Натисканя на кнопку "Додати контакт"


closeForm.addEventListener('click', () => {
    contactForm.style.display = 'none';
});// Натисканя на кнопку "Закрити"


function deleteContact(event) {
    const contactItem = event.target.closest('.contact-item');// шукаю найближчий елемент з класом contact-item
    if (contactItem && event.target.classList.contains('delete-btn')) {
        contactItem.remove();// видаляю контакт
        saveContactsToLocalStorage();// зберігаю подію в localStorage
    }
}

// Редагувати контакт
function editContact(event) {
    const contactItem = event.target.closest('.contact-item');// шукаю найближчий елемент з класом contact-item
    const editBtn = event.target;

    if (contactItem && editBtn.classList.contains('edit-btn')) {
        const name = contactItem.querySelector('.contact-name').textContent;
        const number = contactItem.querySelector('.contact-number').textContent;

        inputName.value = name; // Присвоюю значення полям введення
        inputNumber.value = number;

        contactForm.dataset.editingId = contactItem.dataset.id; // Додаю унікальний id, щоб знати, який контакт буде редагуватися
        contactForm.style.display = 'block'; // Відкриваю форму
    }

}


contactList.addEventListener('click', editContact);// Натисканя на кнопку "Редагувати"
contactList.addEventListener('click', deleteContact);// Натисканя на кнопку "Видалити"


const saveContact = () => {
    const name = inputName.value.trim();// забираю пробіли
    const number = inputNumber.value.trim();

    if (name && number) {
        const contactItem = document.createElement('li');// Створюємо новий елемент
        contactItem.classList.add('contact-item');// Додаю клас
        contactItem.dataset.id = Date.now(); // Створюємо унікальний id
        contactItem.innerHTML = `
            <span class="contact-name">${name}</span>
            <span class="contact-number">${number}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;// Додаю кнопки редагування та видалення

        if (contactForm.dataset.editingId) {
        
            const editingItem = document.querySelector(`[data-id="${contactForm.dataset.editingId}"]`);
            editingItem.querySelector('.contact-name').textContent = name;
            editingItem.querySelector('.contact-number').textContent = number;// оновлюю контакт якщо він редагується

            delete contactForm.dataset.editingId;// видаляю унікальний id
        } else {
            contactList.appendChild(contactItem);// Додаю контакт
        }

       
        saveContactsToLocalStorage(); // Зберігаю контакти в localStorage

        
        contactForm.style.display = 'none';
        inputName.value = '';
        inputNumber.value = '';// закриваю всі поля введення
    }
};

addContact.addEventListener('click', saveContact);// Натисканя на кнопку "Додати контакт"


function saveContactsToLocalStorage() {
    const contacts = [];
    document.querySelectorAll('.contact-item').forEach(contactItem => {
        const name = contactItem.querySelector('.contact-name').textContent;
        const number = contactItem.querySelector('.contact-number').textContent;
        contacts.push({ name, number });
    });
    localStorage.setItem('contacts', JSON.stringify(contacts)); // парсию збережені контакти
}

// Завантажуємо контакти з localStorage при завантаженні сторінки
function localStorageContact() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];//роспарсую контакти з localStorage
    contacts.forEach(contact => {
        const contactItem = document.createElement('li');
        contactItem.classList.add('contact-item');
        contactItem.dataset.id = Date.now(); // Унікальний id для кожного елемента
        contactItem.innerHTML = `
            <span class="contact-name">${contact.name}</span>
            <span class="contact-number">${contact.number}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        contactList.appendChild(contactItem);
    });
}


searchContact.addEventListener('input', function () {
    const searchTerm = searchContact.value.toLowerCase(); // отримую і перетворюю в нижній регістр
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(contactItem => {
        const name = contactItem.querySelector('.contact-name').textContent.toLowerCase();
        const number = contactItem.querySelector('.contact-number').textContent.toLowerCase();

       
        if (name.includes(searchTerm) || number.includes(searchTerm)) {// перевіряю наявність співпадінь
            contactItem.style.display = 'block'; // Якщо є співпадіння, показую контакт
        } else {
            contactItem.style.display = 'none'; // Інакше приховую
        }
    });
});