const express = require('express')
const router = express.Router()
const Recipes = require('./recipe-model')

// /api/recipe
//read
router.get('/', async (req,res) => {
    try{
        const recipe = await Recipes.findRecipe()
        res.json(recipe)
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

router.get('/:id', async (req,res) => {
    const { id } = req.params
    try{
        const recipe = await Recipes.findRecipeById(id)
        if (recipe) {
            res.json(recipe)
        }else {
            res.status(404).json({message: "invalid id"})
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

//create
router.post('/', async (req,res) => {
    try{
        const recipe = await Recipes.addRecipe(req.body)
       res.json(recipe)
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

//update
router.put('/:id', async (req,res) => {
    const {id} = req.params
    const changes = req.body

    try{
        const changeRecipe = await Recipes.updateRecipe(id,changes)
        if(changeRecipe) {
            res.json(changeRecipe)
        }else {
            res.status(404).json({message: 'invalid id'})
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

//del
router.delete('/:id', async (req,res) => {
    const { id } = req.params

    try{
        const deleteRecipe = await Recipes.removeRecipe(id)
        if(deleteRecipe) {
            res.json({message: "recipe deleted"})
        }else{
            res.status(404).json({message: "invalid id"})
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

module.exports = router