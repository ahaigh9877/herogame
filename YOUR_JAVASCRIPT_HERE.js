// Write your JS here

let hero = {
    name: "Brian",
    heroic: false,
    inventory: [],
    health: 10,
    weapon: {
        type: "sword",
        damage: 2
    }
};

hero.name = window.prompt("What is your name?");

const weapon = {
    type: "dagger",
    damage: 2
}

function rest(person) {
    if (person.health === 10){
        alert("You don't need to rest right now.")
    }
    person.health = 10;
    return person;
};

function pickUpItem(person, weapon) {
    person.inventory.push(weapon);
};

function equipWeapon(person) {
    if(person.inventory.length === 0){
        return person;
    }
    person.weapon = person.inventory[0];
};