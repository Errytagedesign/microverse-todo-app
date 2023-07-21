const { saveToLocalStorage } = require('./saveToLocalstorage');

// Function to edit a task description
const editTaskDescription = (toDoList, taskId, newDescription) => {
  const taskToUpdate = toDoList.find((task) => task.index === taskId);

  if (taskToUpdate) {
    taskToUpdate.description = newDescription;
    saveToLocalStorage(toDoList);
  }
};

module.exports = { editTaskDescription };
