import { Player } from './player.js';
import { Deck } from './deck.js';
import { View } from './view.js';
import { Card } from './card.js';

class Game {
    constructor() {
        this.deck = new Deck();
        this.players = [new Player('Player 1'), new Player('Player 2')];
        this.centerCard = this.deck.drawCard();
        this.currentPlayerIndex = 0;
        this.dealCards();
        this.addEventListeners();
        View.displayGame(this.players, this.centerCard, this.currentPlayerIndex);
    }

    dealCards() {
        for (let i = 0; i < 5; i++) {
            this.players.forEach(player => {
                player.receiveCard(this.deck.drawCard());
            });
        }
    }

    addEventListeners() {
        const centerCardDiv = document.getElementById('center-card');
        centerCardDiv.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        centerCardDiv.addEventListener('drop', (event) => {
            event.preventDefault();
            const cardData = event.dataTransfer.getData('text/plain');
            const cardObj = JSON.parse(cardData);
            const draggedCard = new Card(cardObj.type, cardObj.identifier);

            const currentPlayer = this.players[this.currentPlayerIndex];
            const targetPlayer = this.players[this.currentPlayerIndex === 0 ? 1 : 0];

            if (draggedCard.matches(this.centerCard)) {
                if (draggedCard.type === 'Capturat') {
                    targetPlayer.captureCard(draggedCard);
                    currentPlayer.removeCard(draggedCard);
                    this.centerCard = this.deck.drawCard();
                    this.checkForWin(targetPlayer);
                } else {
                    currentPlayer.removeCard(draggedCard);
                    this.centerCard = draggedCard;
                }
            } else if (this.canReplaceCenterCard(draggedCard, this.centerCard)) {
                currentPlayer.removeCard(draggedCard);
                this.centerCard = draggedCard;
            }

            View.displayGame(this.players, this.centerCard, this.currentPlayerIndex);
        });

        const drawCardButton = document.getElementById('draw-card-button');
        drawCardButton.addEventListener('click', () => {
            const currentPlayer = this.players[this.currentPlayerIndex];
            if (this.deck.cards.length > 0) {
                currentPlayer.receiveCard(this.deck.drawCard());
                View.displayGame(this.players, this.centerCard, this.currentPlayerIndex);
            } else {
                alert('No quedan cartas en el mazo.');
            }
        });

        const endTurnButton = document.getElementById('end-turn-button');
        endTurnButton.addEventListener('click', () => {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            View.displayGame(this.players, this.centerCard, this.currentPlayerIndex);
        });

        const player1CaptureZone = document.getElementById('player1-captures');
        const player2CaptureZone = document.getElementById('player2-captures');

        [player1CaptureZone, player2CaptureZone].forEach(zone => {
            zone.addEventListener('dragover', (event) => {
                event.preventDefault();
            });

            zone.addEventListener('drop', (event) => {
                this.handleCapture(event);
            });
        });
    }

    handleCapture(event) {
        event.preventDefault();
        const cardData = event.dataTransfer.getData('text/plain');
        const cardObj = JSON.parse(cardData);
        const draggedCard = new Card(cardObj.type, cardObj.identifier);

        const currentPlayer = this.players[this.currentPlayerIndex];
        const targetPlayer = this.players[this.currentPlayerIndex === 0 ? 1 : 0];

        const centerValues = this.centerCard.identifier.split('-');
        const draggedValues = draggedCard.identifier.split('-');

        const isCapture = draggedValues.some(value => centerValues.includes(value));

        if (isCapture && draggedCard.type === 'Capturat') {
            targetPlayer.captureCard(draggedCard);
            currentPlayer.removeCard(draggedCard);
            this.centerCard = this.deck.drawCard();
            this.checkForWin(targetPlayer);
        } else {
            currentPlayer.removeCard(draggedCard);
            this.centerCard = draggedCard;
        }

        View.displayGame(this.players, this.centerCard, this.currentPlayerIndex);
    }

    canReplaceCenterCard(draggedCard, centerCard) {
        const draggedValues = draggedCard.identifier.split('-');
        const centerValues = centerCard.identifier.split('-');
        return draggedValues.some(value => centerValues.includes(value));
    }

    checkForWin(player) {
        if (player.getCaptures().length >= 5) {
            alert(`${player.name} ha ganado capturando 5 cartas!`);
            this.resetGame();
        }
    }

    resetGame() {
        this.deck = new Deck();
        this.players = [new Player('Player 1'), new Player('Player 2')];
        this.centerCard = this.deck.drawCard();
        this.currentPlayerIndex = 0;
        this.dealCards();
        View.displayGame(this.players, this.centerCard, this.currentPlayerIndex);
    }
}

new Game();
