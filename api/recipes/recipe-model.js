const db = require('../../database/dbConfig')

module.exports = {
    addRecipe,
    findRecipe,
    findRecipeById,
    updateRecipe,
    removeRecipe
}

function findRecipe() {
    return db('recipes')
}

function findRecipeById(id) {
    return db('recipes')
    .where({id: id})
    .first()
}


async function addRecipe(recipe) {
    const [id] = await db("recipes").insert(recipe, "id")
    return findRecipeById(id)
}

async function updateRecipe( id, changes) {
    await db('recipes').where({ id }).update(changes)
    return await findRecipeById(id)
}

function removeRecipe(id) {
    return db('recipes')
    .del()
    .where({id})
}