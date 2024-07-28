import { Router } from 'express';
const router = Router();
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

// Get all projects
router.get('/', getProjects);

// Get single project
router.get('/:id', getProject);

// Create new project
router.post('/', createProject);

// Update Project
router.put('/:id', updateProject);

// Delete Project
router.delete('/:id', deleteProject);

export default router;
