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
        onGrab: function () {
          rooms.hole.exits.north.locked = false;
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
}

let inventory = {
  // item: amount 
}
