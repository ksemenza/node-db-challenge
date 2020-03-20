
exports.up = function(knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable().index();
        tbl.string('description', 400);
        tbl.boolean('completed').defaultTo(false);
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable().index();
        tbl.boolean('completed').defaultTo(false);
        tbl.string('description', 400).notNullable();
        tbl.string('notes', 400);
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');      
    })
    .createTable('resources', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable().index();
        tbl.string('description', 400);
    })
    .createTable('project_resources', tbl => {
        tbl.increments();
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            // .onDelete('RESTRICT');
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources')
            .onUpdate('CASCADE')
            // .onDelete('RESTRICT');  
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects')
};
