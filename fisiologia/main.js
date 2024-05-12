"use strict"

const backup = {
    saveGridInputs() {
        const gridInputs = document.querySelectorAll("[data-totaleixox]");

        for (let i = 0; i < gridInputs.length; i++) {
            
            gridInputs[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, gridInputs[i].value);
            });
            gridInputs[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const extraInputs = document.querySelectorAll(".input-nao-celular");
        extraInputs.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        inputTarget.classList.add(`${inputTarget.dataset.totaleixox}`);
        //total eixo x
        const totalEixox = document.querySelectorAll(`.${inputTarget.dataset.totaleixox}`);
        const totalEixoxOutput = document.querySelector(`.${inputTarget.dataset.totaleixoxoutput}`);
        totalEixoxOutput.value = this.somar(totalEixox);  

        if(inputTarget.dataset.totaleixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.totaleixoy}`);
            const totalEixoy = document.querySelectorAll(`.${inputTarget.dataset.totaleixoy}`);
            const totalEixoyOutput = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
            totalEixoyOutput.value = this.somar(totalEixoy);
        }

        if(inputTarget.dataset.totalgeral) {
            inputTarget.classList.add(`${inputTarget.dataset.totalgeral}`);
            const totalGeral = document.querySelectorAll(`.${inputTarget.dataset.totalgeral}`);
            const totalGeralOutput = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
            totalGeralOutput.value = this.somar(totalGeral);
        }

        // total de pacientesquetransitam
        let aMaisBmenosC = inputTarget.dataset.transicoes;
        const transicoesOutput = document.querySelector(`.${inputTarget.dataset.transicoesoutput}`);
        transicoesOutput.value = this.totalizarPacientesQueTransitam(aMaisBmenosC);

        let totalAmaisBmenosC = inputTarget.dataset.totaldetransicoes;
        const totalDeTransicoesOutput = document.querySelector(`.${inputTarget.dataset.totaldetransicoesoutput}`);
        totalDeTransicoesOutput.value = this.totalizarPacientesQueTransitam(totalAmaisBmenosC);
    },

    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },

    totalizarPacientesQueTransitam(aMaisBmenosC) {
        // la+lb-menos-lc

        let bmenosC = aMaisBmenosC.split("+")[1];
        let classeDeA = aMaisBmenosC.split("+")[0];
        let classeDeB = bmenosC.split("-menos-")[0];
        let classeDeC = bmenosC.split("-menos-")[1];
        
        const a = document.querySelector(`.${classeDeA}`);
        const b = document.querySelector(`.${classeDeB}`);
        const c = document.querySelector(`.${classeDeC}`);
        
        let total = Number(a.value) + Number(b.value) - Number(c.value);
        return total;
       
    }
}


function escutarEventos() {
    const gridInputs = document.querySelectorAll("[data-totaleixox]");
    gridInputs.forEach( gi => {
        gi.addEventListener("input", () => {
            totalizador.filtrarEtotalizarCelulas(gi);
        });
        gi.value !== "" && totalizador.filtrarEtotalizarCelulas(gi);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




