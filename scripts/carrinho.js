
function removerDoCarrinho(id) {
    const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosAtualizados = produtosCarrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(produtosAtualizados));
    window.location.reload();
}

function alterarQuantidade(produto, tipo) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (tipo == "somar") {
        produtoExistente.qtd_carrinho += 1;
    } else {
        if (produtoExistente.qtd_carrinho == 1){
            removerDoCarrinho(produto.id);
            return;
        }
        produtoExistente.qtd_carrinho -= 1;
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.reload();
}

function carregarCarrinho() {
    const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const carrinhoContainer = document.querySelector('#produto');
    const titulosContainer = document.querySelector('#titulos-carrinho');
    const totalContainer = document.querySelector('#total-carrinho');

    if (produtosCarrinho.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.classList.add('mensagem-carrinho');
        mensagem.innerText = 'Nenhum produto no carrinho.';
        carrinhoContainer.appendChild(mensagem);
        return;
    }

    let total = 0;
    titulosContainer.innerHTML = `<p id="produto-titulo">Produto</p>
        <p id="produto-preco">Preço</p>
        <p id="produto-qtd">Quantidade</p>
        <p id="produto-subtotal">Subtotal</p>`;

    produtosCarrinho.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produtoCarrinho');

        const nomeProduto = document.createElement('h2');
        nomeProduto.innerText = produto.nome;

        const qtdProduto = document.createElement('p');
        qtdProduto.classList.add('qtd-preco');
        qtdProduto.innerText = `${produto.qtd_carrinho}`

        const subTotal = produto.qtd_carrinho * produto.preco;
        total += subTotal;
        const subTotalProduto = document.createElement('p');
        subTotalProduto.classList.add('produto-subtotal');
        subTotalProduto.innerText = `R$ ${subTotal.toFixed(2)}`;


        const precoDiv = document.createElement('div');
        precoDiv.classList.add('precoCarrinho');

        const btnRem = document.createElement('button');
        btnRem.innerHTML = '<img src="../img/menos.png" alt="Círculo com um sinal de menos no meio" border="0" class="imgBtnCarrinho" />';
        btnRem.classList.add('btnCarrinho');
        
        btnRem.addEventListener('click', function () {
            alterarQuantidade(produto, "subtrair"); 
        });

        const precoProduto = document.createElement('p');
        precoProduto.classList.add('produto-preco');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const btnAdd = document.createElement('button');
        btnAdd.innerHTML = '<img src="../img/mais.png" alt="Círculo com um sinal de mais no meio" border="0" class="imgBtnCarrinho" />';
        btnAdd.classList.add('btnCarrinho');
        
        btnAdd.addEventListener('click', function () {
            alterarQuantidade(produto, "somar"); 
        });

        precoDiv.appendChild(btnRem);
        precoDiv.appendChild(qtdProduto);
        precoDiv.appendChild(btnAdd);

        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-carrinho');

        const btnRetirar = document.createElement('button');
        btnRetirar.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="Círculo vermelho com um X branco no meio" border="0" class="imgBtnCarrinho" />';
        btnRetirar.classList.add('btnCarrinho');
        
        btnRetirar.addEventListener('click', function () {
            removerDoCarrinho(produto.id); 
        });

        produtoDiv.appendChild(imagemProduto);
        produtoDiv.appendChild(nomeProduto);
        produtoDiv.appendChild(precoProduto);
        produtoDiv.appendChild(precoDiv);
        produtoDiv.appendChild(subTotalProduto);
        produtoDiv.appendChild(btnRetirar);
        carrinhoContainer.appendChild(produtoDiv);
    });

    totalContainer.innerHTML = `<p id="total-produto">Total = R$${total.toFixed(2)}</p>`;
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







