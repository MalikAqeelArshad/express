import crypto from 'crypto';
let uuid = crypto.randomUUID();

const locals = (req, res, next) => {
  res.locals.uuid = res.locals.uuid || uuid;
  next();
};

export default locals;