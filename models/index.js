import mongoose from 'mongoose';

mongoose.connect("mongodb://" + process.env.MONGOLAB_URI);

module.exports.Sites = require('./site.js');
