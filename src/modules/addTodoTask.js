// class TodoTask {
//   constructor(task, index = toDoList.length, description = false) {
//     this.task = task;
//     this.index = index;
//     this.description = description;
//   }

const { indexOf } = require('lodash');

//   saveTasks = () => {
//     const inputList = document.querySelector('.taskInput');
//     const inputValue = inputList.value.trim();
//     if (inputValue) {
//       const pushVal = new TodoTask(inputValue, toDoList.length, false);
//       toDoList.push(pushVal);
//       inputList.value = '';
//       this.saveToLocalStorage();
//     }
//   };

//   addTasks = () => {
//     displayList.innerHTML = '';
//     for (let i = 0; i < toDoList.length; i += 1) {
//       displayList.innerHTML += `

//           <div  class="todos">
//             <div class="check-div design">
//               <input type="checkbox" id="${toDoList[i].index}" name="list${toDoList[i]}" value="list" />
//               <label for="list${toDoList[i]}">${toDoList[i].task}</label>
//             </div>
//             <div class="toggleIcon">
//             <i id="${toDoList[i].index}"  class="fa-solid fa-trash-can hideDelete"></i>
//               <i class="fa-solid fa-ellipsis-vertical toggle" data-index="${i}"></i>
//             </div>
//           </div>

//       `;
//     }
//   };

//   removeTask = (index) => {
//     toDoList.splice(index, 1);
//     this.updateIndexes();
//     this.saveToLocalStorage();
//     this.addTasks();
//     this.loadFromLocalStorage();
//   };

//   updateIndexes = () => {
//     for (let i = 0; i < toDoList.length; i += 1) {
//       toDoList[i].index = i;
//     }
//   };

//   saveToLocalStorage = () => {
//     localStorage.setItem('toDoList', JSON.stringify(toDoList));
//   };

//   loadFromLocalStorage = () => {
//     const toDoListJson = localStorage.getItem('toDoList');
//     if (toDoListJson) {
//       toDoList = JSON.parse(toDoListJson);
//     }
//   };
// }

// export default TodoTask;

const displayList = document.querySelector('.todoList');

// Initialize the to-do list array
let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

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

// Function to edit a task description
const editTaskDescription = (index, newDescription) => {
  // Update the description of the task at the specified index
  toDoList[index].task = newDescription;

  // Save changes to local storage
  saveToLocalStorage();
};

// Function to update the indexes of tasks
const updateIndexes = () => {
  for (let i = 0; i < toDoList.length; i++) {
    console.log(i);
    toDoList[i].index = i;
  }
};

// Function to save changes to local storage
const saveToLocalStorage = () => {
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
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
     <i id="${task.index}"  class="fa-solid fa-trash-can hideDelete"></i>
     <i id="${task.index}" class="fa-solid fa-ellipsis-vertical toggle"></i>
            </div>
          </div>

          `,
    );
    displayList.innerHTML = showTask.join('');

    const moreBtn = document.querySelectorAll('.toggle');
    const deleteIcon = document.querySelectorAll('.hideDelete');
    const here = (e) => {
      if (e.target) {
        deleteIcon.forEach((ic) => {
          if (ic.id === e.target.id) {
            ic.classList.toggle('showDelete');
          }
        });
      }
    };
    moreBtn.forEach((more) => {
      more.addEventListener('click', here);
    });

    const handleDelete = (e) => {
      const taskId = parseInt(e.target.id);

      // Find the index of the task with the matching ID
      const taskIndex = toDoList.findIndex((task) => task.index === taskId);

      if (taskIndex !== -1) {
        deleteTask(taskIndex);
      }
    };

    deleteIcon.forEach((icon) => {
      icon.addEventListener('click', handleDelete);
    });
  }
};

// const toggleDele =() => {
//   const moreIcon = document.querySelectorAll('.toggleIcon');
//   if (moreIcon) {
//     moreIcon.forEach((more) => {
//       const toggleDele = more.querySelector('.toggle');
//       const deleteIcon = more.querySelector('.hideDelete');
//       toggleDele.addEventListener('click', () => {
//         deleteIcon.classList.toggle('showDelete');
//       });

//       deleteIcon.addEventListener('click', (e) => {
//         console.log(e.target.id);
//         deleteTask(e.target.id);
//       });
//     });
//   }
// }

// // Example usage
// loadFromLocalStorage(); // Load tasks from local storage

// addTask('Task 1');
// addTask('Task 2');
// addTask('Task 3');
// console.log(toDoList);

// deleteTask(1);
// console.log(toDoList);

// editTaskDescription(0, 'Updated Task 1');
// console.log(toDoList);

module.exports = {
  createTask,
  deleteTask,
  updateIndexes,
  editTaskDescription,
  loadFromLocalStorage,
  renderTask,
  saveToLocalStorage,
};
