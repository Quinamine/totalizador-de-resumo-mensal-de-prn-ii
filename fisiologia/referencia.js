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

        const indicadorOutput = document.querySelector(".reference-row__output--indicador");
        const colunaOutput = document.querySelector(".reference-row__output--coluna");

        colunaOutput.value = coluna;
        indicadorOutput.value = indicador.textContent;
    },

    retornarVazio() {
        const outputs = document.querySelectorAll(".reference-row__output");
        for (const o of outputs) o.value = "";
    }
}

function events() {
    const gridInputs = document.querySelectorAll("[data-totaleixox]");
    gridInputs.forEach( gi => {
        gi.addEventListener("focus", () => {;
            referencia.retornarIndicadorEcoluna(gi);
        });
    });

    gridInputs.forEach( gi => gi.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;