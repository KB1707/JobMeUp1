darkmode = document.querySelector("#darkmode");
body = document.querySelector("body");
animate = document.querySelectorAll(".animate");
darkmode.addEventListener("click", changemode);
start_animation();

function start_animation() {
  for (let i = 0; i < animate.length; i++) {
    setTimeout(function () {
      animate[i].classList.add("animated");
    }, 200 * i + 200);
  }
}

function changemode() {
  if (darkmode.checked) {
    body.classList.remove("light");
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
  }
  animate.forEach(function (each) {
    each.classList.remove("animated");
  });
  start_animation();
}