exports.seed = function (knex) {
  return knex("users").insert([
    { id: 1, username: "first_user", password: "first_user_test" },
  ]);
};
