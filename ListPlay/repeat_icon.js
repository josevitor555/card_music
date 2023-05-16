var repeatIcon = document.getElementById("repeat-icon");

repeatIcon.addEventListener("click",
function() {
  var iconText = repeatIcon.querySelector("span").textContent;
  
  if (iconText === "no-repeat") {
    repeatIcon.querySelector("span").textContent = "repeat";
  } else {
    repeatIcon.querySelector("span").textContent = "no-repeat";
    }
});