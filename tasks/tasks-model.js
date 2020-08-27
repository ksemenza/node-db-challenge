module.exports = {
    getTasks,
    addTask,
    getTask,
    getTasksForProject,
    removeTask,
    updateTask
}

const db = require('../data/db-config.js');

function getTasks() {
    return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('tasks.id as task_id', 
            'tasks.name as task_name',
            'tasks.description as task_description',
            'projects.name as project_name',
            'tasks.notes as task_notes',
            'tasks.completed as task_completed')

}

function addTask(newTask) {
    const task = {
        name: newTask.name,
        project_id: newTask.project_id,
        notes: newTask.notes,
        description: newTask.description,
        completed: newTask.completed || 'false'
    }
    return db('tasks')
        .insert(task)
        .then(ids => {
            return getTask(ids[0]);
        })

}

function getTask(task_id) {
    return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('tasks.id as task_id', 
            'tasks.name as task_name',
            'tasks.description as task_description',
            'projects.name as project_name',
            'tasks.notes as task_notes',
            'tasks.completed as task_completed')
        .where({'task_id' : task_id})
        .first();
}

function getTasksForProject(project_id) {
    return db('tasks')
        .where({'project_id': project_id});
}

async function removeTask(task_id) {
        const task = await getTask(task_id);
    
        return db('tasks')
            .where({id : task_id})
            .del()
            .then(() => {
                return task;
            });
}

function updateTask(task_id, updatedTask) {
    return db('tasks')
        .where({id : task_id})
        .update(updatedTask)
        .then(count => {
            return getTask(task_id);
        });
}