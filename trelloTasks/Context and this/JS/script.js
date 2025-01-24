// Реалізуйте систему бронювання номерів у готелі.
// Вона повинна дозволяти створювати номери, бронювати номери і виводити інформацію про заброньовані номери.Використовуйте правильне прив'язування контексту this в методах класу.
document.addEventListener("DOMContentLoaded", () => {
//=========================== функції які показують inpunt дати початку бронюваня
    const startData = document.getElementById('start-data');
    const datePickerStart = document.getElementById('start-in-date');

    const endData = document.getElementById('end-data');
    const datePickerEnd = document.getElementById('end-in-date'); 

    function closeDatePickers() {
        datePickerStart.style.display = 'none';
        datePickerEnd.style.display = 'none';
    }

    startData.addEventListener('click', (event) => {
        closeDatePickers(); 
        datePickerStart.style.display = 'block';
        datePickerStart.focus();
        event.stopPropagation();
    });
  
    endData.addEventListener('click', (event) => {
        closeDatePickers();
        datePickerEnd.style.display = 'block';
        datePickerEnd.focus();
        event.stopPropagation();
    });

    document.addEventListener('click', (event) => {
        if (!startData.contains(event.target) && !datePickerStart.contains(event.target) &&
            !endData.contains(event.target) && !datePickerEnd.contains(event.target)) {
            closeDatePickers();
        }
    });
    //=========================== функції які показують кількість людей
    const choiceAdult = document.getElementById('choice-adult');
    const options = document.getElementById('options');
    const optionsList = document.querySelectorAll('#options li');
    const choiceChild = document.getElementById('choice-child');
    const optionsChild = document.getElementById('options-child');
    const optionsChildList = document.querySelectorAll('#options-child li');

    choiceAdult.addEventListener('click', () => {
        options.classList.toggle('hidden');
    });
    choiceChild.addEventListener('click', () => {
        optionsChild.classList.toggle('hidden-child');
    });

    optionsList.forEach(option => {
        option.addEventListener('click', () => {
            choiceAdult.querySelector('p').textContent = option.textContent;
            options.classList.add('hidden');
        });
    });
    optionsChildList.forEach(option => {
        option.addEventListener('click', () => {
            choiceChild.querySelector('p').textContent = option.textContent;
            optionsChild.classList.add('hidden-child');
        });
    });

    document.addEventListener('click', (event) => { 
        if (!choiceAdult.contains(event.target) && !options.contains(event.target) && !choiceChild.contains(event.target) && !optionsChild.contains(event.target)) {
            options.classList.add('hidden');
            optionsChild.classList.add('hidden-child');
        }
    });
})
//==================================== Context and "this"


class Hotel {
    constructor() {
        this.rooms = []
        this.reservedRooms = []

        this.addRoom = this.addRoom.bind(this)
        this.reserveRoom = this.reserveRoom.bind(this)
        this.getReservedRooms = this.getReservedRooms.bind(this);
    }

    addRoom(roomNumber) {
        if (!this.rooms.includes(roomNumber)) {
            this.rooms.push(roomNumber);
            console.log(`Номер ${roomNumber} додано.`);
        } else {
            console.log(`Номер ${roomNumber} вже існує.`);
        }
    }

    reserveRoom(roomNumber) {
        if (!this.rooms.includes(roomNumber)) {
            console.log(`Номера ${roomNumber} не існує у готелі.`)
            return
        }
        if (this.reservedRooms.includes(roomNumber)) {
            console.log(`Номер ${roomNumber} вже був заброньований.`)
            return
        }
        this.reservedRooms.push(roomNumber)
        console.log(`Номер ${roomNumber} був заброньований.`)
    }

    getReservedRooms() {
        if (this.reservedRooms.length === 0) {
            console.log('У готелі немаї заброньований номера.')
        } else {
            console.log(`Заброньовані номера у готелі: ${this.reservedRooms.join(', ')}`)
        }
    }
}

const hotel = new Hotel()
hotel.addRoom(101)
hotel.addRoom(102)
hotel.reserveRoom(101)
hotel.reserveRoom(103)
hotel.getReservedRooms()
     

