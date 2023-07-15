export const handleCompleteTask = (id, check) => {
  // const taskId = id;
  // if (taskId) {
  //   let storedTasks = JSON.parse(localStorage.getItem('toDoList'));

  //   const taskIndex = storedTasks.findIndex((task) => task.index === taskId);

  //   if (taskIndex !== -1) {
  //     storedTasks = storedTasks.map((task, index) => {
  //       if (index === taskIndex) {
  //         return {
  //           ...task,
  //           completed: check.checked,
  //         };
  //       }
  //       return task;
  //     });

  //     localStorage.setItem('toDoList', JSON.stringify(storedTasks));
  //   }
  // }
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
