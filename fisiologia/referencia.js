"use strict"

const referencia = {
    retornarIndicador(inputTarget) {
        const classColIndicadores = inputTarget.parentElement.dataset.indicadores;
        const indicadores = document.querySelectorAll(`.${classColIndicadores} span`);
      
        const inputParent__children = inputTarget.parentElement.children;

        let inputTargetIndex;
        for (let i = 0; i < inputParent__children.length; i++) {
            if(inputTarget === inputParent__children[i]) {
                inputTargetIndex = i;
            }
        }

        const indicadorOutput = document.querySelector(".reference-row__output--indicador");
        indicadorOutput.value = indicadores[inputTargetIndex].textContent;
        
    },

    retornarFaixaEtaria(inputTarget) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output--idade");

        let faixaEtaria = inputTarget.parentElement.dataset.faixaetaria;
        faixaEtariaOutput.value = faixaEtaria;
    },

    retornarSexo(inputTarget) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output--sexo");

        let sexo = inputTarget.parentElement.dataset.sexo;
        faixaEtariaOutput.value = sexo;
    },

    retornarVazio() {
        const outputs = document.querySelectorAll(".reference-row__output");
        for (const o of outputs) o.value = "";
    }
}

function events() {
    const gridInputs = document.querySelectorAll("[data-totalgeraleixox], .grid-extra__input");
    gridInputs.forEach( gi => {
        gi.addEventListener("focus", () => {
            referencia.retornarIndicador(gi);
            referencia.retornarFaixaEtaria(gi);
            referencia.retornarSexo(gi);
        });
    });

    gridInputs.forEach( gi => gi.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;