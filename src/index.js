import { formatDuration, intervalToDuration, format } from 'date-fns'
import './style.css';
import './modern-normalize.css';
import TrashIcon from './assets/trash.png'
import {initialize} from './initialize';

initialize();

const data = {
    "Project1 Name":{
        "description":"Project description 1",
        "tasks": [
            {
                "main": "make a default task",
                "detail": "decide on JSON format",
                "priority": "high",
                "date": "12/3/2021",
                "status": "complete",
                "index": 0,
            },
            {
                "main": "make another default task",
                "detail": "decide on JSON format",
                "priority": "medium",
                "date": "12/6/2021",
                "status": "incomplete",
                "index": 1,
            },
        ]
    },
    "Project2 Name":{
        "description":"Project description 2",
        "tasks": [
            {
                "main": "test JSON",
                "detail": "format design",
                "priority": "high",
                "date": "12/3/2021",
                "status": "incomplete",
                "index": 0,
            },
            {
                "main": "test JSON",
                "detail": "format design",
                "priority": "medium",
                "date": "12/6/2021",
                "status": "incomplete",
                "index": 1,
            },
            {
                "main": "test JSON3",
                "detail": "format design",
                "priority": "medium",
                "date": "12/6/2021",
                "status": "complete",
                "index": 2,
            }
        ]
    }
}

let currentProject = 'Project1 Name'

//module pattern containing all of the todo list data logic
const ToDoListLogic = (() => {
    //adds a project item into data
    const addProject = (data, title, description) => {
        data[title] = {"description": description, "tasks": [] }
    };

    //delete project
    const deleteProject = (data, project) => {
        delete data[project];
    }

    //edit project title and name with provided new values
    const editProject = (data, newKey, oldKey, newDesc, oldDesc) => {
        //exit if provided values match
        if (oldKey == newKey && newDesc == oldDesc) {
            return;
        //if only the description is different, update value in data
        } else if (oldKey == newKey && newDesc != oldDesc) {
            data[oldKey]['description'] = newDesc;
        //if key if different, change project key and description
        } else if (oldKey !== newKey && data[oldKey] && !data[newKey]) {
            Object.defineProperty(data, newKey,
                Object.getOwnPropertyDescriptor(data, oldKey));
            data[newKey]['description'] = newDesc
            delete data[oldKey];
        } else {
            //if key is different but currently exists in data, do nothing & console log reason
            console.log('New Project Title already exists in data. Cannot have duplicate projects.')
            return true
        }
    }

    //create a task item
    const createTask = (main, detail, priority, date, status, index) => {
        let task = {
            "main": main,
            "detail": detail,
            "priority": priority,
            "date": date,
            "status": status,
            "index": index,
        }
        return task
    }

    //adds task into specified project
    const addTask = (taskArray, task) => {
        taskArray.push(task);
    }

    //delete task based on index with filter
    const deleteTask = (taskArray, index) => {
        return taskArray.filter(element => {return element.index != index});
    }

    //edit task object by replacing task with new one via splice
    const editTask = (taskArray, newTask, index) => {
        taskArray.splice(index, 1, newTask);
    }

    //enumerates tasks to assign index number based on their order in the list
    const renumberTasks = (taskArray) => {
        for (let i = 0; i < taskArray.length; i++) {
            taskArray[i].index = i;
        }
    }

    return {
        addProject,
        deleteProject,
        editProject,
        createTask,
        addTask,
        deleteTask,
        editTask,
        renumberTasks,
    }
})();

