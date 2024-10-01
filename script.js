const postsContainer = document.getElementById('posts-container');

function addPost() {
    const postText = document.getElementById('post-text').value;
    const postImage = document.getElementById('post-image').files[0];
    
    if (!postText && !postImage) {
        alert('Por favor, agrega texto o una imagen.');
        return;
    }
    
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    let imageTag = '';
    if (postImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageTag = `<img src="${e.target.result}" alt="Imagen del post">`;
            newPost.innerHTML = `
                <p>${postText}</p>
                ${imageTag}
                <div class="actions">
                    <button onclick="likePost(this)">❤️ Me gusta</button>
                    <span class="like-count">0</span>
                    <button onclick="commentPost(this)">💬 Comentar</button>
                    <input type="text" class="comment-input" placeholder="Escribe un comentario...">
                </div>
                <div class="comments"></div>
            `;
            postsContainer.prepend(newPost);
        };
        reader.readAsDataURL(postImage);
    } else {
        newPost.innerHTML = `
            <p>${postText}</p>
            <div class="actions">
                <button onclick="likePost(this)">❤️ Me gusta</button>
                <span class="like-count">0</span>
                <button onclick="commentPost(this)">💬 Comentar</button>
                <input type="text" class="comment-input" placeholder="Escribe un comentario...">
            </div>
            <div class="comments"></div>
        `;
        postsContainer.prepend(newPost);
    }

    // Limpiar inputs
    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
}

function likePost(button) {
    const likeCount = button.nextElementSibling;
    let currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = ++currentLikes;
}

function commentPost(button) {
    const commentInput = button.nextElementSibling;
    const commentText = commentInput.value;
    const commentsContainer = button.parentElement.nextElementSibling;

    if (commentText) {
        const newComment = document.createElement('p');
        newComment.textContent = commentText;
        commentsContainer.appendChild(newComment);
        commentInput.value = '';
    }
}
