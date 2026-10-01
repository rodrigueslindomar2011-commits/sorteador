const formulario = document.getElementById("formSorteador");

const minimoInput = document.getElementById("minimo");
const maximoInput = document.getElementById("maximo");
const quantidadeInput = document.getElementById("quantidade");

const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnSortear");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    mensagem.textContent = "";

    const minimo = Number(minimoInput.value);
    const maximo = Number(maximoInput.value);
    const quantidade = Number(quantidadeInput.value);

    // Verifica se os valores foram preenchidos
    if (
        minimoInput.value === "" ||
        maximoInput.value === "" ||
        quantidadeInput.value === ""
    ) {
        mostrarErro("Preencha todos os campos.");
        return;
    }

    // Verifica se os números são válidos
    if (!Number.isInteger(minimo) || !Number.isInteger(maximo)) {
        mostrarErro("Digite números inteiros no intervalo.");
        return;
    }

    // Verifica se o mínimo é menor que o máximo
    if (minimo >= maximo) {
        mostrarErro("O número mínimo deve ser menor que o máximo.");
        return;
    }

    // Verifica a quantidade
    if (!Number.isInteger(quantidade) || quantidade < 1) {
        mostrarErro("A quantidade deve ser pelo menos 1.");
        return;
    }

    // Quantidade de números disponíveis
    const totalDisponivel = maximo - minimo + 1;

    // Não permite pedir mais números do que existem no intervalo
    if (quantidade > totalDisponivel) {
        mostrarErro(
            `Você pode sortear no máximo ${totalDisponivel} número(s) nesse intervalo.`
        );
        return;
    }

    // Desabilita o botão durante o sorteio
    botao.disabled = true;
    botao.textContent = "Sorteando...";

    setTimeout(() => {
        const numeros = sortearNumeros(
            minimo,
            maximo,
            quantidade
        );

        mostrarResultado(numeros);

        botao.disabled = false;
        botao.textContent = "Sortear números";
    }, 350);
});


/**
 * Sorteia números sem repetição.
 */
function sortearNumeros(minimo, maximo, quantidade) {

    const numeros = [];

    while (numeros.length < quantidade) {

        const numero = Math.floor(
            Math.random() * (maximo - minimo + 1)
        ) + minimo;

        if (!numeros.includes(numero)) {
            numeros.push(numero);
        }
    }

    return numeros;
}


/**
 * Mostra os números sorteados na tela.
 */
function mostrarResultado(numeros) {

    resultado.innerHTML = `
        <div class="resultado-numeros">
            ${numeros
                .map(
                    (numero) =>
                        `<div class="numero">${numero}</div>`
                )
                .join("")}
        </div>
    `;
}


/**
 * Mostra uma mensagem de erro.
 */
function mostrarErro(texto) {

    mensagem.textContent = texto;

    resultado.innerHTML = `
        <div class="resultado-vazio">
            <span class="resultado-icon">!</span>
            <p>Corrija os dados e tente novamente.</p>
        </div>
    `;
}
