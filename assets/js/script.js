const playerData = document.getElementById("player-data-form");

playerData.elements["submit"].addEventListener("click", initializePlayers);

function initializePlayers(event) {
  event.preventDefault;
  alert(playerData.elements["p1"].value);
  alert(playerData.elements["p2"].value);
  return;
}
