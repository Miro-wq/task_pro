const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401); // 401 pentru invalid token, 403 nu e ok. Se poate adauga si restul de eroare 403 dar nu am mai pus
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
