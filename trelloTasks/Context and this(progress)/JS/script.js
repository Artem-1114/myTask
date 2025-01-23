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
})

