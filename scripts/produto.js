
function buscarProdutoPorId(idProduto) {
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            const produto = produtos.find((produto) => produto.id == idProduto);
            exibirProduto(produto);
        });
    });
}


function exibirProduto(produto) {
    if (produto) {
        const sectionMain = document.querySelector('#main');
        sectionMain.innerHTML = ''; 

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

      
        const botaoCarrinho = document.createElement('button');
        botaoCarrinho.innerText = 'Adicionar ao Carrinho';
        botaoCarrinho.classList.add('botao-carrinho');
        
        botaoCarrinho.addEventListener('click', function () {
            adicionarAoCarrinho(produto); 
        });

    
        produtoContainer.appendChild(nomeProduto);
        produtoContainer.appendChild(imagemProduto);
        produtoContainer.appendChild(precoProduto);
        produtoContainer.appendChild(descricaoProduto);
        produtoContainer.appendChild(botaoCarrinho);

        sectionMain.appendChild(produtoContainer);
    } else {
        console.error('Produto não encontrado.');
    }
}


function adicionarAoCarrinho(produto) {
    produto.carrinho = true; 

    
    fetch('scripts/produtos.json', {
        body: JSON.stringify(produto), 
    }).then(response => {
        if (response.ok) {
            alert('Produto adicionado ao carrinho com sucesso!');
        } else {
            console.error('Erro ao adicionar produto ao carrinho.');
        }
    }).catch(error => console.error('Erro ao fazer requisição:', error));
}

function getProdutoId() {
    if (location.href.indexOf('produto=') != -1) {
        const produtoId = location.href.split('produto=')[1];
        return produtoId;
    }
    return '';
}

window.onload = function () {
    const produtoId = getProdutoId();
    if (produtoId) {
        buscarProdutoPorId(produtoId);
    }
};
