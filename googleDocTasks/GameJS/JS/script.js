document.addEventListener("DOMContentLoaded", function () {
    // ========================== ІНІЦІАЛІЗАЦІЯ ЕЛЕМЕНТІВ ==========================
    const startButton = document.getElementById("start");
    const startPage = document.getElementById("startPage");
    const prologuePage = document.getElementById("prologue__Page");
    const btsStartGame = document.getElementById("startGame");
    const startGamePage = document.getElementById("game__Page");

    const dice = document.querySelector(".d20");
    const resultDisplay = document.getElementById("result");
    const crtLackDisplay = document.getElementById("crt_Lack");
    const crtAnLackDisplay = document.getElementById("crt_anLack");

    const btsAttack = document.getElementById("attack");
    const HPenemyRed = document.querySelector("#HP_enemy-red span");
    const HPhero = document.querySelector("#HP_user");
    const userKD = document.getElementById("KD_user");
    const redKD = document.getElementById("KD_enemy-red");
    const btsStrongAttack = document.getElementById("strong");

    let enemyKD = Number(redKD.textContent); // Перетворюємо в число дест воно нормально не рахувалося так що я створив такий костиль впринцепі і без нього можна
    let playerTurn = true;
    let lastRoll = null;
    let canAttack = false;
    let defenseUsed = false; // Для захисту
    let healUsed = false; // Для лікування
    let confuseUsed = false;// Для збентеження
    let strongAttackUsed = false; // Для сильного удару

    const actionModal = document.getElementById("actionModal");
    const inventoryModal = document.getElementById("inventoryModal");
    let playerActionTimeout = null; // Таймер для обмеження часу на дію гравця

    
    const initialKD = Number(userKD.textContent);// це вже не костиль , бо виконує роль кд яке є з початку в подальшому це може знадобитися якщо гру покращувати

    // Робимо кнопку інвентаря неактивною на початку
    const inventoryButton = document.getElementById("inventory");
    inventoryButton.disabled = true;

    // ========================== ПОЧАТОК ГРИ ==========================
    
        const nameInput = document.getElementById("name");
        const nameDisplay = document.getElementById("name_user");

        nameInput.addEventListener("input", function () {
            let filteredName = nameInput.value.replace(/[^a-zA-Zа-яА-ЯїЇєЄіІґҐ’ʼ ]/g, ""); // Дозволяємо лише літери та пробіли
            nameInput.value = filteredName; // Видаляємо заборонені символи
            nameDisplay.textContent = filteredName.trim() || "Папай"; // Оновлюємо відображення імені
        });
    

    function startGame() {
        startPage.classList.add("hidden"); // Ховаємо стартову сторінку
        prologuePage.classList.remove("hidden"); // Показуємо пролог
        setTimeout(() => {
            btsStartGame.classList.remove("hidden"); // Показуємо кнопку після друку тексту
        }, 24000);//24

        startTypingEffect(); // Запускаємо друк тексту
    }

    startButton.addEventListener("click", startGame, { once: true });
    btsStartGame.addEventListener("click", () => { 
        prologuePage.classList.add("hidden");
        startGamePage.classList.remove("hidden");
        
    })
    const prologueTextContainer = document.querySelector('.prologue__text');
    const paragraphs = prologueTextContainer.querySelectorAll('p');
    const typingSpeed = 60; // Швидкість друку символів у мс

  
    function hidePrologueText() {
        paragraphs.forEach(paragraph => {
            paragraph.dataset.text = paragraph.textContent; // Зберігаємо текст
            paragraph.textContent = ""; // Очищаємо перед друком
        });
    }
    async function typeText(element) {
        const text = element.dataset.text.split(""); // Розбиваємо текст на символи

        for (let char of text) {
            element.textContent += char; // Додаємо по символу
            await new Promise(resolve => setTimeout(resolve, typingSpeed));
        }
    }
    async function startTypingEffect() {
        hidePrologueText(); // Ховаємо весь текст перед початком друку

        for (let paragraph of paragraphs) {
            await typeText(paragraph);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза між абзацами
        }
    }
    function updateHP(character, newHP) {
        const hpElement = document.getElementById(`HP_${character}`);
        const characterElement = document.getElementById(character === 'user' ? 'hero' : 'rat');

        // Оновлюємо значення HP
        hpElement.textContent = newHP;

        // Додаємо клас для анімації отримання урону
        if (character === 'user') {
            characterElement.classList.add('hurt'); // Анімація для героя
        } else {
            characterElement.classList.add('hurt'); // Анімація для ворога
        }

        // Додаємо клас для анімації зниження HP
        if (character === 'user') {
            hpElement.classList.add('hp-decrease'); // Анімація для HP героя
        } else {
            hpElement.classList.add('enemy-hp-decrease'); // Анімація для HP ворога
        }

        // Видаляємо класи після завершення анімацій
        setTimeout(() => {
            characterElement.classList.remove('hurt');
            hpElement.classList.remove('hp-decrease', 'enemy-hp-decrease');
        }, 500); // Час має відповідати тривалості анімацій
    }
    // ========================== АТАКА ГРАВЦЯ ==========================
    btsAttack.addEventListener("click", () => {
            if (!canAttack || !playerTurn) return;
            canAttack = false;

            if (lastRoll === 20) {
                heroAttackAnimation();
                const damage = attackDMG() * 2; // Множимо пошкодження на 2, якщо випав 20
                applyDamageToEnemy(damage);
                // Анімація критичного удару
                document.getElementById('result').classList.add('critical-hit');
                setTimeout(() => {
                    document.getElementById('result').classList.remove('critical-hit');
                    
                }, 500);
            } else if (lastRoll === 1) {
                let currentHP = Number(HPhero.textContent);
                let newHP = Math.max(0, currentHP - 3);
                updateHP('user', newHP);
                checkLose();
            } else if (lastRoll >= enemyKD) {
                heroAttackAnimation();

                attackDMG();
            } else {
                let currentHP = Number(HPhero.textContent);
                let newHP = Math.max(0, currentHP);
                updateHP('user', newHP);
                checkLose();
            }
            endPlayerTurn();
        });

    // ========================== АТАКА ВОРОГА ==========================
    function enemyAttack(callback) {
        setTimeout(() => {
            const roll = 2 + (Math.floor(Math.random() * 20) + 1);
            if (roll >= 20) {
                const damage = 2 * (Math.floor(Math.random() * 6) + 1);
                let currentHP = Number(HPhero.textContent);
                let newHP = Math.max(0, currentHP - damage);
                updateHP('user', newHP);
                checkLose();
            } else if (roll === 1) {
                let currentHP = Number(HPenemyRed.textContent);
                let newHP = Math.max(0, currentHP - 3);
                updateHP('enemy-rat', newHP);
            } else if (roll >= playerKD) {
                const damage = Math.floor(Math.random() * 6) + 1;
                let currentHP = Number(HPhero.textContent);
                let newHP = Math.max(0, currentHP - damage);
                updateHP('user', newHP);
                checkLose();
            }
            if (callback) callback();
        }, 1000);
    }


    // ========================== КИДОК КУБИКА D20 ==========================
    dice.addEventListener("click", function () {
        if (!playerTurn) return;
        canAttack = true;

        dice.classList.add("roll");
        setTimeout(() => {
            dice.classList.remove("roll");
        }, 1000);

        lastRoll = Math.floor(Math.random() * 20) + 1;
        resultDisplay.textContent = `${lastRoll}`;
        crtLackDisplay.style.display = lastRoll === 20 ? 'block' : 'none';
        crtAnLackDisplay.style.display = lastRoll === 1 ? 'block' : 'none';
    });
    


    // ========================== СИЛЬНИЙ УДАР ==========================
    btsStrongAttack.addEventListener("click", function () {
        if (!canAttack || !playerTurn || strongAttackUsed) return;

        canAttack = false;

        if (lastRoll >= enemyKD) {
            inventoryModal.classList.add("hidden");
            heroAttackAnimation();
            strongAttack();
        }

        strongAttackUsed = true;
        endPlayerTurn();
    });

    function strongAttack() {
        const damage = 2 * (Math.floor(Math.random() * 6) + 1);
        let currentHP = Number(HPenemyRed.textContent);
        let newHP = Math.max(0, currentHP - damage);
        HPenemyRed.textContent = newHP;
        checkWin();
    }

    // ========================== ЛОГІКА АТАКИ ТА УШКОДЖЕННЯ ==========================
    function attackDMG() {
        const damage = Math.floor(Math.random() * 6) + 1;
        let currentHP = Number(HPenemyRed.textContent);
        let newHP = Math.max(0, currentHP - damage);
        HPenemyRed.textContent = newHP;
        checkWin();
        return damage;
    }

    function applyDamageToEnemy(damage) {
        let currentHP = Number(HPenemyRed.textContent);
        let newHP = Math.max(0, currentHP - damage);
        HPenemyRed.textContent = newHP;
        checkWin();
    }

    // ========================== АТАКА ВОРОГА ==========================
    let playerKD = Number(userKD.textContent);

    function enemyAttack(callback) {
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 20) + 1;
            if (roll === 20) {
                const damage = 2 * (Math.floor(Math.random() * 6) + 1);
                let currentHP = Number(HPhero.textContent);
                let newHP = Math.max(0, currentHP - damage);
                HPhero.textContent = newHP;
                checkLose();
            } else if (roll === 1) {
                let currentHP = Number(HPenemyRed.textContent);
                let newHP = Math.max(0, currentHP - 3);
                HPenemyRed.textContent = newHP;
            } else if (roll >= playerKD) {
                const damage = Math.floor(Math.random() * 6) + 1;
                let currentHP = Number(HPhero.textContent);
                let newHP = Math.max(0, currentHP - damage);
                HPhero.textContent = newHP;
                checkLose();
            }
            if (callback) callback();
        }, 1000);
    }

    // ========================== ЛОГІКА ЗАХИСТУ ==========================
    let initialHP = Number(HPhero.textContent);

    document.getElementById("defend").addEventListener("click", function () {
        if (defenseUsed) return;

        // Збільшуємо КД на 2
        const currentKD = Number(userKD.textContent);
        userKD.textContent = currentKD + 2;

        defenseUsed = true;
        document.getElementById("defend").disabled = true;
        actionModal.classList.add("hidden");

        // Якщо гравець використав захист, чекаємо на лікування
        if (!healUsed) {
            playerActionTimeout = setTimeout(() => {
                if (!healUsed) { // Якщо лікування не було використано
                    startEnemyAttack();
                }
            }, 5000);
        }
    });

    // ========================== ЛІКУВАННЯ ==========================
    document.getElementById("heal").addEventListener("click", function () {
        if (healUsed) return;

        healHero();
        healUsed = true;
        document.getElementById("heal").disabled = true;
        inventoryModal.classList.add("hidden");

        if (defenseUsed || confuseUsed) {
            clearTimeout(playerActionTimeout); // Скасовуємо таймер
            startEnemyAttack();
        }
    });

    function healHero() {
        const heal = Math.floor(Math.random() * 4) + 1;
        HPhero.textContent = Math.min(initialHP, Number(HPhero.textContent) + heal);
    }

    // Функція для початку атаки ворога
    function startEnemyAttack() {
        enemyAttack(() => {
            playerTurn = true;
            enemyAttackAnimation();
            resetPlayerActions(); // Скидаємо всі дії гравця для нового ходу
        });
    }

    // ========================== ЗБЕНТЕЖЕННЯ ВОРОГА ==========================
    document.getElementById("confuseEnemy").addEventListener("click", function () {
        if (confuseUsed) return;

        confuseUsed = true;
        document.getElementById("confuseEnemy").disabled = true;
        actionModal.classList.add("hidden");

        // Якщо гравець використав збентеження, чекаємо на лікування
        if (!healUsed) {
            playerActionTimeout = setTimeout(() => {
                if (!healUsed) { // Якщо лікування не було використано
                    startEnemyAttack();
                }
            }, 5000);
        }
    });

    // ========================== АНІМАЦІЯ АТАКИ ГЕРОЯ ==========================
    function heroAttackAnimation() {
        const hero = document.getElementById("hero");
        hero.classList.add("hero-attacking");

        setTimeout(() => {
            hero.classList.remove("hero-attacking");
        }, 1000);
    }

    // ========================== АНІМАЦІЯ АТАКИ ВОРОГА ==========================
    function enemyAttackAnimation() {
        const enemy = document.getElementById("rat");
        enemy.classList.add("enemy-attacking");

        setTimeout(() => {
            enemy.classList.remove("enemy-attacking");
        }, 1000);
    }

    // ========================== ЛОГІКА ХОДУ ГРАВЦЯ ==========================
    function endPlayerTurn() {
        playerTurn = false;
        clearTimeout(playerActionTimeout); // Скидаємо таймер, якщо він був активний

        if (defenseUsed || confuseUsed) {
            playerActionTimeout = setTimeout(() => {
                if (!healUsed) { // Якщо лікування не було використано
                    startEnemyAttack();
                }
            }, 5000);
        } else {
            setTimeout(() => {
                enemyAttack(() => {
                    playerTurn = true;
                    enemyAttackAnimation();
                    resetPlayerActions(); // Скидаємо всі дії гравця для нового ходу
                });
            }, 1000);
        }
    }

    // Функція для скидання станів дій гравця
    function resetPlayerActions() {
        defenseUsed = false;
        healUsed = false;
        confuseUsed = false;
        strongAttackUsed = false;
        document.getElementById("defend").disabled = false;
        document.getElementById("heal").disabled = false;
        document.getElementById("confuseEnemy").disabled = false;
        document.getElementById("attack").disabled = false;

        // Повертаємо КД до початкового значення після захисту
        userKD.textContent = initialKD;

        // Робимо кнопку інвентаря неактивною на початку кожного ходу
        inventoryButton.disabled = true;
    }

    // ========================== ВИКЛИК МОДАЛЬНИХ ВІКОН ==========================
    document.getElementById("another__action").addEventListener("click", function () {
        actionModal.classList.remove("hidden");
        // Активуємо кнопку інвентаря після натискання "Інша дія"
        inventoryButton.disabled = false;
    });

    document.getElementById("inventory").addEventListener("click", function () {
        inventoryModal.classList.remove("hidden");
    });

    document.getElementById("closeModal").addEventListener("click", function () {
        actionModal.classList.add("hidden");
    });

    document.getElementById("closeModalInventary").addEventListener("click", function () {
        inventoryModal.classList.add("hidden");
    });

    // ========================== ЛОГІКА ПЕРЕМОГИ І ПОРАЗКИ ==========================
    function checkWin() {
        if (Number(HPenemyRed.textContent) === 0) {
            alert("Перемога! Ворог знищений.");
        }
    }

    function checkLose() {
        if (Number(HPhero.textContent) === 0) {
            alert("Поразка! Ви загинули.");
        }
    }

    // ========================== ВИКЛИК ДІЙ ПІСЛЯ ХОДУ ГРАВЦЯ ==========================
    function playerTurnOptions() {
        if (!playerTurn) return;

        document.getElementById("defend").disabled = false;
        document.getElementById("heal").disabled = false;
        document.getElementById("attack").disabled = false;
    }

    playerTurnOptions();
});