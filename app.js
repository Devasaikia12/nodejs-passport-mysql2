const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

require('./uttils/passport-local')(passport)
require('./uttils/passport-google')(passport)
//--set layouts view engin
app.use(expressLayouts)
app.set('view engine', 'ejs')

//--app setup body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//---routes include here--

//--- set session --
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    //cookie: { httpOnly: true, secure: false, maxAge: 1 * 24 * 60 * 60 * 1000 },
  })
)

//-- app passport middleware
app.use(passport.initialize())
app.use(passport.session())
//--- app set flash message
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

//--- routes load here ---
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/user'))
app.use('/dashboard', require('./routes/dashboard'))


module.exports = app