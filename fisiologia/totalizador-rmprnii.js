const armazenamento = {
    salvarFicha() {

        for(let i=0; i<celulas_de_entrada.length; i++) {
            celulas_de_entrada[i].addEventListener("input", () => {
                localStorage.setItem(`trmprnii-cel${i}`, `${celulas_de_entrada[i].value}`);
            });
            celulas_de_entrada[i].value = localStorage.getItem(`trmprnii-cel${i}`);
        }
    },

    salvarDadosAdicionais() {
        const dadosAdicionais = document.querySelectorAll("div.container > header input, footer.linha-de-assinatura input, input[type=date], textarea#nota");

        for (let i=0; i<dadosAdicionais.length; i++) {

            dadosAdicionais[i].addEventListener("input", () => {             
                localStorage.setItem(`trmprnii-${dadosAdicionais[i].id}`, `${dadosAdicionais[i].value}`);

                if(dadosAdicionais[i].matches("#nota")) {
                    let dado = dadosAdicionais[i];
                    
                    dado.value.length > 0 ? dado.classList.add("bold") : dado.classList.remove("bold");
                }
            })

            dadosAdicionais[i].value = localStorage.getItem(`trmprnii-${dadosAdicionais[i].id}`);
            if(dadosAdicionais[i].matches("#nota")) {
                let dado = dadosAdicionais[i];      
                dado.value.length > 0 ? dado.classList.add("bold") : dado.classList.remove("bold");
            }
        }
    },

    salvarDestaqueDeTotais(){
        readonlyCelsDarker.addEventListener("change",()=>{readonlyCelsDarker.checked?localStorage.setItem("trmprnii-destaque","on"):localStorage.removeItem("trmprnii-destaque")}),localStorage.getItem("trmprnii-destaque")&&(readonlyCelsDarker.setAttribute("checked",""),menu.destacarFundoDeTotais())
    }
}

const totalizador = {

    filtrarCelulas(cel) {
        if(cel.dataset.totaleixox) {
            cel.classList.add(`${cel.dataset.totaleixox}`);
            const celulasPorTotalizar = document.querySelectorAll(`.${cel.dataset.totaleixox}`);
            const celula_de_saida = document.querySelector(`.${cel.dataset.totaleixoxoutput}`);
            this.totalizarCelulas(celulasPorTotalizar, celula_de_saida);
        }

        if(cel.dataset.totaleixoy) {
            cel.classList.add(`${cel.dataset.totaleixoy}`);
            const celulasPorTotalizar = document.querySelectorAll(`.${cel.dataset.totaleixoy}`);
            const celula_de_saida = document.querySelector(`.${cel.dataset.totaleixoyoutput}`);
            this.totalizarCelulas(celulasPorTotalizar, celula_de_saida);
        }

        if(cel.dataset.totaldeadmissoesc6) {
            cel.classList.add(`${cel.dataset.totaldeadmissoesc6}`);
            const celulasPorTotalizar = document.querySelectorAll(`.${cel.dataset.totaldeadmissoesc6}`);
            const celula_de_saida = document.querySelector(`.${cel.dataset.totaldeadmissoesc6output}`);
            this.totalizarCelulas(celulasPorTotalizar, celula_de_saida);
        }


        if(cel.dataset.totaldetransicoes) {
            const dataValue = cel.dataset.totaldetransicoes.split("-corte-");
            
            const a = document.querySelector(`.${dataValue[0]}`);
            const b = document.querySelector(`.${dataValue[1]}`);
            const c = document.querySelector(`.${dataValue[2]}`);

            const celula_de_saida = document.querySelector(`.${cel.dataset.totaldetransicoesoutput}`);

            const numero_de_transicoes = Number(a.value) + Number(b.value) - c.value;
            celula_de_saida.value = numero_de_transicoes;

            // Numero Geral de transicoes
            const linhaD = document.querySelectorAll("div.total.de-transicoes input.d");
            const celulaDc6 = document.querySelector("input.d-c6");
            this.totalizarCelulas(linhaD, celulaDc6);
        }
    },

    totalizarCelulas(celulasPorTotalizar, celula_de_saida) {
        let soma = 0;
        
        for (const v of celulasPorTotalizar) {
            soma += Number(v.value);
        }

        celula_de_saida.value = soma;

    }
}

window.addEventListener("load", () => {
    // INSTANCIAMENTO
    armazenamento.salvarFicha();
    armazenamento.salvarDadosAdicionais();
    armazenamento.salvarDestaqueDeTotais();
    celulas_de_entrada.forEach ( cel => {
        cel.addEventListener("input", () => totalizador.filtrarCelulas(cel));
        
        if(cel.value !== "") {
            totalizador.filtrarCelulas(cel);
        }
    });
})