import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
  title: String,
  description: String,
  link: String,
  date: Date,
  uuid: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;