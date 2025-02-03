const monthYearElement = document.getElementById('month-year');
const calendarDaysElement = document.getElementById('calendar-days');
const nameDaysContainer = document.querySelector('.calendar_day-name');
const prevBtf = document.getElementById('prev-btf');
const nextBtf = document.getElementById('next-btf');// Обявив зміні

const monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];// створив масив місяців
const daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];// створив масив місяців

let currenDate = new Date();

const renderDayNames = () => {
    nameDaysContainer.innerHTML = daysNames.map(day => `<span>${day}</span>`).join(''); // додаю дні span в календар вказую щоб перебрали масив та додали
};

const renderCalendar = () => {
    const year = currenDate.getFullYear();// додаю рік
    const month = currenDate.getMonth();// додаю місяць

    monthYearElement.innerHTML = `<span>${monthsNames[month]} ${year}</span>`; // додаю в month-year назву року та місяц

    const daysInMonth = 32 - new Date(year, month, 32).getDate(); // кількість днів у місяці
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // щоб починалися з понеліка

    let daysHtml = '';// обявляю пустий рядок щоб потім в нього додати span з класом calendar__days- та дні в місяці а також пусті рядки до кінця місяця

    for (let i = 0; i < firstDayOfMonth; i++) {
        daysHtml += '<span class="calendar__days-hidden"></span>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

        daysHtml += `<span class="${isToday ? 'today' : ''}">${day}</span>`;
    }

    calendarDaysElement.innerHTML = daysHtml;
};

const changeMonth = (delta) => {
    currenDate.setMonth(currenDate.getMonth() + delta);
    renderCalendar();
};// змінює місяці на задане знаеня delta

prevBtf.addEventListener('click', () => changeMonth(-1));// обробник події 
nextBtf.addEventListener('click', () => changeMonth(1));

renderDayNames();// обявляю функію щоб воно працювало
renderCalendar();
//=================================================================
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-btn');
const selectedDateSpan = document.getElementById('selected-date');
const eventInput = document.getElementById('event-input');
const saveEventBtn = document.getElementById('save-event');
const deleteEventBtn = document.getElementById('delete-event'); // Додано const

let selectedDate = null; // зміна для збереженя вибраної дати


const getEvents = () => {
    return JSON.parse(localStorage.getItem('events')) || {};
};// ця функія отримує та обробляє дані з LocalStorage та перетврює текст на обєкт


const saveEvents = (events) => {
    localStorage.setItem('events', JSON.stringify(events));//перетворюючи його на текст
};// зберігає подію у LocalStorage

const openModal = (date) => {// функія модального вікна
    selectedDate = `${date}.${currenDate.getMonth() + 1}.${currenDate.getFullYear()}`;// додає дату доо модального вікна
    selectedDateSpan.textContent = selectedDate;// додає дату доо модального вікна span

    const events = getEvents();// звертаюся до LocalStorage
    eventInput.value = events[selectedDate] || ''; // отримуємло подію з LocalStorage

    modal.classList.remove("hidden");// показую модальне вікно
};


const closeModalContent = () => {
    modal.classList.add("hidden"); // додаю клас hidden
};

// Функція збереження події
const saveEvent = () => {
    const events = getEvents();// отримую подію з LocalStorage
    if (eventInput.value.trim()) {//якщо поле не порожне додаю його в обєкт
        events[selectedDate] = eventInput.value.trim();
    } else {
        delete events[selectedDate]; // якщо поле порожне видаляю
    }
    saveEvents(events);// зберігаю подію у LocalStorage
    closeModalContent();
};

// Функція видалення події
const deleteEvent = () => {
    const events = getEvents();
    delete events[selectedDate];
    saveEvents(events);
    eventInput.value = ''; // Очищення поля вводу
    closeModalContent();
};


document.getElementById("calendar-days").addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN" && !event.target.classList.contains("calendar__days-hidden")) {
        openModal(event.target.textContent);// функія вкахує на те що коли натиснути на спам і ван відкриває модальне вікно також у ньому не має класу hidden
    }
});

// Додаємо обробники подій
saveEventBtn.addEventListener('click', saveEvent);
deleteEventBtn.addEventListener('click', deleteEvent);
closeModal.addEventListener("click", closeModalContent); // обробка подій на кліки

