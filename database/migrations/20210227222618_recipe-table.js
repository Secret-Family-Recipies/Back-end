
exports.up = function(knex) {
  return knex.schema.createTable('recipes', t => {
      t.increments("id")
      t.string("title", 128)
      .notNullable()
      .unique()
      t.string("createdBy", 128)
      .notNullable()
      t.string("ingredients", 128)
      .notNullable()
      t.string("instructions", 228).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipes')
};
