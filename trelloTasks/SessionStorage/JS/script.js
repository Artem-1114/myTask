const menu = document.getElementById('menu');
const menuItems = document.querySelectorAll('.menu__item span');
const checkBox = document.getElementById('switch');
const body = document.body;// потрібно для тем
const dayInMs = 24 * 60 * 60 * 1000; // 24 годни

const saveToLocalStorage = (key, value) => {
    const data = {
        value: value,// обєкт який потрібно зберігати
        timestamp: Date.now()// час переданий у мілі секундах
    };
    localStorage.setItem(key, JSON.stringify(data));// зберігаю у формі JSON
};

const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);// потрібно отримати дані
    if (!data) return null;

    try {
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (e) {
        return null;// униканя помилки якщо дані некоректні undefined
    }
};


const removeOldData = () => {
    const now = Date.now();

    for (let key of Object.keys(localStorage)) {// отримую всі ключі
        const item = getFromLocalStorage(key);//отримую значення 
        if (item && item.timestamp && now - item.timestamp > dayInMs) {// тут відбуваєтся перевірка якщо вже більше 24 годин
            localStorage.removeItem(key);
        }
    }
};

const setThemeColor = () => {
    const localStorageTheme = getFromLocalStorage('theme');

    if (localStorageTheme && localStorageTheme.value === 'dark') {
        setDarkMode();
    } else {
        setLightMode();// повертає тему
    }
};


const checkModernSettings = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        checkThemeChange();// перевірка та встановлення теми у самому windows
    });
};

const checkThemeChange = () => {
    const localStorageTheme = getFromLocalStorage('theme');

    if (!localStorageTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode();
    } else if (localStorageTheme && localStorageTheme.value === 'dark') {
        setDarkMode();
    } else {
        setLightMode();// перевірка темі при старті сайту
    }
};

const setDarkMode = () => {
    body.classList = 'dark';
    saveToLocalStorage('theme', 'dark');// темна тема
    checkBox.checked = true;
};

const setLightMode = () => {
    body.classList = 'light';
    saveToLocalStorage('theme', 'light');// світла тема
    checkBox.checked = false;
};

menu.addEventListener('mouseenter', () => {
    menuItems.forEach(item => {
        item.style.opacity = 1;
    });
});

menu.addEventListener('mouseleave', () => {
    menuItems.forEach(item => {
        item.style.opacity = 0;
    });
});

checkBox.addEventListener('click', () => {
    checkBox.checked ? setDarkMode() : setLightMode();
});

removeOldData();
checkModernSettings();
checkThemeChange();
setThemeColor();
