const $getEl = (name) => document.querySelector(name);
const output = $getEl('#output');
const btn = $getEl('#get-projects-btn');
const form = $getEl('#add-project-form');

// const baseUrl = `http://localhost:8000/api`;
// const baseUrl = `https://nodejs.aqeel.store:8000/api`;
const baseUrl = `${window.location.origin}/api`;

// Store and Retrieve data from local storage
let uid = crypto.randomUUID();
let uuid = localStorage.getItem('uuid') || uid;
let urlParams = new URLSearchParams(window.location.search);
localStorage.setItem('uuid', uuid);
urlParams.set('user', urlParams.get('user') || uuid);

const renderHTML = (projects) => {
  output.innerHTML = '';
  if (!projects.length) {
    return output.innerHTML = `<p class="container">There is no record exist.</p>`;
  }

  projects.forEach((project) => {
    const css = project.uuid == 'admin' && urlParams.get('user') != 'admin' ? 'none' : 'inline-block';
    const card = `<div class="card">
      <div class="card-details">
        <h2>${ project.title }</h2>
        <p>${ project.description || 'description' }</p>
        <nav>
          <button onclick="deleteProject('${project._id}')" class="btn danger" style="display:${css}">Delete</button>
          <a href="${ project.link || '/' }" target="_blank" class="btn info">Go to preview</a>
        </nav>
      </div>
    </div>`;
    output.innerHTML += card;
  });
};

// Get and show projects
// showProjects();
async function showProjects() {
  try {
    const res = await fetch(`${baseUrl}/projects?${urlParams}`);
    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    renderHTML(await res.json());
  } catch (error) {
    console.log('Error fetching projects: ', error);
  }
}

// Submit new project
async function addProject(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get('title');
  const description = formData.get('description');
  const link = formData.get('link');

  if (!title) return;

  try {
    const res = await fetch(`${baseUrl}/projects?${urlParams}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, link }),
    });

    if (!res.ok) {
      throw new Error('Failed to add project');
    }

    showProjects(); $getEl('#add-project-form').reset();
  } catch (error) {
    console.error('Error adding project');
  }
}

async function viewProject(id) {
  console.log('updateProject', id); return false;
}

async function updateProject(id) {
  console.log('updateProject', id); return false;
  try {
    const res = await fetch(`${baseUrl}/projects/${id}?${urlParams}`, {
      method: 'PUT'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    renderHTML(await res.json());
  } catch (error) {
    console.log('Error updating project: ', error);
  }
}

async function deleteProject(id) {
  if (!confirm('Are you sure want to delete?')) return;

  try {
    const res = await fetch(`${baseUrl}/projects/${id}?${urlParams}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    renderHTML(await res.json());
  } catch (error) {
    console.log('Error deleting project: ', error);
  }
}

// Event listeners
btn.addEventListener('click', showProjects);
form.addEventListener('submit', addProject);
