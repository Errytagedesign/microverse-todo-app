/* eslint-disable no-plusplus */
import './index.css';
import { clearCompletedTask } from './modules/updateTask';
import { updateIndexes, renderTask } from './modules/addTodoTask.js';
import { createTask } from './modules/addTask';
import { saveToLocalStorage } from './modules/saveToLocalstorage';

const addTask = document.querySelector('.addTask');
const clearTask = document.querySelector('.clear');
const inputList = document.querySelector('.taskInput');

// Initialize the to-do list array
const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

addTask.addEventListener('click', () => {
  createTask(inputList, toDoList);
  saveToLocalStorage(toDoList);
  renderTask();
  updateIndexes(toDoList);
});

clearTask.addEventListener('click', () => {
  clearCompletedTask();
  renderTask();
});

window.addEventListener('DOMContentLoaded', renderTask);
