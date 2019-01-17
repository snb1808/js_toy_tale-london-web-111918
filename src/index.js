document.addEventListener('DOMContentLoaded', loadCards)

function api() {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json());
};

function loadCards() {
  api().then(allToys => {
    allToys.forEach(toy => renderToy(toy));
  });
};

function renderToy(toy) {

  const collection = document.querySelector('#toy-collection');

  const toyCard = document.createElement('div');
  toyCard.className = 'card';

  const toyName = document.createElement('h2');
  toyName.innerText = toy.name;

  const toyImg = document.createElement('img');
  toyImg.src = toy.image;
  toyImg.className = 'toy-avatar';

  const likeNum = document.createElement('p');
  toy.likes === 1 ? likeNum.innerText = `${toy.likes} Like` : likeNum.innerText = `${toy.likes} Likes`;

  const likeBtn = document.createElement('button');
  likeBtn.className = 'like-button';
  likeBtn.innerText = "Like";

  likeBtn.addEventListener('click', () => addLike(toy))

  toyCard.append(toyName, toyImg, likeNum, likeBtn);

  collection.appendChild(toyCard);

};

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

const createBtn = document.querySelector('.submit')

createBtn.addEventListener('click', createNewToy)

function createNewToy(event) {
   const toyName = event.target.form[0].value;
   const toyImg = event.target.form[1].value;
   fetch('http://localhost:3000/toys', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
            name: toyName,
            image: toyImg,
            likes: 0
    })
  });
};

function addLike(toy) {
  toy.likes = toy.likes + 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({likes: toy.likes})
  }).then(location.reload());
};
