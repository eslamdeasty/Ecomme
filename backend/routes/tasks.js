var express = require('express')
var router = express.Router()
var mongoose = require('mongoose');
const User = require('../models/user');
const Task = require('../models/task');
// Get All Tasks
router.post('/tasks/', function(req, res, next) {

    Task.find({
            user: req.body._id
        },
        function(err, tasks) {
            if (err) {
                res.send(err)
            }
            res.json(tasks)
        })
})

// Get Single Task
router.get('/task/:id', function(req, res, next) {
    Task.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, function(
        err,
        task
    ) {
        if (err) {
            res.send(err)
        }
        res.json(task)
    })
})

//Save Task
router.post('/task', function(req, res, next) {
    var task = req.body

    var newTask = new Task({
        title: req.body.title,
        user: mongoose.Types.ObjectId(req.body._id)
    })
    if (!task.title) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })

    } else {
        newTask.save(function(err, task) {
            if (err) {
                res.send(err)
            }
            res.json(task)
            User.findById({ _id: mongoose.Types.ObjectId(req.body._id) }).then(
                (user) => {

                    user.tasks.push(newTask);
                    user.updateOne(user, (err, raw) => {

                    })
                }
            )

        })
    }
});

// Delete Task
router.delete('/task/:id/:userid', function(req, res, next) {
    Task.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }, function(
        err,
        task
    ) {
        if (err) {
            res.send(err)
        }


        User.findOne({ _id: mongoose.Types.ObjectId(req.params.userid) }).then(
            (user) => {
                const removedTask = {
                    _id: mongoose.Types.ObjectId(req.params.id),
                }
                var index = user.tasks.indexOf(removedTask)
                user.tasks.splice(index, 1)
                user.updateOne(user, (err, raw) => {})
            }
        ).catch(
            (err) => console.log(err)
        )

        res.json(task)
    })
})

// Update Task
router.put('/task/:id', function(req, res, next) {
    const upTask = req.body;

    if (!upTask) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Task.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, { title: req.body.title },
            function(err, task) {
                if (err) {
                    res.send(err)
                }
                res.json(task)
            })

    }
})

module.exports = router