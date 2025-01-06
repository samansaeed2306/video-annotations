
// const videoelement = document.getElementById('video'); 

const mediaurl = CONFIG.API_MED_URL; 
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


let selectedColor = 'yellow';
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
      "#FF6F61", "#6B5B95", "#88B04B", "#955251", "#FF00FF",
      "#00FFFF", "#92A8D1", "#808000", "#008080",
      "#FFA500", "#FFC0CB", "#A52A2A", "#000000", "#FFFFFF",
      "#B565A7", "#7FFF00", "#0f79e3", "#c2e115", "#D65076",
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
    colorPickerDiv.style.top = '12%'; 
    colorPickerDiv.style.transform = 'translateY(-50%)'; 
    colorPickerDiv.style.padding = '10px'; 
    colorPickerDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
    colorPickerDiv.style.borderRadius = '10px'; 
    colorPickerDiv.style.zIndex = '1000'; 

  
    colorPickerContainer.appendChild(colorPickerDiv);
  }


//   function updateButtonColors(selectedColor) {
    
//         // Select all SVG elements inside the shapes div
//         const svgElements = document.querySelectorAll('#shapes svg');
    
//         svgElements.forEach((svgElement) => {
//             const svgMarkup = svgElement.outerHTML; // Get the current SVG markup
//             const updatedMarkup = updatePencilColor(svgMarkup, selectedColor); // Update the SVG markup
//             svgElement.outerHTML = updatedMarkup; // Replace the old SVG with the updated markup
//         });
//     }
    // function updateButtonColors(color) {
    //     const buttonsWithSvg = document.querySelectorAll('button[data-color-change="true"] svg');

    //     buttonsWithSvg.forEach((svg) => {
    //         const svgMarkup = svg.outerHTML; 
    //         const updatedSvgMarkup = updatePencilColor(svgMarkup, color); 
            
            
    //         const parser = new DOMParser();
    //         const updatedSvg = parser.parseFromString(updatedSvgMarkup, "image/svg+xml").documentElement;
    //         svg.parentNode.replaceChild(updatedSvg, svg);
    //     });
    // }

    function updateButtonColors(color) {
        // Select all buttons with the data attribute `data-color-change="true"`
        const buttonsWithSvg = document.querySelectorAll('button[data-color-change="true"]');
    
        buttonsWithSvg.forEach((button) => {
            // Get the button's ID (optional, for debugging or direct updates)
            const buttonId = button.id;
    
            // Call updateSVGFillColor for each button to update its SVG fill color
            const svgElement = button.querySelector('svg');
    
            if (svgElement) {
                svgElement.setAttribute('fill', color); // Directly update the SVG's fill
            } else {
                console.error(`No SVG found in button with ID ${buttonId || 'no ID'}`);
            }
        });
    }
    
document.addEventListener('DOMContentLoaded', (event) => {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    fullscreenBtn.addEventListener('click', toggleFullScreen);

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            fullscreenBtn.title="Exit Full Screen";
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
        } else {
            fullscreenBtn.title="Enter Full Screen";
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    }

    function handleFullscreenChange() {
        const parentBtnContainer = document.getElementById('timeline-wrapper');
        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement) {
            parentBtnContainer.classList.add('fullscreen-controls');
        } else {
            parentBtnContainer.classList.remove('fullscreen-controls');
        }
    }
});


function showConfirmModal() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('confirmModal').style.display = 'block';
  }

  function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('confirmModal').style.display = 'none';
  }

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}


document.getElementById("video-controls-btn").addEventListener("click", function() {
    const mediaElement = document.getElementById("video");
    if(mediaElement){
    mediaElement.style.zIndex = mediaElement.style.zIndex === "2" ? "0" : "2";
    }
});


function handleUrlChange() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userid');
    const videoUrl = urlParams.get('videourl');

    if (!userId || !videoUrl) {
        console.error('Either userId or videoUrl is missing in the URL.');
        
        return;
    }

    console.log('User ID:', userId);
    console.log('Video URL:', videoUrl);

   
    downloadAndUploadVideo(videoUrl, userId);
}


async function downloadAndUploadVideo(videoUrl, userId) {
    try {
        console.log('Downloading video from:', videoUrl);
        const response = await fetch(videoUrl);

        if (!response.ok) {
            throw new Error(`Failed to download video. Status: ${response.status}`);
        }

        const blob = await response.blob();
        const fileName = videoUrl.split('/').pop() || 'downloaded-video.webm'; // Default file name if not present in URL
        const file = new File([blob], fileName, { type: blob.type });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName; 
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        console.log('Downloaded file:', file);

        // Prepare the file for upload
        const formData = new FormData();
        formData.append('file', file);

        console.log('Uploading video...');
        const uploadResponse = await fetch(`${mediaurl}/upload/${userId}`, {
            method: 'POST',
            body: formData,
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload video. Status: ${uploadResponse.status}`);
        }

        const data = await uploadResponse.json();
        console.log('Video uploaded successfully:', data);

       
        const videoURL = URL.createObjectURL(file);
        // localStorage.setItem('selectedMediaType', 'video');
        localStorage.setItem('selectedVideoSrc', videoURL);
        //addVideoCard(videoURL, file.name);
    } catch (error) {
        console.error('Error in downloading or uploading video:', error);
    }
}


// let currentUrl = window.location.href;
// setInterval(() => {
//     if (currentUrl !== window.location.href) {
//         currentUrl = window.location.href;
//         handleUrlChange();
//     }
// }, 500);
// handleUrlChange();
function reloadpage() {
    updateUrl();
    // location.reload(); // Reloads the current page
}