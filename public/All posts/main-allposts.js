//jshint esversion: 6
$(document).ready(function () {
    getAllPosts().then(snapshot => {
        displayPosts(snapshot.val());
    });
});


function displayPosts(allPosts) {
    let postsDiv = $('.allposts')[0];
    allPosts.reverse();

    for (i = 0; i < 9; i++) {
        const post = allPosts[i];
        if (!post) {
            return;
        }

        const postContainer = document.createElement('div');
        postContainer.classList.add('container');
        postContainer.setAttribute('data-id', post.id);

        const paraTitle = document.createElement('p');
        paraTitle.classList.add('paraTitle');
        paraTitle.innerText = post.title;

        const paraContent = document.createElement('p');
        const fullText = post.content;
        paraContent.classList.add('paraContent');
        paraContent.innerText = post.content;

        const dateObj = new Date(post.creationDate);
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const newdate = year + "/" + month + "/" + day;
        const date = document.createElement('p');
        date.classList.add('date');
        date.innerHTML=newdate;
        postContainer.appendChild(date);
        
        if (paraContent.innerText.length > 100) {
            const shortText = paraContent.innerText.substring(0, 100);
            const showMoreButton = document.createElement('button');

            $(showMoreButton).addClass('showMoreButton');
            $(showMoreButton).addClass('expand');
            showMoreButton.innerText = 'Pokaż więcej';
            postContainer.appendChild(showMoreButton);

            paraContent.innerText = shortText;
            showMoreButton.addEventListener('click', event => {
                const button = event.target || event.srcElement;
                const shouldExpand = $(button).hasClass('expand');
                if (shouldExpand) {
                    paraContent.innerText = fullText;
                    button.innerText = 'Pokaż mniej';
                    $(button).removeClass('expand').addClass('contract');
                } else {
                    paraContent.innerText = shortText;
                    showMoreButton.innerText = 'Pokaż więcej';
                    $(button).removeClass('contract').addClass('expand');
                }
            });

        }
        const hr = document.createElement('HR');
        const editButton = document.createElement('i');

        editButton.classList.add('far', 'fa-edit', 'edit','hidden');

        const trashButton = document.createElement('i');
        trashButton.classList.add('fas', 'fa-trash-alt', 'trash', 'hidden');

        postContainer.appendChild(paraTitle);
        postContainer.appendChild(paraContent);
        postContainer.appendChild(editButton);
        postContainer.appendChild(trashButton);
        postContainer.appendChild(hr);
        postsDiv.appendChild(postContainer);

        trashButton.addEventListener('click', removePost);
        editButton.addEventListener('click', editPost);
    }

    //show more posts
    let morePosts = document.createElement('button');
    morePosts.innerText = 'Pokaż więcej postów';
    morePosts.classList.add('morePosts');
    postsDiv.appendChild(morePosts)
    morePosts.addEventListener('click', function () {

        for (i = 9; i < allPosts.length; i++) {
            const post = allPosts[i];
            const postContainer = document.createElement('div');
            postContainer.classList.add('container');
            postContainer.setAttribute('data-id', post.id);

            const paraTitle = document.createElement('p');
            paraTitle.classList.add('paraTitle');
            paraTitle.innerText = post.title;
            const paraContent = document.createElement('p');
            const fullText = post.content;
            paraContent.classList.add('paraContent');
            paraContent.innerText = post.content;

            if (paraContent.innerText.length > 100) {
                const shortText = paraContent.innerText.substring(0, 100);
                paraContent.innerText = shortText;
                let showMoreButton = document.createElement('button');
                showMoreButton.classList.add('showMoreButton');
                showMoreButton.innerText = 'Pokaż więcej';
                postContainer.appendChild(showMoreButton);
                showMoreButton.addEventListener('click', event => {
                    paraContent.innerText = fullText;
                    const button = event.target || event.srcElement;
                    button.innerText = 'Pokaż mniej';
                    showMoreButton.addEventListener('click', function () {
                        paraContent.innerText = shortText;
                    });
                });
            }

            const hr = document.createElement('HR');

            const editButton = document.createElement('i');
            editButton.classList.add('far', 'fa-edit', 'edit');

            const trashButton = document.createElement('i');
            trashButton.classList.add('fas', 'fa-trash-alt', 'trash');

            postContainer.appendChild(paraTitle);
            postContainer.appendChild(paraContent);
            postContainer.appendChild(editButton);
            postContainer.appendChild(trashButton);
            postContainer.appendChild(hr);
            postsDiv.appendChild(postContainer);

            trashButton.addEventListener('click', removePost);
            editButton.addEventListener('click', editPost);
        }
        morePosts.classList.add('hidden');
    });

    function removePost(event) {
        const button = event.target || event.srcElement;
        const post = button.closest('.container');
        const postId = parseInt($(post).attr('data-id'));
        etAllPosts().then(snapshot => {
            const filteredPosts = snapshot.val().filter(post => post.id !== postId);
            saveAllPosts(filteredPosts);
            post.remove();
        });

    }

    function editPost(event) {
        const button = event.target || event.srcElement;
        const post = button.closest('.container');
        const postId = parseInt($(post).attr('data-id'));

        const editTitleInput = document.createElement('textarea');
        const editContentInput = document.createElement('textarea');
        editTitleInput.classList.add('editTitleInput');
        editContentInput.classList.add('editContentInput');
        post.appendChild(editTitleInput);
        post.appendChild(editContentInput);
        let foundTitle = $(post).find('.paraTitle')[0];
        editTitleInput.value = foundTitle.innerText;
        let foundContent = $(post).find('.paraContent')[0];
        editContentInput.value = foundContent.innerText;
        const submitButton = document.createElement('button');
        submitButton.classList.add('submitButton');
        submitButton.innerText = 'Submit changes';
        post.appendChild(submitButton);

        foundContent.classList.add('hidden');
        foundTitle.classList.add('hidden');

        submitButton.addEventListener('click', function (event) {
            foundTitle.innerText = editTitleInput.value;
            foundContent.innerText = editContentInput.value;
            const allPosts = getAllPosts();
            const foundPost = allPosts.find(post => post.id === postId);
            foundPost.title = editTitleInput.value;
            foundPost.content = editContentInput.value;

            foundContent.classList.remove('hidden');
            foundTitle.classList.remove('hidden');

            saveAllPosts(allPosts);

            editTitleInput.remove();
            editContentInput.remove();
            submitButton.remove();
        });
    }
}

//Btn scroll up on allposts page
var btn = $('#button');

$('body').scroll(function () {
    if ($('body').scrollTop() > 200) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    console.log('click')
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});

