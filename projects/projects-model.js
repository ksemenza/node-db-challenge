module.exports = {
    getProjects,
    addProject,
    getProject,
    getProjectWithDetails,
    getProjectResources,
    removeProject,
    updateProject
}

const Tasks = require('../tasks/tasks-model.js');

const db = require('../data/db-config.js');

function getProjects() {
    return db('projects');
}

function addProject(newProject) {
    const project = {
        name: newProject.name,
        description: newProject.description,
        completed: newProject.completed || 'false'
    }

    return db('projects')
        .insert(project)
        .then(ids => {
            return getProject(ids[0]);
        })
}

function getProject(project_id) {
    return db('projects')
        .where({ id: project_id})
        .first();
}

async function getProjectWithDetails(project_id) {
    const tasks = await Tasks.getTasksForProject(project_id);
    const details = await getProject(project_id);
    const resources = await getProjectResources(project_id);

    return {
        'id': details.id,
        'name': details.name,
        'description': details.description,
        'completed': details.completed,
        'tasks': tasks,
        'resources': resources
    }
}

function getProjectResources(project_id) {
    return db('project_resources')
        .join('resources', 'resources.id', 'project_resources.resource_id')
        .where('project_id', project_id)
        .select('resources.id', 'resources.name', 'resources.description');
}

async function removeProject(project_id) {
    const project = await getProject(project_id);

    return db('projects')
        .where({id : project_id})
        .del()
        .then(() => {
            return project;
        });
}

function updateProject(project_id, updatedProject) {
    return db('projects')
        .where({id : project_id})
        .update(updatedProject)
        .then(count => {
            return getProject(project_id);
        });
}