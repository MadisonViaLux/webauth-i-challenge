const express = require('express')
const users = require('./user-model')
const router = express.Router()
const bcrypt = require('bcryptjs')


router.get('/users', protected, (req, res) => {
    users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
  });

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
  
    user.password = hash

    users.add(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    });

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if(username && password){
        users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    res.status(200).json({ message: `WAZZZZAAAHHP ${user.username}!!!` });
                } else {
                    res.status(401).json({ message: 'YOU SHALL NOT PASS' });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(400).json({message: 'fix you stuff boi'})
    }
});



/////////////////////////////////////////////////////
//Middleware


function protected(req, res, next){
    const {username, password} = req.headers
  
    if(username && password){
        users.findBy({ username })
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    next();
                } else {
                    res.status(401).json({ message: 'YOU SHALL NOT PASS' });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(400).json({message: 'fix you stuff boi'})
    }
}





module.exports = router