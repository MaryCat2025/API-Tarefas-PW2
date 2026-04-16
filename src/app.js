const http = require('http');

const taskRoutes = require('./routes/taskRoutes'); //importa as rotas para o servidor, ou seja, o roteador que vai direcionar as requisições para os controllers

const server = http.createServer((req, res) => { //cria o servidor e define a função de callback que será executada a cada requisição recebida, onde req representa a requisição e res representa a resposta que o servidor enviará de volta para o cliente

    res.setHeader('Content-Type', 'application/json'); // define o cabeçalho da resposta para indicar que o conteúdo retornado será em formato JSON

    taskRoutes(req, res); //chama a função de roteamento, passando a requisição e a resposta para que as rotas possam processar a requisição e enviar a resposta adequada de acordo com o endpoint acessado
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});