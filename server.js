const path = require('path');
// express setup and basic api
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

// we can call the function here connectDB()
connectDB();

const app = express();

// Static Folder, we use middleware
app.use(express.static(path.join(__dirname, 'public'))); // that one line will make the public folder static , that means that express can have html file , css file and so on.

// body parser middleware
app.use(express.json()); // that allows us to send rout json to the server.

// cors middleware to enable making request from our frontend to our backend api or any api.
// app.use(cors) that will enable you to make a request from anywhere.
app.use(cors({
  origin:['http://localhost:5000', 'http://localhost:3000'],
  credentials: true, // it's gonna be an array that you allow to make a request from.
}))

app.use(express.urlencoded({ extended: false }));
// these lines above allows us to send req.body.whateverfield
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

