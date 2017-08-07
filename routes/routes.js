const express = require('express');
const routes = express.Router();
const Student = require('../models/student');

// Homepage, pull existing student data
routes.get('/', (req,res) => {
  Student.find()
  .then(students => res.render('listStudents', {students: students}))
  .catch(err => res.send('Booooooo'));
});


// Render form for entering student, if an ID exists re-render the student's data to edit
routes.get('/studentForm', (req, res) => {
  if (req.query.id) {
    Student.findById(req.query.id)
    .then(student => res.render('studentForm', {student: student}))
  } else {
    res.render('studentForm');
  }
});

// Add a student, if a student exists then update.  Load schema from models
routes.post('/saveStudent', (req, res) => {

  if (req.body.id) {
    Student.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
    .then(() => res.redirect('/'));
  } else {
    new Student(req.body)
      .save()
      // then redirect to the homepage
      .then(() => {
        res.redirect('/')})

      // catch validation errors
      .catch(err => {
        console.log(err.errors);
        res.render('studentForm', {
          errors: err.errors,
          student: req.body
        });
      });
    }

});

// Use student's ID to locate in database and delete
routes.get('/deleteStudent', (req, res) => {
  Student.findById(req.query.id)
  .remove()
  .then(() => res.redirect('/'));
});

module.exports = routes;
