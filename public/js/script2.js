
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

    const existingColorPicker = document.querySelector(".color-picker");
    
    
    if (existingColorPicker) {
        console.log('Color picker already exists. Not creating a new one.');
        return;  
    }
   
    const colors = [
      "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",
      "#00FFFF", "#800000", "#808000", "#008080",
      "#FFA500", "#FFC0CB", "#A52A2A", "#000000", "#FFFFFF",
      "#D2691E", "#7FFF00", "#0f79e3", "#c2e115", "#FF1493",
    ];

    const colorPickerDiv = document.createElement("div");
    colorPickerDiv.classList.add("color-picker");

    const closeIcon = document.createElement("div");
    closeIcon.innerHTML = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="10px" height="10px" viewBox="0 0 122.878 122.88" enable-background="new 0 0 122.878 122.88" xml:space="preserve">
            <g><path fill="#FFFFFF" d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127
            l53.127-53.127c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128
            c1.901,1.901,1.901,4.984,0,6.886c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453
            c-1.901,1.902-4.984,1.902-6.886,0c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g>
        </svg>
    `;
    closeIcon.classList.add("close-icon");
    colorPickerDiv.appendChild(closeIcon);

    
    closeIcon.addEventListener("click", () => {
        colorPickerDiv.remove();
    });

    
    colors.forEach((color) => {
      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.backgroundColor = color;

      
      colorBox.addEventListener("click", function () {
        // selectedColorDisplay.style.backgroundColor = color;
        // selectedColorDisplay.textContent = color;
        selectedColor = color;
        console.log('Color Selected: ', color);
        console.log('Color Selected variable: ', selectedColor);

        updateButtonColors(selectedColor);
      });

      colorPickerDiv.appendChild(colorBox);
     
    });

    colorPickerDiv.style.position = 'fixed';
    colorPickerDiv.style.left = '3%'; 
    colorPickerDiv.style.top = '10%'; 
    colorPickerDiv.style.transform = 'translateY(-50%)'; 
    colorPickerDiv.style.padding = '10px'; 
    colorPickerDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
    colorPickerDiv.style.borderRadius = '10px'; 
    colorPickerDiv.style.zIndex = '1000'; 

  
    colorPickerContainer.appendChild(colorPickerDiv);
  }


  function updateButtonColors(color) {
    
    const buttonsWithSvg = document.querySelectorAll('button[data-color-change="true"] svg');

    
    buttonsWithSvg.forEach((svg) => {
        svg.style.fill = color;  
    });
}