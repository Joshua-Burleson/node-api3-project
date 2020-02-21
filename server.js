const express = require('express');
const { logger } = require('./custom-middleware/customMiddleware');
const userRouter = require('./users/userRouter');
const server = express();
const PORT = process.env.PORT || 3000;


server.use(logger);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.listen(PORT, console.log(`Listening on port ${PORT}`));

module.exports = server;
