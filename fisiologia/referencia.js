const referencia = {

    retornarColuna(celulaFocada) {
        const colunas = ["TRIAGEM", "TB", "CPN", "CPP", "TARV"];
        const celulaFocadaParent = celulaFocada.parentElement;
        const celulaFocadaEirmas = celulaFocadaParent.children;
        let celulaFocadaIndex;

        for (let i=0; i<celulaFocadaEirmas.length; i++) {
            if(celulaFocada === celulaFocadaEirmas[i]) {
                celulaFocadaIndex = i;
            }
        }

        colunaOutput.textContent = colunas[celulaFocadaIndex - 2]; // O 2 é referente as primeiras duas span's da linha;
    },
    
    retornarNulo() {
        colunaOutput.textContent = ""
    }
}

let colunaOutput;
window.addEventListener("load", () => {
    colunaOutput = document.querySelector(".ref-de-coluna");

    celulas_de_entrada.forEach ( cel => {
        
        cel.addEventListener("focusin", () => {
            referencia.retornarColuna(cel);
            cel.hasAttribute("readonly") && referencia.retornarNulo();
        });

        cel.addEventListener("focusout", () => {
            referencia.retornarNulo();
        });

    });

    window.addEventListener("scroll",()=>{let e=document.querySelector("div.linha-de-referencia"),t=document.querySelector(".bounding-reference");t.getBoundingClientRect().bottom<0?e.classList.add("off"):e.classList.remove("off")});
})