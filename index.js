let rooms = {
  forest: {
    name: "Forest",
    description: "You wake up in a forest full of trees with grey wood and blue leaves. Most of the trees around you are too dense to walk through. <br><br> There is a path to the north, and a gap in the trees to the east.",
    items: {
      
    },
    exits: {
      north: {
        to: "hole",
        locked: false
      },
      east: {
        to: "clearing",
        locked: false
      }
    }
  },
  hole: {
    name: "Hole",
    description: "You somehow find yourself in a deep hole. The walls are too steep for you to climb. Maybe, if you had a ladder, you could climb back up. <br><br> There is a torch on the ground. <br> There is a dark tunnel to the north, and an opening upwards.",
    items: {
      torch: {
        name: "torch",
        onGrab: () => {
          rooms.hole.exits.north.locked = false; 
          rooms.lab.exits.south.locked = false;
        },
        onDrop: () => { 
          rooms.hole.exits.north.locked = true; 
          rooms.lab.exits.south.locked = true; 
        }
      }
    },
    exits: {
      north: {
        to: "lab",
        locked: true
      },
      up: {
        to: "windyPath",
        locked: true
      }
    }
  },
  lab: {
    name: "Abandoned Lab",
    description: "The torch illuminates the tunnel as you crawl though, finding yourself in an old lab, with some liquids still here. <br><br> There is a ladder on the floor. <br> There is a dark tunnel to the south.",
    items: {
      ladder: {
        name: "ladder",
        onGrab: () => {
          rooms.hole.exits.up.locked = false; 
        },
        onDrop: () => { 
          rooms.hole.exits.up.locked = true; 
        }
      }
    },
    exits: {
      south: {
        to: "hole",
        locked: true
      }
    }
  }
};

function refresh() {
  document.getElementById("title").innerText = rooms[currentRoom].name;
  document.getElementById("description").innerHTML = rooms[currentRoom].description;
  
  let items = document.getElementById("items");
  
  items.innerHTML = "";
  
  for (const item in rooms[currentRoom].items) {
    items.innerHTML += "<br><br>";
    let node = document.createElement("button");
    let textnode = document.createTextNode(`Take ${rooms[currentRoom].items[item].name}`);
    node.appendChild(textnode);
    node.onclick = () => {
      rooms[currentRoom].items[item].onGrab();
      inventory[item] = rooms[currentRoom].items[item];
      delete rooms[currentRoom].items[item]; 
      node.remove();
    };
    items.appendChild(node);
  }
  
  for (const item in inventory) {
    items.innerHTML += "<br><br>";
    let node = document.createElement("button");
    let textnode = document.createTextNode(`Drop ${inventory[item].name}`);
    node.appendChild(textnode);
    node.onclick = () => {
      inventory[item].onDrop();
      rooms[currentRoom].items[item] = inventory[item];
      delete inventory[item]; 
      node.remove();
    };
    items.appendChild(node);
  }
  
  for (const path in rooms[currentRoom].exits) {
    items.innerHTML += "<br><br>";
    let node = document.createElement("button");
    let textnode = document.createTextNode(`Go ${path}`);
    node.appendChild(textnode);
    node.onclick = () => { exit(path); };
    items.appendChild(node);
  }
}

function notify(message) {
  document.getElementById("notify").innerText = message;
  document.getElementById("notify").style.backgroundColor = "red";
  setTimeout(() =>  { document.getElementById("notify").style.backgroundColor = "white"; }, 500);
}

let currentRoom = "forest";

let inventory = {
  
};

function exit (direction) {
  if (!rooms[currentRoom].exits[direction]) return;
  if (rooms[currentRoom].exits[direction].locked) {
    notify("That way is locked.");
    return;
  }
  currentRoom = rooms[currentRoom].exits[direction].to;
  refresh();
};

refresh();
