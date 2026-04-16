const { createTask } = require('../models/taskModel'); //importa a estrutura da nossa tarefa que foi criada no model

let tasks = [
    // { id: 1, title: "Estudar JavaScript" },
    // { id: 2, title: "Fazer exercícios de JavaScript" },
];

// console.log(addTask("Estudar JavaScript"));
// console.log(deleteTask(1));

let idCounter = 1;

// FUNÇÃO PARA ADICIONAR UMA NOVA TAREFA
const addTask = (title) => {
    const task = createTask(idCounter++, title); 
    tasks.push(task); 
    return task;
};

const getTasks = () => tasks; 

//FUNÇÃO PARA ATUALIZAR O TÍTULO DE UMA TAREFA
const updateTask = (id, title) => {
    const task = tasks.find(t => t.id == id); //procura a tarefa com o id fornecido e retorna essa tarefa, se não encontrar retorna undefined
    if(!task) return null;

    task.title = title; //atualiza o título da tarefa encontrada e retorna a tarefa atualizada
    return task;
}

//FUNÇÃO PARA EXCLUIR UMA TAREFA
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id == id);

    if (index == -1) return false;

    tasks.splice(index, 1); //remove a tarefa do array de tarefas usando o índice encontrado e o método splice, que remove um elemento do array a partir do índice especificado
    return true;
};

const updateTaskCompleted = (id, completed) => {
    const task = tasks.find(t => t.id == id);
    if (!task) return null;

    task.completed = completed; // atualiza o status de conclusão da tarefa encontrada e retorna a tarefa atualizada
    return task;
};

const getTaskById = (id) => {
    return tasks.find(t => t.id == id) || null;
};


module.exports = {
    addTask,
    getTasks, 
    updateTask,
    deleteTask,
    updateTaskCompleted,
    getTaskById
};