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
        produtoDiv.classList.add('produto-carrinho');

        const nomeProduto = document.createElement('h2');
        nomeProduto.innerText = produto.nome;

        const precoProduto = document.createElement('p');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-carrinho');

        produtoDiv.appendChild(imagemProduto);
        produtoDiv.appendChild(nomeProduto);
        produtoDiv.appendChild(precoProduto);
        
        carrinhoContainer.appendChild(produtoDiv);
    });
}

window.onload = function () {
    carregarCarrinho();
};
