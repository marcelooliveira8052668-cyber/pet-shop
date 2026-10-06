// Aguarda o carregamento completo do documento HTML para iniciar a execução
document.addEventListener("DOMContentLoaded", function() {
    
    // Verifica se a variável 'paginaAnterior' não foi criada; se não foi, define ela como vazia ("")
    if (typeof paginaAnterior === 'undefined') paginaAnterior = "";
    
    // Verifica se a variável 'paginaProxima' não foi criada; se não foi, define ela como vazia ("")
    if (typeof paginaProxima === 'undefined') paginaProxima = "";

    // Cria uma constante guardando todo o código HTML e CSS da barra de navegação flutuante
    const navHTML = `
    <div class="page-navigator">
      
      <!-- Cria o botão "Anterior" com um ícone SVG de seta para a esquerda -->
      <button id="prevBtn" class="nav-btn-flutuante" onclick="irParaAnterior()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        Anterior
      </button>
      
      <!-- Texto centralizado que serve como rótulo/indicador na barra -->
      <span class="page-indicator">Navegação</span>

      <!-- Cria o botão "Próxima" com um ícone SVG de seta para a direita -->
      <button id="nextBtn" class="nav-btn-flutuante" onclick="irParaProxima()">
        Próxima
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

    <!-- Bloco de estilização CSS para posicionar e colorir os elementos na tela -->
    <style>
      /* Define a barra flutuante fixa na parte inferior e centralizada horizontalmente */
      .page-navigator {
        position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%);
        display: flex; align-items: center; gap: 15px;
        background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px); padding: 10px 22px; border-radius: 50px;
        box-shadow: 0 8px 30px rgba(18, 53, 91, 0.25); border: 1px solid #d9e2e8;
        z-index: 999999; font-family: Arial, Helvetica, sans-serif;
      }
      /* Estiliza a aparência padrão dos botões de navegação */
      .nav-btn-flutuante {
        display: flex; align-items: center; gap: 6px; background: #12355b; color: #ffffff;
        border: none; padding: 9px 18px; border-radius: 25px; font-size: 14px;
        font-weight: bold; cursor: pointer; transition: all 0.25s ease;
        box-shadow: 0 4px 12px rgba(18, 53, 91, 0.25);
      }
      /* Altera a cor e eleva levemente o botão quando o mouse passa por cima */
      .nav-btn-flutuante:hover { background: #1f5f8b; transform: translateY(-2px); }
      /* Estiliza o texto central indicador de navegação */
      .page-indicator { font-size: 13px; font-weight: bold; color: #263238; min-width: 80px; text-align: center; }
    </style>`;

    // Insere todo o conteúdo HTML e CSS gerado no final do elemento <body> da página atual
    document.body.insertAdjacentHTML('beforeend', navHTML);

    // Condicional para verificar se o link da página anterior está vazio ou não existe
    if (!paginaAnterior) {
        // Busca o botão "Anterior" pelo seu ID no documento
        const prev = document.getElementById("prevBtn");
        // Se o botão existir, reduz a opacidade (deixa translúcido) e desativa os cliques nele
        if(prev) { prev.style.opacity = "0.3"; prev.style.pointerEvents = "none"; }
    }
    
    // Condicional para verificar se o link da próxima página está vazio ou não existe
    if (!paginaProxima) {
        // Busca o botão "Próxima" pelo seu ID no documento
        const next = document.getElementById("nextBtn");
        // Se o botão existir, reduz a opacidade (deixa translúcido) e desativa os cliques nele
        if(next) { next.style.opacity = "0.3"; next.style.pointerEvents = "none"; }
    }
});

// Declara a função chamada ao clicar no botão "Anterior"
function irParaAnterior() { 
    // Garante que a variável existe e contém um valor de link válido antes de redirecionar
    if (typeof paginaAnterior !== 'undefined' && paginaAnterior) {
        // Altera o endereço da janela atual para navegar até a página anterior
        window.location.href = paginaAnterior; 
    }
}

// Declara a função chamada ao clicar no botão "Próxima"
function irParaProxima() { 
    // Garante que a variável existe e contém um valor de link válido antes de redirecionar
    if (typeof paginaProxima !== 'undefined' && paginaProxima) {
        // Altera o endereço da janela atual para navegar até a próxima página
        window.location.href = paginaProxima; 
    }
}