class Card {
    constructor(rarity, characterName) {
        this.rarity = rarity;
        this.characterName = characterName;
    }
}

class StoreCard extends Card {
    constructor(rarity, characterName) {
        this.rarity = rarity.toLowerCase();
        this.characterName = characterName;
        this.bought = 0;
        this.purchasePrice = this.getPurchasePrice(); 

    }

    getPurchasePrice(n=this.bought+1) {
        let rarity = this.rarity; 
        if (rarity == 'common') {
            return (Math.pow(n, 2) + 9 * n) / 2;
        } else if (rarity == 'rare') {
            return (3 * Math.pow(n, 2) + 27 * n) / 2;
        } else {
            //Store cards can be common, rare or epic only
            return (Math.pow(n, 2) + 9 * n) / 2;
        }


    }
}