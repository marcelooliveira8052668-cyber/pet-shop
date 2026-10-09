// ═══════════ SISTEMA DE BUSCA E ENTREGA EM CASA ═══════════

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════ SERVIÇO DE BUSCA E ENTREGA ═══════════
    
    const pickupModal = document.createElement('div');
    pickupModal.className = 'modal pickup-modal';
    pickupModal.innerHTML = `
        <div class="modal-content pickup-content">
            <div class="modal-header">
                <h2>🚗 Busca e Entrega em Casa</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <p class="pickup-description">
                Buscamos seu pet na sua casa e entregamos após o serviço com total segurança e conforto!
            </p>
            
            <div class="pickup-price">
                <div class="price-card">
                    <span class="price-icon">🚗</span>
                    <span class="price-label">Taxa de Busca</span>
                    <span class="price-value">R$ 25,00</span>
                </div>
                <div class="price-card">
                    <span class="price-icon">🏠</span>
                    <span class="price-label">Taxa de Entrega</span>
                    <span class="price-value">R$ 25,00</span>
                </div>
                <div class="price-card total">
                    <span class="price-icon">💰</span>
                    <span class="price-label">Total</span>
                    <span class="price-value">R$ 50,00</span>
                </div>
            </div>
            
            <form id="pickupForm" class="pickup-form">
                <h3>📍 Endereço de Busca</h3>
                <div class="form-group">
                    <label>CEP *</label>
                    <input type="text" name="busca_cep" required placeholder="00000-000" maxlength="9">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Rua *</label>
                        <input type="text" name="busca_rua" required placeholder="Nome da rua">
                    </div>
                    <div class="form-group">
                        <label>Número *</label>
                        <input type="text" name="busca_numero" required placeholder="123">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Complemento</label>
                        <input type="text" name="busca_complemento" placeholder="Apto, casa, etc.">
                    </div>
                    <div class="form-group">
                        <label>Bairro *</label>
                        <input type="text" name="busca_bairro" required placeholder="Seu bairro">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Cidade *</label>
                        <input type="text" name="busca_cidade" required placeholder="Sua cidade">
                    </div>
                    <div class="form-group">
                        <label>Estado *</label>
                        <select name="busca_estado" required>
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
                
                <h3>📅 Agendamento</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Data de Busca *</label>
                        <input type="date" name="data_busca" required>
                    </div>
                    <div class="form-group">
                        <label>Horário de Busca *</label>
                        <select name="horario_busca" required>
                            <option value="">Selecione</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Tipo de Serviço *</label>
                    <select name="tipo_servico" required>
                        <option value="">Selecione o serviço</option>
                        <option value="consulta">Consulta Veterinária</option>
                        <option value="vacina">Vacinação</option>
                        <option value="tosa">Tosa e Estética</option>
                        <option value="banho">Banho</option>
                        <option value="exame">Exame Laboratorial</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Observações</label>
                    <textarea name="observacoes" rows="3" placeholder="Alguma informação importante sobre seu pet?"></textarea>
                </div>
                
                <div class="pickup-summary">
                    <div class="summary-row">
                        <span>Taxa de Busca:</span>
                        <span>R$ 25,00</span>
                    </div>
                    <div class="summary-row">
                        <span>Taxa de Entrega:</span>
                        <span>R$ 25,00</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total do Serviço:</span>
                        <span>R$ 50,00</span>
                    </div>
                </div>
                
                <button type="submit" class="btn-primary full-width">Confirmar Agendamento</button>
            </form>
        </div>
    `;
    document.body.appendChild(pickupModal);
    
    // Botão "Buscar em Casa" na seção de agendamento
    const agendarSection = document.querySelector('.agendar');
    if (agendarSection) {
        const pickupBtn = document.createElement('button');
        pickupBtn.className = 'btn-secondary pickup-btn';
        pickupBtn.innerHTML = '🚗 Buscar Pet em Casa';
        pickupBtn.addEventListener('click', () => {
            pickupModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        const sectionHeader = agendarSection.querySelector('.section-header');
        sectionHeader.appendChild(pickupBtn);
    }
    
    // Fechar modal
    pickupModal.querySelector('.modal-close').addEventListener('click', () => {
        pickupModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Fechar ao clicar fora
    pickupModal.addEventListener('click', (e) => {
        if (e.target === pickupModal) {
            pickupModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Máscara de CEP
    const cepInput = pickupModal.querySelector('input[name="busca_cep"]');
    cepInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5);
        this.value = value;
    });
    
    // Buscar CEP automaticamente
    cepInput.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        pickupModal.querySelector('input[name="busca_rua"]').value = data.logradouro;
                        pickupModal.querySelector('input[name="busca_bairro"]').value = data.bairro;
                        pickupModal.querySelector('input[name="busca_cidade"]').value = data.localidade;
                        pickupModal.querySelector('select[name="busca_estado"]').value = data.uf;
                        showNotification('Endereço encontrado com sucesso!', 'success');
                    }
                })
                .catch(() => {
                    showNotification('Erro ao buscar CEP. Preencha manualmente.', 'error');
                });
        }
    });
    
    // Enviar formulário
    const pickupForm = document.getElementById('pickupForm');
    pickupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="loading"></span> Agendando...';
        btn.disabled = true;
        
        setTimeout(() => {
            const nome = pickupModal.querySelector('input[name="busca_rua"]').value;
            showNotification(`Agendamento realizado com sucesso! Buscaremos seu pet em ${nome}.`, 'success');
            pickupModal.style.display = 'none';
            document.body.style.overflow = '';
            pickupForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });
    
    // ═══════════ MAPA DE LOCALIZAÇÃO ═══════════
    
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const mapContainer = document.createElement('div');
        mapContainer.className = 'map-container';
        mapContainer.innerHTML = `
            <h3>📍 Nossa Localização</h3>
            <div class="map-wrapper">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976!2d-46.6558!3d-23.5629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQ2LjQiUy00NsKwMzknMjAuOSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%" 
                    height="400" 
                    style="border:0; border-radius: 16px;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            </div>
            <div class="map-info">
                <div class="map-item">
                    <span class="map-icon">📍</span>
                    <div>
                        <strong>Endereço:</strong>
                        <p>Rua das Flores, 123 - Bairro Central</p>
                    </div>
                </div>
                <div class="map-item">
                    <span class="map-icon">🚗</span>
                    <div>
                        <strong>Como Chegar:</strong>
                        <p>Próximo à estação de metrô, com estacionamento próximo</p>
                    </div>
                </div>
                <div class="map-item">
                    <span class="map-icon">🅿️</span>
                    <div>
                        <strong>Estacionamento:</strong>
                        <p>Grátis para clientes na Rua das Flores</p>
                    </div>
                </div>
            </div>
        `;
        
        const contactContainer = contactSection.querySelector('.contact-container');
        contactContainer.parentNode.insertBefore(mapContainer, contactContainer.nextSibling);
    }
});