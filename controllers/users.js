const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')


module.exports = {
  index: (req, res) => {
    User.find({})
        .then(users => res.json(users))
  },
  signup: (req, res) => {
    console.log(req.body)
    if (req.body.email && req.body.password) { 
      bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err){
          console.log("hashing error:", err);
          res.status(200).json({error: err})
        } else {
        let newUser = req.body
        newUser.password = hash
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            User.create(newUser)
              .then(user => {
                if (user) {
                  let payload = { user: user }
                  let token = jwt.encode(payload, config.jwtSecret)
                  res.json({ payload, token })
                } else {
                  res.json({err:'create user error'})
                }
              }) 
          } else {
            res.json({err:'error2'})
          }
        })
      }})
    } else {
      res.json({err:'error3'})
    }
  },
  login: (req, res) => {
    console.log(req.body)
    if (req.body.email && req.body.password) {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, match) => {
            if (match) {
              let payload = { id: user.id }
              let token = jwt.encode(payload, config.jwtSecret)
              res.json({ token })
            } else {
              res.json({error:'username/password incorrect'})
            }
          })
        } else {
          res.json({error:'No user found'})
        }
      })
    } else {
      res.json({error:'username/password incorrect'})
    }
  },
  update: (req, res) => {
    console.log(req.body)
            User.findByIdAndUpdate(req.body._id, req.body, {new : true}, (err, user) => {
              if (err) return res.status(500).send(err);
              return res.send(user)
            })       
  },
  delete: (req, res) => {
                  User.deleteOne({email: req.params.email}, (err, deletedUser)=>{
                    if (err) {
                      res.json({err:'delete user error'})
                    }
                    console.log("user deleted")
                    res.json(deletedUser)
                  })
  }
}    
