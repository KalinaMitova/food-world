const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  directions:{
    type: mongoose.Schema.Types.String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.String,
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
