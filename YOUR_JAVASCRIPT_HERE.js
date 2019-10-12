// Write your JS here

let hero = {
    name: "Brian",
    heroic: false,
    inventory: [],
    health: 10,
    equippedWeapon: {
        type: "stick",
        damage: 1
    }
};

const statsBox = document.getElementById("statsBox");

function updateStats() {
    statsBox.innerText = `Name: ${hero.name}
    Inventory: ${JSON.stringify(hero.inventory)}
    Health: ${hero.health}
    Current weapon: ${hero.equippedWeapon.type}, damage: ${hero.equippedWeapon.damage}
    `;
    if(hero.health < 1){
        const deadBox = document.createElement("div");
        deadBox.id="deadBox";
        deadBox.innerText="YOU DED";
        statsBox.appendChild(deadBox);
    }
}


// hero.name = window.prompt("What is your name?");
// console.log(hero);

updateStats();

//define some weapons. Is this the right place to do that?
// changed variable name from weapon to weapon name. Bad idea? But how can you have different weapon variables with the same name?!
const dagger = {
    type: "dagger",
    damage: 2
}

const sword = {
    type: "sword",
    damage: 4
}

const monster = {
    type: "monster",
    strength: 6
}

const criminal = {
    type: "criminal",
    strength: 2
}

const gameSpace = document.getElementById("gameSpace");


// combined two pickupweapon functions into a generic one that takes the weapon name as argument.
function addWeapon(weapon) {
    // create an img tag for the weapon
    const weaponImg = document.createElement("img");
    // give it the id of the weapon argument
    weaponImg.id = `${weapon.type}`;
    console.log(weaponImg);
    // give it the src name from the weapon type
    weaponImg.src = `images/${weapon.type}.png`;

    weaponImg.classList.add("weapon");
    // gotta make a new name for the weapon object
    const addedWeapon = {
        type: `${weapon.type}`,
        damage: `${weapon.damage}`
    };

    // now put the weapon in a random square. Generate random number 0-8. I'll have to figure out what to do if the square is filled.
    let gridRand;
    let gridSquare;

    for (let index = 0; index < 8; index++) {
        gridRand = "grid"+Math.floor(Math.random()*9);
        gridSquare = document.getElementById(gridRand);
        console.log("how about square: ",gridRand);
        if(!gridSquare.firstChild){
            console.log('it is empty. put it in square ',gridRand);
            break;
        }
        
    }



    // const gridRand = "grid"+Math.floor(Math.random()*9);
    // const gridSquare = document.getElementById(gridRand);
    // console.log(gridSquare);

    // make the img clickable and pick-uppable
    weaponImg.addEventListener('click',function(event){
        pickUpItem(hero,addedWeapon);
        console.log(`picked up ${addedWeapon.type}`);
        console.log(addedWeapon);
        gridSquare.removeChild(weaponImg);
    })
    gridSquare.appendChild(weaponImg);
}

function addEnemy(enemy) {
    // create an img tag for the enemy
    const enemyImg = document.createElement("img");
    
    // give it the id of the enemy argument
    enemyImg.id = `${enemy.type}`;
  
    // give it the src name from the enemy type
    enemyImg.src = `images/${enemy.type}.png`;

    enemyImg.classList.add("enemy");
    // gotta make a new name for the enemy object
    const addedEnemy = {
        type: `${enemy.type}`,
        strength: `${enemy.strength}`
    };

    // now put the enemy in a random square. Generate random number 0-8. I'll have to figure out what to do if the square is filled.
    let gridRand;
    let gridSquare;

    for (let index = 0; index < 8; index++) {
        gridRand = "grid"+Math.floor(Math.random()*9);
        gridSquare = document.getElementById(gridRand);
        console.log("how about square: ",gridRand);
        if(!gridSquare.firstChild){
            console.log('it is empty. put it in square ',gridRand);
            break;
        }
        
    }

    // make the img clickable and ?fight-able?
    enemyImg.addEventListener('click',function(event){
        //fightEnemy(hero,addedEnemy);
        //probably no time for fighting, so let's make removal cost a bit of health
        hero.health -=2;
        gridSquare.removeChild(enemyImg);
        updateStats();
    })

    gridSquare.appendChild(enemyImg);
}

// // adds a sword which disappears when you pick it up
// function addSword() {
//     const swordImg = document.createElement("img");
//     swordImg.id = "sword";
//     swordImg.src = "images/sword.png"
//     const sword = {
//         type: "sword",
//         damage: 4
//     }
//     swordImg.addEventListener('click',function(event){
//         pickUpItem(hero,sword);
//         console.log("picked up sword");
//         console.log(sword);
//     })
//     gameSpace.appendChild(swordImg);
// }

// // identical to addSword. They should be the same function with weapon name as parameter/argument. But how???
// function addDagger() {
//     const daggerImg = document.createElement("img");
//     daggerImg.id = "dagger";
//     daggerImg.src = "images/dagger.png"
//     const dagger = {
//         type: "dagger",
//         damage: 2
//     }
//     daggerImg.addEventListener('click',function(event){
//         pickUpItem(hero,dagger);
//         console.log("picked up dagger");
//         console.log(dagger);
//     })
//     gameSpace.appendChild(daggerImg);
// }

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
function pickUpItem(person, item) {
    person.inventory.push(item);
    console.log("item: ",item);
    console.log("item type: ",item.type);
    const pickedItem = document.getElementById(item.type);
    console.log("pickedItem: ",pickedItem);
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
    person.inventory.push(person.equippedWeapon);
    console.log("equippedWeapon before: ",person.equippedWeapon)
    removedWeapon = person.inventory.splice(0,1);
    person.equippedWeapon = removedWeapon[0];
    console.log("equippedWeapon after: ",person.equippedWeapon)
    updateStats();
};

//a function now to fight an enemy. How the fuck do I do that???

function fightEnemy(person, enemy) {

}