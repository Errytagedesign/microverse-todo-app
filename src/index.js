/* eslint-disable no-plusplus */
import './index.css';

import {
  createTask,
  updateIndexes,
  renderTask,
  saveToLocalStorage,
} from './modules/addTodoTask.js';
import handleCompleteTask from './modules/updateTask';

const addTask = document.querySelector('.addTask');

addTask.addEventListener('click', () => {
  createTask();
  saveToLocalStorage();
  renderTask();
  updateIndexes();
});

window.addEventListener('DOMContentLoaded', renderTask);

// window.addEventListener('DOMContentLoaded', () => {
//   const taskContainer = document.querySelector('.todoList');

//   taskContainer.addEventListener('change', (event) => {
//     const check = event.target;
//     if (check.classList.contains('completeTask')) {
//       handleCompleteTask(check.id, check);
//     }
//   });
// });
