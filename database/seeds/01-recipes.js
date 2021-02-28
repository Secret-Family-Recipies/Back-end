
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { title: "Eggs", createdBy: "Grandma", ingredients: "cake, eggs,", instructions:"Love",},
        { title: "pasta", createdBy: "mom",  ingredients: "angel hair pasta, ", instructions:"Love"},
        { title: "oj", createdBy: "dad",  ingredients: "oranges", instructions:"Love",}
      ]);
    });
};
