"use strict"
const referencia = {
    retornarIndicadorEcoluna(inputTarget) {
        const colunas = ["TRIAGEM", "TB", "CPN", "CPP", "TARV"];
        const inputTargetParent = inputTarget.parentElement;
        const inputTargetAndSiblings = inputTargetParent.children;
        let inputTargetIndex;
        for (let i=0; i<inputTargetAndSiblings.length; i++) {
            if(inputTarget === inputTargetAndSiblings[i]) {
                inputTargetIndex = i;
            }
        }
        let indicador = inputTargetAndSiblings[1].querySelector("span");
        let coluna = colunas[inputTargetIndex - 2]; // O 2 é referente as primeiras duas div's da linha;
        const indicadorOutput = document.querySelector(".reference__output--indicador");
        const colunaOutput = document.querySelector(".reference__output--coluna");
        colunaOutput.value = coluna;
        indicadorOutput.value = indicador.textContent;
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const o of outputs) o.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll("[data-totaleixox]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {;
            referencia.retornarIndicadorEcoluna(inputCelular);
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;