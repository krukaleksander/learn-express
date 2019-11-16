const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');


/* GET home page. */
router.get('/', (req, res) => {
    // show jest do blokowania ponownego głosu!
    const show = !req.session.vote;
    Quiz.find({}, (err, data) => {
        let sum = 0;
        data.forEach((item) => {
            sum += item.vote;
        })
        res.render('quiz', {
            title: 'Quiz',
            data,
            show,
            sum
        });
    })

});
router.post('/', (req, res) => {
    // dlatego na końcu jest quiz bo ustawiliśmy w quiz.pug nazwę radio 
    // buttona na quiz
    const id = req.body.quiz;
    Quiz.findOne({
        _id: id
    }, (err, data) => {
        data.vote = data.vote + 1;
        data.save((err) => {
            // zablkowanie oddawania kolejnego głosu
            req.session.vote = 1;
            // redirect w save zeby wykonał się wewnątrz funkcji przy zapisie danych.
            res.redirect('/quiz');
        });

    })

});
module.exports = router;