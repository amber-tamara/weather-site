window.addEventListener("load", () => {
  const sounds = document.querySelectorAll(".sound");
  const pads = document.querySelectorAll(".pads div");
  const visual = document.querySelector(".visual");
  const colors = [
    "#462446",
    "#b05f6d",
    "#eb6b56",
    "#ffc153",
    "#47b39d",
    "#462446"
  ];

  //Function to produce the sound
  pads.forEach((pad, index) => {
    pad.addEventListener("click", function() {
      sounds[index].currentTime = 0;
      sounds[index].play();

      createBubbles(index);
    });
  });

  //Functions that creates bubbles
  const createBubbles = index => {
    const bubble = document.createElement("div");
    visual.appendChild(bubble); //attaching the bubble to the visual div
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = "jump 1s ease";
    bubble.addEventListener("animationend", function() {
      visual.removeChild(this);
    });
  };
});
