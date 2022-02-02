exports.up = function (knex) {
  return knex.schema.createTable('instructors', inst => {
    inst.increments('inst_id')
    inst.string('email', 255).notNullable()
    inst.string('username', 255).notNullable()
    inst.string('password').notNullable()
  })
  .createTable('classes', classes => {
    classes.increments('class_id');
    classes.string('name').notNullable()
    classes.string('type').notNullable()
    classes.date('start_time').notNullable()
    classes.int('duration').notNullable()
    classes.string('int_level').notNullable()
    classes.string('location').notNullable()
    classes.integer('users_registered').defaultTo(0)
    classes.integer('max_class_size').defaultTo(30)
    classes.integer('inst_id')
      .notNullable()
      .references('inst_id').inTable('instructors')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
  })
  .createTable('users', users => {
    users.increments('user_id');
    users.string('email', 255).notNullable().unique();
    users.string('username', 255).notNullable().unique();
    users.string('password', 255).notNullable();
  })
  .createTable('users_classes', uc => {
    uc.increments()
    uc.integer('class_id')
      .notNullable()
      .references('class_id').inTable('classes')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    uc.integer('user_id')
      .notNullable()
      .references('user_id').inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users_classes')
  .dropTableIfExists('users')
  .dropTableIfExists('classes')
  .dropTableIfExists('instructors')
};
