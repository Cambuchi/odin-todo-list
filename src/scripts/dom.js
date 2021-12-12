//module to handle DOM manipulation of dynamic content
import TrashIcon from '../images/trash.png'

//populate group menu from the data
const populateGroups = (data) => {
    //target sidebar content
    const content = document.getElementById('sidebar-content');
    content.innerHTML = ''
    //create array of all group items
    let groups = Object.keys(data);
    //add each item into sidebar
    groups.forEach(group => {
        addGroup(data, group);
    });
};

//adds a single group into the sidebar based on title input
const addGroup = (data, title) => {
    //target sidebar content element
    const content = document.getElementById('sidebar-content');
    //create group item
    let group = document.createElement('div')
    group.classList = 'group-item'
    //create group name
    let groupText = document.createElement('span')
    groupText.classList = 'group-item-text'
    groupText.textContent = title
    //when group gets clicked, change the active group & populate tasks
    groupText.onclick = () => {
        populateTasks(data, title);
        group.classList.add('group-active')
        for (let sibling of group.parentNode.children) {
            if (sibling !== group) {
                sibling.classList.remove('project-active')
            };
        }
    }
    //create group trash icon
    let groupTrash = new Image();
    groupTrash.src = TrashIcon
    groupTrash.className = 'group-trash';
    //add group item into project content
    group.appendChild(groupText);
    group.appendChild(groupTrash);
    content.appendChild(group);
};

//DOM events for when a group is clicked, switches DOM to highlight that group
const clickGroupText = (element) => {
    let group;
    if (element == '') {
        return
    } else if (typeof element === 'string') {
        //element can be a string passed in, simulate clicking
        group = findActiveElement(element, '.group-item')
    } else {
        //element is the group sidebar main text inside a span being clicked, event trigger
        group = element.target.parentNode
    }
    group.classList.add('group-active');
    //remove style class for all siblings of that element
    for (let sibling of group.parentNode.children) {
        if (sibling !== group) {
            sibling.classList.remove('group-active')
        };
    }
    //make sure the edit button is available whenever there is an active group
    const tasksHeaderEditButton = document.getElementById('main-header-edit-btn');
    tasksHeaderEditButton.style.display = 'flex';
}

//DOM actions when trash icon in group section is clicked
const clickGroupTrash = (event) => {
    //element should be the trash icon in the group section, event trigger
    //if group is the current active group, wipe main tasks area
    let group = event.target.parentNode;
    if (group.classList.contains('group-active')) {
        blankProject();
    }
    group.remove();
}

//populate tasks based on current project
const populateTasks = (data, currentProject) => {
    if (currentProject == '') { return }
    //target tasks content
    const tasks = document.getElementById('main-content');
    const title = document.getElementById('main-header-title');
    const desc = document.getElementById('main-header-desc');

    //empty tasks content
    tasks.innerHTML = '';

    //populate the header with project info
    title.textContent = currentProject;
    desc.textContent = data[currentProject]['description'];

    //populate task content with tasks from data
    data[currentProject]['tasks'].forEach(task => {
        addTaskContent(task)
    });
};

//with a task object, create a task element and add it into tasks content
const addTaskContent = (taskData) => {
    //target content element
    const tasks = document.getElementById('main-content');

    //create task item
    let task = document.createElement('div');
    task.classList.add('task', taskData.priority);

    if (taskData.index == undefined) {
        task.id = document.getElementById('main-content').childElementCount
    } else {
        task.id = taskData.index;
    }

    //create main display line for each task
    let main = createTaskMain(taskData);

    //create sub task line (hidden description text that shows on popup)
    let sub = createTaskSub(taskData);

    //create the form for editing a task
    let form = createTaskForm(taskData);

    task.appendChild(main);
    task.appendChild(sub);
    task.append(form);

    tasks.appendChild(task);
};

//creates the main information element for the task item
const createTaskMain = (taskData) => {
    //create main task line
    let taskMain = document.createElement('div');
    taskMain.classList = 'task-main';
    //create task checkbox
    let checkbox = createTaskMainCheckbox(taskData);
    //create task main text
    let mainText = createTaskMainText(taskData);
    //create task date
    let date = createTaskMainDate(taskData);
    //create edit button
    let edit = createTaskMainEdit();
    //create delete button
    let trash = createTaskMainTrash();

    taskMain.appendChild(checkbox);
    taskMain.appendChild(mainText);
    taskMain.appendChild(date);
    taskMain.appendChild(edit);
    taskMain.appendChild(trash);

    return taskMain;
};

//creates the checkbox element for the main task display
const createTaskMainCheckbox = (taskData) => {
    let checkbox = document.createElement('div');
    checkbox.classList = 'task-main-checkbox';
    if (taskData.status == 'complete') {
        checkbox.classList.add('checked')
    }
    return checkbox;
};

