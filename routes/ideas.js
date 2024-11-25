const express = require('express');
// using route 
const router = express.Router();
// we bring the model here
const Idea = require('../models/Idea');

// Get all ideas
// we use model.find() to get all document , ideas
router.get('/', async (req , res) => { 
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Get one idea
// we use query param like /:id , we access /:id with req.params.id
router.get('/:id', async (req , res) => {
    
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
})

// Update an idea
router.put('/:id', async (req , res) => {
  // $set will contain all the field that we want to update
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the username
    if (idea.username === req.body.username) { 
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag
          }
        },
        { new: true } 
      );
      //new: true means that if that idea doesn't exist , it will create one.
      return res.json({ success: true, data: updatedIdea });
    }

    // Usernames do not match
    res.status(403).json({ success: false, error: 'You are not authorized to update this resource' });
    
    // findByIdAndUpdate() will take three arguments, the id , the  object containing $set object, and and an object with new: true, and it will return the updatedIdea.
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
})

// add a single idea
// to add an idea , we're gonna instatiate an new Idea from our model
router.post('/' , async (req , res) => {
  const idea = new Idea ({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    // date: new Date().toISOString().slice(0 , 10), // that should give us the number date

    // the new Idea will take in an object containing the fields that were on the schema except for id and date these will be added automaticaly
  })

  try {
    const savedIdea = await idea.save();
    res.json({ success: true , data: savedIdea });
    //idea.save() will save in the database and it will return that idea
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }

  
})
// .save() we use it in the instatiated idea, unlike .find() we use it directly on the Idea variable, all these methods are promises.

// Delete an idea 

router.delete('/:id', async (req , res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the username
    if (idea.username === req.body.username) { 
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // Usernames do not match
    res.status(403).json({ success: false, error: 'You are not authorized to delete this resource' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
  // ideas.splice(req.params.id - 1 , 1);
  
})

// to send a data with http request , we do that through the body, to do that with express , we actually need to add a peace of middleware, and middleware is something that happens between the request and the response.

// req.body.whateverfield

// we're gonna connect the api/ideas to this file.

module.exports = router;