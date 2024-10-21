
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

        nomeProduto.classList.add('tituloProduto');
        nomeProduto.innerText = produto.nome;

        const precoProduto = document.createElement('h3');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const descricaoProduto = document.createElement('h4');
        descricaoProduto.innerText = produto.descricao;
        descricaoProduto.classList.add('descricaoProduto');


        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-detalhe');


        const botaoFavorito = document.createElement('button');
        botaoFavorito.innerText = 'Adicionar aos Favoritos';
        botaoFavorito.classList.add('botao-produto');
        

        // Adiciona os elementos ao container

      
        const botaoCarrinho = document.createElement('button');
        botaoCarrinho.innerText = 'Adicionar ao Carrinho';
        botaoCarrinho.classList.add('botao-produto');
        
        botaoCarrinho.addEventListener('click', function () {
            adicionarAoCarrinho(produto); 
        });

    
        produtoContainer.appendChild(nomeProduto);
        produtoContainer.appendChild(imagemProduto);
        produtoContainer.appendChild(precoProduto);
        produtoContainer.appendChild(descricaoProduto);
        produtoContainer.appendChild(botaoFavorito);
        produtoContainer.appendChild(botaoCarrinho);
        sectionMain.appendChild(produtoContainer);
    } else {
        console.error('Produto não encontrado.');
    }
}


function adicionarFavorito(produto) {
        const favorito = JSON.parse(localStorage.getItem('favorito')) || []; 
        const produtoExistente = favorito.find(item => item.id === produto.id);
    
        if (produtoExistente) {
            alert('Este produto já está nos favoritos!');
        } else {
            produto.favorito = true;
            favorito.push(produto); 
            localStorage.setItem('favorito', JSON.stringify(favorito)); 
            alert('Produto favoritado com sucesso!');
        }
    }
    

function adicionarAoCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
        produtoExistente.qtd_carrinho += 1;
    } else {
        produto.carrinho = true;
        produto.qtd_carrinho = 1;
        carrinho.push(produto);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));


    let modal = document.getElementById("modal_carrinho");
    let btnVoltaProduto = document.getElementById("botaoModalVolta");
    let btnVaiCarrinho = document.getElementById("botaoModalCarrinho");

    btnVoltaProduto.addEventListener('click', function () {
        modal.classList.remove("open");
    });
        
    btnVaiCarrinho.addEventListener('click', function () {
        location.href="carrinho.html"; 
    });

    modal.classList.add("open");

    //alert('Produto adicionado ao carrinho com sucesso!');
}


function getProdutoId() {
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
    if (produtoId) {
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