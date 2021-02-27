const knex = require('knex')
const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development)

module.exports = {
    addRecipe,
    findRecipe,
    findRecipeById,
    updateRecipe,
    removeRecipe
}

function findRecipe () {
    return db('recipes')
}

function findRecipeById (id) {
    return db('recipes')
    .where({id: id})
    .first()
}


function addRecipe (recipe) {
    return db('recipes')
    .insert(recipe)
    .then(ids => ({ id: ids[0]}))
}

function updateRecipe ( id,recipe) {
    return db('recipes')
    .where({id: id})
    .update(recipe)
}

function removeRecipe (id) {
    return db('recipes')
    .where({id: id})
    .del()
}