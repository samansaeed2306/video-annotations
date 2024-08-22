document.addEventListener('DOMContentLoaded', () => {
    const uploadSvg = document.getElementById('upload-svg');
    const uploadButton = document.getElementById('upload-button');
  
    uploadSvg.addEventListener('click', () => {
      uploadButton.click();
    });
  
    uploadButton.addEventListener('change', handleVideoUpload);
  });
  

function handleVideoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  const existingContainer = document.getElementById('video-container');
  existingContainer.style.left = '-100px';
  const canvasonSwitch = document.getElementById('toggle-icon');
  canvasonSwitch.style.display= 'block';
  const containerWrapper = document.getElementById('container-wrapper');
  if (!existingContainer) return;

  const buttonsContainer = document.querySelector('.buttons-container');
  const timeline = document.querySelector('.timeline');

  buttonsContainer.style.width = '650px'; // Adjust width as needed
  buttonsContainer.style.float = 'left';
  buttonsContainer.style.display = 'inline-block';
  buttonsContainer.style.left='-400px';

  timeline.style.width = '650px'; // Match width of buttons-container
  timeline.style.float = 'left';
  timeline.style.display = 'inline-block';
  timeline.style.marginLeft = '0';
  timeline.style.left='-395px';

  const videoButtonContainer = document.querySelector('.video-buttons-container');
  videoButtonContainer.style.display = 'none';

  const volumeButtonContainer = document.querySelector('.volume-button-container');
  volumeButtonContainer.style.display = 'none';
  const annotationSidebar = document.querySelector('.annotations');
  annotationSidebar.style.display = 'none';
  

  const newContainer = document.createElement('div');
  newContainer.style.right = '-200px'
  newContainer.id = 'video-container2';
  newContainer.style.width = '500px'; // Set a small width
  newContainer.style.height = '500px'; // Set a small height
  newContainer.style.position = 'relative';
  newContainer.style.float = 'right'; // Align it to the right side
  newContainer.style.top = '0.5px';
  // Create a new video element
  const newVideo = document.createElement('video');
  newVideo.src = url;
  // newVideo.controls = true;
  newVideo.style.width = '100%'; // Match the width of the container
  newVideo.style.height = '100%'; // Match the height of the container
  newVideo.id = 'new-video2';
  
  // Create a new fabric.js canvas
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'new-canvas2';
  // newCanvas.width = 500; // Match the width of the container
  // newCanvas.height = 500; // Match the height of the container

  newContainer.appendChild(newVideo);
  newContainer.appendChild(newCanvas);
  containerWrapper.appendChild(newContainer);
  newVideo.play();

  
//   // Initialize Fabric.js on the new canvas
  const newFabricCanvas = new fabric.Canvas('new-canvas2', {
    selection: false,
    isDrawingMode: false
  });

//   // Handle annotations for the new video
//   const newAnnotations = [];

  newVideo.addEventListener('loadedmetadata', () => {
    newCanvas.width = newVideo.clientWidth;
    newCanvas.height = newVideo.clientHeight;
    newFabricCanvas.setWidth(newVideo.clientWidth);
    newFabricCanvas.setHeight(newVideo.clientHeight);
  });

}

document.addEventListener('DOMContentLoaded', () => {
  const icon = document.getElementById('toggle-icon');

  icon.addEventListener('click', () => {
      icon.classList.toggle('disabled');
      icon.classList.toggle('enabled');
      console.log('Toggled state: ', icon.className);
  });
});


