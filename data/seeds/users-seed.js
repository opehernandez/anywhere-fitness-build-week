
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {user_id: 1, username: 'user1', password: "password1", email: 'userEmail1@yahoo.com' },
        {user_id: 2, username: 'user2', password: "password2", email: 'userEmail2@yahoo.com' },
        {user_id: 3, username: 'user3', password: "password3", email: 'userEmail3@yahoo.com' },
        {user_id: 4, username: 'user4', password: "password4", email: 'userEmail4@yahoo.com' }
      ]);
    });
};