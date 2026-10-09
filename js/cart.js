// ═══════════ SISTEMA DE CARRINHO DE COMPRAS ═══════════

let cart = [];
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════ CARRINHO DE COMPRAS ═══════════
    
    // Botão do carrinho na navbar
    const cartBtn = document.createElement('div');
    cartBtn.className = 'cart-btn';
    cartBtn.innerHTML = `
        <span class="cart-icon">🛒</span>
        <span class="cart-count">0</span>
    `;
    document.querySelector('.navbar').appendChild(cartBtn);
    
    // Painel do carrinho
    const cartPanel = document.createElement('div');
    cartPanel.className = 'cart-panel';
    cartPanel.innerHTML = `
        <div class="cart-header">
            <h3>🛒 Seu Carrinho</h3>
            <button class="cart-close">&times;</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span class="cart-total-value">R$ 0,00</span>
            </div>
            <button class="btn-primary checkout-btn">Finalizar Compra</button>
        </div>
    `;
    document.body.appendChild(cartPanel);
    
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);
    
    // Abrir carrinho
    cartBtn.addEventListener('click', () => {
        cartPanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Fechar carrinho
    function closeCart() {
        cartPanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    cartPanel.querySelector('.cart-close').addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    
    // Adicionar ao carrinho
    document.querySelectorAll('.product-card').forEach(card => {
        const btn = document.createElement('button');
        btn.className = 'add-to-cart';
        btn.innerHTML = 'Adicionar ao Carrinho';
        btn.addEventListener('click', () => {
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('.product-price').textContent;
            const img = card.querySelector('img').src;
            
            addToCart({
                id: Date.now(),
                name: name,
                price: parseFloat(price.replace('R$ ', '').replace('.', '').replace(',', '.')),
                img: img,
                quantity: 1
            });
            
            showNotification(`${name} adicionado ao carrinho!`, 'success');
        });
        card.querySelector('.product-info').appendChild(btn);
    });
    
    function addToCart(product) {
        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }
        updateCart();
    }
    
    function updateCart() {
        const cartItems = cartPanel.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const cartTotalValue = cartPanel.querySelector('.cart-total-value');
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-btn" data-id="${item.id}">&times;</button>
                </div>
            </div>
        `).join('');
        
        cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalValue.textContent = `R$ ${cartTotal.toFixed(2).replace('.', ',')}`;
        
        // Eventos dos botões de quantidade
        cartItems.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = cart.find(i => i.id === id);
                if (btn.classList.contains('plus')) {
                    item.quantity++;
                } else if (btn.classList.contains('minus') && item.quantity > 1) {
                    item.quantity--;
                }
                updateCart();
            });
        });
        
        // Remover item
        cartItems.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                cart = cart.filter(i => i.id !== id);
                updateCart();
            });
        });
    }
    
    // Finalizar compra
    cartPanel.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Seu carrinho está vazio!', 'error');
            return;
        }
        
        closeCart();
        showCheckoutModal();
    });
    
    // ═══════════ MODAL DE CHECKOUT ═══════════
    function showCheckoutModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Finalizar Compra</h2>
                    <button class="modal-close">&times;</button>
                </div>
                
                <form id="checkoutForm" class="checkout-form">
                    <!-- Etapa 1: Dados Pessoais -->
                    <div class="checkout-step active" data-step="1">
                        <h3>📋 Dados Pessoais</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nome Completo *</label>
                                <input type="text" name="nome" required placeholder="Seu nome completo">
                            </div>
                            <div class="form-group">
                                <label>CPF *</label>
                                <input type="text" name="cpf" required placeholder="000.000.000-00" maxlength="14">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>E-mail *</label>
                                <input type="email" name="email" required placeholder="seu@email.com">
                            </div>
                            <div class="form-group">
                                <label>Telefone *</label>
                                <input type="tel" name="telefone" required placeholder="(XX) 9XXXX-XXXX">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Etapa 2: Entrega -->
                    <div class="checkout-step" data-step="2">
                        <h3>📍 Endereço de Entrega</h3>
                        <div class="form-group">
                            <label>CEP *</label>
                            <input type="text" name="cep" required placeholder="00000-000" maxlength="9">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Rua *</label>
                                <input type="text" name="rua" required placeholder="Nome da rua">
                            </div>
                            <div class="form-group">
                                <label>Número *</label>
                                <input type="text" name="numero" required placeholder="123">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Complemento</label>
                                <input type="text" name="complemento" placeholder="Apto, casa, etc.">
                            </div>
                            <div class="form-group">
                                <label>Bairro *</label>
                                <input type="text" name="bairro" required placeholder="Seu bairro">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Cidade *</label>
                                <input type="text" name="cidade" required placeholder="Sua cidade">
                            </div>
                            <div class="form-group">
                                <label>Estado *</label>
                                <select name="estado" required>
                                    <option value="">Selecione</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                        </div>
                        
                        <h4>🚚 Opções de Entrega</h4>
                        <div class="delivery-options">
                            <label class="delivery-option">
                                <input type="radio" name="entrega" value="padrao" checked>
                                <div class="delivery-info">
                                    <span class="delivery-name">Entrega Padrão</span>
                                    <span class="delivery-time">5-7 dias úteis</span>
                                    <span class="delivery-price">Grátis</span>
                                </div>
                            </label>
                            <label class="delivery-option">
                                <input type="radio" name="entrega" value="expressa">
                                <div class="delivery-info">
                                    <span class="delivery-name">Entrega Expressa</span>
                                    <span class="delivery-time">2-3 dias úteis</span>
                                    <span class="delivery-price">R$ 19,90</span>
                                </div>
                            </label>
                            <label class="delivery-option">
                                <input type="radio" name="entrega" value="agendada">
                                <div class="delivery-info">
                                    <span class="delivery-name">Entrega Agendada</span>
                                    <span class="delivery-time">Data e hora a combinar</span>
                                    <span class="delivery-price">R$ 29,90</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Etapa 3: Pagamento -->
                    <div class="checkout-step" data-step="3">
                        <h3>💳 Forma de Pagamento</h3>
                        
                        <div class="payment-methods">
                            <label class="payment-method">
                                <input type="radio" name="pagamento" value="cartao" checked>
                                <span>💳 Cartão de Crédito</span>
                            </label>
                            <label class="payment-method">
                                <input type="radio" name="pagamento" value="pix">
                                <span>📱 PIX</span>
                            </label>
                            <label class="payment-method">
                                <input type="radio" name="pagamento" value="boleto">
                                <span>📄 Boleto Bancário</span>
                            </label>
                        </div>
                        
                        <!-- Cartão de Crédito -->
                        <div class="payment-details" id="cartao-details">
                            <div class="form-group">
                                <label>Número do Cartão *</label>
                                <input type="text" name="cartao_numero" placeholder="0000 0000 0000 0000" maxlength="19">
                            </div>
                            <div class="form-group">
                                <label>Nome no Cartão *</label>
                                <input type="text" name="cartao_nome" placeholder="Nome como está no cartão">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Validade *</label>
                                    <input type="text" name="cartao_validade" placeholder="MM/AA" maxlength="5">
                                </div>
                                <div class="form-group">
                                    <label>CVV *</label>
                                    <input type="text" name="cartao_cvv" placeholder="123" maxlength="4">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Parcelas *</label>
                                <select name="parcelas">
                                    <option value="1">1x de R$ ${cartTotal.toFixed(2).replace('.', ',')} (sem juros)</option>
                                    <option value="2">2x de R$ ${(cartTotal/2).toFixed(2).replace('.', ',')} (sem juros)</option>
                                    <option value="3">3x de R$ ${(cartTotal/3).toFixed(2).replace('.', ',')} (sem juros)</option>
                                    <option value="4">4x de R$ ${(cartTotal/4).toFixed(2).replace('.', ',')} (sem juros)</option>
                                    <option value="5">5x de R$ ${(cartTotal/5).toFixed(2).replace('.', ',')} (sem juros)</option>
                                    <option value="6">6x de R$ ${(cartTotal/6).toFixed(2).replace('.', ',')} (sem juros)</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- PIX -->
                        <div class="payment-details hidden" id="pix-details">
                            <div class="pix-info">
                                <p>📱 O QR Code do PIX será gerado após a confirmação do pedido.</p>
                                <p>💡 Pagamento instantâneo e seguro.</p>
                            </div>
                        </div>
                        
                        <!-- Boleto -->
                        <div class="payment-details hidden" id="boleto-details">
                            <div class="boleto-info">
                                <p>📄 O boleto será gerado após a confirmação do pedido.</p>
                                <p>⏰ Prazo de compensação: 1-2 dias úteis.</p>
                            </div>
                        </div>
                        
                        <!-- Resumo do Pedido -->
                        <div class="order-summary">
                            <h4>📦 Resumo do Pedido</h4>
                            <div class="summary-items">
                                ${cart.map(item => `
                                    <div class="summary-item">
                                        <span>${item.quantity}x ${item.name}</span>
                                        <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="summary-total">
                                <span>Total:</span>
                                <span>R$ ${cartTotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Navegação -->
                    <div class="checkout-navigation">
                        <button type="button" class="btn-secondary" id="prevStep" style="display: none;">← Voltar</button>
                        <button type="button" class="btn-primary" id="nextStep">Próximo →</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Fechar modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Navegação entre etapas
        let currentStep = 1;
        const steps = modal.querySelectorAll('.checkout-step');
        const prevBtn = modal.querySelector('#prevStep');
        const nextBtn = modal.querySelector('#nextStep');
        
        function showStep(step) {
            steps.forEach(s => s.classList.remove('active'));
            modal.querySelector(`[data-step="${step}"]`).classList.add('active');
            prevBtn.style.display = step === 1 ? 'none' : 'inline-block';
            nextBtn.textContent = step === 3 ? 'Confirmar Pedido' : 'Próximo →';
        }
        
        nextBtn.addEventListener('click', () => {
            if (currentStep < 3) {
                currentStep++;
                showStep(currentStep);
            } else {
                // Confirmar pedido
                confirmOrder(modal);
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
        
        // Mostrar/ocultar detalhes de pagamento
        modal.querySelectorAll('input[name="pagamento"]').forEach(radio => {
            radio.addEventListener('change', () => {
                modal.querySelectorAll('.payment-details').forEach(d => d.classList.add('hidden'));
                modal.querySelector(`#${radio.value}-details`).classList.remove('hidden');
            });
        });
        
        // Máscaras
        const cpfInput = modal.querySelector('input[name="cpf"]');
        cpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 3) value = value.slice(0, 3) + '.' + value.slice(3);
            if (value.length > 7) value = value.slice(0, 7) + '.' + value.slice(7);
            if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11);
            this.value = value;
        });
        
        const cepInput = modal.querySelector('input[name="cep"]');
        cepInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5);
            this.value = value;
        });
        
        const cartaoInput = modal.querySelector('input[name="cartao_numero"]');
        cartaoInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4) + ' ' + value.slice(4);
            if (value.length > 9) value = value.slice(0, 9) + ' ' + value.slice(9);
            if (value.length > 14) value = value.slice(0, 14) + ' ' + value.slice(14);
            this.value = value;
        });
        
        const validadeInput = modal.querySelector('input[name="cartao_validade"]');
        validadeInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
            this.value = value;
        });
    }
    
    function confirmOrder(modal) {
        const form = modal.querySelector('#checkoutForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Simular processamento
        const btn = modal.querySelector('#nextStep');
        btn.innerHTML = '<span class="loading"></span> Processando...';
        btn.disabled = true;
        
        setTimeout(() => {
            const orderNumber = Math.floor(Math.random() * 100000);
            showNotification(`Pedido #${orderNumber} confirmado com sucesso! 🎉`, 'success');
            
            // Limpar carrinho
            cart = [];
            updateCart();
            
            // Fechar modal
            modal.remove();
            
            // Redirecionar para confirmação
            showOrderConfirmation(orderNumber);
        }, 2000);
    }
    
    function showOrderConfirmation(orderNumber) {
        const confirmation = document.createElement('div');
        confirmation.className = 'order-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <div class="confirmation-icon">✅</div>
                <h2>Pedido Confirmado!</h2>
                <p>Seu pedido <strong>#${orderNumber}</strong> foi recebido com sucesso.</p>
                <p>Você receberá um e-mail com os detalhes e o rastreamento da entrega.</p>
                <button class="btn-primary" onclick="this.closest('.order-confirmation').remove()">Continuar Comprando</button>
            </div>
        `;
        document.body.appendChild(confirmation);
        
        setTimeout(() => confirmation.remove(), 10000);
    }
});