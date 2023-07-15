/* eslint-disable no-plusplus */
import './index.css';

import {
  createTask,
  updateIndexes,
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
