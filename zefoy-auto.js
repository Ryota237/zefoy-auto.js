// === Zefoy Auto Clicker ===
// Função: Ler tempo do contador, esperar, clicar Search e Views infinitamente

(async function(){
    console.log("🚀 Zefoy Auto iniciado!");

    function esperar(ms){
        return new Promise(r => setTimeout(r, ms));
    }

    function lerTempoEmSegundos(){
        let texto = document.body.innerText.match(/Please wait\s+(\d+)\s+minute\(s\)\s+(\d+)\s+second\(s\)/i);
        if(texto){
            let minutos = parseInt(texto[1]);
            let segundos = parseInt(texto[2]);
            let total = (minutos * 60 + segundos) * 1000;
            console.log(`⏳ Esperando ${minutos} minutos e ${segundos} segundos (${total/1000}s)`);
            return total;
        }
        return 0;
    }

    async function clicarBotoes(){
        while(true){
            let tempo = lerTempoEmSegundos();
            if(tempo > 0){ 
                await esperar(tempo + 1000); // espera +1s de margem
            }

            // Botão Search
            let botaoSearch = Array.from(document.querySelectorAll("button, input[type=submit]"))
                .find(b => b.innerText.trim().toLowerCase() === "search");
            if(botaoSearch){
                botaoSearch.click();
                console.log("🔍 Botão Search clicado!");
            }

            // Botão Views
            let botaoViews = Array.from(document.querySelectorAll("button, div"))
                .find(b => /^\d{1,3}(,\d{3})*$/.test(b.innerText.trim()));
            if(botaoViews){
                botaoViews.click();
                console.log("📹 Botão Views clicado!");
            }

            // Recomeça imediatamente
        }
    }

    clicarBotoes();
})();
