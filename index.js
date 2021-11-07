function toggleDark() {
  const style = document.getElementsByClassName("body")[0].style;
  style.filter = style.filter == "invert(1)" ? "invert(0)" : "invert(1)";
}

function refresh() {
  document.getElementById("title").innerText = rooms[currentRoom].name;
  document.getElementById("description").innerHTML = rooms[currentRoom].description;
  
  let items = document.getElementById("items");
  
  items.innerHTML = "";
  
  let DOMString = "";
  
  for (const item in rooms[currentRoom].items) {
    DOMString += `
    <button id="${item}" onclick='(function(e) { rooms[currentRoom].items["${item}"].onGrab(); inventory["${item}"] = rooms[currentRoom].items["${item}"]; delete rooms[currentRoom].items["${item}"]; refresh(); notify(\`You picked up the ${rooms[currentRoom].items[item].name}\`); })(this)'>Take ${rooms[currentRoom].items[item].name}</button>
    `;
  }
  
  DOMString += "<br><br>";
  
  for (const item in inventory) {
    DOMString += `
    <button id="${item}" onclick='(function(e) { inventory["${item}"].onDrop(); rooms[currentRoom].items["${item}"] = inventory["${item}"]; delete inventory["${item}"]; refresh(); notify(\`You dropped your ${inventory[item].name}\`); })(this)'>Drop ${inventory[item].name}</button>
    `;
  }
  
  DOMString += "<br><br>";
  
  for (const path in rooms[currentRoom].exits) {
    DOMString += `
    <button id=${path} onclick="exit('${path}')">Go ${path}${rooms[currentRoom].exits[path].locked ? " (locked)" : ""}</button>`;
  }
  
  items.innerHTML = DOMString;
}

function notify(message) {
  document.getElementById("notify").innerText = message;
  document.getElementById("notify").style.backgroundColor = "black";
  document.getElementById("notify").style.color = "white";
  setTimeout(() =>  { document.getElementById("notify").style.backgroundColor = "white"; document.getElementById("notify").style.color = "black"; }, 500);
}



function exit (direction) {
  if (!rooms[currentRoom].exits[direction]) return;
  if (rooms[currentRoom].exits[direction].locked) {
    notify("That way is locked.");
    return;
  }
  currentRoom = rooms[currentRoom].exits[direction].to;
  notify(`You went ${direction}...`);
  refresh();
};

let currentRoom = "forest";

let inventory = {
  
};

refresh();
