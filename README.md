# Aplicação de Notas
Nessa entrega desenvolvemos um serviço simples onde usuários podem gerenciar anotações, utilizando Node.js e o Framework Express.js.

## Como instalar e rodar?

Clonar repositório:

```
git clone git@gitlab.com:keila_passos/aplicacao-de-notas.git
```

## Utilização
Para utilizar este sistema, é necessário utilizar um API Client, como o Insomnia



## Rotas

### Usuários

Usuário - POST /users
Para criação de um usuário

- exemplo de requisição:

```
{
  "name": "Patrick",
  "cpf": "98765432100"
}
```

- retorno da requisição 201 CREATED
```
{
  "id": "gt545re8-9aff-4024-b786-d2cfa25c9839",
  "name": "Patrick",
  "cpf": "98765432100",
  "notes": []
}
```

Usuário - GET /users
Para listagem de usuários

- requisição sem body

- retorno da requisição - 200 ok
```
[
  {
    "id": "gt545re8-9aff-4024-b786-d2cfa25c9839",
    "name": "Patrick",
    "cpf": "98765432100",
    "notes": []
  }
]
```

Usuário - PATCH - /users/<{cpf}> 
Para atualizar usuário

- exemplo de requisição

```
{
  "name": "Patrick da Silva",
  "cpf": "98765432100"
}
```

- retorno da requisição - 200 ok

```
{
  "message": "User is updated",
  "users": [
    {
      "id": "gt545re8-9aff-4024-b786-d2cfa25c9839",
      "name": "Patrick da Silva",
      "cpf": "98765432100",
      "notes": []
    }
  ]
}
```

Usuário - DELETE /users/<{cpf}> 
Para deletar um usuário

- requisição sem body

- retorno da requisição - 200 ok
```
{
  "message": "User is deleted",
  "users": []
}
```

### Anotações

Anotações - POST /users/<{cpf}>/notes
Para criar uma anotação

- exemplo de requisição

```
{
  "title": "Dica",
  "content": "Organizar meu dia"
}
```
- retorno da requisição - 201 CREATED

```
{
  "message": "Dica was added into Patrick da Silva's notes"
}
```

Anotações - GET /users/<{cpf}>/notes
Para listagem de anotações

- requisição sem body

- retorno da requisição - 200 ok

```
[
  {
    "id": "bf526ce8-9aff-4024-b786-d2cfa25c9839",
    "created_at": "2021-11-24T17:10:41.253Z",
    "title": "Dica",
    "content": "Organizar meu dia pela manhã"
  }
]
```

Anotações - PATCH /users/<{cpf}>/notes/<{id}>
Para atualizar anotação

- exemplo de requisição

```
{
  "title": "Dica 1",
  "content": "Organizar meu próximo dia no final da tarde"
}
```

- retorno da requisição - 200 ok

```
[
  {
    "id": "bf526ce8-9aff-4024-b786-d2cfa25c9839",
    "created_at": "2021-11-24T17:10:41.253Z",
    "title": "Dica 1",
    "content": "Organizar meu próximo dia no final da tarde",
    "updated_at": "2021-11-24T17:13:21.281Z"
  }
]
```

Anotações - DELETE /users/<{cpf}>/notes/<{id}>
Para deletar anotação

- requisição sem body

- retorno da requisição - 200 ok
```

  []

```







