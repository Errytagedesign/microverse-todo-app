// Function to save changes to local storage
const saveToLocalStorage = (toDoList) => {
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
};

module.exports = { saveToLocalStorage };
