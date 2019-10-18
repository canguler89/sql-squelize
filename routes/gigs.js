const express = require('express');
const router = express.Router();
const Squelize = require('../config/database');
const Gig = require('../models/Gig');

// get gig list 
router.get('/',(req,res)=> 
    Gig.findAll()
        .then(gigs => {
            res.render('gigs',{
                gigs:gigs
            });
        })
        .catch(err => console.log(err)));
    // display add gig form
router.get('/add', (req,res)=> res.render('add'));
// add a gig
router.post('/add',(req,res)=> {
    const data = {
        title:'Simple wordpress website',
        technology:'wordpress,PHP,html,css',
        budget:'$10000',
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
  