//module pattern encapsulating all of the DOM manipulation methods
const ToDoListDOM = (() => {
    //populate Project menu
    const populateProjects = (data) => {
        //target projects content
        const content = document.getElementById('projects-content');
        content.innerHTML = ''
        //create array of all Project items
        let projects = Object.keys(data);
        //add each item into project sidebar
        projects.forEach(function (item) {
            addProjectContent(item);
            addProjectNameClick(item);
            addProjectTrashClick(item);
        });
    };

    //populate tasks based on current project
    const populateTasks = (data, currentProject) => {
        if (currentProject == '') {
            return
        }
        //target tasks content
        const tasks = document.getElementById('tasks-content');
        const title = document.getElementById('tasks-header-title');
        const desc = document.getElementById('tasks-header-desc')

        //empty tasks content
        tasks.innerHTML = '';

        //populate the header with project info
        title.textContent = currentProject;
        desc.textContent = data[currentProject]['description']

        //populate task content with tasks from data
        for (let i = 0; i < data[currentProject]['tasks'].length; i++) {
            let taskData = data[currentProject]['tasks'][i];
            addTaskContent(taskData)
        }
    }

    //return project element that matches current active project
    const findActiveElement = (currentTitle, selector) => {
        const current = Array.from(document.querySelectorAll(selector))
                             .find(el => el.textContent.includes(currentTitle));
        return current
    }

    //remove an element based on text search and selector query
    const removeActiveElement = (searchTerm, selector) => {
        const current = Array.from(document.querySelectorAll(selector))
                             .find(el => el.textContent.includes(searchTerm));
        current.remove()
    }

    //adds a single project into the sidebar based on title input
    const addProjectContent = (title) => {
        //target project content element
        const content = document.getElementById('projects-content');
        //create project item
        let project = document.createElement('div')
        project.classList = 'project-item'
        //create project name
        let projectText = document.createElement('span')
        projectText.classList = 'project-item-text'
        projectText.textContent = title
        //create project trash icon
        let trash = new Image();
        trash.src = TrashIcon
        trash.className = 'project-trash';
        //add project item into project content
        project.appendChild(projectText);
        project.appendChild(trash);
        content.appendChild(project);
    }
    
    //when a projects name is clicked, switches to that project's tasks & highlights as active
    const addProjectNameClick = (title) => {
        const current = findActiveElement(title, '.project-item-text');
        current.onclick = function() {
            populateTasks(data, title);
            changeActiveProject(title);
        }
    }

    //when project trash icon is clicked, delete that project from DOM & memory
    const addProjectTrashClick = (title) => {
        const currentText = findActiveElement(title, '.project-item-text');
        const currentTrash = currentText.nextElementSibling
        currentTrash.onclick = function() {
            const title = currentTrash.parentNode.textContent;
            ToDoList.deleteProject(title)
        }
    }

    const addTaskContent = (taskData) => {
        //target content element
        const tasks = document.getElementById('tasks-content');
        //create task item
        let task = document.createElement('div');
        task.classList.add('task', taskData.priority);
        task.id = taskData.index;
        //create main task line
        let main = document.createElement('div');
        main.classList = 'task-main';
        //create task checkbox
        let checkbox = document.createElement('div');
        checkbox.classList = 'checkbox';
        if (taskData.status == 'complete') {
            checkbox.classList.add('checked')
        }
        //create task main text
        let taskTitle = document.createElement('div');
        taskTitle.textContent = taskData.main;
        taskTitle.classList.add('task-title', taskData.status);
        addTaskDescDisplayClick(taskTitle);
        //create task date
        let date = document.createElement('div');
        date.textContent = taskData.date;
        date.className = 'task-date';
        //create edit button
        let edit = document.createElement('div');
        edit.textContent = '🖉';
        edit.className = 'task-edit';
        addTaskEditClick(edit)
        //create delete button
        let trash = new Image();
        trash.src = TrashIcon
        trash.className = 'task-trash';

        //create sub task line (hidden description text that shows on popup)
        let sub = document.createElement('div');
        sub.className = 'task-sub';
        //create spacer for checkbox to align main and desc text
        let checkboxSpace = document.createElement('div');
        checkboxSpace.className = 'checkbox-space';
        //create description text
        let taskDetail = document.createElement('div');
        taskDetail.textContent = taskData.detail;
        taskDetail.className = 'task-detail';

        //create the form for editing a task
        const taskForm = document.createElement('form');
        taskForm.classList = 'task-form';

        const upper = document.createElement('div');
        upper.classList = 'task-form-upper';
        const taskMain = document.createElement('input');
        taskMain.type = 'text';
        taskMain.classList = 'task-form-main';
        taskMain.required = true;
        const taskDate = document.createElement('input');
        taskDate.type = 'date';
        taskDate.classList = 'task-form-date';
        taskDate.name = 'due';
        const taskFormSubmit = document.createElement('button');
        taskFormSubmit.className = 'task-form-submit btn-submit form-btn';
        taskFormSubmit.textContent = 'Submit';
        taskFormSubmit.type = 'button';
        ToDoList.submitTask(taskFormSubmit)

        upper.appendChild(taskMain);
        upper.appendChild(taskDate);
        upper.appendChild(taskFormSubmit);

        const lower = document.createElement('div');
        lower.classList = 'task-form-lower';
        const taskDesc = document.createElement('input');
        taskDesc.type = 'text';
        taskDesc.classList = 'task-form-desc';
        const taskPriorityLabel = document.createElement('label');
        taskPriorityLabel.classList = 'task-form-p-label';
        taskPriorityLabel.textContent = 'Priority: ';
        const taskPrioritySelect = document.createElement('select');
        taskPrioritySelect.name = 'choice';
        taskPrioritySelect.class = 'task-form-select'
        const none = document.createElement('option');
        none.value = 'none';
        none.textContent = 'None';
        none.selected = true;
        const low = document.createElement('option');
        low.value = 'low';
        low.textContent = 'Low';
        const medium = document.createElement('option');
        medium.value = 'medium';
        medium.textContent = 'Medium';
        const high = document.createElement('option');
        high.value = 'high';
        high.textContent = 'High';

        taskPrioritySelect.appendChild(none);
        taskPrioritySelect.appendChild(low);
        taskPrioritySelect.appendChild(medium);
        taskPrioritySelect.appendChild(high);

        taskPriorityLabel.appendChild(taskPrioritySelect);

        const taskFormCancel = document.createElement('button');
        taskFormCancel.className = 'task-form-cancel btn-cancel form-btn';
        taskFormCancel.textContent = 'Cancel';
        taskFormCancel.type = 'button';
        addTaskFormCancelClick(taskFormCancel)

        lower.appendChild(taskDesc);
        lower.appendChild(taskPriorityLabel);
        lower.appendChild(taskFormCancel);

        taskForm.appendChild(upper);
        taskForm.appendChild(lower);

        sub.appendChild(checkboxSpace);
        sub.appendChild(taskDetail);

        main.appendChild(checkbox);
        main.appendChild(taskTitle);
        main.appendChild(date);
        main.appendChild(edit);
        main.appendChild(trash);

        task.appendChild(main);
        task.appendChild(sub);
        task.append(taskForm);

        tasks.appendChild(task);
    }

    const addTaskDescDisplayClick = (element) => {
        element.onclick = function() {
            if (element.parentNode.nextElementSibling.style.display == 'flex') {
                element.parentNode.nextElementSibling.style.display = 'none';
            } else {
                element.parentNode.nextElementSibling.style.display = 'flex';
            }
        }
    }

    const addTaskEditClick = (element) => {
        element.onclick = function() {
            let parent = element.parentNode.parentNode
            let main = parent.querySelector('.task-main')
            let sub = parent.querySelector('.task-sub')
            let form = parent.querySelector('.task-form')

            main.style.display = 'none'
            sub.style.display = 'none'
            form.style.display = 'flex'

            //populate edit form with current task object taskData
            let current = document.getElementById('tasks-header-title').textContent;
            let taskData = data[current]['tasks'].find(({index}) => index == parent.id)

            let newMainText = form.querySelector('.task-form-main')
            let newDescText = form.querySelector('.task-form-desc')
            let newDate = form.querySelector('.task-form-date')
            let priority = form.querySelector('select')
            //format date to ISO format to prefill date picker value
            let date = new Date(taskData.date)
            let isoDate = date.toISOString().slice(0, 10)

            newDate.value = isoDate
            newMainText.value = taskData.main
            newDescText.value = taskData.detail
            priority.value = taskData.priority.toLowerCase()
        }
    }

    const addTaskFormCancelClick = (element) => {
        element.onclick = function() {
            let parent = element.parentNode.parentNode.parentNode
            let main = parent.querySelector('.task-main')
            let sub = parent.querySelector('.task-sub')
            let form = parent.querySelector('.task-form')

            main.style.display = 'flex'
            sub.style.display = 'none'
            form.style.display = 'none'
        }
    }

    const getTaskIndexFromForm = (element) => {
        let child = element.parentNode
        let parent = child.parentNode
        let index = Array.prototype.indexOf.call(parent.children, child);
        return index
    }

    //changes active project to be highlighted in panel
    const changeActiveProject = (currentTitle) => {
        //if blank title is passed in, don't highlight any project
        if (currentTitle == '') {
            return
        }
        //get element that we want to target
        const current = findActiveElement(currentTitle, '.project-item')
        //adds the correct style class
        current.classList.add('project-active');
        //remove style class for all siblings of that element
        for (let sibling of current.parentNode.children) {
            if (sibling !== current) {
                sibling.classList.remove('project-active')
            };
        }
    }

    //shows the edit project button in the tasks area header
    const showProjectEditButton = () => {
        const tasksHeaderEditButton = document.getElementById('tasks-edit');
        tasksHeaderEditButton.style.display = 'flex';
    }

    //when no projects are selected or current projected is deleted, special DOM display
    const blankProject = () => {
        //display info telling user that there is no project selected
        let taskTitle = document.getElementById('tasks-header-title')
        let taskDesc = document.getElementById('tasks-header-desc')
        let taskContent = document.getElementById('tasks-content')
        taskTitle.textContent = 'Select/Add a Project';
        taskDesc.textContent = 'No project is currently selected.'
        taskContent.innerHTML = ''
        //hide edit button since there is no project selected
        const tasksHeaderEditButton = document.getElementById('tasks-edit')
        tasksHeaderEditButton.style.display = 'none'
    }

    return {
        populateProjects,
        populateTasks,
        findActiveElement,
        removeActiveElement,
        addProjectContent,
        addProjectNameClick,
        addProjectTrashClick,
        changeActiveProject,
        showProjectEditButton,
        blankProject,
        getTaskIndexFromForm,
    }

})();

