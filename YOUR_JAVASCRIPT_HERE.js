// Write your JS here

let hero = {
    name: "Brian",
    heroic: false,
    inventory: [],
    health: 10,
    equippedWeapon: {
        type: "stick",
        damage: 1
    },
    kills: 0
};

const statsBox = document.getElementById("statsBox");

// update stats function to be called after anything happens.
function updateStats() {
    // should find a better way to display inventory
    statsBox.innerText = `Name: ${hero.name}
    Inventory: ${JSON.stringify(hero.inventory)}
    Health: ${hero.health}
    Kills: ${hero.kills}
    Current weapon: ${hero.equippedWeapon.type}, damage: ${hero.equippedWeapon.damage}
    `;
    // when your health reaches 0 you die. Could have put a window alert in here instead. Oh well.
    if(hero.health < 1){
        const deadBox = document.createElement("div");
        deadBox.id="deadBox";
        deadBox.innerText="YOU DED";
        statsBox.appendChild(deadBox);
    }
}


// hero.name = window.prompt("What is your name?");

updateStats();

//define some weapons. Is this the right place to do that?
// changed variable name from weapon to weapon name. Bad idea? But how can you have different weapon variables with the same name?!
const dagger = {
    category: "weapon",
    type: "dagger",
    damage: 2
}

const sword = {
    category: "weapon",
    type: "sword",
    damage: 4
}

const monster = {
    category: "enemy",
    type: "monster",
    strength: 6
}

const criminal = {
    category: "enemy",
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

    // checking squares to see if they're filled. What if they're all filled? Use a while loop instead maybe? (while(--there are empty squares--)??? no time...
    for (let index = 0; index < 8; index++) {
        gridRand = "grid"+Math.floor(Math.random()*9);
        gridSquare = document.getElementById(gridRand);
        console.log("how about square: ",gridRand);
        if(!gridSquare.firstChild){
            console.log('it is empty. put it in square ',gridRand);
            break;
        }
        
    }

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
        //probably no time for fighting, so let's make removal cost a bit of health and add 1 to kill count
        hero.health -=2;
        hero.kills ++;
        gridSquare.removeChild(enemyImg);
        updateStats();
    })

    gridSquare.appendChild(enemyImg);
}

/// a third function for adding an inn. These three functions should be combined into a generic "add feature function" but no time left...
function addInn() {
    const innImg = document.createElement("img");
    innImg.id = "inn";
    innImg.src = "images/inn.png";
    console.log(innImg);
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

    innImg.addEventListener('click',function(event){
        rest(hero);
        gridSquare.removeChild(innImg);
    })
    console.log("about to append...");
    gridSquare.appendChild(innImg);

}


// rest function restores health to 10 if health is below 10.
function rest(person) {
    if (person.health === 10){
        alert("You're perfectly healthy, stay out of there and get back to the fighting!")
    }
    person.health = 10;
    updateStats();
    return person;
};

// pickUpItem function adds item to end of inventory array and updates stats.
// can't pick item up if inventory's full. 
function pickUpItem(person, item) {
    console.log("inventory length = ",person.inventory.length);
    if (person.inventory.length > 4){
        window.alert("Your bag's full dude, sorry.");
        updateStats();
        return person;
    }
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

//a function now to fight an enemy. How the fuck do I do that??? Oops, no time left :(

// function fightEnemy(person, enemy) {

// }

function addSomething() {
    // 9 items. more = more likely to appear.
    const probArray = [
        "Inn",
        "Weapon",
        "Weapon",
        "Weapon",
        "Enemy",
        "Enemy",
        "Enemy",
        "Enemy",
        "Enemy",
    ];
    // get a random number 0-8 to decide what to add
    const featureChoice = Math.floor(Math.random()*9);

    // give the thing a name.
    const featureName = probArray[featureChoice];
    console.log(featureName);

    // if it's a weapon or enemy, which one?
    const categoryChoice = Math.floor(Math.random()*2);
    console.log(categoryChoice);

    //let categoryName;

    // what type of enemy or weapon is it?
    if (featureName === "Weapon"){
        if (categoryChoice === 0){
            //categoryName = "sword";
            addWeapon(sword);
        } else if (categoryChoice === 1){
            addWeapon(dagger);
            //categoryName = "dagger";
        }
    } else if (featureName === "Enemy"){
        if (categoryChoice === 0){
            //categoryName = "monster";
            addEnemy(monster);
        } else if (categoryChoice === 1){
            addEnemy(criminal);
            //categoryName = "criminal";
        }
    } else if (featureName === "Inn"){
        addInn();
        //categoryName = "inn";
    }

}


/// BELOW IS CODE I'D REWORKED, KEPT JUST IN CASE


// function addFeature(feature){
//     const featureImg = document.createElement("img");

//     featureImg.id = `${feature.type}`;

//     featureImg.src = `images/${feature.type}.png`;

//     if (feature.category === "weapon"){
//         weaponImg.classList.add("weapon");
//         // gotta make a new name for the weapon object
//         const addedWeapon = {
//             type: `${weapon.type}`,
//             damage: `${weapon.damage}`
//         };
//     } else if (feature.category === "enemy"){

//     }
// }





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
