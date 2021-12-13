// module to handle all of the logic regarding the to do list data

// add a group to the data
const addGroup = (data, title, description) => {
  data[title] = { description, tasks: [] };
};

// delete group
const deleteGroup = (data, group) => {
  delete data[group];
};

// edit group title and name with provided new values
const editGroup = (data, newKey, oldKey, newDesc, oldDesc) => {
  // exit if provided values match
  if (oldKey === newKey && newDesc === oldDesc) {
    return true;
    // if only the description is different, update value in data
  } if (oldKey === newKey && newDesc !== oldDesc) {
    data[oldKey].description = newDesc;
    // if key if different, change group key and description
  } else if (oldKey !== newKey && data[oldKey] && !data[newKey]) {
    Object.defineProperty(
      data,
      newKey,
      Object.getOwnPropertyDescriptor(data, oldKey),
    );
    data[newKey].description = newDesc;
    delete data[oldKey];
  } else {
    // if key is different but currently exists in data, do nothing & console log reason
    return true;
  }
  return false;
};

// create a task item
const createTask = (main, detail, priority, date, status, index) => {
  let formattedDate = '';
  if (date !== '') {
    formattedDate = (new Date(date)).toLocaleDateString();
  }

  const task = {
    main,
    detail,
    priority,
    date: formattedDate,
    status,
    index,
  };
  return task;
};

// adds task into specified group
const addTask = (taskArray, task) => {
  taskArray.push(task);
};

// delete task with filter based on index of element clicked
const deleteTask = (group, index) => {
  group.tasks = group.tasks.filter((element) => element.index !== parseInt(index, 10));
};

// edit task object by replacing task with new one via splice
const editTask = (taskArray, newTask, index) => {
  taskArray.splice(index, 1, newTask);
};

// enumerates tasks to assign index number based on their order in the list
const renumberTasks = (taskArray) => {
  for (let i = 0; i < taskArray.length; i += 1) {
    taskArray[i].index = i;
  }
};

// sorts the tasks array in a group by date ascending
const sortDateAscending = (taskArray) => {
  taskArray.sort((a, b) => a.date - b.date);
};

// sorts the tasks array in a group by date descending
const sortDateDescending = (taskArray) => {
  taskArray.sort((a, b) => b.date - a.date);
};

// creates an array of tasks that match today's date
const todayArray = (data) => {
  const todaysTasks = [];

  let today = new Date();
  today = new Date(today.toLocaleDateString());
  // go through data, filtering out any tasks that fit the date criteria
  const arrays = Object.values(data);
  arrays.filter((v) => {
    v.tasks.filter((x) => {
      if (x.date === today) {
        todaysTasks.push(x);
      }
      return false;
    });
    return false;
  });
  return todaysTasks;
};

// creates an array of tasks that fall between today & next 7 days
const weeklyArray = (data) => {
  const weeklyTasks = [];
  // get beginning of today in unix epoch so that dates within today count
  let today = new Date();
  today = new Date(today.toLocaleDateString());
  today = today.getTime();
  // get unix epoch of seven days later
  let sevenDaysLater = new Date();
  sevenDaysLater = new Date(sevenDaysLater.toLocaleDateString());
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
  sevenDaysLater = sevenDaysLater.getTime();
  // go through data, filtering out any tasks that fit the date criteria
  const arrays = Object.values(data);
  arrays.filter((v) => {
    v.tasks.filter((x) => {
      const time = new Date(x.date).getTime();
      if (time >= today && time <= sevenDaysLater) {
        weeklyTasks.push(x);
      }
      return false;
    });
    return false;
  });
  return weeklyTasks;
};

// change the data of task.status when checkbox is clicked
const clickCheckbox = (task) => {
  if (task.status === 'incomplete') {
    task.status = 'complete';
  } else {
    task.status = 'incomplete';
  }
};

export {
  addGroup,
  deleteGroup,
  editGroup,
  createTask,
  addTask,
  deleteTask,
  editTask,
  renumberTasks,
  sortDateAscending,
  sortDateDescending,
  todayArray,
  weeklyArray,
  clickCheckbox,
};
