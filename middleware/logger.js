import fs from 'fs';

const logger = (req, res, next) => {
  const path = `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const log = `${new Date().toLocaleString()}: ${path}\n`;
  fs.appendFileSync("./log.txt", log);
  next();
};

export default logger;
