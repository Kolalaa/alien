export class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.captures = [];
    }

    receiveCard(card) {
        this.hand.push(card);
    }

    removeCard(card) {
        const index = this.hand.findIndex(c => c.identifier === card.identifier);
        if (index !== -1) {
            this.hand.splice(index, 1);
        }
    }

    captureCard(card) {
        this.captures.push(card);
    }

    getHand() {
        return this.hand;
    }

    getCaptures() {
        return this.captures;
    }
}
