// express setup and basic api
const express = require('express');

const port = 5000;

const app = express();
// this app is an object containing all kind of methods , like creating routes, our server etc..



// creating a route , we use get , post , delete and put

//every route has its request and response object.

app.get('/', (req , res) => { 
  res.json({ message: 'Welcom' });
})

// get = /api/ideas
// post = /api/ideas
// put = /api/ideas/id
// delete = /api/ideas/id

// to use the middleware we use .app.use(the path of the json , where it should go to)

const ideasRouter = require('./routes/ideas');

app.use('/api/ideas' , ideasRouter);
// when we use middleware, to say if we want to go to /api/ideas , so we're gonna look at that in that file


// to create a server we use .listen() , then we pass in a port
app.listen(port , () => console.log(`Server listening on port ${port}`));

// nodemon will constantly watch server with changes without keep restarting the server.