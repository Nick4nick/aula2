const marcaInput = document.getElementById('marca');
const marcasDatalist = document.getElementById('marcas');
const modelosList = document.getElementById('modelos');
const buscarButton = document.getElementById('buscar');

// Função para buscar e preencher a lista de marcas
async function preencherMarcas() {
    try {
        const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        const marcas = await response.json();

        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.nome;
            option.setAttribute('data-id', marca.codigo);
            marcasDatalist.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar marcas:', error);
    }
}

// Função para buscar modelos de uma marca específica
async function buscarModelos(marcaNome) {
    try {
        // Encontrar a marca selecionada pelo nome
        const selectedOption = Array.from(marcasDatalist.options).find(option => option.value === marcaNome);

        if (!selectedOption) {
            alert('Marca não encontrada.');
            return;
        }

        const marcaId = selectedOption.getAttribute('data-id');
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos`);
        const data = await response.json();

        modelosList.innerHTML = '';

        if (data.modelos.length === 0) {
            modelosList.innerHTML = '<li>Nenhum modelo encontrado para esta marca.</li>';
        } else {
            data.modelos.forEach(modelo => {
                const li = document.createElement('li');
                li.textContent = modelo.nome;
                modelosList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar modelos:', error);
        modelosList.innerHTML = '<li>Erro ao buscar modelos. Tente novamente mais tarde.</li>';
    }
}

// Preencher a lista de marcas ao carregar a página
document.addEventListener('DOMContentLoaded', preencherMarcas);

// Adicionar evento ao botão de busca
buscarButton.addEventListener('click', () => {
    const marcaNome = marcaInput.value.trim();
    if (marcaNome) {
        buscarModelos(marcaNome);
    } else {
        alert('Por favor, selecione ou digite uma marca.');
    }
});