import './style/style.css';
import './style/modern-normalize.css';
import {initialize} from './scripts/initialize';
import * as Logic from './scripts/logic'
import * as DOM from './scripts/dom'
import * as ToDoList from './scripts/ToDoList'
import * as DataStorage from './scripts/datastorage'

//IIFE to encapsulate site creation, data, and event handlers
(() => {
    //retrieve the data
    let data = DataStorage.retrieveData('todolist')
    console.log(data)

    //create the initial page structure
    initialize();

    DOM.populateGroups(data)
    DOM.clickGroupText(Object.keys(data)[0])
    DOM.populateTasks(data, Object.keys(data)[0])

    document.body.addEventListener('click', function(event) {
        if (event.target !== event.currentTarget) {
            //when item in sidebar is clicked, makes active & populates gorup tasks
            if (event.target.classList.contains('group-item-text')) {
                DOM.clickGroupText(event)
                DOM.populateTasks(data, event.target.textContent)
            } 
            //when add groups button is clicked, display the modal for submitting groups
            if (event.target.matches('#sidebar-add-btn, #sidebar-add-btn *')) {
                DOM.clickAddGroupBtn();
            }
            //when modal cancel button is clicked, hide modal & reset form
            if (event.target.id === 'modal-cancel') {
                DOM.clickModalFormBtn();
            }
            //when group item trash can is clicked, delete the group from data & page
            if (event.target.classList.contains('group-trash')) {
                DOM.clickGroupTrash(event)
                Logic.deleteGroup(data, event.target.parentNode.textContent)
                DataStorage.setLocalStorage('todolist', data)
            }
            //when the submit button in the modal is clicked, add new group to data & update DOM
            if (event.target.id === 'modal-submit') {
                event.preventDefault();
                const title = document.getElementById('modal-title').value;
                const desc = document.getElementById('modal-desc').value;
                const check = document.getElementById('modal-title')
                if (DOM.validityChecker(check, title)) {
                    return
                }
                Logic.addGroup(data, title, desc);
                DataStorage.setLocalStorage('todolist', data)
                DOM.addGroup(data, title);
                DOM.populateTasks(data, title);
                DOM.clickGroupText(title)
                DOM.clickModalFormBtn();
            }
            //when the edit group button is clicked in the header, display edit form
            if (event.target.matches('#main-header-edit-btn, #main-header-edit-btn *')) {
                DOM.clickMainHeaderEditBtn();
            }
            //when the cancel button in the group edit form is clicked, hide form
            if (event.target.matches('#main-group-form-cancel, #main-group-form-cancel *')) {
                DOM.clickMainHeaderFormCancel();
            }
            //when the submit button in the group edit form is clicked, try to edit group
            //if successful, update DOM & data and hide form
            if (event.target.id === 'main-group-form-submit') {
                event.preventDefault();
                let currentTitle = document.getElementById('main-header-title')
                let currentDetails = document.getElementById('main-header-desc')
                let editTitle = document.getElementById('main-group-form-title')
                let editDetails = document.getElementById('main-group-form-desc');
                if (DOM.validityChecker(editTitle, editTitle.value)) {
                    return
                }
                let duplicate = Logic.editGroup(data, editTitle.value, currentTitle.textContent, 
                                                editDetails.value, currentDetails.textContent)
                if (duplicate) {
                    DOM.clickMainHeaderFormCancel();
                    return
                } else {
                    DOM.clickMainHeaderFormSubmit();
                    DOM.clickMainHeaderFormCancel();
                    DataStorage.setLocalStorage('todolist', data)
                }
            }
            //when a checkbox is clicked, update DOM & status property in task data
            if (event.target.classList.contains('task-main-checkbox')) {
                DOM.clickTaskMainCheckbox(event)
                let index = event.target.parentNode.parentNode.id
                let currentGroup = document.getElementById('main-header-title').textContent
                Logic.clickCheckbox(data[currentGroup]['tasks'][index])
                DataStorage.setLocalStorage('todolist', data)
            }
            //when trash icon in task item is clicked, delete task from data & DOM
            if (event.target.classList.contains('task-main-trash')) {
                let task = event.target.parentNode.parentNode
                console.log(task)
                console.log(task.id)
                let currentGroup = document.getElementById('main-header-title').textContent
                console.log(currentGroup)
                Logic.deleteTask(data[currentGroup], task.id)
                Logic.renumberTasks(data[currentGroup]['tasks'])
                DOM.populateTasks(data, currentGroup)
                DataStorage.setLocalStorage('todolist', data)
            }
            //when edit icon on tasks is clicked, reveal & prepopulate the task edit form
            if (event.target.classList.contains('task-main-edit')) {
                let task = event.target.parentNode.parentNode
                DOM.clickTaskMainEdit(task, data)
            }
            //when cancel button in task edit form is clicked, hides the edit form,
            //unless the current task doesn't exist (like making a new task), then removes element
            if (event.target.classList.contains('task-form-cancel')) {
                let task = event.target.parentNode.parentNode.parentNode
                let currentGroup = document.getElementById('main-header-title').textContent
                let taskArray = data[currentGroup]['tasks']
                DOM.clickTaskFormCancelBtn(task, taskArray)
            }
            //when submit button on tasks is clicked, add to data and update DOMException
            if (event.target.classList.contains('task-form-submit')) {
                event.preventDefault();
                let task = event.target.parentNode.parentNode.parentNode

                //retrieve form information
                let form = task.querySelector('.task-form')
                let main = form.querySelector('.task-form-main').value
                if (DOM.validityChecker(form.querySelector('.task-form-main'), main)) {
                    return
                }
                let detail = form.querySelector('.task-form-details').value
                let priority = form.querySelector('select').value
                let date = form.querySelector('.task-form-date').value
                let status = 'incomplete'
                //get index of current task
                let currentIndex = task.id

                //get current group name
                let currentGroup = document.getElementById('main-header-title').textContent;
                //get the task from the data, if the index does not exist, will be undefined
                let taskData = data[currentGroup]['tasks'].find(({ index }) => index == currentIndex)
                //get the array of tasks within the group to add to/edit from
                let taskArray = data[currentGroup]['tasks']
                    //if task doesn't exist (new), then add it into data & update DOM
                if (taskData == null) {
                    let newTask = Logic.createTask(main, detail, priority, date, status, currentIndex)
                    Logic.addTask(taskArray, newTask)
                    DOM.populateTasks(data, currentGroup)
                    DataStorage.setLocalStorage('todolist', data)
                } else {
                    //if task exists, then edit current task in data and update DOM
                    let newTask = Logic.createTask(main, detail, priority, date, status, currentIndex)
                    Logic.editTask(taskArray, newTask, currentIndex)
                    DOM.populateTasks(data, currentGroup)
                    DataStorage.setLocalStorage('todolist', data)
                }
            }
            //when the add task button is clicked, add an empty task for editing/submitting
            if (event.target.matches('#main-content-add-btn, #main-content-add-btn *')) {
                DOM.addTaskContent('')
                let tasks = document.getElementById('main-content')
                let parent = tasks.lastElementChild
                let main = parent.querySelector('.task-main')
                let sub = parent.querySelector('.task-sub')
                let form = parent.querySelector('.task-form')
                main.style.display = 'none'
                sub.style.display = 'none'
                form.style.display = 'flex'
            }
        }
        event.stopPropagation();
    }, false)

})();





