function buscarProdutos(busca, categoria) {
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            document.getElementById("produtos-mais-vendidos").innerText = "";

            let produtosFiltrados = produtos;

            // Filtra os produtos cujo nome contém o termo de busca
            if (busca) {
                produtosFiltrados = produtosFiltrados.filter((produto) =>
                    produto.nome.toLowerCase().includes(busca)
                );
            }

            if (categoria) {
               produtosFiltrados = produtosFiltrados.filter((produto) =>
                   produto.categoria.toLowerCase() == categoria
               );
            }

            // Mostra os produtos filtrados no console
           if (produtosFiltrados.length === 0) {
                alert('Nenhum produto encontrado');
                exibirProdutos('');
           } else {
               console.log('Produtos encontrados:', produtosFiltrados);
               exibirProdutos(produtosFiltrados);
           }
        });
    });
}

function navegaParaBusca() {
   const termoBusca = document.getElementById('caixaTexto').value.toLowerCase();

   const { categoria } = getQueryParams(); 
   if (categoria) {
       location.href='index.html?categoria=' + categoria + '&busca=' + termoBusca;
   } else{
       location.href="index.html?busca=" + termoBusca;
   }
}

function navegaParaBuscaPorCategoria(categoria) {
   location.href="index.html?categoria=" + categoria;
}

function buscarMaisVendidos() {
   fetch("scripts/produtos.json").then((response) => {
       response.json().then((produtos) => {
           const termoBusca = 'ninho';
           
           // Filtra os produtos cujo nome contém o termo de busca
           const produtosFiltrados = produtos.filter((produto) =>
               produto.nome.toLowerCase().includes(termoBusca)
           );
           exibirProdutos(produtosFiltrados);
       });
   });
}

function getQueryParams() {
   if (location.href.indexOf('categoria=') != -1) {
       const categoria = location.href.split('categoria=')[1];
       let categoriaDecoded = decodeURI(categoria);
       let buscaDecoded;

       if (location.href.indexOf('&busca=')) {
           const aux = categoriaDecoded.split('&busca=');
           categoriaDecoded = aux[0];
           buscaDecoded = aux[1];
       }

       return {busca: buscaDecoded, categoria: categoriaDecoded};
   } else if (location.href.indexOf('busca=') != -1) {
       let busca = location.href.split('busca=')[1];
       const buscaDecoded = decodeURI(busca);
       return {busca: buscaDecoded};
    } else {
        return {};
    }
}

window.addEventListener("load", function() {
    let btnBusca = document.querySelector("#btnBusca");

    btnBusca.addEventListener("click", function() {
       navegaParaBusca();
    });

    const {categoria, busca} = getQueryParams();

    if (categoria || busca) {
       buscarProdutos(busca, categoria);
    } else {
        // Carregar os dados ao abrir a página (sem filtro)
        buscarMaisVendidos();
    }

    let brancoLink = document.querySelector("#branco");
    brancoLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        navegaParaBuscaPorCategoria('branco');
    });
    
});

function exibirProdutos(produtos) {
    const containerProdutos = document.getElementById('produtos');
    containerProdutos.innerHTML = ''; // Limpa o contêiner existente

    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.setAttribute("id", `${produto.id}`);
        produtoDiv.classList.add('produto-item'); 
        const preco = typeof produto.preco === 'number' ? produto.preco.toFixed(2) : 'Preço indisponível';
        
        produtoDiv.innerHTML = `
            <h2>${produto.nome}</h2>
            <p>${produto.descricao}</p>
            <p>Preço: R$${preco}</p>
            <img src="${produto.imagem}" class='imagem-produto'>
        `;
        
        // Adiciona o evento de clique ao produto
        produtoDiv.addEventListener('click', function() {
            console.log('Produto clicado:', produto.id); // Verifique o ID
            localStorage.setItem('produtoSelecionado', produto.id);
            window.location.href = 'produto.html';
        });

        containerProdutos.appendChild(produtoDiv); // Adiciona o novo produto ao contêiner
    });
}

// Função para buscar o produto pelo ID no arquivo JSON
function buscarProdutoPorId(idProduto) {
    return fetch("scripts/produtos.json")
        .then((response) => response.json())
        .then((produtos) => produtos.find(produto => produto.id === idProduto));
}

// Função para exibir as informações do produto na página produto.html
function exibirProduto(produto) {
    if (produto) {
        // Limpa o conteúdo da seção 'main'
        const sectionMain = document.querySelector('#main');
        sectionMain.innerHTML = '';

        // Cria novos elementos com as informações do produto
        const produtoContainer = document.createElement('div');
        produtoContainer.classList.add('produto-detalhes');

        const nomeProduto = document.createElement('h1');
        nomeProduto.innerText = produto.nome;

        const precoProduto = document.createElement('h3');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const descricaoProduto = document.createElement('p');
        descricaoProduto.innerText = produto.descricao;

        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-detalhe');

        // Adiciona os elementos ao container
        produtoContainer.appendChild(nomeProduto);
        produtoContainer.appendChild(imagemProduto);
        produtoContainer.appendChild(precoProduto);
        produtoContainer.appendChild(descricaoProduto);

        // Adiciona o container à seção 'main'
        sectionMain.appendChild(produtoContainer);
    } else {
        console.error('Produto não encontrado.');
    }
}

// Carregar o produto na página produto.html ao abrir
window.addEventListener('load', function() {
    const idProduto = localStorage.getItem('produtoSelecionado');
    console.log('ID do produto no localStorage:', idProduto); // Verifique se o ID está sendo recuperado
    
    if (idProduto) {
        // Converte o ID armazenado de string para número e busca o produto
        buscarProdutoPorId(Number(idProduto)).then(produto => {
            console.log('Produto encontrado:', produto); // Verifique o produto encontrado
            exibirProduto(produto);
        });
    } else {
        console.log('Nenhum ID de produto encontrado no localStorage.');
    }
});
