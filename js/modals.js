// ═══════════ MODAIS DE PRODUTOS E SERVIÇOS ═══════════

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════ MODAL DE PRODUTOS ═══════════
    
    const productModal = document.createElement('div');
    productModal.className = 'modal product-modal';
    productModal.innerHTML = `
        <div class="modal-content product-modal-content">
            <button class="modal-close">&times;</button>
            <div class="product-modal-body">
                <div class="product-modal-image">
                    <img src="" alt="" id="productModalImg">
                </div>
                <div class="product-modal-info">
                    <h2 id="productModalTitle"></h2>
                    <p class="product-modal-price" id="productModalPrice"></p>
                    <p class="product-modal-description" id="productModalDescription"></p>
                    
                    <div class="product-modal-details">
                        <h4>📦 Entrega</h4>
                        <ul>
                            <li>✅ Entrega grátis para compras acima de R$ 99,00</li>
                            <li>✅ Entrega expressa em 2-3 dias úteis (R$ 19,90)</li>
                            <li>✅ Entrega agendada disponível</li>
                            <li>✅ Rastreamento em tempo real</li>
                        </ul>
                    </div>
                    
                    <div class="product-modal-details">
                        <h4>🚚 Opções de Entrega</h4>
                        <div class="delivery-options">
                            <label class="delivery-option">
                                <input type="radio" name="product_delivery" value="padrao" checked>
                                <div class="delivery-info">
                                    <span class="delivery-name">Entrega Padrão</span>
                                    <span class="delivery-time">5-7 dias úteis</span>
                                    <span class="delivery-price">Grátis</span>
                                </div>
                            </label>
                            <label class="delivery-option">
                                <input type="radio" name="product_delivery" value="expressa">
                                <div class="delivery-info">
                                    <span class="delivery-name">Entrega Expressa</span>
                                    <span class="delivery-time">2-3 dias úteis</span>
                                    <span class="delivery-price">R$ 19,90</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <div class="product-modal-actions">
                        <div class="quantity-selector">
                            <button type="button" class="qty-btn minus">-</button>
                            <input type="number" value="1" min="1" max="99" id="productQuantity">
                            <button type="button" class="qty-btn plus">+</button>
                        </div>
                        <button class="btn-primary add-to-cart-modal">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(productModal);
    
    // Dados dos produtos
    const products = {
        'Ração Premium Cães': {
            price: 299.90,
            image: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Ração+Premium',
            description: 'Ração premium para cães adultos de todas as raças. Formulação completa com proteínas de alta qualidade, vitaminas e minerais essenciais para a saúde do seu pet.',
            details: ['Peso: 15kg', 'Sabor: Frango e Arroz', 'Indicado para: Cães adultos', 'Livre de transgênicos']
        },
        'Brinquedo Interativo': {
            price: 49.90,
            image: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Acessórios',
            description: 'Brinquedo interativo para cães e gatos. Estimula a mente e o corpo do seu pet, proporcionando horas de diversão e exercício.',
            details: ['Material: Borracha atóxica', 'Indicado para: Cães e gatos', 'Cores variadas', 'Fácil de limpar']
        },
        'Sono Pacífico Gatos': {
            price: 89.90,
            image: 'https://via.placeholder.com/300x200/ffe66d/000000?text=Sono+Pacífico',
            description: 'Suplemento natural para gatos com problemas de sono. Ajuda a acalmar e relaxar seu gato, promovendo um sono tranquilo e reparador.',
            details: ['Quantidade: 30 comprimidos', 'Ingredientes naturais', 'Sem efeitos colaterais', 'Veterinário recomendado']
        },
        'Shampoo Hidratante': {
            price: 69.90,
            image: 'https://via.placeholder.com/300x200/a855f7/ffffff?text=Shampoo',
            description: 'Shampoo hidratante para pets com pelo longo e sensível. Fórmula suave que limpa sem ressecar, deixando o pelo macio e brilhante.',
            details: ['Volume: 250ml', 'pH balanceado', 'Para pelos longos', 'Aroma suave']
        }
    };
    
    // Abrir modal de produto
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) return;
            
            const name = card.querySelector('h3').textContent;
            const product = products[name];
            
            if (product) {
                productModal.querySelector('#productModalImg').src = product.image;
                productModal.querySelector('#productModalTitle').textContent = name;
                productModal.querySelector('#productModalPrice').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
                productModal.querySelector('#productModalDescription').textContent = product.description;
                
                productModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fechar modal de produto
    productModal.querySelector('.modal-close').addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Quantidade
    const qtyInput = productModal.querySelector('#productQuantity');
    productModal.querySelector('.qty-btn.minus').addEventListener('click', () => {
        if (qtyInput.value > 1) qtyInput.value--;
    });
    productModal.querySelector('.qty-btn.plus').addEventListener('click', () => {
        if (qtyInput.value < 99) qtyInput.value++;
    });
    
    // Adicionar ao carrinho do modal
    productModal.querySelector('.add-to-cart-modal').addEventListener('click', () => {
        const name = productModal.querySelector('#productModalTitle').textContent;
        const price = parseFloat(productModal.querySelector('#productModalPrice').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
        const quantity = parseInt(qtyInput.value);
        const img = productModal.querySelector('#productModalImg').src;
        
        addToCart({
            id: Date.now(),
            name: name,
            price: price,
            img: img,
            quantity: quantity
        });
        
        showNotification(`${quantity}x ${name} adicionado ao carrinho!`, 'success');
        productModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // ═══════════ MODAL DE SERVIÇOS ═══════════
    
    const serviceModal = document.createElement('div');
    serviceModal.className = 'modal service-modal';
    serviceModal.innerHTML = `
        <div class="modal-content service-modal-content">
            <button class="modal-close">&times;</button>
            <div class="service-modal-body">
                <div class="service-modal-header">
                    <span class="service-modal-icon" id="serviceModalIcon"></span>
                    <h2 id="serviceModalTitle"></h2>
                </div>
                <div class="service-modal-content-inner">
                    <div class="service-modal-section">
                        <h4>📋 Como é feito</h4>
                        <p id="serviceModalDescription"></p>
                    </div>
                    <div class="service-modal-section">
                        <h4>⏱️ Duração</h4>
                        <p id="serviceModalDuration"></p>
                    </div>
                    <div class="service-modal-section">
                        <h4>💰 Preço</h4>
                        <p id="serviceModalPrice"></p>
                    </div>
                    <div class="service-modal-section">
                        <h4>✅ O que está incluído</h4>
                        <ul id="serviceModalIncludes"></ul>
                    </div>
                    <div class="service-modal-section">
                        <h4>📝 Observações</h4>
                        <p id="serviceModalNotes"></p>
                    </div>
                </div>
                <div class="service-modal-actions">
                    <button class="btn-primary" id="serviceModalBook">Agendar Agora</button>
                    <button class="btn-secondary" id="serviceModalPickup">🚗 Buscar em Casa</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(serviceModal);
    
    // Dados dos serviços
    const services = {
        'Consultas Veterinárias': {
            icon: '🏥',
            description: 'Consulta completa com veterinário especializado. Inclui exame físico, avaliação de saúde, orientações sobre alimentação e cuidados gerais.',
            duration: '30-45 minutos',
            price: 'A partir de R$ 150,00',
            includes: ['Exame físico completo', 'Avaliação de saúde', 'Orientações sobre cuidados', 'Receita médica se necessário'],
            notes: 'Traga a carteira de vacinação do seu pet.'
        },
        'Emergência 24h': {
            icon: '🩺',
            description: 'Atendimento de emergência 24 horas por dia, 7 dias por semana. Equipe preparada para situações urgentes.',
            duration: 'Imediato',
            price: 'A partir de R$ 200,00',
            includes: ['Atendimento imediato', 'Estabilização', 'Exames de urgência', 'Internação se necessário'],
            notes: 'Em casos de emergência, ligue antes para prepararmos a equipe.'
        },
        'Toque e Estética': {
            icon: '💅',
            description: 'Serviço completo de tosa e estética para seu pet. Inclui banho, tosagem, corte de unhas e limpeza de ouvidos.',
            duration: '1-2 horas',
            price: 'A partir de R$ 80,00',
            includes: ['Banho com shampoo premium', 'Tosagem completa', 'Corte de unhas', 'Limpeza de ouvidos', 'Perfume suave'],
            notes: 'Agendamento prévio necessário.'
        },
        'Exames Laboratoriais': {
            icon: '🦴',
            description: 'Exames laboratoriais completos: hemograma, bioquímica, urina e exames de imagem. Resultados rápidos e precisos.',
            duration: '15-30 minutos (coleta)',
            price: 'A partir de R$ 100,00',
            includes: ['Coleta de material', 'Análise laboratorial', 'Laudo veterinário', 'Resultado em 24-48h'],
            notes: 'Jejum de 8-12 horas pode ser necessário para alguns exames.'
        }
    };
    
    // Abrir modal de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('h3').textContent;
            const service = services[name];
            
            if (service) {
                serviceModal.querySelector('#serviceModalIcon').textContent = service.icon;
                serviceModal.querySelector('#serviceModalTitle').textContent = name;
                serviceModal.querySelector('#serviceModalDescription').textContent = service.description;
                serviceModal.querySelector('#serviceModalDuration').textContent = service.duration;
                serviceModal.querySelector('#serviceModalPrice').textContent = service.price;
                serviceModal.querySelector('#serviceModalIncludes').innerHTML = service.includes.map(i => `<li>✅ ${i}</li>`).join('');
                serviceModal.querySelector('#serviceModalNotes').textContent = service.notes;
                
                serviceModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fechar modal de serviço
    serviceModal.querySelector('.modal-close').addEventListener('click', () => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Agendar serviço
    serviceModal.querySelector('#serviceModalBook').addEventListener('click', () => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = '';
        document.querySelector('#agendar').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Buscar em casa
    serviceModal.querySelector('#serviceModalPickup').addEventListener('click', () => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = '';
        // Abrir modal de pickup
        const pickupModal = document.querySelector('.pickup-modal');
        if (pickupModal) {
            pickupModal.style.display = 'flex';
        }
    });
});