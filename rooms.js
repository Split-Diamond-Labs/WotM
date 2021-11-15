let rooms = {
  forest: {
    name: "Forest",
    description: "You wake up in a forest full of trees with grey wood and blue leaves. Most of the trees around you are too dense to walk through. <br><br> There is a path to the north, and a gap in the trees to the east.",
    items: [
      
    ],
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
  clearing: {
    name: "Clearing",
    description: "Walking through the gap in the trees, you find a clearing. There is nothing here. <br><br> There is a gap in the trees to the west.",
    items: [
      
    ],
    exits: {
      west: {
        to: "forest",
        locked: false
      }
    }
  },
  hole: {
    name: "Hole",
    description: "You somehow find yourself in a deep hole. The walls are too steep for you to climb. Maybe, if you had a ladder, you could climb back up. <br><br> There is a torch on the ground. <br> There is a dark tunnel to the north, and an opening upwards.",
    items: [
      "torch"
    ],
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
    items: [
      "greenLiquid",
      "ladder"
    ],
    exits: {
      south: {
        to: "hole",
        locked: true
      }
    }
  },
  windyPath: {
    name: "Windy Path",
    description: "You manage to climb out of the hole. you have no intention of going back into the forest, after looking back and seeing a landscape littered with holes, prosumably also filled with labs. You look ahead and see a long, windy path, towards a city in the distance.",
    items: [
      
    ],
    exits: {
      north: {
        to: "windyPath2",
        locked: false
      },
      south: {
        to: "hole",
        locked: false
      }
    }
  },
  windyPath2: {
    name: "Windy Path",
    description: "You walk along the windy path, coming across several walking muffins along the way, they look like farmers. You can see the city wall up ahead.",
    items: [
      
    ],
    exits: {
      north: {
        to: "windyPath3",
        locked: false
      },
      south: {
        to: "windyPath",
        locked: false
      }
    }
  },
  windyPath3: {
    name: "Windy Path",
    description: "You continue walking as the muffins get busier and busier. Finally, you get to the city wall... but the doors are shut. looks like you'll need to find another way in.",
    items: [
      
    ],
    exits: {
      north: {
        to: "city",
        locked: true
      },
      south: {
        to: "windyPath2",
        locked: false
      }
    }
  }
};

let items = {
  torch: {
    name: "torch",
    properties: [
      
    ],
    onGrab: () => {
      
    },
    onDrop: () => { 
      rooms.hole.exits.north.locked = true; 
      rooms.lab.exits.south.locked = true; 
    },
    onUse: () => {
      if (currentRoom == "hole" || currentRoom == "lab") {
        notify(`You turned on your torch. You can now see through the tunnel.`);
        rooms.hole.exits.north.locked = false; 
        rooms.lab.exits.south.locked = false;
      } else {
        notify("You don't need your torch here!");
      }
    }
  },
  greenLiquid: {
    name: "green liquid",
    properties: [

    ],
    onGrab: () => {
      // TODO
    },
    onDrop: () => {
      // TODO
    },
    onUse: () => {
      
    }
  },
  ladder: {
    name: "ladder",
    properties: [

    ],
    onGrab: () => {
      
    },
    onDrop: () => { 
      rooms.hole.exits.up.locked = true; 
    },
    onUse: () => {
      if (currentRoom == "hole") {
        notify("You place the ladder against the wall, reaching upwards.");
        rooms.hole.exits.up.locked = false; 
      } else {
        notify("There's nowhere to put your ladder!");
      }
    }
  }
}

