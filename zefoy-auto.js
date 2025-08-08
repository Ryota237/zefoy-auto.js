(async function(){
    console.log("🚀 Zefoy Auto iniciado!");

    // Criar o menu visual
    const menu = document.createElement("div");
    menu.style.position = "fixed";
    menu.style.bottom = "20px";
    menu.style.right = "20px";
    menu.style.width = "250px";
    menu.style.padding = "15px";
    menu.style.backgroundColor = "#121212"; // preto escuro
    menu.style.color = "#eee";
    menu.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    menu.style.fontSize = "14px";
    menu.style.borderRadius = "12px";
    menu.style.boxShadow = "0 4px 12px rgba(0,0,0,0.7)";
    menu.style.zIndex = 9999;
    menu.style.userSelect = "none";

    // Conteúdo inicial
    menu.innerHTML = `
        <div style="font-weight: 700; font-size: 16px; margin-bottom: 10px; text-align: center;">Zefoy Auto Clicker</div>
        <div><strong>Status:</strong> <span id="status">Offline</span></div>
        <div><strong>Tempo ativo:</strong> <span id="tempoAtivo">00:00:00</span></div>
        <div><strong>Iniciado em:</strong> <span id="dataInicio">--/--/---- --:--:--</span></div>
        <hr style="margin:10px 0; border-color: #333;">
        <div style="text-align: center; font-style: italic; color: #888;">Bye Biell</div>
    `;
    document.body.appendChild(menu);

    // Variáveis para controle do tempo
    const inicio = new Date();
    document.getElementById("dataInicio").innerText = inicio.toLocaleString();

    // Função para formatar tempo em hh:mm:ss
    function formatarTempo(segundos){
        const h = Math.floor(segundos / 3600).toString().padStart(2,"0");
        const m = Math.floor((segundos % 3600) / 60).toString().padStart(2,"0");
        const s = (segundos % 60).toString().padStart(2,"0");
        return `${h}:${m}:${s}`;
    }

    // Atualiza o tempo ativo a cada segundo
    setInterval(() => {
        const agora = new Date();
        const diff = Math.floor((agora - inicio)/1000);
        document.getElementById("tempoAtivo").innerText = formatarTempo(diff);
    }, 1000);

    // Função esperar
    function esperar(ms){
        return new Promise(r => setTimeout(r, ms));
    }

    // Função para atualizar status (Online enquanto roda o script)
    const statusSpan = document.getElementById("status");
    function setStatusOnline(){
        statusSpan.innerText = "Online";
        statusSpan.style.color = "#4CAF50"; // verde
    }
    function setStatusOffline(){
        statusSpan.innerText = "Offline";
        statusSpan.style.color = "#F44336"; // vermelho
    }

    setStatusOnline();

    // Função para ler o tempo do contador
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
                await esperar(tempo + 1000);
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
        }
    }

    clicarBotoes();
})();
