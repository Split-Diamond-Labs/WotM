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
  clearing: {
    name: "Clearing",
    description: "Walking through the gap in the trees, you find a clearing. There is nothing here. <br><br> There is a gap in the trees to the west.",
    items: {
      
    },
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
