//Initialize module to establish general page structure
const initialize = () => {
    //target the body
    const body = document.body;

    //create the header
    const header = document.createElement('div');
    header.id = 'header';
    header.textContent = "To Do List"
    body.appendChild(header)

    //create the content wrapper
    const content = document.createElement('div');
    content.id = 'content';

    //create the Projects section
    const projects = document.createElement('div');
    projects.id = 'projects';
    
    const projectsHeader = document.createElement('div');
    projectsHeader.id = 'projects-header'

    const projectsHeaderText = document.createElement('h2');
    projectsHeaderText.textContent = 'Projects';
    projectsHeaderText.id = 'projects-header-text'

    const projectsContent = document.createElement('div');
    projectsContent.id = 'projects-content'

    const projectsAdd = document.createElement('div');
    projectsAdd.id = 'projects-add'
    const projectsAddText = document.createElement('p');
    projectsAddText.id = 'projects-add-text'
    projectsAddText.textContent = 'Add Project';
    const projectsAddPlus = document.createElement('span');
    projectsAddPlus.id = 'projects-add-plus'
    projectsAddPlus.textContent = '+'

    projectsAdd.appendChild(projectsAddPlus);
    projectsAdd.appendChild(projectsAddText);

    projectsHeader.appendChild(projectsHeaderText);
    projects.appendChild(projectsHeader);
    projects.appendChild(projectsContent);
    projects.appendChild(projectsAdd);
    content.appendChild(projects);

    //create the Tasks section
    const tasks = document.createElement('div');
    tasks.id = 'tasks';

    const tasksHeader = document.createElement('div');
    tasksHeader.id = 'tasks-header';

    const tasksHeaderWrapper = document.createElement('div');
    tasksHeaderWrapper.id = 'tasks-header-wrapper';

    const tasksHeaderTitle = document.createElement('h2');
    tasksHeaderTitle.textContent = 'No Projects Yet';
    tasksHeaderTitle.id = 'tasks-header-title';

    const tasksHeaderDesc = document.createElement('h3');
    tasksHeaderDesc.textContent = 'No Project Description Yet';
    tasksHeaderDesc.id = 'tasks-header-desc';

    const tasksEdit = document.createElement('div');
    tasksEdit.id = 'tasks-edit';
    const tasksEditText = document.createElement('p');
    tasksEditText.id = 'tasks-edit-text';
    tasksEditText.textContent = 'Edit Project';
    const tasksEditPen = document.createElement('span');
    tasksEditPen.id = 'tasks-edit-pen';
    tasksEditPen.textContent = '🖉';

    tasksEdit.appendChild(tasksEditPen);
    tasksEdit.appendChild(tasksEditText);

    const tasksContent = document.createElement('div');
    tasksContent.id = 'tasks-content';

    const tasksAdd = document.createElement('div');
    tasksAdd.id = 'tasks-add';
    const tasksAddText = document.createElement('p');
    tasksAddText.id = 'tasks-add-text';
    tasksAddText.textContent = 'Add Task';
    const tasksAddPlus = document.createElement('span');
    tasksAddPlus.id = 'tasks-add-plus';
    tasksAddPlus.textContent = '+';

    tasksAdd.appendChild(tasksAddPlus);
    tasksAdd.appendChild(tasksAddText);

    tasksHeaderWrapper.appendChild(tasksHeaderTitle);
    tasksHeaderWrapper.appendChild(tasksHeaderDesc);
    tasksHeader.appendChild(tasksHeaderWrapper);
    tasksHeader.appendChild(tasksEdit);

    tasks.appendChild(tasksHeader);
    tasks.appendChild(tasksContent);
    tasks.appendChild(tasksAdd);

    content.appendChild(tasks);
    body.appendChild(content);

    //create the footer
    const footer = document.createElement('div');
    footer.id = 'footer';
    footer.textContent = "Copyright 2021 Cam Nguyen"
    body.appendChild(footer);
}

export {
    initialize,
}