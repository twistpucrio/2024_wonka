
function removerDoCarrinho(id) {
    const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosAtualizados = produtosCarrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(produtosAtualizados));
    window.location.reload();
}


function carregarCarrinho() {
    const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const carrinhoContainer = document.querySelector('#produto');

    if (produtosCarrinho.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.innerText = 'Nenhum produto no carrinho.';
        carrinhoContainer.appendChild(mensagem);
        return;
    }

    produtosCarrinho.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produtoCarrinho');

        const nomeProduto = document.createElement('h2');
        nomeProduto.innerText = produto.nome;

        const qtdProduto = document.createElement('p');
        qtdProduto.innerText = `quantidade: ${produto.qtd_carrinho}`

        const precoProduto = document.createElement('p');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-carrinho');

        const btnRetirar = document.createElement('button');
        btnRetirar.innerText = 'Retirar do Carrinho';
        btnRetirar.classList.add('btnRetirar');
        
        btnRetirar.addEventListener('click', function () {
            removerDoCarrinho(produto.id); 
        });

        produtoDiv.appendChild(imagemProduto);
        produtoDiv.appendChild(nomeProduto);
        produtoDiv.appendChild(precoProduto);
        produtoDiv.appendChild(qtdProduto);
        produtoDiv.appendChild(btnRetirar);
        carrinhoContainer.appendChild(produtoDiv);
    });
}


window.onload = function () {
    carregarCarrinho();
};







