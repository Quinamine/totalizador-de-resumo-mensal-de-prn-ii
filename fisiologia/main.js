"use strict"
const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll("[data-totaleixox]");
        for (let i = 0; i < inputsCelulares.length; i++) {   
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
    },
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        const campoDeObs = document.querySelector(".obs__input");
        inputsNaoCelulares.forEach( inputTarget => {
            inputTarget.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${inputTarget.id}`, inputTarget.value));
            inputTarget.value = localStorage.getItem(`${keyPrefix}-${inputTarget.id}`);
        });
        campoDeObs.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-input-obs`, campoDeObs.textContent));
        campoDeObs.textContent = localStorage.getItem(`${keyPrefix}-input-obs`);
    }
}
const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        let classNameDosOperandos = inputTarget.dataset.totaleixox;
        inputTarget.classList.add(`${classNameDosOperandos}`);
        let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoxoutput}`);
        celulaDeSaida.value = this.somar(operandos);  
        if(inputTarget.dataset.totaleixoy) {
            classNameDosOperandos = inputTarget.dataset.totaleixoy;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
        if(inputTarget.dataset.totalgeral) {
            classNameDosOperandos = inputTarget.dataset.totalgeral;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
        // total de pacientesquetransitam
        classNameDosOperandos = inputTarget.dataset.transicoes;
        celulaDeSaida = document.querySelector(`.${inputTarget.dataset.transicoesoutput}`);
        celulaDeSaida.value = this.totalizarPacientesQueTransitam(classNameDosOperandos);
        classNameDosOperandos = inputTarget.dataset.totaldetransicoes;
        celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaldetransicoesoutput}`);
        celulaDeSaida.value = this.totalizarPacientesQueTransitam(classNameDosOperandos);
    },
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },
    totalizarPacientesQueTransitam(classNameDosOperandos) {
        // la+lb-menos-lc
        let classNameDeOperandoBmenosC = classNameDosOperandos.split("+")[1]
        let classNameDeOperandoA = classNameDosOperandos.split("+")[0];
        let classNameDeOperandoB = classNameDeOperandoBmenosC.split("-menos-")[0];
        let classNameDeOperandoC = classNameDeOperandoBmenosC.split("-menos-")[1];
        const operandoA = document.querySelector(`.${classNameDeOperandoA}`);
        const operandoB = document.querySelector(`.${classNameDeOperandoB}`);
        const operandoC = document.querySelector(`.${classNameDeOperandoC}`);
        let total = Number(operandoA.value) + Number(operandoB.value) - Number(operandoC.value);
        return total;
    }
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-totaleixox]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => {
            totalizador.filtrarEtotalizarCelulas(inputCelular);
        });
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




