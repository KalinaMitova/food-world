const express = require('express')
const authCheck = require('../middleware/auth-check');
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');
const User = require('../models/User');

const router = new express.Router()

function validateRecipeForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.make = 'Title must be more than 5 symbols.'
  }

  if (!payload || typeof payload.ingredients !== 'string' || payload.ingredients.length < 3) {
    console.log(payload.ingredients)
    isFormValid = false
    errors.ingredients = 'Each ingredient must be in a new row!'
  }

  if (!payload || typeof payload.directions !== 'string' || payload.directions.length < 50) {
    isFormValid = false
    errors.directions = 'Directions at least 50 symbols.'
  }

  if (!payload || !payload.category) {
    isFormValid = false
    errors.category = 'Category is required!'
  }

  if (!payload || typeof payload.imageUrl !== 'string' ||             payload.imageUrl.trim().length === 0) {
      isFormValid = false
      errors.image = 'Image URL is required.'
    }else{
        if (!payload.imageUrl.startsWith('http')) {
                isFormValid = false
                errors.image = 'Image URL must  starts with "http" or "https".'
              }
              if (!(payload.imageUrl.endsWith('.jpg') || payload.imageUrl.endsWith('.png') )) {
                isFormValid = false
                errors.image = 'Image URL must  ends with "jpg" or "png".'
              }
      }


  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const recipe = req.body
  recipe.creator = req.user._id

  const validationResult = validateRecipeForm(recipe)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  Recipe.create(recipe)
    .then(() => {
        res.status(200).json({
        success: true,
        message: 'Recipe added successfully.',
        recipe
      })
    }).catch(err =>{
        if(err.code === 11000){
          console.log(err);
        return res.status(401).json({
        success: false,
        message: `Recipe "${recipe.title}" already exists. Please choose another one.`
        })
      }

      })
})

router.get('/all',(req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  Recipe.find()
  .populate('creator')
    .then(recipes => {
      return res.status(200).json(recipes)
    })
})

router.get('/:categoryName' ,(req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search
  const categoryName = req.params.categoryName

  Recipe.find({category: categoryName})
  .populate('creator')
    .then(recipes => {
      return res.status(200).json(recipes)
    })
})

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        title: recipe.title,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        category: recipe.category,
        creator: recipe.creator,
      }

      if (recipe.imageUrl) {
        response.imageUrl = recipe.imageUrl
      }

      res.status(200).json(response)
    })
})

router.get('/user', authCheck, (req, res) => {
  const user = req.user.id
console.log(use)
  Recipe.find()
    .then((recipes) => {
      console.log(recipes)
      return res.status(200).json(recipes)
    })
})

router.get('/user/favorite', authCheck, (req, res) => {
  const userId = req.user._id

  User.findById(userId)
  .populate('favorites')
    .then((user) => {
      return res.status(200).json(user.favorites)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user._id

  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(200).json({
          success: false,
          message: 'recipe does not exists!'
        })
      }

      if ((recipe.creator.toString() != user && !req.user.roles.includes("Admin"))) {
         return res.status(401).json({
           success: false,
           message: 'Unauthorized!'
         })
      }

      Recipe.findByIdAndDelete(id)
        .then(() => {
          Category.update(
            {_id: recipe.category},
            {$pull: {resipes: recipe.id}},
            {multy: true}
            )
          return res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully!'
          })
        })
    })
})

router.put('/edit/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const recipe = req.body;

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: 'Recipe does not exists!'
    })
  }

  if ((recipe.creator.toString() != req.user._id && !req.user.roles.includes("Admin"))) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!'
    })
  }

  const validationResult = validateRecipeForm(recipe)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Recipe.findByIdAndUpdate(id, recipe)
    .then((r) => {
      return res.status(200).json({
        success: true,
        message: 'Recipe edited successfully!',
        recipeNew: recipe,
        recipeAfterUpdate: r
      })
  })
})

    router.post('user/favorite/add/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user;
  user.favorites.push(id);
  user.save()
  .save()
        .then((user) => {
          res.status(200).json({
            success: true,
            message: 'Recipe added to favorites successfully.',
            data: recipe
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        });
  console.log("HA HA HA HA HA")
  console.log(user)
  // Recipe
  //   .findById(id)
  //   .then(recipe => {
  //     if (!recipe) {
  //       const message = 'Recipe not found.'
  //       return res.status(200).json({
  //         success: false,
  //         message: message
  //       })
  //     }

    //   let likes = recipe.likes
    //   if (!likes.includes(username)) {
    //     likes.push(username)
    //   }
    //   recipe.likes = likes
    //   recipe
    //     .save()
    //     .then((recipe) => {
    //       res.status(200).json({
    //         success: true,
    //         message: 'Recipe added to favorites successfully.',
    //         data: recipe
    //       })
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       const message = 'Something went wrong :('
    //       return res.status(200).json({
    //         success: false,
    //         message: message
    //       })
    //     })
    // })
    // .catch((err) => {
    //   console.log(err)
    //   const message = 'Something went wrong :('
    //   return res.status(200).json({
    //     success: false,
    //     message: message
    //   })
    // })
})

router.post('user/favorite/remove/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user
  if (user.favorites.includes(user.id)) {
        const index = user.favorites.indexOf(user.id)
        user.favorites.splice(index, 1)
      }
  user.save()
  .save()
        .then((user) => {
          res.status(200).json({
            success: true,
            message: 'Recipe removed from favorites successfully.',
            data: recipe
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        });

  // Recipe
  //   .findById(id)
  //   .then(recipe => {
  //     if (!recipe) {
  //       let message = 'Recipe not found.'
  //       return res.status(200).json({
  //         success: false,
  //         message: message
  //       })
  //     }

  //     let likes = recipe.likes
  //     if (likes.includes(username)) {
  //       const index = likes.indexOf(username)
  //       likes.splice(index, 1)
  //     }

  //     recipe.likes = likes
  //     recipe
  //       .save()
  //       .then((recipe) => {
  //         res.status(200).json({
  //           success: true,
  //           message: 'Recipe unliked successfully.',
  //           data: recipe
  //         })
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         const message = 'Something went wrong :('
  //         return res.status(200).json({
  //           success: false,
  //           message: message
  //         })
  //       })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     const message = 'Something went wrong :('
  //     return res.status(200).json({
  //       success: false,
  //       message: message
  //     })
  //   })
})


module.exports = router
