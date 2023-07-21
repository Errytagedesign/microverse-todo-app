const { editTaskDescription } = require('../modules/editTask');
const {
  handleCompleteTask,
  clearCompletedTask,
} = require('../modules/updateTask');

// Describe block for handleCompleteTask function
describe('editTaskDescription function', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should update the task description in localStorage', () => {
    // Mock data
    const taskId = 1;
    const initialTask = {
      index: 1,
      description: 'Initial description',
    };
    localStorage.setItem('toDoList', JSON.stringify([initialTask]));

    // Get the updated data from localStorage
    const stored = JSON.parse(localStorage.getItem('toDoList'));

    // Call the function
    editTaskDescription(stored, taskId, 'Update descriptions');

    // Get the updated data from localStorage
    const updatedTasks = JSON.parse(localStorage.getItem('toDoList'));

    // Assertion
    expect(updatedTasks).toEqual([
      { index: 1, description: 'Update descriptions' },
    ]);
  });
});

// Describe block for handleCompleteTask function
describe('handleCompleteTask function', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should update the "completed" status of a task in localStorage', () => {
    // Mock data
    const taskId = 1;
    const initialTask = {
      index: 1,
      description: 'Initial description',
      completed: false,
    };
    localStorage.setItem('toDoList', JSON.stringify([initialTask]));

    // Call the function
    handleCompleteTask('1', { checked: true });

    // Get the updated data from localStorage
    const updatedTasks = JSON.parse(localStorage.getItem('toDoList'));

    // Assertion
    expect(updatedTasks).toEqual([
      { index: 1, description: 'Initial description', completed: true },
    ]);
  });
});

// Describe block for clearCompletedTask function
describe('clearCompletedTask function', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should remove completed tasks from localStorage', () => {
    // Mock data
    const tasks = [
      { index: 1, description: 'Task 1', completed: true },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: true },
    ];
    localStorage.setItem('toDoList', JSON.stringify(tasks));

    // Call the function
    clearCompletedTask();

    // Get the updated data from localStorage
    const updatedTasks = JSON.parse(localStorage.getItem('toDoList'));

    // Assertion
    expect(updatedTasks).toEqual([
      { index: 2, description: 'Task 2', completed: false },
    ]);
  });

  test('should remove the task at the end of the array', () => {
    // Call the function to remove the last task
    deleteTask(taskStorage, taskStorage.length - 1);

    // Assertions
    expect(taskStorage).toEqual([
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ]);
  });
});
