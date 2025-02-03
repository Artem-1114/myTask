const taskInput = document.getElementById('inputTask');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Завантаження задач при старті
document.addEventListener('DOMContentLoaded', loadTasks);

const addTask = () => {
    const taskText = taskInput.value.trim();// забираю пробіли
    if (taskText === '') return;

    const taskItem = createTaskElement(taskText);// Створюємо елемент задачі
    taskList.appendChild(taskItem);// Додаємо елемент задачі до списку


    saveTasks(); // Зберігаємо задачі у localStorage
    taskInput.value = '';// очистка поля
};

addTaskBtn.addEventListener('click', addTask);


taskInput.addEventListener('keydown', (event) => {// при натискані ентер виконуєтся функія addTask
    if (event.key === 'Enter') {
        addTask();
    }
});


const createTaskElement = (text) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    taskItem.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    taskItem.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            taskItem.classList.toggle('completed');
            saveTasks();
        }
    });

    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        taskList.removeChild(taskItem);
        saveTasks(); // Оновлюємо localStorage після видалення
    });

    return taskItem;
};


const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        JSON.parse(storedTasks).forEach(task => {
            const taskItem = createTaskElement(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }
}



  