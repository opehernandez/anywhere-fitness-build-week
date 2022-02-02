
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {class_id: 1, name: 'aerobics 101', type: 'workout', start_time: '10:45AM', duration: 20, int_level: 'medium', location: 'room 1', users_registered: 0, max_class_size: 30, inst_id: 2},
        {class_id: 2, name: 'lyfting', type: 'workout', start_time: '8:30AM', duration: 20, int_level: 'high', location: 'room 2', users_registered: 0, max_class_size: 60, inst_id: 1},
        {class_id: 3, name: 'yoga', type: 'meditation', start_time: '4:15PM', duration: 20, int_level: 'low', location: 'room 3', users_registered: 0, max_class_size: 20, inst_id: 3},
      ]);
    });
};
