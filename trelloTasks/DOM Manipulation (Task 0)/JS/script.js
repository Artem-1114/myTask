// Створіть динамічну галерею зображень з наступними функціональностями:
// Додавання нового зображення через форму(URL та опис).
// Видалення зображення.
// Показ великого зображення при натисканні на маленьке зображення(lightbox ефект).
// Перехід між зображеннями в lightbox режим




const fullImgBox = document.getElementById("fullImgBox");// Контейнер для великого зображення

const getAllGalleryImg = ( el , level ) => {// фунція для отримання всіх зображень
    let allGalleryImg = [];
    const getElementWithDepth = ( el , level = 0 ) => {
        return [...el.children].reduce( ( acc , n ) => {
            if (n.tagName === "IMG") {
                console.log(`IMG`)
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
}
function openFullImg(fullImhPathClick,allGalleryImg, index) {
    fullImgBox.style.display = "flex";  // Відкриття великого зображення
    let fullImg = document.getElementById("fullImg");
    fullImg.src = fullImhPathClick;
    fullImgBox.addEventListener("click", (e) => {
        if (e.target.style.display === "flex") {    
            closeFullImg();
        }
        
    })
}
// Показ великого зображення при натисканні на маленьке зображення(lightbox ефект)
function galleryInit(event) {
    let galleryChild = document.getElementById("gallery-container");
    let allGalleryImg = getAllGalleryImg(galleryChild, 1);
    let target = event.target;
    if (target.tagName === "IMG") {
        let fullImhPathClick = target.src;
        const index = allGalleryImg.indexOf(target);
        openFullImg(fullImhPathClick,allGalleryImg, index);
    }
}