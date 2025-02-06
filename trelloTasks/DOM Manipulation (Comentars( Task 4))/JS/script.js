const commentText = document.getElementById('comment-text');
const submitButton = document.getElementById('submit-comment');
const commentsContainer = document.getElementById('comments-container');

document.addEventListener('DOMContentLoaded', loadCommentsFromLocalStorage);// Завантажуємо коментарі з LocalStorage при завантаженні сторінки

submitButton.addEventListener('click', () => {
    const text = commentText.value.trim();
    if (text) {
        const commentId = Date.now().toString(); // Унікальний ID
        addComment(text, commentId, null); // null означає, що це головний коментар
        commentText.value = '';
    }
});

function addComment(text, id, parentId) {
    const comment = createCommentElement(text, id, parentId);// створюю нові елементи в html

    if (parentId) {
        let parentComment = document.querySelector(`[data-id="${parentId}"]`);// знахожу батьківський коментар
        let replyContainer = parentComment.querySelector('.reply-container');
        if (!replyContainer) {
            replyContainer = document.createElement('div');
            replyContainer.classList.add('reply-container');
            parentComment.appendChild(replyContainer);
        }
        replyContainer.appendChild(comment);// додаю його в батьківський коментар
    } else {
        commentsContainer.appendChild(comment);// головинй коментар додаю його в контейнер
    }

    saveCommentsToLocalStorage();
}

function createCommentElement(text, id, parentId) {// створюю нові елементи в html
    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.setAttribute('data-id', id);// унікальний ID щоб знати що це за коментар
    if (parentId) {
        comment.setAttribute('data-parent-id', parentId);
    }

    comment.innerHTML = `
        <div class="comment-header">
            <span class="author">Автор: Анонім</span>
            <span class="time">${new Date().toLocaleString()}</span>
        </div>
        <div class="comment-body">${text}</div>
        <button class="reply-button">Відповісти</button>
        <button class="delete-button">Видалити</button>
    `;

    return comment;
}


commentsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('reply-button')) {
        const parentComment = event.target.closest('.comment');// знахожу батьківський коментар
        const parentId = parentComment.getAttribute('data-id');// знахожу идентифікатор батьківського коментаря
        const replyText = prompt('Введіть відповідь:');// запитую відповідь
        if (replyText) {
            const replyId = Date.now().toString();
            addComment(replyText, replyId, parentId);// якщо вона є додаю коментар
        }
    }

    if (event.target.classList.contains('delete-button')) {
        const commentToDelete = event.target.closest('.comment');
        const commentId = commentToDelete.getAttribute('data-id');
        commentToDelete.remove();
        deleteCommentFromLocalStorage(commentId);// логіка така сама тільки не додаю комент а видаляю його
    }
});

function saveCommentsToLocalStorage() {
    const comments = document.querySelectorAll('.comment');// всі коментарі
    const commentData = Array.from(comments).map(comment => ({
        id: comment.getAttribute('data-id'),
        parentId: comment.getAttribute('data-parent-id') || null,
        text: comment.querySelector('.comment-body').textContent,
    }));// перетворюю їх у масив
    localStorage.setItem('comments', JSON.stringify(commentData));// зберігаю у LocalStorage
}

function deleteCommentFromLocalStorage(commentId) {
    let commentData = JSON.parse(localStorage.getItem('comments')) || [];
    commentData = commentData.filter(comment => comment.id !== commentId && comment.parentId !== commentId);
    localStorage.setItem('comments', JSON.stringify(commentData));
}

function loadCommentsFromLocalStorage() {
    const commentData = JSON.parse(localStorage.getItem('comments')) || [];
    const commentMap = {};

    // Спочатку створюємо всі коментарі
    commentData.forEach(comment => {
        commentMap[comment.id] = createCommentElement(comment.text, comment.id, comment.parentId);
    });

    // Додаємо коментарі у відповідні місця
    commentData.forEach(comment => {
        const newComment = commentMap[comment.id];
        if (comment.parentId) {
            let parentComment = commentMap[comment.parentId];
            let replyContainer = parentComment.querySelector('.reply-container');
            if (!replyContainer) {
                replyContainer = document.createElement('div');
                replyContainer.classList.add('reply-container');
                parentComment.appendChild(replyContainer);
            }
            replyContainer.appendChild(newComment);
        } else {
            commentsContainer.appendChild(newComment);
        }
    });
}// тут просто їх треба розкрити у правильному порядку


    


