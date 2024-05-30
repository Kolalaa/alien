export class Card {
    constructor(type, identifier) {
        this.type = type;
        this.identifier = identifier;
    }

    getClass() {
        return this.type.toLowerCase().replace(' ', '-');
    }

    matches(otherCard) {
        const values1 = this.identifier.split('-');
        const values2 = otherCard.identifier.split('-');
        return values1.some(value => values2.includes(value));
    }
}
