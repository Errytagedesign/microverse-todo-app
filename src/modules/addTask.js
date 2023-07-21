// Function to add a new task
const createTask = (inputList, toDoList) => {
  // Create a new task object
  const inputValue = inputList.value.trim();
  const newTask = {
    description: inputValue,
    completed: false,
    index: toDoList.length + 1,
  };

  // Add the new task to the array
  toDoList.push(newTask);

  inputList.value = '';
};

module.exports = { createTask };
