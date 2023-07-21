const { handleCompleteTask } = require('./updateTask');
const { editTaskDescription } = require('./editTask');
const { saveToLocalStorage } = require('./saveToLocalstorage');

// Function to update the indexes of tasks
const updateIndexes = (toDoList) => {
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < toDoList.length; i++) {
    toDoList[i].index = i + 1;
  }
};

// Function to delete a task
const deleteTask = (toDoList, index) => {
  // Remove the task at the specified index
  toDoList.splice(index, 1);
};

// Render Task to window
const renderTask = () => {
  const displayList = document.querySelector('.todoList');

  const storedTasks = JSON.parse(localStorage.getItem('toDoList'));

  if (storedTasks && storedTasks.length > 0) {
    const showTask = storedTasks.map(
      (task) => ` <li  class="todos">
        <div id="${task.index}" class="check-div design">
        <input class="completeTask" type="checkbox" id="${task.index}"
        name="list${task.description}" value="list"
        ${task.completed ? 'checked' : ''}  />
        <label for="list${task.description}">${task.description}</label>
        </div>
        <div class="toggleIcon">
        <i id="${task.index}" class="fas fa-edit hideEdit"></i>
        <i id="${task.index}"  class="fa-solid fa-trash-can hideDelete"></i>
        <i id="${task.index}" class="fa-solid fa-ellipsis-vertical toggle"></i>
        </div>
      </li>

          `,
    );
    displayList.innerHTML = showTask.join('');

    const moreBtn = document.querySelectorAll('.toggle');
    const deleteIcon = document.querySelectorAll('.hideDelete');
    const editIcon = document.querySelectorAll('.hideEdit');
    const completeTasks = document.querySelectorAll('.completeTask');

    completeTasks.forEach((task) => {
      // Attach event listeners to all checkboxes
      task.addEventListener('change', () => {
        // eslint-disable-next-line no-use-before-define
        completeTask(task.id, task);
      });
    });

    const toggleMore = (e) => {
      if (e.target) {
        deleteIcon.forEach((del) => {
          if (del.id === e.target.id) {
            del.classList.toggle('showDelete');
          }
        });
        editIcon.forEach((edit) => {
          if (edit.id === e.target.id) {
            edit.classList.toggle('showEdit');
          }
        });
      }
    };
    moreBtn.forEach((more) => {
      more.addEventListener('click', toggleMore);
    });

    deleteIcon.forEach((icon) => {
      icon.addEventListener('click', () => {
        // eslint-disable-next-line no-use-before-define
        handleDelete(icon.id, storedTasks);
      });
    });

    editIcon.forEach((icon) => {
      icon.addEventListener('click', () => {
        // eslint-disable-next-line no-use-before-define
        handleEdit(icon.id, storedTasks);
      });
    });
  }
};

const handleDelete = (id, store) => {
  const taskId = parseInt(id, 10);

  // Find the index of the task with the matching ID
  const taskIndex = store.findIndex((task) => task.index === taskId);

  if (taskIndex !== -1) {
    deleteTask(store, taskIndex);
  }
  updateIndexes(store);
  saveToLocalStorage(store);
  renderTask();
};

const completeTask = (id, task) => {
  handleCompleteTask(id, task);
};

const handleEdit = (id, store) => {
  const updateTaskByIndex = parseInt(id, 10);

  const findTaskToUpdate = store.find((tod) => tod.index === updateTaskByIndex);

  if (findTaskToUpdate) {
    const newIndex = findTaskToUpdate.index;

    const newUpdate = document.querySelector('.editTasks');

    newUpdate.innerHTML = `
      <div class="addTaskInput">
        <input type="text" class="taskInputNew" placeholder="Edit your task" value="${findTaskToUpdate.description}" />
        <i class="fa-solid fa-arrows-rotate showEditmyTask"></i>
        <i class="fa-sharp fa-solid fa-xmark cancel"></i>
      </div>
    `;

    const taskInputNew = document.querySelector('.taskInputNew');
    const showEditmyTask = document.querySelector('.showEditmyTask');
    const cancel = document.querySelector('.cancel');

    const updateIt = () => {
      const newDescription = taskInputNew.value;
      editTaskDescription(store, newIndex, newDescription);
      renderTask();
    };

    const resetUpdate = () => {
      newUpdate.innerHTML = ''; // Remove the updated task input field and button
    };

    showEditmyTask.addEventListener('click', updateIt);
    cancel.addEventListener('click', resetUpdate);
  }
};

module.exports = {
  deleteTask,
  updateIndexes,
  renderTask,
  saveToLocalStorage,
  handleEdit,
};
