
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructors').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert([
        {inst_id: 1, username: 'user1', email: 'testEmail1@gmail.com', password: 'testPasword1'},
        {inst_id: 2, username: 'user2', email: 'testEmail2@gmail.com', password: 'testPasword2'},
        {inst_id: 3, username: 'user3', email: 'testEmail3@gmail.com', password: 'testPasword3'}
      ]);
    });
};
