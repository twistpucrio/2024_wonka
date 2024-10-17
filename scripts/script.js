function buscarProdutos(busca, categoria, filtros) {
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            document.getElementById("produtos").innerText = "";

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

            if (filtros.length != 0){
                produtosFiltrados = produtosFiltrados.filter((produto) =>
                    produto.tipo.toLowerCase() == filtros[0]
                );
            }

            // Mostra os produtos filtrados no console
           if (produtosFiltrados.length === 0) {
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
           
           // Filtra os produtos cujo nome contém o termo de busca
           const produtosFiltrados = produtos.filter((produto) =>
               produto.nome.toLowerCase().includes(termoBusca)
           );
           exibirProdutos(produtosFiltrados);
       });
   });
}

function getQueryParams() {
    console.log(location);
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

function exibirProdutos(produtos) {
    const containerProdutos = document.getElementById('produtos');
    containerProdutos.innerHTML = ''; // Limpa o contêiner existente
  
    if (produtos == ''){
        containerProdutos.innerHTML = '<h4 id="produto-não-encontrado">Nenhum produto encontrado =(</h4>';
        return;
    }

    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        // produtoDiv.setAttribute("id", `${produto.id}`);
        const preco = typeof produto.preco === 'number' ? produto.preco.toFixed(2) : 'Preço indisponível';
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" id="${produto.id}" class='imagem-produto' alt='${produto.descricao}'>
            <p  class="nome-produto">${produto.nome}</p>
            <p  class="preco-produto">R$${preco}</p>
        `;
        
        // Adiciona o evento de clique ao produto
        produtoDiv.addEventListener('click', function() {
            console.log('Produto clicado:', produto.id); // Verifique o ID
            localStorage.setItem('produtoSelecionado', produto.id);
            window.location.href = `produto.html?produto=${produto.id}`;
        });

        containerProdutos.appendChild(produtoDiv); // Adiciona o novo produto ao contêiner
    });
}

function mostraTodos(){
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            document.getElementById("produtos").innerText = "";

            let produtosFiltrados = produtos;

            // Mostra os produtos filtrados no console
           if (produtosFiltrados.length === 0) {
                exibirProdutos('');
           } else {
               console.log('Produtos encontrados:', produtosFiltrados);
               exibirProdutos(produtosFiltrados);
           }
        });
    });
}

function verificarFiltros() {
    const selecionados = document.querySelectorAll('input[type="radio"]');
    let tiposSelecionados = [];
  
    selecionados.forEach(selecionado => {
        if (selecionado.checked) {
            tiposSelecionados.push(selecionado.id);
        }
    });
  
    console.log(tiposSelecionados);
    console.log(location.href);

    const {categoria, busca} = getQueryParams();
    buscarProdutos(busca, categoria, tiposSelecionados);
}

function limpaFiltros() {
    document.querySelectorAll('input[type="radio"]').forEach(selecionado => selecionado.checked = false);

    const {categoria, busca} = getQueryParams();
    buscarProdutos(busca, categoria, []);
}

window.addEventListener("load", function() {
    let btnBusca = document.querySelector("#btnBusca");
    let textoInput = document.getElementById('caixaTexto');
    let btnFiltro = document.getElementById('filtrar');
    let btnLimpaFiltro = document.getElementById('limpar-filtros');

    textoInput.addEventListener('keydown', function(event) {
        if (event.key == 'Enter') {
            navegaParaBusca();
        }
    });

    btnBusca.addEventListener("click", function() {
       navegaParaBusca();
    });

    btnFiltro.addEventListener("click", function(){
        verificarFiltros(); 
    });

    btnLimpaFiltro.addEventListener("click", function(){
        limpaFiltros(); 
    });

    const {categoria, busca} = getQueryParams();

    if (categoria || busca) {
       buscarProdutos(busca, categoria, []);
    } else {
        // Carregar os dados ao abrir a página (sem filtro)
        mostraTodos();
    }

    let brancoLink = document.querySelector("#branco");
    brancoLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        navegaParaBuscaPorCategoria('branco');
    });

    let amargoLink = document.querySelector("#amargo");
    amargoLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        navegaParaBuscaPorCategoria('amargo');
    });

    let aoleiteLink = document.querySelector("#ao-leite");
    aoleiteLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        navegaParaBuscaPorCategoria('ao-leite');
    });
});
