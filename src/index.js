/* eslint-disable no-plusplus */
import './index.css';

const displayList = document.querySelector('.todoList');

const toDoList = [
  { description: 'Read About Express.js', completed: false, index: 0 },
  { description: 'Clean the home office', completed: false, index: 1 },
  { description: 'Complete 1000 steps walk', completed: true, index: 2 },
];

const input = document.createElement('input');
input.placeholder = 'Add your list';
input.classList.add('input-design', 'design');
displayList.insertAdjacentElement('afterbegin', input);

for (let i = 0; i < toDoList.length; i++) {
  console.log(toDoList[i].index);
  displayList.innerHTML += `
 <div class="check-div design">
 <input type="checkbox" id="list${toDoList[i].index}" name="list${toDoList[i].description}" value="list">
 <label for="list${toDoList[i].description}">${toDoList[i].description}</label>
 </div>
 `;
}
const clear = document.createElement('p');
clear.textContent = 'Clear all Do list project';
clear.classList.add('clear');
displayList.insertAdjacentElement('beforeend', clear);
