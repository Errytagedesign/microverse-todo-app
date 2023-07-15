const handleCompleteTask = (id, check) => {
  const taskId = parseInt(id, 10);
  if (taskId) {
    let storedTasks = JSON.parse(localStorage.getItem('toDoList'));

    storedTasks = storedTasks.map((task) => {
      if (parseInt(task.index, 10) === taskId) {
        return {
          ...task,
          completed: check.checked,
        };
      }
      return task;
    });

    localStorage.setItem('toDoList', JSON.stringify(storedTasks));
  }
};

const clearCompletedTask = () => {
  const storedTasks = JSON.parse(localStorage.getItem('toDoList'));

  const completedTask = storedTasks.filter((task) => !task.completed);

  localStorage.setItem('toDoList', JSON.stringify(completedTask));
};

module.exports = { handleCompleteTask, clearCompletedTask };
