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


const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-btn');
const selectedDateSpam = document.getElementById('selected-date');
const eventInput = document.getElementById('event-input');
const saveEventBtn = document.getElementById('save-event');
deleteEventBtn = document.getElementById('delete-event');// додаю зміні


let selectedDate = null;// обявляю змінну яка буде зберігати дату

const openModal = (date) => {
    selectedDate = date;
    selectedDateSpam.textContent = `${date}.${currenDate.getMonth() + 1}.${currenDate.getFullYear()}`;// додаю дату
    modal.classList.remove("hidden"); // забираю клас hidden
};

const closeModalContent = () => {
    modal.classList.add("hidden");// додаю клас hidden
};

closeModal.addEventListener("click", closeModalContent);// обробка події закритя на крестик

document.getElementById("calendar-days").addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN" && !event.target.classList.contains("calendar__days-hidden")) {
        openModal(event.target.textContent);// стверджую якщо натиснути на Spam і він не буде класом calendar__days-hidden то відкриєтся модальне вікно
    }
});

  