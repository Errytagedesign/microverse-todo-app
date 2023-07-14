/* eslint-disable no-plusplus */
import './index.css';

import {
  createTask,
  updateIndexes,
  editTaskDescription,
  loadFromLocalStorage,
  handleEdit,
  renderTask,
  saveToLocalStorage,
} from './modules/addTodoTask.js';

const addTask = document.querySelector('.addTask');

addTask.addEventListener('click', () => {
  createTask();
  saveToLocalStorage();
  renderTask();
  updateIndexes();
});

window.addEventListener('DOMContentLoaded', renderTask);

{
  /* <div class='addTaskInput'>
  <input type='text' class='taskInput' placeholder='Add your list' />
  <i class='fa-solid fa-arrow-turn-down fa-rotate-90 addTask'></i>
</div>; */
}
