const taskServices = require('../services/taskServices');


// Lê o corpo da requisição e retorna um objeto JSON
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        
        req.on('data', chunk => { //quando chegar um pedaço de dados da requisição, ele é adicionado à variável body
            body += chunk.toString();
        });

        req.on('end', () => { //quando a requisição terminar, a função é chamada para resolver a promessa
            resolve(JSON.parse(body)); //converte a string JSON em um objeto JavaScript e retorna esse objeto para quem chamou a função getRequestBody
        });
    });
};

//FUNÇÃO QUE SERVE COM ENDPOINT DA CRIAÇÃO DE TAREFAS
const createTask = async (req, res) => {
    const body = await getRequestBody(req);

    const task = taskServices.addTask(body.title);

    res.statusCode = 201;
    res.end(JSON.stringify(task));
};

//FUNÇÃO QUE SERVE COM ENDPOINT DA LISTAGEM DE TAREFAS
const listTasks = (req, res) => {
    const tasks = taskServices.getTasks();

    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
};

//FUNÇÃO QUE SERVE COM ENDPOINT DA ATUALIZAÇÃO DE UMA TAREFA
const updateTask = async (req, res, id) => {
    const body = await getRequestBody(req);

    const task = taskServices.updateTask(id, body.title);

    if(!task) {
        res.statusCode = 404;
        return res.end (JSON.stringify(
            { mensage: 'Não encontrada'})
        );
    }

    res.end(JSON.stringify(task));
};

//FUNÇÃO QUE SERVE COM ENDPOINT DA EXCLUSÃO DE UMA TAREFA
const deleteTask = (req, res, id) => {
    const sucess = taskServices.deleteTask(id);

    if(!sucess) {
        res.statusCode = 404;
        return res.end (JSON.stringify(
            { mensagem: 'Não encontrada'})
        );
    }
    res.end(JSON.stringify({ mensage: 'Removida' }));
};

const updateTaskCompleted = async (req, res, id) => {
    const body = await getRequestBody(req);

    const task = taskServices.updateTaskCompleted(id, body.completed);

    if (!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ mensagem: 'Não encontrada' }));
    }

    res.end(JSON.stringify(task));
};

const getTaskById = (req, res, id) => {
    const task = taskServices.getTaskById(id);

    if (!task) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ mensagem: 'Tarefa não encontrada' }));
    }

    res.end(JSON.stringify(task));
};

module.exports = {
    createTask,
    listTasks,
    updateTask,
    deleteTask,
    updateTaskCompleted,
    getTaskById
}