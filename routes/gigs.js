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
    let {title,technology,budget,description} = req.body;
    let errors = [];

    if(!title){
        errors.push({text: 'Please add a title'})
    }
    if(!technology){
        errors.push({text: 'Please add a technology'})
    }
    if(!description){
        errors.push({text: 'Please add a description'})
    }
  
    // check errors
    if(errors.length >0){
        res.render('add', {
            errors, 
            title,
            technology,
            budget,
            description
        });
    }else{
        if(!budget){
            budget = 'Unknown';
        }else {
            budget = `$${budget}`;
        }
        // make lower case
        technology = technology.toLowerCase().replace(/, /g, ',');
        // insert into table
    Gig.create({
        title, 
        technology,
        description,
        budget
    })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));

    }


});

// serach for gigs


module.exports = router;
  