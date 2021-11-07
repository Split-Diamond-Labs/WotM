function refresh() {
  document.getElementById("title").innerText = rooms[currentRoom].name;
  document.getElementById("description").innerHTML = rooms[currentRoom].description;
  
  let items = document.getElementById("items");
  
  items.innerHTML = "";
  
  let DOMString = "";
  
  for (const item in rooms[currentRoom].items) {
    DOMString += `<br>
    <br>
    <button id="${item}" onclick='(function(e) { rooms[currentRoom].items["${item}"].onGrab(); inventory["${item}"] = rooms[currentRoom].items["${item}"]; delete rooms[currentRoom].items["${item}"]; refresh(); notify(\`You picked up the ${rooms[currentRoom].items[item].name}\`); })(this)'>Take ${rooms[currentRoom].items[item].name}</button>
    `;
  }
  
  DOMString += "<br>";
  
  for (const item in inventory) {
    DOMString += `<br>
    <br>
    <button id="${item}" onclick='(function(e) { inventory["${item}"].onDrop(); rooms[currentRoom].items["${item}"] = inventory["${item}"]; delete inventory["${item}"]; refresh(); notify(\`You dropped your ${inventory[item].name}\`); })(this)'>Drop ${inventory[item].name}</button>
    `;
  }
  
  DOMString += "<br>";
  
  for (const path in rooms[currentRoom].exits) {
    DOMString += `<br>
    <br>
    <button id=${path} onclick="exit('${path}')">Go ${path}${rooms[currentRoom].exits[path].locked ? " (locked)" : ""}</button>`;
  }
  
  items.innerHTML = DOMString;
}

function notify(message) {
  document.getElementById("notify").innerText = message;
  document.getElementById("notify").style.backgroundColor = "red";
  setTimeout(() =>  { document.getElementById("notify").style.backgroundColor = "white"; }, 500);
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