//module pattern for coordinating DOM and logic
const ToDoList = (() => {
    //event sequence upon submitting a new project from modal
    const submitProject = () => {
        //target form values
        const title = document.getElementById('modal-title').value;
        const desc = document.getElementById('modal-desc').value;
        //add values to data array
        ToDoListLogic.addProject(data, title, desc);
        //add DOM elements needed for new project
        ToDoListDOM.addProjectContent(title);
        ToDoListDOM.addProjectNameClick(title);
        ToDoListDOM.addProjectTrashClick(title);
        //Update DOM elements
        updateProjectDOM(title);
    }

    //event sequence for editing a project
    const editProject = () => {
        //target form and current values
        let inputTitle = document.getElementById('tasks-form-title');
        let inputDesc = document.getElementById('tasks-form-desc');
        let currentTitle = document.getElementById('tasks-header-title');
        let currentDesc = document.getElementById('tasks-header-desc');
        //edit the values in the data object
        let duplicate = ToDoListLogic.editProject(data, inputTitle.value, currentTitle.textContent, 
                                                  inputDesc.value, currentDesc.textContent)
        //if invalid new key (duplicate/etc) don't change DOM, else replace DOM with new values
        if (duplicate) {
            return
        } else if (!duplicate) {
            //change active element to new title
            const currentProject = ToDoListDOM.findActiveElement(currentTitle.textContent, ".project-item-text")
            currentProject.textContent = inputTitle.value;
            //change header above tasks to new project edit info
            currentTitle.textContent = inputTitle.value;
            currentDesc.textContent = inputDesc.value;
        }
    }

    //event sequence when you delete a project
    const deleteProject = (title) => {
        //delete project from memory
        ToDoListLogic.deleteProject(data, title);
        //remove project from project list
        ToDoListDOM.removeActiveElement(title, ".project-item")
        //check current active project and update the DOM accordingly if present/blank
        let current = document.getElementById('tasks-header-title').textContent;
        if (title === current || current === 'Select/Add a Project') {
            updateProjectDOM('');
        } else {
            updateProjectDOM(current)
        }
    }

    //event sequence to update projects and tasks DOM and styling for active project
    const updateProjectDOM = (title) => {
        ToDoListDOM.populateTasks(data, title);
        ToDoListDOM.changeActiveProject(title);
        //on empty projects, insert defaults and remove edit button
        if (title === '') {
            console.log('blank fire');
            ToDoListDOM.blankProject();
        } else {
            ToDoListDOM.showProjectEditButton();
        }
    }

    const submitTask = (element) => {
        element.onclick = function() {
            //retrieve form information
            console.log(element);
            let form = element.parentNode.parentNode;
            console.log(form)
            let main = form.querySelector('.task-form-main').value
            console.log(main)
            let detail = form.querySelector('.task-form-desc').value
            console.log(detail)
            let priority = form.querySelector('select').value
            console.log(priority)
            let ISOdate = form.querySelector('.task-form-date').value
            let date = format(new Date(ISOdate), 'MM/dd/yyyy')
            console.log(date)
            let status = 'incomplete'
            //get index of current task
            let currentIndex = ToDoListDOM.getTaskIndexFromForm(element);
            console.log(currentIndex)
            //get current project task array adn find that specific tasks
            let currentProject = document.getElementById('tasks-header-title').textContent;
            let taskData = data[currentProject]['tasks'].find(({index}) => index == currentIndex)
            let taskArray = data[currentProject]['tasks']
            //if task doesn't exist (new), then add it into data & update DOM
            if (taskData == null) {
                let newTask = ToDoListLogic.createTask(main, detail, priority, date, status, currentIndex)
                ToDoListLogic.addTask(taskArray, newTask)
                ToDoListDOM.populateTasks(data, currentProject)
            } else {
            //if task exists, then edit current task in data and update DOM
                let newTask = ToDoListLogic.createTask(main, detail, priority, date, status, currentIndex)
                ToDoListLogic.editTask(taskArray, newTask, currentIndex)
                ToDoListDOM.populateTasks(data, currentProject)
            }
        }
    }

    return {
        submitProject,
        editProject,
        deleteProject,
        updateProjectDOM,
        submitTask,
    }
 
})();

