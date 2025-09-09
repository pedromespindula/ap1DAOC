Este projeto é uma aplicação web desenvolvida para a disciplina de Desenvolvimento de Aplicações Orientada a Componentes (AP1). A aplicação é construída com tecnologias web padrão, incluindo HTML, CSS e JavaScript (ES6+), sem o uso de frameworks.

O objetivo principal é demonstrar o consumo de uma API externa de forma assíncrona, a persistência de dados no navegador e a implementação de mecanismos de interação com o usuário.

Funcionalidades
A aplicação oferece as seguintes funcionalidades principais:

Consumo de API: A aplicação utiliza a Fetch API para consumir a API de produtos (https://fakestoreapi.com/products), buscando e exibindo uma lista de produtos dinamicamente.

Gestão de Favoritos: Os usuários podem favoritar produtos, e suas preferências são armazenadas no localStorage do navegador, garantindo que os dados persistam entre as sessões. É possível visualizar todos os itens favoritados em uma página dedicada.

Mecanismo de Busca: A aplicação inclui um filtro de pesquisa que permite aos usuários buscar produtos por nome, atualizando a exibição em tempo real sem a necessidade de recarregar a página.

Tecnologias Utilizadas
HTML5: Para a estrutura semântica da página.

CSS3: Para estilização e layout responsivo.

JavaScript (ES6+): Para a lógica da aplicação, manipulação do DOM e requisições assíncronas.

Fetch API

localStorage API
