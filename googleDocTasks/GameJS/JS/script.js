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
    let enemyKD = Number(redKD.textContent); // Перетворюємо в число

    let playerTurn = true;
    let lastRoll = null;
    let canAttack = false;
    let defenseUsed = false; // Для захисту
    let healUsed = false; // Для лікування
    let confuseUsed = false;

    // ========================== ПОЧАТОК ГРИ ==========================
    function startGame() {
        startPage.classList.add("hidden");
        prologuePage.classList.remove("hidden");
        setTimeout(() => {
            btsStartGame.classList.remove("hidden");
        }, 100);
    }

    startButton.addEventListener("click", startGame, { once: true });

    btsStartGame.addEventListener("click", () => {
        prologuePage.classList.add("hidden");
        startGamePage.classList.remove("hidden");
    });

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

    // ========================== АТАКА ГРАВЦЯ ==========================
    btsAttack.addEventListener("click", function () {
        if (!canAttack || !playerTurn) return;
        canAttack = false;

        if (lastRoll === 20) {
            heroAttackAnimation();
            const damage = attackDMG() * attackDMG(); // Множимо пошкодження на 2, якщо випав 20
            applyDamageToEnemy(damage); // Наносимо множене пошкодження
        } else if (lastRoll === 1) {
            let currentHP = Number(HPhero.textContent);
            let newHP = Math.max(0, currentHP - 3);
            HPhero.textContent = newHP;
            checkLose();
        }
        else if (lastRoll >= enemyKD) {
            heroAttackAnimation();
            attackDMG();
        }else {
            console.error();
            
        }
        endPlayerTurn();
    });


    let strongAttackUsed = false; // Змінна для відстеження використання сильного удару

    btsStrongAttack.addEventListener("click", function () {
        if (!canAttack || !playerTurn || strongAttackUsed) return; // Якщо сильний удар вже був використаний, не дозволяємо натискати кнопку

        canAttack = false;

        // Якщо сильний удар ще не був використаний, виконуємо його
        if (lastRoll >= enemyKD) {
            inventoryModal.classList.add("hidden");
            heroAttackAnimation();
            strongAttack();
        }

        // Після виконання сильного удару відзначаємо, що він був використаний
        strongAttackUsed = true;

        endPlayerTurn(); // Завершуємо хід гравця
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
            }  if (roll === 1) {
                let currentHP = Number(HPenemyRed.textContent);
                let newHP = Math.max(0, currentHP - 3);
                HPhero.textContent = newHP;
                checkLose();
            } if (roll >= playerKD) {
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
        if (defenseUsed) return; // Якщо захист вже використано, нічого не робимо

        let baseKD = Number(userKD.textContent); // Отримуємо поточне КД гравця
        userKD.textContent = baseKD + 2; // Збільшуємо КД на 2

        defenseUsed = true; // Встановлюємо, що захист використано
        document.getElementById("defend").disabled = true; // Вимикаємо кнопку захисту
        actionModal.classList.add("hidden");

        if (healUsed) {
            startEnemyAttack(); // Якщо лікування вже використано, одразу атакує ворог
        } else {
            setTimeout(() => {
                playerTurn = false; // Хід гравця завершено
                setTimeout(startEnemyAttack, 6000); // Ворог атакує через 6 секунд, якщо не було лікування
            }, 1000);
        }
    });

    document.getElementById("heal").addEventListener("click", function () {
        if (healUsed) return; // Не можна лікуватися більше одного разу за хід

        healHero();
        healUsed = true; // Встановлюємо, що лікування використано
        document.getElementById("heal").disabled = true; // Вимикаємо кнопку лікування після використання
        inventoryModal.classList.add("hidden");

        if (defenseUsed) {
            startEnemyAttack(); // Якщо захист вже використано, одразу атакує ворог
        } else {
            setTimeout(() => {
                playerTurn = false;
                setTimeout(startEnemyAttack, 6000); // Ворог атакує через 6 секунд, якщо не було захисту
            }, 1000);
        }
    });

    function healHero() {
        const heal = Math.floor(Math.random() * 4) + 1;
        HPhero.textContent = Math.min(initialHP, Number(HPhero.textContent) + heal);
    }

    function startEnemyAttack() {
        enemyAttack(() => {
            userKD.textContent = Number(userKD.textContent) - 2; // Повертаємо початкове КД
            playerTurn = true; // Знову хід гравця
            defenseUsed = false; // Можна використовувати захист знову
            healUsed = false; // Можна лікуватися знову
            enemyAttackAnimation(); // Анімація атаки ворога
            playerTurnOptions(); // Дозволяємо вибір дій для гравця після ходу ворога
        });
    }
   
    function healHero() {
        const heal = Math.floor(Math.random() * 4) + 1;
        HPhero.textContent = Math.min(initialHP, Number(HPhero.textContent) + heal);
    }// переробити хп не повино бути більше чив початкове та хілку можна використати на наступний хід
    // ========================== ЗБЕНТЕЖЕННЯ ВОРОГА ==========================
    document.getElementById("confuseEnemy").addEventListener("click", function () {
        if (confuseUsed) return;

        document.getElementById("confuseEnemy").disabled = true;
        actionModal.classList.add("hidden");

        setTimeout(() => {
            playerTurn = false;

            const roll1 = Math.floor(Math.random() * 20) + 1;
            const roll2 = Math.floor(Math.random() * 20) + 1;
            const minRoll = Math.min(roll1, roll2);

            function enemyAttack(callback) {
                setTimeout(() => {
                    if (minRoll === 20) {
                        const damage = 2 * (Math.floor(Math.random() * 6) + 1);
                        let currentHP = Number(HPhero.textContent);
                        let newHP = Math.max(0, currentHP - damage);
                        HPhero.textContent = newHP;
                        checkLose();
                    } if (minRoll === 1) {
                        let currentHP = Number(HPenemyRed.textContent);
                        let newHP = Math.max(0, currentHP - 3);
                        HPhero.textContent = newHP;
                        checkLose();
                    } if (minRoll >= userKD) {
                        const damage = Math.floor(Math.random() * 6) + 1;
                        let currentHP = Number(HPhero.textContent);
                        let newHP = Math.max(0, currentHP - damage);
                        HPhero.textContent = newHP;
                        checkLose();
                    }
                    if (callback) callback();
                }, 1000);
            }
            enemyAttack()
            playerTurn = true;
            confuseUsed = false;
            enemyAttackAnimation();
            playerTurnOptions();
            document.getElementById("confuseEnemy").disabled = false;
        }, 1000);
    });


    // ========================== АНІМАЦІЯ АТАКИ ГЕРОЯ ==========================
    function heroAttackAnimation() {
        const hero = document.getElementById("hero");
        hero.classList.add("hero-attacking");

        setTimeout(() => {
            hero.classList.remove("hero-attacking");
        }, 1000); // Тривалість анімації
    }

    // ========================== АНІМАЦІЯ АТАКИ ВОРОГА ==========================
    function enemyAttackAnimation() {
        const enemy = document.getElementById("rat");
        enemy.classList.add("enemy-attacking");

        setTimeout(() => {
            enemy.classList.remove("enemy-attacking");
        }, 1000); // Тривалість анімації
    }

    // ========================== ЛОГІКА ХОДУ ГРАВЦЯ ==========================
    function endPlayerTurn() {
        playerTurn = false;
        setTimeout(() => {
            // Після того, як гравець завершить хід, запускається хід ворога
            enemyAttack(() => {
                playerTurn = true;
                enemyAttackAnimation()
            });
        }, 1000);
    }

    // ========================== ВИКЛИК МОДАЛЬНИХ ВІКОН ==========================
    const actionModal = document.getElementById("actionModal");
    const inventoryModal = document.getElementById("inventoryModal");

    document.getElementById("another__action").addEventListener("click", function () {
        actionModal.classList.remove("hidden");
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

        // Якщо гравець не може діяти, пропускаємо
        document.getElementById("defend").disabled = false;
        document.getElementById("heal").disabled = false;
        document.getElementById("attack").disabled = false;
    }

    playerTurnOptions();
});  