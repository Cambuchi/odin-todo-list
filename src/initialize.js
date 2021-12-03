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

    projectsHeader.appendChild(projectsHeaderText);
    projects.appendChild(projectsHeader);
    projects.appendChild(projectsContent);
    content.appendChild(projects);

    //create the Tasks section
    const tasks = document.createElement('div')
    tasks.id = 'content';
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