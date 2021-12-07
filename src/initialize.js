//Initialize module to establish general page structure
const initialize = () => {
    //target the body
    const body = document.body;

    //create the header
    const header = document.createElement('div');
    header.id = 'header';
    header.textContent = "To Do List:"
    body.appendChild(header)

    //create the content wrapper
    const content = document.createElement('div');
    content.id = 'content';

    //create the Projects section
    const projects = document.createElement('div');
    projects.id = 'projects';
    
    const projectsHeader = document.createElement('div');
    projectsHeader.id = 'projects-header'

    const projectsHeaderText = document.createElement('p');
    projectsHeaderText.textContent = 'Projects';
    projectsHeaderText.id = 'projects-header-text'

    const projectsContent = document.createElement('div');
    projectsContent.id = 'projects-content'

    const projectsAdd = document.createElement('div');
    projectsAdd.id = 'projects-add'
    projectsAdd.classList = 'btn'
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

    //create the task header
    const tasksHeaderWrapper = document.createElement('div');
    tasksHeaderWrapper.id = 'tasks-header-wrapper';
    const tasksHeaderTitle = document.createElement('p');
    tasksHeaderTitle.textContent = 'No Projects Yet';
    tasksHeaderTitle.id = 'tasks-header-title';
    const tasksHeaderDesc = document.createElement('p');
    tasksHeaderDesc.textContent = 'No Project Description Yet';
    tasksHeaderDesc.id = 'tasks-header-desc';

    tasksHeaderWrapper.appendChild(tasksHeaderTitle);
    tasksHeaderWrapper.appendChild(tasksHeaderDesc);

    //create the task header form for editing Project details
    const tasksForm = document.createElement('form');
    tasksForm.id = 'tasks-form'
    const tasksFormWrapper = document.createElement('div');
    tasksFormWrapper.id = 'tasks-form-wrapper';
    const tasksFormTitle = document.createElement('input');
    tasksFormTitle.type = 'text';
    tasksFormTitle.id = 'tasks-form-title';
    tasksFormTitle.required = true;
    const tasksFormDesc = document.createElement('input');
    tasksFormDesc.type = 'text';
    tasksFormDesc.id = 'tasks-form-desc';

    //create the buttons for submitting project edit
    const tasksFormSubmit = document.createElement('button');
    tasksFormSubmit.id = 'tasks-form-submit';
    tasksFormSubmit.className = 'btn-submit form-btn';
    tasksFormSubmit.textContent = 'Submit';
    tasksFormSubmit.type = 'submit';

    const tasksFormCancel = document.createElement('button');
    tasksFormCancel.id = 'tasks-form-cancel';
    tasksFormCancel.className = 'btn-cancel form-btn';
    tasksFormCancel.textContent = 'Cancel';
    tasksFormCancel.type = 'button';

    tasksFormWrapper.appendChild(tasksFormTitle);
    tasksFormWrapper.appendChild(tasksFormDesc);

    tasksForm.appendChild(tasksFormWrapper);
    tasksForm.appendChild(tasksFormSubmit);
    tasksForm.appendChild(tasksFormCancel);

    //create the edit button in the task header
    const tasksEdit = document.createElement('div');
    tasksEdit.id = 'tasks-edit';
    tasksEdit.classList = 'btn';
    const tasksEditText = document.createElement('p');
    tasksEditText.id = 'tasks-edit-text';
    tasksEditText.textContent = 'Edit Project';
    const tasksEditPen = document.createElement('span');
    tasksEditPen.id = 'tasks-edit-pen';
    tasksEditPen.textContent = '🖉';

    tasksEdit.appendChild(tasksEditPen);
    tasksEdit.appendChild(tasksEditText);

    //create the content area for the tasks
    const tasksContent = document.createElement('div');
    tasksContent.id = 'tasks-content';

    //create the button for adding tasks
    const tasksAdd = document.createElement('div');
    tasksAdd.id = 'tasks-add';
    tasksAdd.classList = 'btn'
    const tasksAddText = document.createElement('p');
    tasksAddText.id = 'tasks-add-text';
    tasksAddText.textContent = 'Add Task';
    const tasksAddPlus = document.createElement('span');
    tasksAddPlus.id = 'tasks-add-plus';
    tasksAddPlus.textContent = '+';

    tasksAdd.appendChild(tasksAddPlus);
    tasksAdd.appendChild(tasksAddText);

    tasksHeader.appendChild(tasksForm)
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

    //create the modal for adding projects
    const modal = document.createElement('div');
    modal.id = 'modal';

    const modalContent = document.createElement('div')
    modalContent.id = 'modal-content';

    const modalForm = document.createElement('form');
    modalForm.id = 'modal-form';
    modalForm.onsubmit = 'return false';

    const modalTitleHead = document.createElement('label');
    modalTitleHead.className = 'modal-label'
    modalTitleHead.for = 'modal-title'
    modalTitleHead.textContent = "Project Name:";

    const modalTitleInput = document.createElement('input');
    modalTitleInput.type = 'text';
    modalTitleInput.id = 'modal-title';
    modalTitleInput.required = true;
    modalTitleInput.placeholder = 'Name of Project/Tasks';

    const modalDescHead = document.createElement('label');
    modalDescHead.className = 'modal-label'
    modalDescHead.for = 'modal-desc'
    modalDescHead.textContent = "Project Description:";

    const modalDescInput = document.createElement('input');
    modalDescInput.type = 'text';
    modalDescInput.id = 'modal-desc';
    modalDescInput.placeholder = 'Description of Project/Tasks';

    const modalButtons = document.createElement('div');
    modalButtons.id = 'modal-buttons-container';

    const modalSubmit = document.createElement('button');
    modalSubmit.id = 'modal-submit';
    modalSubmit.className = 'btn-submit';
    modalSubmit.textContent = 'Submit';
    modalSubmit.type = 'submit';

    const modalCancel = document.createElement('button');
    modalCancel.id = 'modal-cancel';
    modalCancel.className = 'btn-cancel';
    modalCancel.textContent = 'Cancel';
    modalCancel.type = 'button';

    modalButtons.appendChild(modalSubmit);
    modalButtons.appendChild(modalCancel);

    modalForm.appendChild(modalTitleHead);
    modalForm.appendChild(modalTitleInput);
    modalForm.appendChild(modalDescHead);
    modalForm.appendChild(modalDescInput);
    modalForm.appendChild(modalButtons);

    modalContent.appendChild(modalForm);
    modal.appendChild(modalContent);

    body.appendChild(modal);

}

export {
    initialize,
}