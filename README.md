# Alugel de Carros
## Cadastro de carro

### Requisitos Funcionais
- Deve ser possível cadastrar um novo carro.

### Regra de negócio
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.
## Listagem de carros

### Requisitos Funcionais
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todas as categorias.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

### Regra de negócio
- O usuário não precisa estar logado no sistema.

## Cadastro de Especificação no carro

### Requisitos Funcionais
- Deve ser possível cadastrar uma especificação para um carro.

### Regra de negócio
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## Cadastro de imagens do carro

### Requisitos Funcionais
- Deve ser possível cadastrar a imagem do carro.

### Requisitos não funcionais
- Utilizar o multer para upload dos arquivos.

## Regra de negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## Alugel de carro

### Requisitos Funcionais
- Deve ser possível cadastrar um alugel.

### Regra de negócio
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um alugel, o status do carro deverá ser alterado para indisponível.

## Devolução de carro

### Requisitos Funcionais
- Deve ser possível realizar a devolução de um carro.

### Regra de negócio
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolulção, o carro deverá ser liberado para outro alugel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro alugel.
- Ao realizar a devolução, deverá ser calculado o total do alugel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- caso haja multa, deverá ser somado ao total do alugel.
- O usuário deve estar logado na aplicação.

