
function removerDoFavorito(id) {
    const produtosFavorito = JSON.parse(sessionStorage.getItem('favorito')) || [];
    const produtosAtualizados = produtosFavorito.filter(produto => produto.id !== id);
    sessionStorage.setItem('favorito', JSON.stringify(produtosAtualizados));
    window.location.reload();
}

function carregarFavorito() {
    const produtosFavorito = JSON.parse(sessionStorage.getItem('favorito')) || [];

    const favoritoContainer = document.querySelector('#favoritados');

    if (produtosFavorito.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.innerText = 'Nenhum produto favoritado.';
        favoritoContainer.appendChild(mensagem);
        return;
    }

    produtosFavorito.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produtoFavorito');
        produtoDiv.classList.add('produto-favorito');

        const nomeProduto = document.createElement('h2');
        nomeProduto.innerText = produto.nome;

        const precoProduto = document.createElement('p');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-favorito');

        const btnRemover = document.createElement('button');
        btnRemover.innerText = 'Remover dos Favoritos';
        btnRemover.classList.add('btnRemover');
        
        btnRemover.addEventListener('click', function () {
            removerDoFavorito(produto.id); 
        });

        produtoDiv.appendChild(imagemProduto);
        produtoDiv.appendChild(nomeProduto);
        produtoDiv.appendChild(precoProduto);
        produtoDiv.appendChild(btnRemover);
        favoritoContainer.appendChild(produtoDiv);
    });
}


window.onload = function () {
    carregarFavorito();
};
