const images = [
    'Foto1.jpg',
    'Foto2.jpg',
    'Foto3.jpg',
    'Foto4.jpg',
    'Foto5.jpg',
    'Foto6.jpg',
];// Масив зображень

let activeImage = localStorage.getItem('activeImage') ? parseInt(localStorage.getItem('activeImage')) : 0; // Поточна позиція
const sliderLine = document.querySelector('.slider-line');
const widthSider = document.querySelector('.slider').offsetWidth;// Розмір зображення а точніше їх ширина
sliderLine.style.width = 3 * widthSider + 'px'; // роблю щоб поміщалися 3 зображеня по ширені
sliderLine.style.height = widthSider + 'px';
sliderLine.style.left = '-' + widthSider + 'px';// якщо так не зробити то довелося б робти костилі по розміщеню цих зобрадень , а так відзтупає на одне хображеня від центрального
let flag = true;// костил для плавної анімаї
let autoScrollInterval;


function initSlider() {//  створюю слайдер
    const img = document.createElement('img');
    img.alt = 'slider';
    img.src = `./images/` + images[activeImage];
    sliderLine.appendChild(img);
    
    nextSlider();
    prevSlider();
    startAutoScroll(); // Запуск автопрокрутки
}


const nextSlider = () => {// Додавання наступного зображення
    let nextImg = activeImage + 1;
    if (nextImg >= images.length) {
        nextImg = 0;
    }
    const img = document.createElement('img');
    img.alt = 'slider';
    img.src = `./images/` + images[nextImg];
    sliderLine.appendChild(img);
    sliderLine
};


const prevSlider = (width = false) => {// Додавання попереднього зображення
    let prevImg = activeImage - 1;
    if (prevImg < 0) {
        prevImg = images.length - 1;
    }
    const img = document.createElement('img');
    img.alt = 'slider';
    img.src = `./images/` + images[prevImg];
    if (width) {
        img.style.width = 0;
    }
    sliderLine.prepend(img);
};


const nextImage = () => {// Перехід до наступного зображення
    if (!flag) {
        return;
    }
    flag = !flag;
    activeImage++;
    if (activeImage >= images.length) {
        activeImage = 0;
    }
    localStorage.setItem('activeImage', activeImage); // Зберігаєю
    nextSlider();
    animation({// анімація
        duration: 1000,
        draw: function (progress) {
            document.querySelector('.slider-line img').style.width = widthSider * (1 - progress) + 'px';
        },
        removeEvent: document.querySelector('.slider-line img'),
    });
};


const prevImage = () => {// Перехід до попереднього зображення
    if (!flag) {
        return;
    }
    flag = !flag;
    activeImage--;
    if (activeImage < 0) {
        activeImage = images.length - 1;
    }
    localStorage.setItem('activeImage', activeImage); // Зберігаю
    prevSlider(true);
    animation({
        duration: 1000,
        draw: function (progress) {
            document.querySelector('.slider-line img').style.width = widthSider * progress + 'px';
        },
        removeEvent: document.querySelector('.slider-line img:last-child'),
    });
};


const animation = ({ duration, draw, removeEvent }) => {// Анімація перемикання зображень duration - час анімації draw - функція яка виконується під час анімації removeEvent - елемент який буде видалений
    const start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        draw(timeFraction);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        } else {
            removeEvent.remove();
            flag = true;
        }
    });
};


const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
        nextImage();
    }, 4000); // автопрокрут просто ініціалізую фунцію кожні 4 секунди
};

const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
};// зупинка автокрокрута


initSlider();// Ініціалізація слайдера при завантаженні сторінки


document.querySelector('.next-btn').addEventListener('click', () => {
    stopAutoScroll(); // Зупиняю автопрокрутку при кліку
    nextImage();
    startAutoScroll(); // Поновлю автопрокрутку
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    stopAutoScroll(); 
    prevImage();
    startAutoScroll(); 
});

       


    