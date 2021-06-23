var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/users/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const verifiedEmail =
          profile.emails.find((email) => email.verified) || profile.emails[0]
        const newuser = {
          provider: profile.provider,
          providerId: profile.id,
          name: profile.displayName,
          email: verifiedEmail.value,
          password: null,
        }
        try {
          let user = await User.findOne(
            'user',
            'id,email',
            'providerId',
            profile.id
          )
          if (user) {
            done(null, user)
          } else {
            user = await User.create('user', newuser)
            done(null, user)
          }
        } catch (error) {
          console.log(error)
        }
      }
    )
  )
  //--- serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findOne('user', 'email,password,id', 'providerId = ?', id)
      .then((user) => {
        done(null, user)
      })
      .catch((err) => {
        done(err, false)
      })
  })
}
