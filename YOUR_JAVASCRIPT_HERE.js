// Write your JS here

let hero = {
    name: "Brian",
    heroic: false,
    inventory: [],
    health: 10,
    weapon: {
        type: "sword",
        damage: 4
    }
};

const statsBox = document.getElementById("statsBox");

function updateStats() {
    statsBox.innerText = `Name: ${hero.name}
    Inventory: ${JSON.stringify(hero.inventory)}
    Health: ${hero.health}
    Current weapon: ${hero.weapon.type}, damage: ${hero.weapon.damage}
    `;
}


// hero.name = window.prompt("What is your name?");
// console.log(hero);

updateStats();

const weapon = {
    type: "dagger",
    damage: 2
}

// rest function restores health to 10 if health is below 10.
function rest(person) {
    if (person.health === 10){
        alert("You don't need to rest right now.")
    }
    person.health = 10;
    updateStats();
    return person;
};

// pickUpItem function adds item to end of inventory array and updates stats.
function pickUpItem(person, weapon) {
    person.inventory.push(weapon);
    updateStats();
    return person;
};

// equip weapon moves current weapon to the back of the inventory
// then moves first inventory item to weapon position
function equipWeapon(person) {
    if(person.inventory.length === 0){
        updateStats();
        return person;
    }
    person.inventory.push(person.weapon);
    console.log(person.weapon)
    removedWeapon = person.inventory.splice(0,1);
    person.weapon = removedWeapon[0];
    console.log(person.weapon)
    updateStats();
};