# Desafio Rocket Node

Primeiro desafio da rocketseat de NodeJS utilizei o express para poder ajudar na hora de montar as rotas de tasks

### 🔧 Instalação

Para instalar o express realizar o seguinte comando:

```
npm install
```

## ⚙️ Executando os testes

Para realizar os testes das rotas utilizar o insominia e em seguida colocar o parâmetro na URL
Segue os parâmetros para teste:

# Listar todas as tarefas

- Para listar todas as tasks devemos utilizar o parâmetro "/tasks"

```
http://sua-url/tasks
```
Dessa forma vai listar todas as tasks criadas

- Para criar uma task fazer da seguinte forma

```
http://sua-url/tasks
```
Em seguida colocar os parametros 

```
{
	"title": "Desafio",
	"description": "TESTE",
	"updated_at": "Sem Update"
}
```

- Listar uma task pelo titulo
Passar o seguinte parâmetro para a url

```
http://sua-url/tasks/tituloTask
```
- Deletar uma task pelo ID
Para deletar uma task utilizamos do ID criado no método POST

```
http://sua-url/tasks/idTask
```

- Atualizar uma informação
Quando queremos atualizar uma informação da task(no caso so podem ser alteradas o title e a description) vamos passar o ID na URL:

```
http://sua-url/tasks/idTask
```
E em seguida no body da requisição vamos atualizar a informação que queremos

```
{
	"title": "Desafio-Teste"
}
```

- Tarefa completa 
Para colocar a tarefa como realizada vai ser necessário um parametro a mais como complemento

```
http://sua-url/tasks/idTask/complete
```


