//Initialize module establishing general html structure
const initialize = () => {
    //target the body
    const body = document.body;
    //create the header
    const header = createHeader();
    //create the content wrapper
    const content = createContent();
    //create the footer
    const footer = createFooter();
    //create the modal for adding groups
    const modal = createModal();
    //create the confirmation modal
    const confirm = createConfirmationModal()


    body.appendChild(header)
    body.appendChild(content)
    body.appendChild(footer)
    body.appendChild(modal)
    body.appendChild(confirm)

};

//create the header
const createHeader = () => {
    const header = document.createElement('div');
    header.id = 'header';
    header.textContent = "To Do List:"
    return header
};

//create the content
const createContent = () => {
    const content = document.createElement('div');
    content.id = 'content';
    let sidebar = createSidebar();
    let main = createMain();
    content.appendChild(sidebar);
    content.appendChild(main);
    return content
};

//create the sidebar inside content
const createSidebar = () => {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    const sidebarHeader = document.createElement('div');
    sidebarHeader.id = 'sidebar-header'
    const sidebarHeaderText = document.createElement('p');
    sidebarHeaderText.textContent = 'Groups';
    sidebarHeaderText.id = 'sidebar-header-text'
    const sidebarContent = document.createElement('div');
    sidebarContent.id = 'sidebar-content'
    const sidebarAddBtn = document.createElement('div');
    sidebarAddBtn.id = 'sidebar-add-btn'
    sidebarAddBtn.classList = 'btn'
    const sidebarAddText = document.createElement('p');
    sidebarAddText.id = 'sidebar-add-text'
    sidebarAddText.textContent = 'Add Project';
    const sidebarAddPlus = document.createElement('span');
    sidebarAddPlus.id = 'sidebar-add-plus'
    sidebarAddPlus.textContent = '+'

    sidebarAddBtn.appendChild(sidebarAddPlus);
    sidebarAddBtn.appendChild(sidebarAddText);

    sidebarHeader.appendChild(sidebarHeaderText);

    sidebar.appendChild(sidebarHeader);
    sidebar.appendChild(sidebarContent);
    sidebar.appendChild(sidebarAddBtn);

    return sidebar;
};

