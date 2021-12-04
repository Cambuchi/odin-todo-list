import { format, compareAsc } from 'date-fns'
import './style.css';
import './modern-normalize.css';
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
            }
        ]
    }
}

const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
]

dates.sort(compareAsc);
console.log(dates)

//module pattern containing all of the todo list logic
const ToDoList = (() => {
    //adds a project item into data
    const addProject = (data, title, description) => {
        data[title] = {"description": description, "tasks": [] }
    };

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
        createTask,
        addTask,
        deleteTask,
        editTask,
        renumberTasks,
    }
})();

//module pattern encapsulating all of the DOM manipulation methods
const ToDoListDOM = (() => {
    //add object data to Project menu
    const addProjects = (data) => {
        //target projects content
        const content = document.getElementById('projects-content');
        content.innerHTML = ''

        //create array of all Project items
        let projects = Object.keys(data);
        projects.forEach(function (item) {
            console.log(item)
            let project = document.createElement('div')
            project.classList = 'project-item'
            project.textContent = item
            content.appendChild(project);
        });
    };

    return {
        addProjects,
    }

})();

ToDoListDOM.addProjects(data);

window.data = data;
window.ToDoList = ToDoList;
window.ToDoListDOM = ToDoListDOM;

