import { format, compareAsc } from 'date-fns'
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

const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
]

dates.sort(compareAsc);
console.log(dates)

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
        let counter = 0;
        let projects = Object.keys(data);
        projects.forEach(function (item) {
            let project = document.createElement('div')
            project.classList = 'project-item'
            project.id = `p${counter}`;
            counter++
            let projectText = document.createElement('span')
            projectText.classList = 'project-item-text'
            projectText.textContent = item

            let trash = new Image();
            trash.src = TrashIcon
            trash.className = 'project-trash';

            project.appendChild(projectText);
            project.appendChild(trash);

            content.appendChild(project);
        });
    };

    //populate tasks based on current project
    const populateTasks = (data, currentProject) => {
        if (currentProject == '') {
            blankProject();
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

            //create DOM elements
            let task = document.createElement('div');
            task.classList.add('task', taskData.priority);
            task.id = taskData.index;

            let main = document.createElement('div');
            main.className = 'task-main';

            let checkbox = document.createElement('div');
            checkbox.className = 'checkbox';

            let taskTitle = document.createElement('div');
            taskTitle.textContent = taskData.main;
            taskTitle.classList.add('task-title', taskData.status);

            let date = document.createElement('div');
            date.textContent = taskData.date;
            date.className = 'task-date';

            let edit = document.createElement('div');
            edit.textContent = '🖉';
            edit.className = 'task-edit';

            let trash = new Image();
            trash.src = TrashIcon
            trash.className = 'task-trash';

            let sub = document.createElement('div');
            sub.className = 'task-sub';

            let checkboxSpace = document.createElement('div');
            checkboxSpace.className = 'checkbox-space';

            let taskDetail = document.createElement('div');
            taskDetail.textContent = taskData.detail;
            taskDetail.className = 'task-detail'

            sub.appendChild(checkboxSpace)
            sub.appendChild(taskDetail)

            main.appendChild(checkbox);
            main.appendChild(taskTitle);
            main.appendChild(date);
            main.appendChild(edit);
            main.appendChild(trash);

            task.appendChild(main)
            task.appendChild(sub)

            tasks.appendChild(task)
        }
    }

    //changes active project to be highlighted in panel
    const changeActiveProject = (currentTitle) => {
        if (currentTitle == '') {
            return
        }
        const current = Array.from(document.querySelectorAll('.project-item'))
                             .find(el => el.textContent.includes(currentTitle));
        current.classList.add('project-active');
    }

    //create click events on all projects in panel for project selection
    const createProjectClick = () => {
        let projects = Array.from(document.querySelectorAll('.project-item-text'));
        projects.forEach(btn => btn.addEventListener('click', function() {
            const title = btn.textContent;
            ToDoList.updateProjectDOM(title);
        }));
    }

    //create click events on trash icons in project panel
    const createProjectTrash = () => {
        let trash = Array.from(document.querySelectorAll('.project-trash'));
        trash.forEach(btn => btn.addEventListener('click', function() {
            const title = btn.parentNode.textContent;
            ToDoList.deleteProject(title)
        }));
    }

    //DOM function to run when no projects are selected or current projected is deleted
    const blankProject = () => {
        let taskTitle = document.getElementById('tasks-header-title')
        let taskDesc = document.getElementById('tasks-header-desc')
        let taskContent = document.getElementById('tasks-content')
        taskTitle.textContent = 'Select/Add a Project';
        taskDesc.textContent = 'No project is currently selected.'
        taskContent.innerHTML = ''
    }


    return {
        populateProjects,
        populateTasks,
        changeActiveProject,
        createProjectClick,
        createProjectTrash,
        blankProject,
    }

})();

//module pattern for coordinating DOM and logic
const ToDoList = (() => {
    //event sequence upon submitting a new project
    const submitProject = () => {
        //target form values
        const title = document.getElementById('modal-title').value;
        const desc = document.getElementById('modal-desc').value;
        //add values to data array
        ToDoListLogic.addProject(data, title, desc);
        //change DOM to newly made project
        updateProjectDOM(title);
    }

    //event sequence when you delete a project
    const deleteProject = (title) => {
        ToDoListLogic.deleteProject(data, title);
        updateProjectDOM('');
    }

    //event sequence to update projects and tasks DOM and styling for active project
    const updateProjectDOM = (title) => {
        ToDoListDOM.populateProjects(data);
        ToDoListDOM.populateTasks(data, title);
        ToDoListDOM.changeActiveProject(title);
        ToDoListDOM.createProjectClick();
        ToDoListDOM.createProjectTrash();
    }


    return {
        submitProject,
        deleteProject,
        updateProjectDOM,
    }


})();

//IIFE to initialize non-recreated event handlers
(() => {
    ToDoList.updateProjectDOM(currentProject);
    ToDoListDOM.createProjectTrash();

    //add a project via the form submit button
    const addProject = document.getElementById('modal-form')
    const modal = document.getElementById('modal')
    const addProjectBtn = document.getElementById('projects-add')
    const cancelProjectBtn = document.getElementById('modal-cancel')

    //display modal form when project add button is clicked 
    addProjectBtn.onclick = function() {
        modal.style.display = 'flex'
    }

    //remove modal when cancel is clicked
    cancelProjectBtn.onclick = function() {
        addProject.reset();
        modal.style.display = 'none';
    }

    //when project submit button is clicked, add project, reset form, remove modal
    addProject.onsubmit = submit;

    function submit(event) {
        ToDoList.submitProject();
        addProject.reset();
        event.preventDefault();
        modal.style.display = 'none';
    }

})();

window.data = data;
window.current = currentProject;
window.ToDoListLogic = ToDoListLogic;
window.ToDoListDOM = ToDoListDOM;

