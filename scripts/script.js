////////////////////////////////////////////////////////////////////////////////isabel
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
//////////////////////////////////////////////////////////////////////////////////