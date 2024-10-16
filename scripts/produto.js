// Função para buscar o produto pelo ID no arquivo JSON
function buscarProdutoPorId(idProduto) {
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            // Filtra os produtos cujo nome contém o termo de busca
            const produto = produtos.filter((produto) =>
                produto.id == idProduto
            );
            exibirProduto(produto);
        });
    });


    // return fetch("scripts/produtos.json")
    //     .then((response) => response.json())
    //     .then((produtos) => produtos.find(produto => produto.id === idProduto));
}

// Função para exibir as informações do produto na página produto.html
function exibirProduto(produto) {
    if (produto) {
        console.log("oi");
        console.log(produto);
        // location.href=`produto.html?produto-${produto.id}`;
        // Limpa o conteúdo da seção 'main'
        const sectionMain = document.querySelector('#main');
        sectionMain.innerHTML = '';

        // Cria novos elementos com as informações do produto
        const produtoContainer = document.createElement('div');
        produtoContainer.classList.add('produto-detalhes');

        const nomeProduto = document.createElement('h1');
        nomeProduto.innerText = produto[0].nome;

        const precoProduto = document.createElement('h3');
        precoProduto.innerText = `R$ ${produto[0].preco.toFixed(2)}`;

        const descricaoProduto = document.createElement('p');
        descricaoProduto.innerText = produto[0].descricao;

        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto[0].imagem;
        imagemProduto.alt = produto[0].nome;
        imagemProduto.classList.add('imagem-produto-detalhe');

        // Adiciona os elementos ao container
        produtoContainer.appendChild(nomeProduto);
        produtoContainer.appendChild(imagemProduto);
        produtoContainer.appendChild(precoProduto);
        produtoContainer.appendChild(descricaoProduto);

        // Adiciona o container à seção 'main'
        sectionMain.appendChild(produtoContainer);
        localStorage.setItem('produtoSelecionado', '');
    } else {
        console.error('Produto não encontrado.');
    }
}

function getProdutoId(){
    if (location.href.indexOf('produto=') != -1) {
        const produtoId = location.href.split('produto=')[1];
 
        return produtoId;
    }
    return '';
}

function navegaParaBuscaPorCategoria(categoria) {
    location.href="busca.html?categoria=" + categoria;
}

window.addEventListener("load", function() {
    const produtoId = getProdutoId();

    if (produtoId != ''){
        buscarProdutoPorId(produtoId);
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