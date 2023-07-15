const displayList = document.querySelector('.todoList');

// Initialize the to-do list array
let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

// Function to update the indexes of tasks
const updateIndexes = () => {
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < toDoList.length; i++) {
    toDoList[i].index = i;
  }
};

// Function to delete a task
const deleteTask = (index) => {
  // Remove the task at the specified index
  toDoList.splice(index, 1);

  // Update the indexes of remaining tasks
  updateIndexes();

  // Save changes to local storage
  saveToLocalStorage();

  // Re-render task
  renderTask();
};

// Function to save changes to local storage
const saveToLocalStorage = () => {
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
};

// Function to edit a task description
const editTaskDescription = (index, newDescription) => {
  // Update the description of the task at the specified index
  toDoList[index].description = newDescription;

  // Save changes to local storage
  saveToLocalStorage();
};

// Load tasks from local storage (if available)
const loadFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('toDoList');
  if (storedTasks) {
    toDoList = JSON.parse(storedTasks);
  }
};

// Render Task to window
const renderTask = () => {
  const storedTasks = JSON.parse(localStorage.getItem('toDoList'));

  if (storedTasks && storedTasks.length > 0) {
    const showTask = storedTasks.map(
      (task) => ` <div  class="todos">
     <div class="check-div design">
        <input type="checkbox" id="${task.index}" name="list${task.description}" value="list" />
        <label for="list${task.description}">${task.description}</label>
        </div>
        <div class="toggleIcon">
        <i id="${task.index}" class="fas fa-edit hideEdit"></i>
        <i id="${task.index}"  class="fa-solid fa-trash-can hideDelete"></i>
        <i id="${task.index}" class="fa-solid fa-ellipsis-vertical toggle"></i>
        </div>
      </div>

          `,
    );
    displayList.innerHTML = showTask.join('');

    const moreBtn = document.querySelectorAll('.toggle');
    const deleteIcon = document.querySelectorAll('.hideDelete');
    const editIcon = document.querySelectorAll('.hideEdit');

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

    const handleDelete = (e) => {
      const taskId = parseInt(e.target.id, 10);

      // Find the index of the task with the matching ID
      const taskIndex = toDoList.findIndex((task) => task.index === taskId);

      if (taskIndex !== -1) {
        deleteTask(taskIndex);
      }
    };

    deleteIcon.forEach((icon) => {
      icon.addEventListener('click', handleDelete);
    });

    editIcon.forEach((icon) => {
      icon.addEventListener('click', handleEdit);
    });
  }
};

const handleEdit = (e) => {
  const updateTaskByIndex = parseInt(e.target.id, 10);
  const storedTasks = JSON.parse(localStorage.getItem('toDoList'));

  const findTaskToUpdate = storedTasks.find(
    (tod) => tod.index === updateTaskByIndex,
  );

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
      console.log(newDescription);
      editTaskDescription(newIndex, newDescription);
      renderTask();
    };

    const resetUpdate = () => {
      newUpdate.innerHTML = ''; // Remove the updated task input field and button
    };

    showEditmyTask.addEventListener('click', updateIt);
    cancel.addEventListener('click', resetUpdate);
  }
};

// Function to add a new task
const createTask = (task) => {
  // Create a new task object
  const inputList = document.querySelector('.taskInput');
  const inputValue = inputList.value.trim();
  const newTask = {
    task,
    description: inputValue,
    completed: false,
    index: toDoList.length,
  };

  // Add the new task to the array
  toDoList.push(newTask);

  // Save changes to local storage
  saveToLocalStorage();
  inputList.value = '';
  renderTask();
};

module.exports = {
  createTask,
  deleteTask,
  updateIndexes,
  editTaskDescription,
  loadFromLocalStorage,
  renderTask,
  saveToLocalStorage,
  handleEdit,
};
