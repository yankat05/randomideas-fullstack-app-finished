const express = require('express');
// using route 
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: 'Positive Newsletter , a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
]
// Get all ideas
router.get('/', (req , res) => { 
  res.json({ success: true, data: ideas });
})

// Get one idea
// we use query param like /:id , we access /:id with req.params.id
router.get('/:id', (req , res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id); 
  
  if (!idea) {
    return res.status(404).json({ success: false, error: 'Resource not found' });
  }

  res.json({ success: true, data: idea });
})

// Update an idea
router.put('/:id', (req , res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id); 
  
  if (!idea) {
    return res.status(404).json({ success: false, error: 'Resource not found' });

  }
  
  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;
  
  res.json({ success: true, data: idea });
})

// post a single idea

router.post('/' , (req , res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0 , 10), // that should give us the number date
  }

  ideas.push(idea);

  res.json({ success: true , data: idea });
})

// Delete an idea 

router.delete('/:id', (req , res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id); 
  
  if (!idea) {
    return res.status(404).json({ success: false, error: 'Resource not found' });

  }
  const index = ideas.indexOf(idea);
  ideas.splice(index , 1);
  
  // ideas.splice(req.params.id - 1 , 1);
  
  res.json({ success: true, data: idea })
})

// to send a data with http request , we do that through the body, to do that with express , we actually need to add a peace of middleware, and middleware is something that happens between the request and the response.

// req.body.whateverfield

// we're gonna connect the api/ideas to this file.

module.exports = router;