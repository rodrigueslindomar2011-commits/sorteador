// ========================================
// SORTEADOR
// Desenvolvido por Lindomar
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // ELEMENTOS
    // ========================================

    const form = document.getElementById("formSorteador");

    const minimoInput = document.getElementById("minimo");
    const maximoInput = document.getElementById("maximo");
    const quantidadeInput = document.getElementById("quantidade");

    const mensagem = document.getElementById("mensagem");
    const resultado = document.getElementById("resultado");
    const btnSortear = document.getElementById("btnSortear");


    // ========================================
    // FUNÇÃO PARA MOSTRAR MENSAGEM
    // ========================================

    function mostrarMensagem(texto, tipo = "erro") {

        mensagem.textContent = texto;

        mensagem.className = "mensagem";

        if (tipo === "sucesso") {
            mensagem.classList.add("sucesso");
        } else {
            mensagem.classList.add("erro");
        }
    }


    // ========================================
    // LIMPAR MENSAGEM
    // ========================================

    function limparMensagem() {

        mensagem.textContent = "";
        mensagem.className = "mensagem";

    }


    // ========================================
    // GERAR NÚMERO ALEATÓRIO
    // ========================================

    function numeroAleatorio(min, max) {

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;

    }


    // ========================================
    // SORTEAR NÚMEROS
    // ========================================

    function sortearNumeros(min, max, quantidade) {

        const numeros = [];

        while (numeros.length < quantidade) {

            const numero = numeroAleatorio(min, max);

            // Evita números repetidos
            if (!numeros.includes(numero)) {

                numeros.push(numero);

            }

        }

        return numeros;

    }


    // ========================================
    // MOSTRAR RESULTADO
    // ========================================

    function mostrarResultado(numeros) {

        resultado.innerHTML = "";

        const titulo = document.createElement("div");

        titulo.className = "resultado-titulo";

        titulo.innerHTML = `
            <span>RESULTADO</span>
            <strong>${numeros.length} número${numeros.length > 1 ? "s" : ""} sorteado${numeros.length > 1 ? "s" : ""}</strong>
        `;

        resultado.appendChild(titulo);


        const lista = document.createElement("div");

        lista.className = "numeros-sorteados";


        numeros.forEach((numero, index) => {

            const numeroElemento = document.createElement("div");

            numeroElemento.className = "numero";

            numeroElemento.textContent = numero;

            numeroElemento.style.animationDelay =
                `${index * 0.08}s`;

            lista.appendChild(numeroElemento);

        });


        resultado.appendChild(lista);


        // Botão para copiar
        const areaAcoes = document.createElement("div");

        areaAcoes.className = "resultado-acoes";


        const btnCopiar = document.createElement("button");

        btnCopiar.type = "button";

        btnCopiar.className = "btn-copiar";

        btnCopiar.textContent = "Copiar resultado";


        btnCopiar.addEventListener("click", async () => {

            const texto = numeros.join(", ");

            try {

                await navigator.clipboard.writeText(texto);

                btnCopiar.textContent = "✓ Resultado copiado";

                setTimeout(() => {

                    btnCopiar.textContent = "Copiar resultado";

                }, 2000);

            } catch (erro) {

                // Alternativa caso o navegador não permita Clipboard API
                const campoTemporario = document.createElement("textarea");

                campoTemporario.value = texto;

                document.body.appendChild(campoTemporario);

                campoTemporario.select();

                document.execCommand("copy");

                campoTemporario.remove();

                btnCopiar.textContent = "✓ Resultado copiado";

                setTimeout(() => {

                    btnCopiar.textContent = "Copiar resultado";

                }, 2000);

            }

        });


        areaAcoes.appendChild(btnCopiar);

        resultado.appendChild(areaAcoes);

    }


    // ========================================
    // SUBMIT DO FORMULÁRIO
    // ========================================

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        limparMensagem();


        // ========================================
        // PEGAR VALORES
        // ========================================

        const minimo = Number(minimoInput.value);

        const maximo = Number(maximoInput.value);

        const quantidade = Number(quantidadeInput.value);


        // ========================================
        // VALIDAÇÕES
        // ========================================

        if (
            !Number.isInteger(minimo) ||
            !Number.isInteger(maximo) ||
            !Number.isInteger(quantidade)
        ) {

            mostrarMensagem(
                "Digite apenas números inteiros."
            );

            return;

        }


        if (minimo >= maximo) {

            mostrarMensagem(
                "O número mínimo precisa ser menor que o número máximo."
            );

            return;

        }


        if (quantidade < 1) {

            mostrarMensagem(
                "A quantidade precisa ser pelo menos 1."
            );

            return;

        }


        const totalDisponivel = maximo - minimo + 1;


        if (quantidade > totalDisponivel) {

            mostrarMensagem(
                `Você pode sortear no máximo ${totalDisponivel} número${totalDisponivel > 1 ? "s" : ""} nesse intervalo.`
            );

            return;

        }


        // ========================================
        // DESABILITAR BOTÃO
        // ========================================

        btnSortear.disabled = true;

        btnSortear.textContent = "Sorteando...";


        // ========================================
        // PEQUENA ANIMAÇÃO
        // ========================================

        resultado.classList.add("sorteando");


        setTimeout(() => {

            const numeros = sortearNumeros(
                minimo,
                maximo,
                quantidade
            );


            // Ordenar do menor para o maior
            numeros.sort((a, b) => a - b);


            mostrarResultado(numeros);


            resultado.classList.remove("sorteando");


            mostrarMensagem(
                "Sorteio realizado com sucesso!",
                "sucesso"
            );


            btnSortear.disabled = false;

            btnSortear.textContent = "Sortear novamente";


        }, 500);

    });


    // ========================================
    // LIMPAR MENSAGEM AO DIGITAR
    // ========================================

    [minimoInput, maximoInput, quantidadeInput].forEach(input => {

        input.addEventListener("input", () => {

            limparMensagem();

        });

    });


    // ========================================
    // EXEMPLO INICIAL
    // ========================================

    console.log("Sorteador iniciado com sucesso!");

});
