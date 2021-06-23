const router = require('express').Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const user = require('../models/user')
//----@method : GET
//----Desc : login router
router.route('/login').get((req, res) => {
  res.render('Login')
})
router.route('/login').post(async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next)
})
//----@method : GET
//----Desc : Register router
router.route('/register').get((req, res) => {
  res.render('register')
})

router.route('/register').post(async (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push('Please fill all the fields')
  }
  if (password !== password2) {
    errors.push('pasword not match')
  }
  if (password.length < 6) {
    errors.push('Password must have atleast 6 characters long')
  }
  if (errors.length > 0) {
    res.render('register', { name, email, password, password2, errors })
  } else {
    const userExist = await user.findOne('user', 'email', 'email = ?', email)
    //console.log(userExist.length)
    if (userExist) {
      req.flash('error_msg', 'Email already exist try another one.')
      res.render('register', { name, email, password, password2, errors })
    } else {
      const data = {
        provider: 'local',
        providerId: null,
        name,
        email,
        password,
      }
      const hashPassword = await bcrypt.genSalt(10, (err, salt) => {
        return bcrypt.hash(data.password, salt, (err, hash) => {
          if (err) throw err
          //--hash user password
          data.password = hash
          //--save user to the database--
          user
            .create('user', data)
            .then((u) => {
              req.flash(
                'success_msg',
                'You are sucessfuly registered, now you can login'
              )
              res.redirect('/users/login')
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
    }
  }
})

//---@desc: google authentication ---
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

//-- google auth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard')
  }
)

module.exports = router
