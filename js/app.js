let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')



let postBox = [];

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            console.log(postBox)
            //    console.log(data)
            postBox = data
            renderUI(postBox)
        })


}

getPosts();

postForm.addEventListener('submit', createPost)


function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox.unshift(data);
            console.log(postBox)
            let postHolder = '';
            postBox.forEach(post => {
                postHolder += `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="card__header">
                                <img src="https://www.brown.edu/sites/default/files/styles/wide_xsml/public/2019-11/image2.jpg?itok=bYYj2sp3" alt="card__image" class="card__image">
                            </div>
                            <div class="card__body">
                                <h4 id="post-title">${post.title}</h4>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-success" id="view-btn" onclick="openSingle(${post.id}>View</button>
                                    <button class="btn btn-primary" onclick="updatePost(${post.id})">Update</button>
                                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            });
            postWrapper.innerHTML = postHolder;
        })
}

function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTitles = document.querySelectorAll('.post-title') // 100 post titles [0 -99]
            let postBodies = document.querySelectorAll('.post-body')
            console.log(postTitles)
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })

        });
}


function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'single.html'
            // console.log(data)
        });
}

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox = postBox.filter(post => post.id !== id)
            console.log(postBox)
            // use a function to display the UI
            renderUI(postBox)  
        })

}

function renderUI (arr) {
    let postHolder = '';
            arr.forEach(post => {
                postHolder += `
                <div class="col-md-12 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="card__header">
                                <img src="https://preview.colorlib.com/theme/knowledge/images/ximg_bg_3.jpg.pagespeed.ic.AbwJPYmGOW.webp" alt="card__image" class="card__image rounded" >
                            </div>
                            <div class="card__body mt-2">
                                <h4 id="post-title">${post.title}</h4>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex">
                                    <button class="btn btn-success me-2" id="view-btn" onclick="openSingle(${post.id})">Read More <span><i class="bi bi-eye"></i></span></button>
                                    <button class="btn btn-primary me-2" onclick="updatePost(${post.id})">Update <span><i class="bi bi-pen"></i></span></button>
                                    <button class="btn btn-danger ms-auto" onclick="deletePost(${post.id})">Delete <span><i class="bi bi-trash3"></i></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            });
            postWrapper.innerHTML = postHolder;

}