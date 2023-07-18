/* eslint-disable no-plusplus */
import './index.css';
import { clearCompletedTask } from './modules/updateTask';
import {
  createTask,
  updateIndexes,
  renderTask,
  saveToLocalStorage,
} from './modules/addTodoTask.js';

const addTask = document.querySelector('.addTask');
const clearTask = document.querySelector('.clear');

addTask.addEventListener('click', () => {
  createTask();
  saveToLocalStorage();
  renderTask();
  updateIndexes();
});

clearTask.addEventListener('click', () => {
  clearCompletedTask();
  renderTask();
});

window.addEventListener('DOMContentLoaded', renderTask);
