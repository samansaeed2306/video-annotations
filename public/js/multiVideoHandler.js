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
  existingContainer.style.left = '-400px';
  const containerWrapper = document.getElementById('container-wrapper');
  if (!existingContainer) return;

  const buttonsContainer = document.querySelector('.buttons-container');
  const timeline = document.querySelector('.timeline');

  buttonsContainer.style.width = '600px'; // Adjust width as needed
  buttonsContainer.style.float = 'left';
  buttonsContainer.style.display = 'inline-block';
  buttonsContainer.style.left='-400px';

  timeline.style.width = '600px'; // Match width of buttons-container
  timeline.style.float = 'left';
  timeline.style.display = 'inline-block';
  timeline.style.marginLeft = '0';
  timeline.style.left='-395px';

  const videoButtonContainer = document.querySelector('.video-buttons-container');
  videoButtonContainer.style.display = 'none';

  const volumeButtonContainer = document.querySelector('.volume-button-container');
  volumeButtonContainer.style.display = 'none';

  // Clone the existing container
  // const newContainer = existingContainer.cloneNode(true);

  // Assign a new ID to the cloned container and its children
  // newContainer.id = 'new-video-container';
  // const newVideo = newContainer.querySelector('video');
  // const newCanvas = newContainer.querySelector('canvas');
  
  // if (newVideo) newVideo.id = 'new-video';
  // newVideo.src = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
  // newVideo.style.width = 100; // Set the width
  // newVideo.style.height = 100; // Set the height

  // if (newCanvas) newCanvas.id = 'new-canvas';
  // // newContainer.style.left = '-100px';
  // // Append the cloned container to the wrapper
  // containerWrapper.appendChild(newContainer);
  // Create a new video container
  // const newContainer = document.createElement('div');
  // // newContainer.classList.add('video-container');

  
  // newContainer.width = 400; // Set the width
  // newContainer.height = 300; // Set the height
  
//   // Create new video element
//   const newVideo = document.createElement('video');
//   newVideo.src = url;
//   newVideo.controls = true;
//   newVideo.id = 'new-video';

//   newVideo.width = 400; // Set the width
//   newVideo.height = 300; // Set the height

//   // Create a new fabric.js canvas
//   const newCanvas = document.createElement('canvas');
//   newCanvas.id = 'new-canvas';

//   newContainer.appendChild(newVideo);
//   newContainer.appendChild(newCanvas);

//   // Append new container to the wrapper
//   const containerWrapper = document.getElementById('container-wrapper');
//   containerWrapper.appendChild(newContainer);

//   // Initialize Fabric.js on the new canvas
//   const newFabricCanvas = new fabric.Canvas('new-canvas', {
//     selection: false,
//     isDrawingMode: false
//   });

//   // Handle annotations for the new video
//   const newAnnotations = [];

//   newVideo.addEventListener('loadedmetadata', () => {
//     newCanvas.width = newVideo.clientWidth;
//     newCanvas.height = newVideo.clientHeight;
//     newFabricCanvas.setWidth(newVideo.clientWidth);
//     newFabricCanvas.setHeight(newVideo.clientHeight);
//   });

//   newVideo.addEventListener('timeupdate', () => {
//     showAnnotationsAtCurrentTime(newVideo.currentTime, newAnnotations, newFabricCanvas);
//   });
 }

function showAnnotationsAtCurrentTime(currentTime, annotations, canvas) {
  // annotations.forEach(annotation => {
  //   if (Math.floor(annotation.time) === Math.floor(currentTime)) {
  //     canvas.clear();
  //     canvas.loadFromJSON(annotation.content, () => {
  //       canvas.renderAll();
  //     });
  //   }
  // });
}