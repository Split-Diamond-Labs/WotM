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
  }
};

let notify = (message) => {
  document.getElementById("notify").innerText = message;
  document.getElementById("notify").style.backgroundColor = "red";
  setTimeout(() =>  { document.getElementById("notify").style.backgroundColor = "white"; }, 500);
}

let currentRoom = "forest";

let inventory = {
  // item: amount 
};

let exit = (direction) => {
  if (!rooms[currentRoom].exits[direction]) return;
  if (!rooms[currentRoom].exits[direction].locked) {
    notify("That way is locked.");
    return;
  }
  document.getElementById("title").innerText = rooms[rooms[currentRoom].exits[direction].to].name;
  document.getElementById("description").innerText = rooms[rooms[currentRoom].exits[direction].to].description;
};

let grab = (item) => {
  
};

let drop = (item) => {
  
};
