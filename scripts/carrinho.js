
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
        qtdProduto.classList.add('qtd-preco');
        qtdProduto.innerText = `${produto.qtd_carrinho}`

        const subTotal = produto.qtd_carrinho * produto.preco;
        const subTotalProduto = document.createElement('p');
        subTotalProduto.classList.add('produto-subtotal');
        subTotalProduto.innerText = `R$ ${subTotal.toFixed(2)}`;

        const precoProduto = document.createElement('p');
        precoProduto.classList.add('produto-preco');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-carrinho');

        const btnRetirar = document.createElement('button');
        btnRetirar.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="Círculo vermelho com um X branco no meio" border="0" class="imgBtnRetirar" />';
        btnRetirar.classList.add('btnRetirar');
        
        btnRetirar.addEventListener('click', function () {
            removerDoCarrinho(produto.id); 
        });

        produtoDiv.appendChild(imagemProduto);
        produtoDiv.appendChild(nomeProduto);
        produtoDiv.appendChild(precoProduto);
        produtoDiv.appendChild(qtdProduto);
        produtoDiv.appendChild(subTotalProduto);
        produtoDiv.appendChild(btnRetirar);
        carrinhoContainer.appendChild(produtoDiv);
    });
}

function navegaParaBuscaPorCategoria(categoria) {
    location.href="busca.html?categoria=" + categoria;
}

window.addEventListener("load", function() {
    carregarCarrinho();

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