//IIFE to initialize non-generated event handlers & page functionality
(() => {
    ToDoListDOM.populateProjects(data);
    ToDoList.updateProjectDOM(currentProject);

    //add a project via the form submit button
    const addProjectForm = document.getElementById('modal-form')
    const modal = document.getElementById('modal')
    const addProjectBtn = document.getElementById('projects-add')
    const cancelProjectBtn = document.getElementById('modal-cancel')

    //display modal form when project add button is clicked 
    addProjectBtn.onclick = function() {
        modal.style.display = 'flex'
    }

    //remove modal when cancel is clicked
    cancelProjectBtn.onclick = function() {
        addProjectForm.reset();
        modal.style.display = 'none';
    }

    //when project submit button is clicked, add project, reset form, remove modal
    addProjectForm.onsubmit = submitProject;

    function submitProject(event) {
        ToDoList.submitProject();
        addProjectForm.reset();
        event.preventDefault();
        modal.style.display = 'none';
    }

    //add a project via the form submit button
    const editProjectForm = document.getElementById('tasks-form');
    const tasksHeaderTitle = document.getElementById('tasks-header-wrapper')
    const tasksHeaderEditButton = document.getElementById('tasks-edit')
    const tasksHeaderCancelButton = document.getElementById('tasks-form-cancel')

    //show the project edit panel
    function showProjectEdit() {
        editProjectForm.style.display = 'flex'
        tasksHeaderTitle.style.display = 'none'
        tasksHeaderEditButton.style.display = 'none'
    }

    //hide the project edit panel
    function hideProjectEdit() {
        editProjectForm.style.display = 'none'
        tasksHeaderTitle.style.display = 'flex'
        tasksHeaderEditButton.style.display = 'flex'
    }

    //when edit button is clicked, change styles to reveal the edit form
    tasksHeaderEditButton.onclick = function() {
        //fill in the edit form with current values of project info
        let inputTitle = document.getElementById('tasks-form-title');
        let inputDesc = document.getElementById('tasks-form-desc');
        let currentTitle = document.getElementById('tasks-header-title').textContent;
        let currentDesc = document.getElementById('tasks-header-desc').textContent;
        inputTitle.value = currentTitle;
        inputDesc.value = currentDesc;
        showProjectEdit()
    }

    //when edit cancel button is clicked, hide form
    tasksHeaderCancelButton.onclick = function() {
        hideProjectEdit()
    }

    //logic when edit project form is submitted 
    editProjectForm.onsubmit = editProjectSubmit;
    
    function editProjectSubmit(event) {
        ToDoList.editProject();
        event.preventDefault();
        hideProjectEdit()
    }

})();

window.data = data;
window.current = currentProject;
window.ToDoListLogic = ToDoListLogic;
window.ToDoListDOM = ToDoListDOM;

