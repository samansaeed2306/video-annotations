
// const videoelement = document.getElementById('video'); 


document.getElementById('next-button').addEventListener('click', function() {
    if (video) {
        video.currentTime += 1;
        console.log("Current Time (Next):", video.currentTime);
    }
});


document.getElementById('previous-button').addEventListener('click', function() {
    if (video) {
        video.currentTime -= 1; 
        if (video.currentTime < 0) {
            video.currentTime = 0;
        }
        console.log("Current Time (Previous):", video.currentTime);
    }
});


let selectedColor = '#7FFF00';
function selectColor() {
    console.log('Color Selected variable before setting: ', selectedColor);
    const colorPickerContainer = document.getElementById("color-picker-container");
    const selectedColorDisplay = document.getElementById("selected-color");

    // List of color options (can be customized)
    const colors = [
      "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",
      "#00FFFF", "#800000", "#808000", "#008080", "#800080",
      "#FFA500", "#FFC0CB", "#A52A2A", "#000000", "#FFFFFF",
      "#D2691E", "#7FFF00", "#4682B4", "#2E8B57", "#FF1493",
    ];

    const colorPickerDiv = document.createElement("div");
    colorPickerDiv.classList.add("color-picker");

    // Loop through the colors array and create a color box for each color
    colors.forEach((color) => {
      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.backgroundColor = color;

      // Add an event listener to detect color selection
      colorBox.addEventListener("click", function () {
        selectedColorDisplay.style.backgroundColor = color;
        selectedColorDisplay.textContent = color;
        selectedColor = color;
        console.log('Color Selected: ', color);
        console.log('Color Selected variable: ', selectedColor);
      });

      colorPickerDiv.appendChild(colorBox);
     
    });

    // Append the color picker to the container
    colorPickerContainer.appendChild(colorPickerDiv);
  }
