import { works } from "../works.js";

const renderProject = () => {
  const projectId = window.location.pathname.replace('works', '').replaceAll('/', '');

  const project = works.find(p => p.url === projectId);

  if (project) {
    const projectContainer =  document.getElementById('project-container');

    projectContainer.innerHTML = `
      <div id="project-cover" class="bg-cover bg-center bg-black w-full h-full min-h-screen overflow-hidden" style="background-image: url(${project.src + 'cover.jpg'})"></div>
      <div class="leading-5 py-8 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16 text-lg sm:text-4xl w-[85%] sm:w-full lg:w-3/4 xl:w-[64%]">
        <p id="project-description">${project.description}</p>
      </div>
      <div id="project-gallery" class="project-gallery py-8 sm:py-16 md:py-20 px-6 sm:px-12 md:px-16 space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-14"></div>
    `;
  
    const galleryContainer = document.getElementById('project-gallery');
    [...Array(project.images).keys()].forEach(i => {
      const img = document.createElement('img');
      img.src = project.src + (i+1) + '.jpg';
      img.alt = `${project.label} Image`;

      if (project.grid && project.grid.includes(i+1)) {
        let grid = document.getElementById('gallery-grid');
        
        if (!grid) {
          grid = document.createElement('div');
          grid.id = ('gallery-grid');
          grid.classList.add('grid', 'grid-cols-2', 'gap-6', 'sm:gap-8', 'md:gap-12', 'lg:gap-14');
          galleryContainer.appendChild(grid);
        }

        grid.appendChild(img);
      } else {
        galleryContainer.appendChild(img);
      }
    });

    document.title = `Studio Koi × ${project.label}`;
  } else {
    document.getElementById('project-title').textContent = 'Project Not Found';
  }
}

window.onload = () => {
  renderProject();
};
