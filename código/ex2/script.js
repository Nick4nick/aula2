// Função para gerar um resultado de sorteio aleatório
function gerarResultadoSorteio() {
    const numeros = [];
    while (numeros.length < 6) {
        const num = Math.floor(Math.random() * 60) + 1;
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    return numeros.sort((a, b) => a - b);
}

// Armazena o resultado do último sorteio
let resultadoUltimoSorteio = gerarResultadoSorteio();
console.log('Resultado do último sorteio:', resultadoUltimoSorteio);

document.addEventListener('DOMContentLoaded', () => {
    const formTicket = document.getElementById('formTicket');
    const ticketsDiv = document.getElementById('tickets');
    const sorteioButton = document.getElementById('sorteio');

    let tickets = [];

    formTicket.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const input = document.getElementById('numeros');
        const numeros = input.value.split(',').map(num => parseInt(num.trim(), 10)).sort((a, b) => a - b);

        if (numeros.length !== 6 || numeros.some(isNaN) || new Set(numeros).size !== 6) {
            alert('Por favor, insira exatamente 6 números únicos.');
            return;
        }

        tickets.push(numeros);

        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket';
        ticketElement.textContent = `Seu ticket: ${numeros.join(', ')}`;
        ticketsDiv.appendChild(ticketElement);

        input.value = ''; // Limpar o campo de entrada
    });

    sorteioButton.addEventListener('click', () => {
        setTimeout(() => {
            const ganhadores = tickets.filter(ticket => 
                ticket.every(num => resultadoUltimoSorteio.includes(num))
            );

            if (ganhadores.length > 0) {
                alert(`Parabéns! Você ganhou com os seguintes tickets: ${ganhadores.map(ticket => ticket.join(', ')).join('; ')}`);
            } else {
                alert('Nenhum ticket vencedor.');
            }
        }, 1000); // Simular um atraso de 1 segundos para o sorteio
    });
});
