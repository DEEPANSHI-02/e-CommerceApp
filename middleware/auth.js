const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApprovedEmail = require("../models/ApprovedEmail");

// ==================
// Passport Strategy
// ==================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if email is approved
        const email = profile.emails[0].value;
        const isApproved = await ApprovedEmail.findOne({ email });

        if (!isApproved) {
          return done(null, false, { message: "Email not approved" });
        }

        // Check or create user
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
            role: isApproved.role,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Session handlers
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

// ==================
// Middleware
// ==================

// Check if user is authenticated (Passport session)
exports.protect = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Not authenticated" });
};

// Role-based middleware
exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: "Access denied" });
  };
};

// Rider-specific middleware
exports.isRider = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user.role === 'rider') {
    return next();
  }
  return res.status(403).json({ message: "Access denied: rider only" });
};
