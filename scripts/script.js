
function buscarProdutos(busca, categoria) {
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            document.getElementById("produtos-mais-vendidos").innerText = "";

            let produtosFiltrados = produtos;
            // filtra os produtos cujo nome contém o termo de busca
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

            // mostra os produtos filtrados no console
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
       location.href='busca.html?categoria=' + categoria + '&busca=' + termoBusca;
   } else{
       location.href="busca.html?busca=" + termoBusca;
   }
}

function navegaParaBuscaPorCategoria(categoria) {
   location.href="busca.html?categoria=" + categoria;
}

function buscarMaisVendidos() {
   fetch("scripts/produtos.json").then((response) => {
       response.json().then((produtos) => {
           const termoBusca = 'ninho';
           
           // filtra os produtos cujo nome contém o termo de busca
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
        // carregar os dados ao abrir a página (sem filtro)
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
       const preco = typeof produto.preco === 'number' ? produto.preco.toFixed(2) : 'Preço indisponível';
       produtoDiv.innerHTML = `
           <h2>${produto.nome}</h2>
           <p>${produto.descricao}<p/>
           <p>Preço: R$${preco}</p>
           <img src="${produto.imagem}" class='imagem-produto'>
           
       `;
       containerProdutos.appendChild(produtoDiv); // Adiciona o novo produto ao contêiner
   });
}