//DOM actions to take when checkbox is clicked
const clickTaskMainCheckbox = (event) => {
    //element is the checkbox circle that is clicked
    let main = event.target.nextElementSibling
    // let index = taskMain.parentNode.id
    if (main.classList.contains('complete')) {
        event.target.classList.remove('checked')
        main.classList.remove('complete')
        main.classList.add('incomplete')
    } else if (main.classList.contains('incomplete')) {
        event.target.classList.add('checked')
        main.classList.add('complete')
        main.classList.remove('incomplete')
    }
};

//creates the main text element for the main task display
const createTaskMainText = (taskData) => {
    let taskMainText = document.createElement('div');
    taskMainText.textContent = taskData.main;
    taskMainText.classList.add('task-main-title', taskData.status);
    //clicking the main text reveals the sub element to display task details and if already open, hides it
    taskMainText.onclick = function() {
        if (taskMainText.parentNode.nextElementSibling.style.display == 'flex') {
            taskMainText.parentNode.nextElementSibling.style.display = 'none';
        } else {
            taskMainText.parentNode.nextElementSibling.style.display = 'flex';
        }
    }
    return taskMainText;
};

//creates the date element for the main task display
const createTaskMainDate = (taskData) => {
    let taskMainDate = document.createElement('div');
    taskMainDate.className = 'task-main-date';
    if (taskData.date == '') {
        taskMainDate.textContent = ''
    } else {
        const dt = new Date(taskData.date);
        const year = dt.getUTCFullYear()
        const month = dt.getUTCMonth() + 1
        const day = dt.getUTCDate()
        taskMainDate.textContent = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`
    }
    return taskMainDate
};

//create the edit element for the main task display
const createTaskMainEdit = () => {
    let edit = document.createElement('div');
    edit.textContent = '🖉';
    edit.className = 'task-main-edit';
    //when edit icon is clicked, reveal the edit form
    return edit
};

//DOM changes for when a task edit element is clicked, reveal the edit form and prepopulate it
const clickTaskMainEdit = (task, data) => {
    //element should be the task that had the task edit icon clicked
    //hide the main and detailed info elements and display the form
    changeTaskDisplay(task)

    //populate edit form with current task object taskData
    let current = document.getElementById('main-header-title').textContent;
    let taskData = data[current]['tasks'].find(({index}) => index == task.id)

    let formMainText = task.querySelector('.task-form-main')
    let formDescText = task.querySelector('.task-form-details')
    let formDate = task.querySelector('.task-form-date')
    let formPriority = task.querySelector('select')
    //format date to ISO format to prefill date picker value
    if (taskData.date == '') {
        formDate.value = new Date()
    } else {
        let date = new Date(taskData.date)
        let datestring = date.getFullYear().toString() 
                        + '-' 
                        + (date.getMonth()+1).toString().padStart(2, '0') 
                        + '-' 
                        + date.getDate().toString().padStart(2, '0');
        formDate.value = datestring
    }
    formMainText.value = taskData.main
    formDescText.value = taskData.detail
    formPriority.value = taskData.priority.toLowerCase()
};

//create the trash icon for the main task display
const createTaskMainTrash = () => {
    let trash = new Image();
    trash.src = TrashIcon
    trash.className = 'task-main-trash';
    return trash
};

//DOM manipulation for when the task main trash icon is clicked
const clickTaskMainTrash = (element) => {
    //element should be the clicked trash icon on individual task
    //target the entire task element for removal from DOM
    let parent = element.parentNode.parentNode; 
    parent.remove()
};

//create the sub information element for details on the task item
const createTaskSub = (taskData) => {
    //create sub task line (hidden description text that shows on popup)
    let taskSub = document.createElement('div');
    taskSub.className = 'task-sub';
    //create spacer for checkbox to align main and desc text
    let taskSubCheckboxSpace = document.createElement('div');
    taskSubCheckboxSpace.className = 'task-sub-checkbox-space';
    //create description text
    let taskSubDetail = document.createElement('div');
    taskSubDetail.textContent = taskData.detail;
    taskSubDetail.className = 'task-sub-detail';
    taskSub.appendChild(taskSubCheckboxSpace)
    taskSub.appendChild(taskSubDetail)
    
    return taskSub;
};

//create the form element for editing/submitting new tasks
const createTaskForm = (taskData) => {
    //create the task form
    const taskForm = document.createElement('form');
    taskForm.classList = 'task-form';
    //create the top element with main text, date, and submit button
    let top = createTaskFormTop(taskData)
    //create the bottom element with details, priority, and cancel button
    let bottom = createTaskFormBottom(taskData)

    taskForm.appendChild(top);
    taskForm.appendChild(bottom);

    return taskForm;
};

//create the top bar in the task submit form
const createTaskFormTop = (taskData) => {
    //create the wrapper
    const top = document.createElement('div');
    top.classList = 'task-form-top';
    //create the main text task form field
    let main = createTaskFormMain(taskData)
    //create the date picker for the task form
    let date = createTaskFormDate(taskData)
    //create the submit button for the form
    let submitBtn = createTaskFormSubmitBtn()

    top.appendChild(main);
    top.appendChild(date);
    top.appendChild(submitBtn);

    return top
};

//create the main text input element for the task submit form
const createTaskFormMain = (taskData) => {
    const taskMain = document.createElement('input')
    taskMain.type = 'text';
    taskMain.classList = 'task-form-main';
    //if no task exists (submitting a new task), add placeholder text
    if (taskData == '') {
        taskMain.placeholder = 'To do item'
    }
    return taskMain;
};

//create the date picker element for the task submit form
const createTaskFormDate = (taskData) => {
    const taskDate = document.createElement('input');
    taskDate.type = 'date';
    taskDate.classList = 'task-form-date';
    taskDate.name = 'due';
    //if no task exists (submitting a new task), prefill default date to today
    if (taskData == '') {
        let date = new Date()
        let datestring = date.getFullYear().toString() 
                        + '-' 
                        + (date.getMonth()+1).toString().padStart(2, '0') 
                        + '-' 
                        + date.getDate().toString().padStart(2, '0');
        taskDate.value = datestring
    };

    return taskDate;
};

//create the submit button for the task submit form
const createTaskFormSubmitBtn = () => {
    const taskFormSubmit = document.createElement('button');
    taskFormSubmit.className = 'task-form-submit btn-submit form-btn';
    taskFormSubmit.textContent = 'Submit';
    taskFormSubmit.type = 'submit';

    return taskFormSubmit;
};

//DOM events when submit button on task edit/add form is clicked
const clickTaskFormSubmitBtn = (element) => {
    //element should be the submit button from a task item
    let parent = element.parentNode.parentNode.parentNode;
    changeTaskDisplay(parent);
};

//create the bottom bar in the task submit form
const createTaskFormBottom = (taskData) => {
    //create the wrapper
    const bottom = document.createElement('div');
    bottom.classList = 'task-form-bottom';
    //create the task detail input
    let details = createTaskFormDetails(taskData);
    //create the task priority selection element
    let priority = createTaskFormPriority()
    //create the task cancel button
    let cancelBtn = createTaskFormCancelBtn(taskData);

    bottom.appendChild(details);
    bottom.appendChild(priority);
    bottom.appendChild(cancelBtn);

    return bottom;
};

//create the task detail input for the task submit form
const createTaskFormDetails = (taskData) => {
    const taskDetail = document.createElement('input');
    taskDetail.type = 'text';
    taskDetail.classList = 'task-form-details';
    //if taskdata is empty (new task being submitted), prefill with placeholder text
    if (taskData == '') {
        taskDetail.placeholder = 'To do item details'
    }
    return taskDetail;
};

//create the priority selection element for the task submit form
const createTaskFormPriority = () => {
    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.classList = 'task-form-p-label';
    taskPriorityLabel.textContent = 'Priority :';
    const taskPrioritySelect = document.createElement('select');
    taskPrioritySelect.name = 'choice';
    taskPrioritySelect.class = 'task-form-select'
    const none = document.createElement('option');
    none.classList = 'task-form-option-none option'
    none.value = 'none';
    none.textContent = 'None';
    none.selected = true;
    const low = document.createElement('option');
    low.classList = 'task-form-option-low option'
    low.value = 'low';
    low.textContent = 'Low';
    const medium = document.createElement('option');
    medium.classList = 'task-form-option-medium option'
    medium.value = 'medium';
    medium.textContent = 'Medium';
    const high = document.createElement('option');
    high.classList = 'task-form-option-high option'
    high.value = 'high';
    high.textContent = 'High';

    taskPrioritySelect.appendChild(none);
    taskPrioritySelect.appendChild(low);
    taskPrioritySelect.appendChild(medium);
    taskPrioritySelect.appendChild(high);

    taskPriorityLabel.appendChild(taskPrioritySelect);
    return taskPriorityLabel;
};

//create the cancel button for the task submit form
const createTaskFormCancelBtn = () => {
    const taskFormCancelBtn = document.createElement('button');
    taskFormCancelBtn.className = 'task-form-cancel btn-cancel form-btn';
    taskFormCancelBtn.textContent = 'Cancel';
    taskFormCancelBtn.type = 'button';
    return taskFormCancelBtn;
};

//DOM events when the task form cancel button is clicked
const clickTaskFormCancelBtn = (task, taskArray) => {
    //element should be the cancel button inside the task submit/edit form.
    let index = task.id;
    if (taskArray[index] == undefined) {
        task.remove()
    } else {
        changeTaskDisplay(task)
    }
};

//DOM changes when add group button is clicked
const clickAddGroupBtn = () => {
    const modal = document.getElementById('modal')
    modal.style.display = 'flex'
}

//DOM changes when the either button in the modal is clicked
const clickModalFormBtn = () => {
    const modal = document.getElementById('modal')
    const modalForm = document.getElementById('modal-form')
    modalForm.reset()
    modal.style.display = 'none'
}

//switch the task display between main display and submit/edit display
const changeTaskDisplay = (parent) => {
    let main = parent.querySelector('.task-main')
    let sub = parent.querySelector('.task-sub')
    let form = parent.querySelector('.task-form')

    let currentStyle = getComputedStyle(main)

    if (currentStyle.getPropertyValue('display') === 'flex') {
        main.style.display = 'none'
        sub.style.display = 'none'
        form.style.display = 'flex'
    } else {
        main.style.display = 'flex'
        sub.style.display = 'none'
        form.style.display = 'none'
    }
};

//when no projects are selected or current projected is deleted, special DOM display
const blankProject = () => {
    //display info telling user that there is no project selected
    let taskTitle = document.getElementById('main-header-title')
    let taskDesc = document.getElementById('main-header-desc')
    let taskContent = document.getElementById('main-content')
    taskTitle.textContent = 'Select/Add a Group';
    taskDesc.textContent = 'No group is currently selected.'
    taskContent.innerHTML = ''
    //hide edit button since there is no project selected
    const tasksHeaderEditButton = document.getElementById('main-header-edit-btn')
    tasksHeaderEditButton.style.display = 'none'
    //remove all active groups
    let groups = document.getElementById('sidebar-content')
    for (let child of groups.children) {
        child.classList.remove('group-active')
    }
};

//return project element that matches current active project
const findActiveElement = (currentTitle, selector) => {
    const current = Array.from(document.querySelectorAll(selector))
                         .find(el => el.textContent.includes(currentTitle));
    return current
};

//DOM events when you click the Edit Group button in the header. reveals edit form
const clickMainHeaderEditBtn = () => {
    const mainHeaderDisplay = document.getElementById('main-header-display');
    const mainHeaderEditGroupForm = document.getElementById('main-group-form');
    let currentTitle = document.getElementById('main-header-title').textContent;
    let currentDetails = document.getElementById('main-header-desc').textContent;
    let editTitle = document.getElementById('main-group-form-title')
    let editDetails = document.getElementById('main-group-form-desc');

    //prefill the form with the current values
    editTitle.value = currentTitle;
    editDetails.value = currentDetails;
    
    mainHeaderDisplay.style.display = 'none';
    mainHeaderEditGroupForm.style.display = 'flex'
};

//DOM events when cancel button in the group edit header form is clicked
const clickMainHeaderFormCancel = () => {
    const mainHeaderDisplay = document.getElementById('main-header-display');
    const mainHeaderEditGroupForm = document.getElementById('main-group-form');
    mainHeaderDisplay.style.display = 'flex';
    mainHeaderEditGroupForm.style.display = 'none'
};

//DOM events for when a group edit form submit is successfully executed
const clickMainHeaderFormSubmit = () => {
    let currentTitle = document.getElementById('main-header-title')
    let currentDetails = document.getElementById('main-header-desc')
    let editTitle = document.getElementById('main-group-form-title')
    let editDetails = document.getElementById('main-group-form-desc');

    const currentActiveGroup = document.querySelector('.group-active')
    currentActiveGroup.textContent = editTitle.value;
    currentTitle.textContent = editTitle.value;
    currentDetails.textContent = editDetails.value;
};

//checks for validity for fields that are blank and pops up a custom invalid notification
const validityChecker = (element, text) => {
    if (text == '') {
        element.setCustomValidity('Please do not leave blank.');
        element.reportValidity();
        element.placeholder = 'Please do not leave blank.'
        return true
    }
};

const clickOption = (event) => {
    let task = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
    let highlightClass = event.target.textContent.toLowerCase();
    task.classList = 'task';
    task.classList.add(highlightClass)
};

function confirmation() { 
    let result = confirm("Are you sure about deleting that?");
    if (result) {
        return true;
    }
    return false;
}
    

export {
    populateGroups,
    addGroup,
    clickGroupText,
    clickGroupTrash,
    populateTasks,
    addTaskContent,
    clickTaskMainCheckbox,
    clickTaskMainEdit,
    clickTaskMainTrash,
    clickTaskFormSubmitBtn,
    clickTaskFormCancelBtn,
    clickAddGroupBtn,
    clickModalFormBtn,
    changeTaskDisplay,
    blankProject,
    findActiveElement,
    clickMainHeaderEditBtn,
    clickMainHeaderFormCancel,
    clickMainHeaderFormSubmit,
    validityChecker,
    clickOption,
    confirmation,
}
