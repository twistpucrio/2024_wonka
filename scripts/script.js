
 function buscarProdutos() {
     fetch("scripts/produtos.json").then((response) => {
         response.json().then((produtos) => {
             const termoBusca = document.getElementById('caixaTexto').value.toLowerCase();

             // filtra os produtos cujo nome contém o termo de busca
             const produtosFiltrados = produtos.filter((produto) =>
                 produto.nome.toLowerCase().includes(termoBusca)
             );

             // mostra os produtos filtrados no console
            if (produtosFiltrados.length === 0) {
                 console.log('Nenhum produto encontrado');
            } else {
                console.log('Produtos encontrados:', produtosFiltrados);
                exibirProdutos(produtosFiltrados);
            }
         });
     });
 }

 window.addEventListener("load", function() {
     let btnBusca = document.querySelector("#btnBusca");

     btnBusca.addEventListener("click", function() {
        buscarProdutos();
     });

     // carregar os dados ao abrir a página (sem filtro)
     buscarProdutos();
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




