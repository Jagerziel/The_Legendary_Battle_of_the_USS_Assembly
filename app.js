//Define Ship Structure
class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull,
    this.firepower = firepower,
    this.accuracy = accuracy
  }
  takeDamage(dmg) {
    this.hull -= dmg
  }
}

//Define player ship
const myUSSAssembly = new Ship(20, 5, .7)

//Initialize variables to be used
let shipCount = 0;
let shipCountMax = 6;
let playerTurn = true;
let turnCounter = 0;

//Battle: Exits when player or all alien ships are destroyed
while (shipCount < shipCountMax) {
  //Break Loop and End if USS Assembly Destroyed
  //Increment Ship Count
  shipCount++;
  //Randomly Define New Alien Ship
  let alienHull = Math.floor(Math.random() * 3) + 3
  let alienFirepower = Math.floor(Math.random() * 2) + 2
  let alienAccuracy = (Math.floor(Math.random() * 2) + 6) / 10
  
  //Construct Alien Ship
  const alienShip = new Ship(alienHull, alienFirepower, alienAccuracy)
  //Battle Between USS Assembly and Each Alien Ship
  while (myUSSAssembly.hull > 0 || alienShip.hull > 0) {
    //Increment Turn Counter
    turnCounter++;
    //Conditional statement to determine player turn
    if (playerTurn === true) {
      let shotsFired = Math.random() * 10
      //change turn to Alien
      playerTurn = false;
      //test accuracy and reduce damage (if required)
      if (myUSSAssembly.accuracy > shotsFired) {
        console.log(`${turnCounter}) USS Assembly Fired and Missed Alien Ship ${shipCount}!`)
      } else {
        //Shot hits, take damage and check if ship is destroyed.  If destroyed, break loop!
        alienShip.takeDamage(myUSSAssembly.firepower)
        if (alienShip.hull > 0) {
          console.log(`${turnCounter}) USS Assembly Fired and Hit!  Alien Ship ${shipCount} has ${alienShip.hull} Hit Points Remaining`)
        } else {
          console.log(`${turnCounter}) USS Assembly Fired and Hit!  Alien Ship ${shipCount} Destroyed!`)
          break;
        }
      }
    } else {
      let shotsFired = Math.random() * 10
      //change turn to USS Assembly
      playerTurn = true;
      //test accuracy and reduce damage (if required)
      if (alienShip.accuracy > shotsFired) {
        console.log(`${turnCounter}) Alien Ship ${shipCount} Fired and Missed the USS Assembly!`)
      } else {
        //Shot hits, take damage and check if ship is destroyed.  If destroyed, break loop!
        myUSSAssembly.takeDamage(alienShip.firepower)
        if (myUSSAssembly.hull > 0) {
          console.log(`${turnCounter}) Alien Ship ${shipCount} Fired and Hit!  USS Assembly has ${myUSSAssembly.hull} Hit Points Remaining`)
        } else {
          console.log(`${turnCounter}) Alien Ship ${shipCount} Fired and Hit!  USS Assembly Destroyed!`)
          break;
        }
      }
    }
  }
  // console.log(alienShip) //Used to test randomization effects of Alien Ship
  //Append final statement if Alien Invasion Succeeds!
  if (myUSSAssembly.hull <= 0) {
    console.log(`${turnCounter + 1}) The aliens have taken over the planet`)
    break;
  }
  //Append final statement if USS Assembly Wins!
  if (shipCount === 6) {
    console.log(`${turnCounter + 1}) The USS Assembly has successfully defended planet Earth`)
  }
}




