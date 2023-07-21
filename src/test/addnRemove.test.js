const { createTask } = require('../modules/addTask');
const { deleteTask } = require('../modules/addTodoTask');

describe('createTask function', () => {
  let taskStorage;

  beforeEach(() => {
    taskStorage = [];
  });

  test('should add an item to taskStorage array', () => {
    // Mock data
    const itemToAdd = { description: 'Task 1', completed: false, index: 1 };
    // Mock the input element with a value
    const inputList = { value: 'Task 1' };

    // Call the function
    createTask(inputList, taskStorage);

    // Assertions
    expect(taskStorage).toEqual([itemToAdd]); // Check if the new task is added to the taskStorage array
  });

  test('should add multiple items to taskStorage array', () => {
    // Mock data
    const item1 = { description: 'Task 1', completed: false, index: 1 };
    const item2 = { description: 'Task 2', completed: false, index: 2 };
    const item3 = { description: 'Task 3', completed: false, index: 3 };
    const inputList1 = { value: 'Task 1' };
    const inputList2 = { value: 'Task 2' };
    const inputList3 = { value: 'Task 3' };

    // Call the function multiple times to add multiple tasks
    createTask(inputList1, taskStorage);
    createTask(inputList2, taskStorage);
    createTask(inputList3, taskStorage);

    // Assertions
    expect(taskStorage).toEqual([item1, item2, item3]);
    // Check if all tasks are added to the taskStorage array
  });

  test('should trim the input value before creating a task', () => {
    // Mock data
    const itemToAdd = { description: 'Task 1', completed: false, index: 1 };
    // Mock the input element with a value containing spaces
    const inputList = { value: '  Task 1  ' };

    // Call the function
    createTask(inputList, taskStorage);

    // Assertions
    expect(taskStorage).toEqual([itemToAdd]);
    // Check if the new task is added to the taskStorage array after trimming the input value
  });

  test('should clear the input value after creating a task', () => {
    // Mock data
    const inputList = { value: 'Task 1' };
    // Mock the input element with a value

    // Call the function
    createTask(inputList, taskStorage);

    // Assertions
    expect(inputList.value).toBe('');
    // Check if the input value is cleared after creating a task
  });
});

describe('deleteTask function', () => {
  let taskStorage;

  beforeEach(() => {
    // Initialize the taskStorage with some tasks
    const item1 = { description: 'Task 1', completed: false, index: 1 };
    const item2 = { description: 'Task 2', completed: false, index: 2 };
    const item3 = { description: 'Task 3', completed: false, index: 3 };
    taskStorage = [item1, item2, item3];
  });

  test('should remove the task at the specified index', () => {
    // Call the function to remove the task at index 1
    deleteTask(taskStorage, 1);

    // Assertions
    expect(taskStorage).toEqual([
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 3', completed: false, index: 3 },
    ]);
  });

  test('should remove the task at the beginning of the array', () => {
    // Call the function to remove the first task
    deleteTask(taskStorage, 0);

    // Assertions
    expect(taskStorage).toEqual([
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
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
