
function buscarProdutos() {
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            const termoBusca = document.getElementById('caixaTexto').value.toLowerCase();

            // filtra os produtos cujo nome contém o termo de busca
            const produtosFiltrados = produtos.filter((produto) =>
                produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) && 
                produto.nome.toLowerCase().includes('branco')
            );

            // mostra os produtos filtrados no console
           if (produtosFiltrados.length === 0) {
                alert('Nenhum produto encontrado');
                exibirProdutos('');
           } else {
               console.log('Produtos encontrados:', produtosFiltrados);
               exibirProdutos(produtosFiltrados);
           }
        });
    });
}

function buscarBrancos() {
   fetch("scripts/produtos.json").then((response) => {
       response.json().then((produtos) => {
           const termoBusca = 'branco';
           
           // filtra os produtos cujo nome contém o termo de busca
           const produtosFiltrados = produtos.filter((produto) =>
               produto.nome.toLowerCase().includes(termoBusca)
           );
           exibirProdutos(produtosFiltrados);
       });
   });
}
window.addEventListener("DOMContentLoaded", function() {
    
    let brancoLink = document.querySelector("#branco");
    let btnBusca = document.querySelector("#btnBusca");

    
    brancoLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        buscarBrancos();
    });

    
    btnBusca.addEventListener("click", function() {
       buscarProdutos();
    });
});
    

function exibirProdutos(produtos) {
   const containerProdutos = document.getElementById('produtos');
   containerProdutos.innerHTML = ''; 

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
       containerProdutos.appendChild(produtoDiv); 
   });
}


