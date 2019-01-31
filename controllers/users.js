const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const db = require('../models')
const User = db.User
const HousingUnit = db.HousingUnit
const CleaningEvent = db.CleaningEvent
const Review = db.Review
const bcrypt = require('bcrypt')


module.exports = {
// User
  index: (req, res) => {
    User.find({})
        .then(users => res.json(users))
  },
  findUser: (req, res) => {
    console.log(req.params._id)
      User.find({ _id: req.params._id}, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.send(user)
    })
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
  },

// HousingUnit
  indexHousingUnit: (req, res) => {
    console.log(req.body)
    HousingUnit.find({})
      .then(housingUnits => res.json(housingUnits))
  },
  findHousingUnit: (req, res) => {
    console.log(req.params._id)
      HousingUnit.find({ _id: req.params._id}, (err, housingUnit) => {
        if (err) return res.status(500).send(err);
        return res.send(housingUnit)
    })
  },
  updateHousingUnit: (req, res) => {
    console.log(req.body)
        HousingUnit.findByIdAndUpdate(req.body._id, req.body, {new : true}, (err, housingUnit) => {
          if (err) return res.status(500).send(err);
          return res.send(housingUnit)
      })       
  },
  createHousingUnit: (req, res) => {
    console.log(req.body)
      HousingUnit.create(req.body, (err, newHousingUnit) => {
        if (err) return res.status(500).send(err)
        return res.send(newHousingUnit)
      })
  },
  deleteHousingUnit: (req, res) => {
    console.log(req.params._id)
      HousingUnit.deleteOne({_id: req.params._id}, (err, deletedHousingUnit)=>{
        if (err) {
        res.json({err:'delete HousingUnit error'})
        }
        console.log("HousingUnit deleted")
        res.json(deletedHousingUnit)
        })
  },


// CleaningEvents
  indexCleaningEvent: (req, res) => {
    console.log(req)
    CleaningEvent.find({})
        .then(cleaningEvents => res.json(cleaningEvents))
  },
  findCleaningEvent: (req, res) => {
    console.log(req.params._id)
    CleaningEvent.find({ _id : req.params._id }, (err, cleaningEvent) => {
        if (err) return res.status(500).send(err);
        return res.send(cleaningEvent)
    })
  },
  updateCleaningEvent: (req, res) => {
    console.log("udateCleaningEventRoute")
    // console.log(req.body._id)
    CleaningEvent.findByIdAndUpdate(req.body._id, req.body, {new : true}, (err, cleaningEvent) => {
          if (err) return res.status(500).send(err);
          return res.send(cleaningEvent)
      })       
  },
  createCleaningEvent: (req, res) => {
    console.log(req.body)
    CleaningEvent.create(req.body, (err, cleaningEvent) => {
        if (err) return res.status(500).send(err)
        return res.send(cleaningEvent)
      })
  },
  deleteCleaningEvent: (req, res) => {
    console.log(req.params._id)
    CleaningEvent.deleteOne({_id: req.params._id}, (err, deletedCleaningEvent)=>{
        if (err) {
        res.json({err:'delete CleaningEvent error'})
        }
        console.log("CleaningEvent deleted")
        res.json(deletedCleaningEvent)
        })
  },

  // Reviews
  indexReview: (req, res) => {
    console.log(req)
    Review.find({})
        .then(reviews => res.json(reviews))
  },
  findReview: (req, res) => {
    console.log(req.params._id)
    Review.find({ _id : req.params._id }, (err, review) => {
        if (err) return res.status(500).send(err);
        return res.send(review)
    })
  },
  updateReview: (req, res) => {
    console.log(req.body)
    Review.findByIdAndUpdate(req.body._id, req.body, {new : true}, (err, review) => {
          if (err) return res.status(500).send(err);
          return res.send(review)
      })       
  },
  createReview: (req, res) => {
    console.log(req.body)
    Review.create(req.body, (err, review) => {
        if (err) return res.status(500).send(err)
        return res.send(review)
      })
  },
  deleteReview: (req, res) => {
    console.log(req.params._id)
    Review.deleteOne({_id: req.params._id}, (err, deletedReview)=>{
        if (err) {
        res.json({err:'delete Review error'})
        }
        console.log("Review deleted")
        res.json(deletedReview)
        })
  }


}  
