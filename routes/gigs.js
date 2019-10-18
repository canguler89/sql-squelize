const express = require('express');
const router = express.Router();
const Squelize = require('../config/database');
const Gig = require('../models/Gig');

// get gig list 
router.get('/',(req,res)=> 
    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            res.sendStatus(200);
        })
        .catch(err => console.log(err)));
    
// add a gig
router.get('/add',(req,res)=> {
    const data = {
        title:'Looking for a react developer',
        technology:'react,JS,html,css',
        budget:'$3000',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    }
    let {title,technology,budget,description} = data;
    // insert into table
    Gig.create({
        title, 
        technology,
        description,
        budget
    })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));

});

module.exports = router;
