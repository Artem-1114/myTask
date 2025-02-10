const menu = document.getElementById('menu');
const menuItems = document.querySelectorAll('.menu__item span');

menu.addEventListener('mouseenter', () => {
    // setTimeout(() => {
        menuItems.forEach(item => {
            item.style.opacity = 1;
        });
    // }, 500); 
});

menu.addEventListener('mouseleave', () => {
    menuItems.forEach(item => {
        item.style.opacity = 0;
    });
});

let checkBox = document.getElementById('switch');
let body = document.body;

let localStorageTheme = localStorage.getItem('theme');

const setThemeColor = () => {
    if (localStorageTheme === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }
};

const checkModernSettings = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      checkThemeChange();
    })
}

const checkThemeChange = () => {
    if (localStorageTheme == null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(); 
    } else if (localStorageTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode();
    }else {
        setLightMode();
    }
}


const setDarkMode = () => {
    body.classList = 'dark';
    localStorage.setItem('theme', 'dark');
    checkBox.checked = true;
};

const setLightMode = () => {
    body.classList = 'light';
    localStorage.setItem('theme', 'light');
    checkBox.checked = false;
};

checkBox.addEventListener('click', () => checkBox.checked ? setDarkMode() : setLightMode());
checkModernSettings();
checkThemeChange();
setThemeColor();
