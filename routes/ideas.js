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

// we're gonna connect the api/ideas to this file.

module.exports = router;