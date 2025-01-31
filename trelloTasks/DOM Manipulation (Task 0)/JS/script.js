// Створіть динамічну галерею зображень з наступними функціональностями:
// Додавання нового зображення через форму(URL та опис).
// Видалення зображення.
// Показ великого зображення при натисканні на маленьке зображення(lightbox ефект).
// Перехід між зображеннями в lightbox режим




const fullImgBox = document.getElementById("fullImgBox");// Контейнер для великого зображення
const allCarusel = document.getElementById("all-carusel");
const prevImg = document.querySelector(".prev");
const nextImg = document.querySelector(".next");
const urlInput = document.getElementById("urlInput");
const delteBtn = document.querySelector(".delete-btn");


function addNewImg() {
    let urlInput = document.getElementById("urlInput");
    let galleryContainer = document.getElementById("gallery-container");

    if (urlInput.value === "") {
        return;  // Вихід, якщо поле порожнє
    }

    let newDiv = document.createElement("div");// додаємо дів  
    newDiv.classList.add("gallery-item");// додаємо клас        
    
    let uniqueId = Date.now(); // Генеруємо унікальний ID
    newDiv.setAttribute("data-id", uniqueId); // Додаємо як атрибут ( формуємо унікальний ID)

    let newImg = document.createElement("img");  
    newImg.src = urlInput.value;

    let deleteBtn = document.createElement("button"); // Створюємо кнопку
    deleteBtn.innerText = "Видалити";
    deleteBtn.style.position = "absolute";
    deleteBtn.classList.add("delete-btn");

    // Додаємо обробник подій для видалення
    deleteBtn.addEventListener("click", function () {
        newDiv.remove(); // Видаляємо тільки цей елемент
    });

    newDiv.appendChild(newImg);
    newDiv.appendChild(deleteBtn);
    galleryContainer.appendChild(newDiv); 

    urlInput.value = ""; // Очищаємо поле вводу
}

// Обробка кнопкою!!
document.getElementById("submitBtn").addEventListener("click", function (event) {
    addNewImg();
});





const getAllGalleryImg = ( el , level ) => {// фунція для отримання всіх зображень
    let allGalleryImg = [];
    const getElementWithDepth = ( el , level = 0 ) => {
        return [...el.children].reduce( ( acc , n ) => {
            if (n.tagName === "IMG") {
                allGalleryImg.push(n);
            }
            acc.push(...getElementWithDepth(n, level + 1));
            return acc;
        }, [(el, level)]);
    }
    getElementWithDepth(el, level);
    return allGalleryImg;// Масив з усіма зображеннями

}

closeFullImg = () => {
    fullImgBox.style.display = "none";// Закриття великого зображення
    allCarusel.style.display = "none";
    delteBtn.style.display = "none";
}
function openFullImg(fullImhPathClick,allGalleryImg, index) {
    fullImgBox.style.display = "flex";  // Відкриття великого зображення
    let lengAllImg = allGalleryImg.length;  // Кількість всіх зображень
    let fullImg = document.getElementById("fullImg");
    fullImg.src = fullImhPathClick;
    fullImgBox.addEventListener("click", (e) => {
        if (e.target.style.display === "flex") {    
            closeFullImg();
        }
        
    })
    // Перехід між зображеннями (src обовязково вказувати!!!!)
    prevImg.addEventListener("click", () => { 
        if (index > 0) {
            index--;
            fullImg.src = allGalleryImg[index - 1].src;
        } else {
            fullImg.src = allGalleryImg[lengAllImg - 1].src; // зациклюємо велике зображення
            index = lengAllImg - 1;
        }
    })
    nextImg.addEventListener("click", () => {
        if (index < lengAllImg - 1) {
            fullImg.src = allGalleryImg[index + 1].src;
            index++;
        } else {
            fullImg.src = allGalleryImg[0].src;
            index = 0;
        }
    })
}
// Показ великого зображення при натисканні на маленьке зображення(lightbox ефект)
function galleryInit(event) {
    let galleryChild = document.getElementById("gallery-container");
    let allGalleryImg = getAllGalleryImg(galleryChild, 1);
    let target = event.target;
    if (target.tagName === "IMG") {
        allCarusel.style.display = "block";
        let fullImhPathClick = target.src;
        const index = allGalleryImg.indexOf(target);
        openFullImg(fullImhPathClick,allGalleryImg, index);
    }
}