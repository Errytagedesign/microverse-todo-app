/* eslint-disable no-plusplus */
import './index.css';

import {
  createTask,
  deleteTask,
  updateIndexes,
  editTaskDescription,
  loadFromLocalStorage,
  renderTask,
  saveToLocalStorage,
} from './modules/addTodoTask.js';

const addTask = document.querySelector('.addTask');
// const todo = new TodoTask();

// window.addEventListener('load', () => {
//   todo.loadFromLocalStorage();
//   todo.addTasks();
// });

addTask.addEventListener('click', () => {
  createTask();
  saveToLocalStorage();
  renderTask();
  updateIndexes();
});

window.addEventListener('DOMContentLoaded', renderTask);

// window.addEventListener('DOMContentLoaded', () => {
//   const moreIcon = document.querySelectorAll('.toggleIcon');

//   moreIcon.forEach((more) => {
//     const toggleDele = more.querySelector('.toggle');
//     const deleteIcon = more.querySelector('.hideDelete');
//     toggleDele.addEventListener('click', () => {
//       deleteIcon.classList.toggle('showDelete');
//     });

//     deleteIcon.addEventListener('click', (e) => {
//       console.log(e.target.id);
//       deleteTask(e.target.id);
//     });
//   });
// });
