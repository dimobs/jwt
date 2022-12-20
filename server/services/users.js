const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'IloveMilka';
const blacklist = [];

async function register(email, password) {
    const existing = await User.findOne({ email: RegExp(`^${email}$`, 'i') });

    if (existing) {
        throw new Error('Email already exists');
    }

    const user = new User({
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    });

    await user.save();
    return createSession(user)
};

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}`, 'i') })

    if(!user) {
        throw new error('Icorect email or password')
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if(!match){
        throw new Error('Incorect user name or password');
    }

    return createSession(user);
};

function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    }
}

function veryfySession(token) {
    if(blacklist.includes(token)) {
        throw new Error('Token is invalidated');
    }
  const payload = jwt.verify(token, JWT_SECRET); 

  return {
    email: payload.email,
    _id: payload._id,
    token
  }
}
 
function logout (token) {
blacklist.push(token);
}

module.exports = {
    register,
    login,
    logout,
    veryfySession
};