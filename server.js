import express from 'express';
import mongoose from 'mongoose';
import projects from './routes/projects.js';
// import logger from './middleware/logger.js';
import locals from './middleware/locals.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';
const port = process.env.PORT || 8000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((error) => console.log(error.message));

const app = express();

// setup static folder
app.use(express.static('./public'));
app.use('/favicon.ico', express.static('./favicon.ico'));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
// app.use(logger);
// app.use(locals);

// Routes
app.use('/api/projects', projects);

// Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
