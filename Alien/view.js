export class View {
    static displayHand(player, elementId, isCurrentTurn) {
        const playerDiv = document.getElementById(elementId);
        playerDiv.innerHTML = ''; // Clear previous content
        player.getHand().forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = `card ${card.getClass()}`;
            cardDiv.textContent = card.identifier;
            cardDiv.draggable = true;
            cardDiv.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', JSON.stringify(card));
            });
            playerDiv.appendChild(cardDiv);
        });

        const playerSection = playerDiv.closest('.player-section');
        if (isCurrentTurn) {
            playerSection.classList.add('current-turn');
        } else {
            playerSection.classList.remove('current-turn');
        }
    }

    static displayCaptures(player, elementId) {
        const playerDiv = document.getElementById(elementId);
        playerDiv.innerHTML = ''; // Clear previous content
        player.getCaptures().forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = `card ${card.getClass()}`;
            cardDiv.textContent = card.identifier;
            playerDiv.appendChild(cardDiv);
        });
    }

    static displayCenterCard(card) {
        const centerCardDiv = document.getElementById('center-card');
        centerCardDiv.innerHTML = '';
        if (card) {
            centerCardDiv.textContent = card.identifier;
            centerCardDiv.className = `center-card ${card.getClass()}`;
        }
    }

    static displayGame(players, centerCard, currentPlayerIndex) {
        View.displayHand(players[0], 'player1-hand', currentPlayerIndex === 0);
        View.displayCaptures(players[1], 'player1-captures'); // Intercambiado
        View.displayHand(players[1], 'player2-hand', currentPlayerIndex === 1);
        View.displayCaptures(players[0], 'player2-captures'); // Intercambiado
        View.displayCenterCard(centerCard);

        const turnIndicator = document.getElementById('turn-indicator');
    if (currentPlayerIndex === 0) {
        turnIndicator.textContent = "Turno de: Jugador 1";
    } else {
        turnIndicator.textContent = "Turno de: Jugador 2";
    }
        
    }
    
    
}
