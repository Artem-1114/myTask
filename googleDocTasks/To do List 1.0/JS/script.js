const taskInput = document.getElementById('inputTask');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');// викликаємо елемент з HTML

const priorityButtons = document.querySelectorAll('#taskPriority button');
let selectedPriority = 'important'; // Значення за замовчуванням


priorityButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedPriority = button.value;
        
        priorityButtons.forEach(btn => btn.classList.remove('active'));// Видаляємо активний стиль у всіх кнопок

        button.classList.add('active'); // Додаємо активний стиль до вибраної кнопки

    });
});

const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = createTaskElement(taskText, selectedPriority);
    taskList.appendChild(taskItem);

    saveTasks();
    sortTasks(); // Сортуємо задачі після додавання нової
    taskInput.value = '';
};

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

const createTaskElement = (text, priority) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task', priority);

    taskItem.innerHTML = `      
            <span>${text} <small>&nbsp;&nbsp;&nbsp;&nbsp;(${getPriorityLabel(priority)})</small></span>
            <button class="delete-btn">Delete</button>
    `;

    taskItem.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            taskItem.classList.toggle('completed');
            saveTasks();
            sortTasks(); // Сортуємо задачі після зміни статусу
        }
    });

    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        taskList.removeChild(taskItem);
        saveTasks();
        sortTasks(); // Сортуємо задачі після видалення
    });

    return taskItem;
};

const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        const textNode = task.querySelector('span').firstChild.textContent.trim(); // Беремо лише основний текст без пріоритету
        tasks.push({
            text: textNode,
            priority: task.classList[1],
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        JSON.parse(storedTasks).forEach(task => {
            const taskItem = createTaskElement(task.text, task.priority);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
        sortTasks(); // Сортуємо задачі після завантаження
    }
}

const getPriorityLabel = (priority) => {
    switch (priority) {
        case 'important': return 'Важливо';
        case 'can-wait': return 'Можуть почекати';
        case 'someday': return 'Колись на потім';
        default: return '';
    }
};

const sortTasks = () => {
    const tasks = Array.from(taskList.querySelectorAll('.task'));

    tasks.sort((a, b) => {
        const aCompleted = a.classList.contains('completed');
        const bCompleted = b.classList.contains('completed');

       
        if (aCompleted && !bCompleted) return 1;
        if (!aCompleted && bCompleted) return -1; // Спочатку сортуємо за статусом виконані не виконані

       
        const priorityOrder = { 'important': 1, 'can-wait': 2, 'someday': 3 };// сортуваня за пріорітетом
        const aPriority = priorityOrder[a.classList[1]];
        const bPriority = priorityOrder[b.classList[1]]; 

        return aPriority - bPriority;
    });

    
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));// Очищаємо список і додаємо відсортовані задачі
}


document.addEventListener('DOMContentLoaded', loadTasks);