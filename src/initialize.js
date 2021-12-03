//Initialize module to establish general page structure
const initialize = () => {
    //target the body
    const body = document.body;

    //create the header
    const header = document.createElement('div');
    header.id = 'header';
    header.textContent = "To Do List"
    body.appendChild(header)

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

    projectsHeader.appendChild(projectsHeaderText);
    projects.appendChild(projectsHeader);
    projects.appendChild(projectsContent);
    body.appendChild(projects);

    //create the Tasks section
    const tasks = document.createElement('div')
    tasks.id = 'content';
    body.appendChild(tasks);

    //create the footer
    const footer = document.createElement('div');
    footer.id = 'footer';
    footer.textContent = "Copyright 2021 Cam Nguyen"
    body.appendChild(footer);
}

export {
    initialize,
}