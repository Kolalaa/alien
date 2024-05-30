import { Card } from './card.js';

export class Deck {
    constructor() {
        this.cards = [];
        this.generateDeck();
        this.shuffleDeck();
    }

    generateDeck() {
        const pistesValues = [
            { count: 9, value: 9 },
            { count: 8, value: 8 },
            { count: 7, value: 7 },
            { count: 6, value: 6 },
            { count: 5, value: 5 },
            { count: 4, value: 4 },
            { count: 3, value: 3 },
            { count: 2, value: 2 },
            { count: 1, value: 1 },
        ];

        pistesValues.forEach(({ count, value }) => {
            for (let i = 0; i < count; i++) {
                this.cards.push(new Card('Pistes', `${value}-${i}`));
            }
        });

        for (let i = 0; i <= 9; i++) {
            this.cards.push(new Card('Capturat', `${i}`));
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                this.cards.push(new Card('Cacça Recompenses', `${i}-${j}`));
            }
        }
    }

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard() {
        return this.cards.pop();
    }
}