//create the main display area inside content
const createMain = () => {
    const main = document.createElement('div');
    main.id = 'main';

    //create the main section header
    const mainHeader = document.createElement('div');
    mainHeader.id = 'main-header';

    //container for main header display
    const mainHeaderDisplay = document.createElement('div');
    mainHeaderDisplay.id = 'main-header-display';

    //create the main section header
    const mainHeaderWrapper = document.createElement('div');
    mainHeaderWrapper.id = 'main-header-wrapper';
    const mainHeaderTitle = document.createElement('p');
    mainHeaderTitle.id = 'main-header-title';
    const mainHeaderDesc = document.createElement('p');
    mainHeaderDesc.id = 'main-header-desc';

    mainHeaderWrapper.appendChild(mainHeaderTitle);
    mainHeaderWrapper.appendChild(mainHeaderDesc);

    //create the edit button in the main section header
    const mainHeaderEditBtn = document.createElement('div');
    mainHeaderEditBtn.id = 'main-header-edit-btn';
    mainHeaderEditBtn.classList = 'btn';
    const mainHeaderEditText = document.createElement('p');
    mainHeaderEditText.id = 'main-header-edit-text';
    mainHeaderEditText.textContent = 'Edit Project';
    const mainHeaderEditPen = document.createElement('span');
    mainHeaderEditPen.id = 'main-header-edit-pen';
    mainHeaderEditPen.textContent = '🖉';

    mainHeaderEditBtn.appendChild(mainHeaderEditPen);
    mainHeaderEditBtn.appendChild(mainHeaderEditText);

    mainHeaderDisplay.appendChild(mainHeaderWrapper);
    mainHeaderDisplay.appendChild(mainHeaderEditBtn);

    //create the main header form for editing group details
    const mainHeaderGroupForm = document.createElement('form');
    mainHeaderGroupForm.id = 'main-group-form'
    const mainHeaderGroupFormWrapper = document.createElement('div');
    mainHeaderGroupFormWrapper.id = 'main-group-form-wrapper';
    const mainHeaderGroupFormTitle = document.createElement('input');
    mainHeaderGroupFormTitle.type = 'text';
    mainHeaderGroupFormTitle.id = 'main-group-form-title';
    mainHeaderGroupFormTitle.required = true;
    const mainHeaderGroupFormDesc = document.createElement('input');
    mainHeaderGroupFormDesc.type = 'text';
    mainHeaderGroupFormDesc.id = 'main-group-form-desc';

    //create the main header form buttons for submitting group edits
    const mainHeaderGroupFormSubmit = document.createElement('button');
    mainHeaderGroupFormSubmit.id = 'main-group-form-submit';
    mainHeaderGroupFormSubmit.className = 'btn-submit form-btn';
    mainHeaderGroupFormSubmit.textContent = 'Submit';
    mainHeaderGroupFormSubmit.type = 'submit';

    const mainHeaderGroupFormCancel = document.createElement('button');
    mainHeaderGroupFormCancel.id = 'main-group-form-cancel';
    mainHeaderGroupFormCancel.className = 'btn-cancel form-btn';
    mainHeaderGroupFormCancel.textContent = 'Cancel';
    mainHeaderGroupFormCancel.type = 'button';

    mainHeaderGroupFormWrapper.appendChild(mainHeaderGroupFormTitle);
    mainHeaderGroupFormWrapper.appendChild(mainHeaderGroupFormDesc);

    mainHeaderGroupForm.appendChild(mainHeaderGroupFormWrapper);
    mainHeaderGroupForm.appendChild(mainHeaderGroupFormSubmit);
    mainHeaderGroupForm.appendChild(mainHeaderGroupFormCancel);

    //create the main content area for the tasks
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';

    //create the button for adding tasks
    const mainContentAddBtn = document.createElement('div');
    mainContentAddBtn.id = 'main-content-add-btn';
    mainContentAddBtn.classList = 'btn'
    const mainContentAddBtnText = document.createElement('p');
    mainContentAddBtnText.id = 'main-content-add-text';
    mainContentAddBtnText.textContent = 'Add Task';
    const mainContentAddBtnPlus = document.createElement('span');
    mainContentAddBtnPlus.id = 'main-content-add-plus';
    mainContentAddBtnPlus.textContent = '+';

    mainContentAddBtn.appendChild(mainContentAddBtnPlus);
    mainContentAddBtn.appendChild(mainContentAddBtnText);

    mainHeader.appendChild(mainHeaderDisplay)
    mainHeader.appendChild(mainHeaderGroupForm);

    main.appendChild(mainHeader);
    main.appendChild(mainContent);
    main.appendChild(mainContentAddBtn);

    return main;
};

//create the footer, append the element
const createFooter = () => {
    const footer = document.createElement('div');
    footer.id = 'footer';
    footer.textContent = "Copyright 2021 Cam Nguyen";
    return footer;
};

//create the modal content for the new group submit form
const createModal = () => {
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

    return modal;
};

//create the modal content for the new group submit form
const createConfirmationModal = () => {
    const modal = document.createElement('div');
    modal.id = 'modal-confirm';

    const modalContent = document.createElement('div')
    modalContent.id = 'modal-confirm-content';

    const modalForm = document.createElement('div');
    modalForm.id = 'modal-confirm-form';
    modalForm.onsubmit = 'return false';

    const modalTitleHead = document.createElement('div');
    modalTitleHead.className = 'modal-confirm-label'
    modalTitleHead.textContent = "Are you sure you want to delete this item?";

    const modalButtons = document.createElement('div');
    modalButtons.id = 'modal-confirm-buttons-container';

    const modalSubmit = document.createElement('button');
    modalSubmit.id = 'modal-confirm-submit';
    modalSubmit.className = 'btn-submit';
    modalSubmit.textContent = 'Confirm';
    modalSubmit.type = 'button';

    const modalCancel = document.createElement('button');
    modalCancel.id = 'modal-confirm-cancel';
    modalCancel.className = 'btn-cancel';
    modalCancel.textContent = 'Cancel';
    modalCancel.type = 'button';

    modalButtons.appendChild(modalSubmit);
    modalButtons.appendChild(modalCancel);

    modalForm.appendChild(modalTitleHead);
    modalForm.appendChild(modalButtons);

    modalContent.appendChild(modalForm);
    modal.appendChild(modalContent);

    return modal;
};

export {
    initialize,
}