import Project from '../models/project.js';

var projects = [
  { id: 1, _id: 1, title: 'Project One' },
  { id: 2, _id: 2, title: 'Project Two' },
  { id: 3, _id: 3, title: 'Project Three' },
];

const isAdmin = (req) => req.query.user == 'admin';

const getProjectById = (req, res, next) => {
  const id = req.params.id;
  const project = projects.find(x => x._id.toString() === id);

  if (!project) {
    const error = new Error(`A project with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  return project;
};

// @desc   Get all projects
// @route  GET /api/projects
export const getProjects = async (req, res, next) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 0;
  const find = {uuid: {$in: ['admin', req.query.user]}};
  projects = await Project.find(find).skip(skip).limit(limit);
  // projects.slice(skip, limit);
  res.status(200).json(projects);
};

// @desc    Get single project
// @route   GET /api/projects/:id
export const getProject = (req, res, next) => {
  const project = getProjectById(req, res, next);

  res.status(200).json(project);
};

// @desc    Create new project
// @route   POST /api/projects
export const createProject = async (req, res, next) => {
  const newProject = {
    id: projects.length + 1,
    // "_id": projects.length + 1,
    uuid: req.query.user,
    link: req.body.link,
    title: req.body.title,
    description: req.body.description,
  };

  if (!newProject.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  await Project.create(newProject);
  projects.push(newProject);
  res.status(201).json(projects);
};

// @desc    Update project
// @route   PUT /api/projects/:id
export const updateProject = (req, res, next) => {
  const project = getProjectById(req, res, next);

  project.link = req.body.link;
  project.title = req.body.title;
  project.description = req.body.description;
  res.status(200).json(projects);
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  const project = getProjectById(req, res, next);

  await Project.deleteOne({_id: req.params.id, uuid: req.query.user});
  projects = projects.filter(x => x._id.toString() !== project._id.toString());
  // res.status(200).json(projects);
  res.status(200).json(projects);
};