//IIFE to initialize non-generated event handlers & page functionality
// (() => {
//     ToDoListDOM.populateProjects(data);
//     ToDoList.updateProjectDOM(currentProject);

//     //add a project via the form submit button
//     const addProjectForm = document.getElementById('modal-form')
//     const modal = document.getElementById('modal')
//     const addProjectBtn = document.getElementById('projects-add')
//     const cancelProjectBtn = document.getElementById('modal-cancel')

//     //display modal form when project add button is clicked 
//     addProjectBtn.onclick = function() {
//         modal.style.display = 'flex'
//     }

//     //remove modal when cancel is clicked
//     cancelProjectBtn.onclick = function() {
//         addProjectForm.reset();
//         modal.style.display = 'none';
//     }

//     //when project submit button is clicked, add project, reset form, remove modal
//     addProjectForm.onsubmit = submitProject;

//     function submitProject(event) {
//         ToDoList.submitProject();
//         addProjectForm.reset();
//         event.preventDefault();
//         modal.style.display = 'none';
//     }

//     //add a project via the form submit button
//     const editProjectForm = document.getElementById('tasks-form');
//     const tasksHeaderTitle = document.getElementById('tasks-header-wrapper')
//     const tasksHeaderEditButton = document.getElementById('tasks-edit')
//     const tasksHeaderCancelButton = document.getElementById('tasks-form-cancel')

//     //show the project edit panel
//     function showProjectEdit() {
//         editProjectForm.style.display = 'flex'
//         tasksHeaderTitle.style.display = 'none'
//         tasksHeaderEditButton.style.display = 'none'
//     }

//     //hide the project edit panel
//     function hideProjectEdit() {
//         editProjectForm.style.display = 'none'
//         tasksHeaderTitle.style.display = 'flex'
//         tasksHeaderEditButton.style.display = 'flex'
//     }

//     //when edit button is clicked, change styles to reveal the edit form
//     tasksHeaderEditButton.onclick = function() {
//         //fill in the edit form with current values of project info
//         let inputTitle = document.getElementById('tasks-form-title');
//         let inputDesc = document.getElementById('tasks-form-desc');
//         let currentTitle = document.getElementById('tasks-header-title').textContent;
//         let currentDesc = document.getElementById('tasks-header-desc').textContent;
//         inputTitle.value = currentTitle;
//         inputDesc.value = currentDesc;
//         showProjectEdit()
//     }

//     //when edit cancel button is clicked, hide form
//     tasksHeaderCancelButton.onclick = function() {
//         hideProjectEdit()
//     }

//     //logic when edit project form is submitted 
//     editProjectForm.onsubmit = editProjectSubmit;
    
//     function editProjectSubmit(event) {
//         ToDoList.editProject();
//         event.preventDefault();
//         hideProjectEdit()
//     }

//     //when add task button is clicked
//     const addTaskBtn = document.getElementById('tasks-add')
//     addTaskBtn.onclick = function() {
//         ToDoListDOM.addTaskContent('')
//         let tasks = document.getElementById('tasks-content')
//         let parent = tasks.lastElementChild
//         let main = parent.querySelector('.task-main')
//         let sub = parent.querySelector('.task-sub')
//         let form = parent.querySelector('.task-form')
//         main.style.display = 'none'
//         sub.style.display = 'none'
//         form.style.display = 'flex'
//     }

// })();


