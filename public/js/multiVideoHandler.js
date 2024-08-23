let ColorIndex = 0;
const shades = ['#39FF14', '#FF2079', '#0AFF99', '#FF6EC7', '#ADFF2F', '#FFB3DE'];



document.addEventListener('DOMContentLoaded', () => {
    const uploadSvg = document.getElementById('upload-svg');
    const uploadButton = document.getElementById('upload-button');
  
    uploadSvg.addEventListener('click', () => {
      uploadButton.click();
    });
  
    uploadButton.addEventListener('change', handleVideoUpload);
  });
  
  let newFabricCanvas;


  function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const url = URL.createObjectURL(file);
  
    const existingContainer = document.getElementById('video-container');
    existingContainer.style.left = '-100px';
    const canvasonSwitch = document.getElementById('toggle-icon');
    canvasonSwitch.style.display = 'block';
    const containerWrapper = document.getElementById('container-wrapper');
    if (!existingContainer) return;
  
    const buttonsContainer = document.querySelector('.buttons-container');
    const timeline = document.querySelector('.timeline');
  
    buttonsContainer.style.width = '650px';
    buttonsContainer.style.float = 'left';
    buttonsContainer.style.display = 'inline-block';
    buttonsContainer.style.left = '-400px';
  
    timeline.style.width = '650px';
    timeline.style.float = 'left';
    timeline.style.display = 'inline-block';
    timeline.style.marginLeft = '0';
    timeline.style.left = '-395px';
  
    const videoButtonContainer = document.querySelector('.video-buttons-container');
    videoButtonContainer.style.display = 'none';
  
    const volumeButtonContainer = document.querySelector('.volume-button-container');
    volumeButtonContainer.style.display = 'none';
    const annotationSidebar = document.querySelector('.annotations');
    annotationSidebar.style.display = 'none';
  
    const newContainer = document.createElement('div');
    newContainer.style.right = '-200px';
    newContainer.id = 'video-container2';
    newContainer.style.width = '500px';
    newContainer.style.height = '500px';
    newContainer.style.position = 'relative';
    newContainer.style.float = 'right';
    newContainer.style.top = '0.5px';
  
    const newVideo = document.createElement('video');
    newVideo.src = url;
    newVideo.style.width = '100%';
    newVideo.style.height = '100%';
    newVideo.id = 'new-video2';
  
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'new-canvas2';
  
    newContainer.appendChild(newVideo);
    newContainer.appendChild(newCanvas);
    containerWrapper.appendChild(newContainer);
    // newVideo.play();
  
    // Initialize Fabric.js on the new canvas
    newFabricCanvas = new fabric.Canvas(newCanvas, {
      selection: false,
      isDrawingMode: false
    });
  
    newVideo.addEventListener('loadedmetadata', () => {
      newCanvas.width = newVideo.clientWidth;
      newCanvas.height = newVideo.clientHeight;
      newFabricCanvas.setWidth(newVideo.clientWidth);
      newFabricCanvas.setHeight(newVideo.clientHeight);
    });
    
      const icon = document.getElementById('toggle-icon');
    
      icon.addEventListener('click', () => {
          icon.classList.toggle('disabled');
          icon.classList.toggle('enabled');
          const isDisabled = icon.classList.contains('disabled');
    
          
          document.getElementById('freehand').onclick = isDisabled ? drawFreehandDisabled : drawFreehand;
          document.getElementById('circle').onclick = isDisabled ? activateCircleDisabled : activateCircleMode;
          document.getElementById('rect').onclick = isDisabled ? activateRectangleDisabled : activateRectangleMode;
          document.getElementById('line').onclick = isDisabled ? activateLineDisabled : activateLineMode;
          document.getElementById('polyline').onclick = isDisabled ? activatePolylineDisabled : activatePolylineMode;
          document.getElementById('text').onclick = isDisabled ? activateTextDisabled : activateTextMode;
          document.getElementById('image').onclick = isDisabled ? activateImageDisabled : activateImage;
          document.getElementById('note').onclick = isDisabled ?  activateNoteDisabled : activateNoteMode;
          document.getElementById('image').onclick = isDisabled ? activateImageDisabled : activateImage;
          document.getElementById('image').onclick = isDisabled ? activateImageDisabled : activateImage;
          document.getElementById('image').onclick = isDisabled ? activateImageDisabled : activateImage;
          console.log('Toggled state: ', icon.className);
      });
      
      let drawingMode = '';
      let isDrawing = false;

    function setDrawingColor() {
        if (newFabricCanvas.freeDrawingBrush) {
            ColorIndex++;
            newFabricCanvas.freeDrawingBrush.color = shades[ColorIndex % shades.length]; 
        }  
    }
    function drawFreehandDisabled() {
      console.log("Freehand mode is disabled");
      newFabricCanvas.isDrawingMode = true;
      drawingMode = '';
      setDrawingColor();
    }
    function activateCircleDisabled () {
      newFabricCanvas.isDrawingMode = false;
      drawingMode = 'circle';
       setDrawingColor(); 
  
      const circle = new fabric.Circle({
          left: 100,
          top: 70,
          radius: 30,
          fill: 'transparent',
          stroke: shades[ColorIndex % shades.length],
          strokeWidth: 2
      });
      newFabricCanvas.add(circle).setActiveObject(circle);
    }
    
    function activateRectangleDisabled () {
      newFabricCanvas.isDrawingMode = false;
      drawingMode = 'rectangle';
      setDrawingColor(); 
      const rect = new fabric.Rect({
              left: 50,
              top: 50,
              width: 60,
              height: 60,
              fill: 'transparent',
              stroke: shades[ColorIndex % shades.length],
              strokeWidth: 2
          });
          newFabricCanvas.add(rect).setActiveObject(rect);
    }
    function activateLineDisabled() { 
      drawingMode = 'line';
      newFabricCanvas.isDrawingMode = false; 
      newFabricCanvas.upperCanvasEl.classList.add('canvas-plus-cursor');
     }

     function activatePolylineDisabled() {
      drawingMode = 'polyline';
      newFabricCanvas.isDrawingMode = false; // Disable freehand drawing mode
      polylinePoints = [];
      newFabricCanvas.upperCanvasEl.classList.add('canvas-plus-cursor');
     }

     function activateTextDisabled() {
      newFabricCanvas.isDrawingMode = false;
    drawingMode = 'text';
    const text = new fabric.Textbox('Type here', {
        left: 50,
        top: 50,
        fontSize: 20,
        fontFamily: 'Dancing Script',
        fill: shades[ColorIndex % shades.length],
        width: 200
    });
    ColorIndex++;
    newFabricCanvas.add(text).setActiveObject(text);
     }
     function activateImageDisabled() {

      document.getElementById('imageTool').click();
     }
     function activateNoteDisabled() {
      newFabricCanvas.isDrawingMode = false;
      drawingMode = 'note';
      const note = new fabric.Textbox('Note here', {
        left: 50,
        top: 50,
        fontSize: 14,
        fontFamily: 'Dancing Script',
        fill: shades[ColorIndex % shades.length],
        backgroundColor: '#ffffcc',
        width: 200
    });
    ColorIndex++;
    newFabricCanvas.add(note).setActiveObject(note);
     }
     
    newFabricCanvas.on('mouse:down', function(options) {
      const pointer = newFabricCanvas.getPointer(options.e);
      if (drawingMode === 'line') {
        isDrawing = true;
  
        const points = [pointer.x, pointer.y, pointer.x, pointer.y];
        currentShape = new fabric.Line(points, {
          strokeWidth: 2,
          fill: shades[ColorIndex % shades.length],
          stroke: shades[ColorIndex % shades.length],
          originX: 'center',
          originY: 'center'
        });
        newFabricCanvas.add(currentShape);
      } else if (drawingMode === 'polyline') {
        polylinePoints.push({ x: pointer.x, y: pointer.y });
        if (polylinePoints.length > 1) {
          const line = new fabric.Line([
            polylinePoints[polylinePoints.length - 2].x,
            polylinePoints[polylinePoints.length - 2].y,
            polylinePoints[polylinePoints.length - 1].x,
            polylinePoints[polylinePoints.length - 1].y
          ], {
            stroke: shades[ColorIndex % shades.length],
            strokeWidth: 2
          });
          newFabricCanvas.add(line);
          if (polylinePoints.length > 2) {
            const angle = calculateAngle(
              polylinePoints[polylinePoints.length - 3],
              polylinePoints[polylinePoints.length - 2],
              polylinePoints[polylinePoints.length - 1]
            );
            const angleText = new fabric.Text(`${angle.toFixed(1)}°`, {
              left: polylinePoints[polylinePoints.length - 2].x,
              top: polylinePoints[polylinePoints.length - 2].y,
              fontSize: 14,
              fill:shades[ColorIndex % shades.length]
            });
            newFabricCanvas.add(angleText);
          }
        }
      }
    });
  
    newFabricCanvas.on('mouse:move', function(options) {
      if (isDrawing && currentShape && drawingMode === 'line') {
        const pointer = newFabricCanvas.getPointer(options.e);
        currentShape.set({
          x2: pointer.x,
          y2: pointer.y
        });
        newFabricCanvas.renderAll();
      }
    });
  
    newFabricCanvas.on('mouse:up', function() {
      if (drawingMode === 'line') {
        isDrawing = false;
        currentShape = null;
      }
    });
  }
  
// function handleVideoUpload(event) {
//   const file = event.target.files[0];
//   if (!file) return;

//   const url = URL.createObjectURL(file);

//   const existingContainer = document.getElementById('video-container');
//   existingContainer.style.left = '-100px';
//   const canvasonSwitch = document.getElementById('toggle-icon');
//   canvasonSwitch.style.display= 'block';
//   const containerWrapper = document.getElementById('container-wrapper');
//   if (!existingContainer) return;

//   const buttonsContainer = document.querySelector('.buttons-container');
//   const timeline = document.querySelector('.timeline');

//   buttonsContainer.style.width = '650px'; // Adjust width as needed
//   buttonsContainer.style.float = 'left';
//   buttonsContainer.style.display = 'inline-block';
//   buttonsContainer.style.left='-400px';

//   timeline.style.width = '650px'; // Match width of buttons-container
//   timeline.style.float = 'left';
//   timeline.style.display = 'inline-block';
//   timeline.style.marginLeft = '0';
//   timeline.style.left='-395px';

//   const videoButtonContainer = document.querySelector('.video-buttons-container');
//   videoButtonContainer.style.display = 'none';

//   const volumeButtonContainer = document.querySelector('.volume-button-container');
//   volumeButtonContainer.style.display = 'none';
//   const annotationSidebar = document.querySelector('.annotations');
//   annotationSidebar.style.display = 'none';
  

//   const newContainer = document.createElement('div');
//   newContainer.style.right = '-200px'
//   newContainer.id = 'video-container2';
//   newContainer.style.width = '500px'; // Set a small width
//   newContainer.style.height = '500px'; // Set a small height
//   newContainer.style.position = 'relative';
//   newContainer.style.float = 'right'; // Align it to the right side
//   newContainer.style.top = '0.5px';
//   // Create a new video element
//   const newVideo = document.createElement('video');
//   newVideo.src = url;
//   // newVideo.controls = true;
//   newVideo.style.width = '100%'; // Match the width of the container
//   newVideo.style.height = '100%'; // Match the height of the container
//   newVideo.id = 'new-video2';
  
//   // Create a new fabric.js canvas
//   const newCanvas = document.createElement('canvas');
//   newCanvas.id = 'new-canvas2';
//   // newCanvas.width = 500; // Match the width of the container
//   // newCanvas.height = 500; // Match the height of the container

//   newContainer.appendChild(newVideo);
//   newContainer.appendChild(newCanvas);
//   containerWrapper.appendChild(newContainer);
//   newVideo.play();

  
// //   // Initialize Fabric.js on the new canvas
//    newFabricCanvas = new fabric.Canvas('new-canvas2', {
//     selection: false,
//     isDrawingMode: false
//   });

// //   // Handle annotations for the new video
// //   const newAnnotations = [];

//   newVideo.addEventListener('loadedmetadata', () => {
//     newCanvas.width = newVideo.clientWidth;
//     newCanvas.height = newVideo.clientHeight;
//     newFabricCanvas.setWidth(newVideo.clientWidth);
//     newFabricCanvas.setHeight(newVideo.clientHeight);
//   });

//   document.addEventListener('DOMContentLoaded', () => {
//     const icon = document.getElementById('toggle-icon');
  
//     icon.addEventListener('click', () => {
//         icon.classList.toggle('disabled');
//         icon.classList.toggle('enabled');
//         const isDisabled = icon.classList.contains('disabled');
  
//         // Update onclick functions based on the icon's state
//         document.getElementById('freehand').onclick = isDisabled ? drawFreehandDisabled : drawFreehand;
//         // document.querySelector('.view-icon svg').onclick = isDisabled ? viewDisabled : view;
  
//         console.log('Toggled state: ', icon.className);
//     });
//     });
  
//   function drawFreehandDisabled() {
//     console.log("Freehand mode is disabled");
//     newCanvas.isDrawingMode = true;
//     drawingMode = '';
//     newCanvas.freeDrawingBrush ='red';
//   }
  
//   newCanvas.on('mouse:down', function(options) {
//     const pointer = canvas.getPointer(options.e);
//     if (drawingMode === 'line') {
//         isDrawing = true;
       
//         const points = [pointer.x, pointer.y, pointer.x, pointer.y];
//         currentShape = new fabric.Line(points, {
//             strokeWidth: 2,
//             fill: 'red',
//             stroke: 'red',
//             originX: 'center',
//             originY: 'center'
//         });
//         newCanvas.add(currentShape);
//     }else if (drawingMode === 'polyline') {
//         polylinePoints.push({ x: pointer.x, y: pointer.y });
//         if (polylinePoints.length > 1) {
//             const line = new fabric.Line([
//                 polylinePoints[polylinePoints.length - 2].x,
//                 polylinePoints[polylinePoints.length - 2].y,
//                 polylinePoints[polylinePoints.length - 1].x,
//                 polylinePoints[polylinePoints.length - 1].y
//             ], {
//                 stroke: 'red',
//                 strokeWidth: 2
//             });
//             newCanvas.add(line);
//             if (polylinePoints.length > 2) {
//                 const angle = calculateAngle(
//                     polylinePoints[polylinePoints.length - 3],
//                     polylinePoints[polylinePoints.length - 2],
//                     polylinePoints[polylinePoints.length - 1]
//                 );
//                 const angleText = new fabric.Text(`${angle.toFixed(1)}°`, {
//                     left: polylinePoints[polylinePoints.length - 2].x,
//                     top: polylinePoints[polylinePoints.length - 2].y,
//                     fontSize: 14,
//                     fill: 'red'
//                 });
//                 newCanvas.add(angleText);
//             }
//         }}});
  
//         newCanvas.on('mouse:move', function(options) {
//     if (isDrawing && currentShape  && drawingMode === 'line') {
//         const pointer = canvas.getPointer(options.e);
//         currentShape.set({
//             x2: pointer.x,
//             y2: pointer.y
//         });
//         newCanvas.renderAll();
//     }
//   });
  
//   newCanvas.on('mouse:up', function() {
//     if (drawingMode === 'line') {
//     isDrawing = false;
//     currentShape = null;
//     }
//   });


// }

// function setCurrentColor() {
//   if (newFabricCanvas.freeDrawingBrush) {
//       currentColorIndex++;
//       newFabricCanvas.freeDrawingBrush.color = colors[currentColorIndex % colors.length];
      
//       console.log('inside free hand drawing condition')
//   }
//   console.log('outside free hand drawing condition')
// }
function handleImgUpload(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const dataURL = e.target.result;

          // Create a Fabric.js image object
          fabric.Image.fromURL(dataURL, function(img) {
              // Set default properties for the image
              img.set({
                  left: 50,
                  top: 50,
                  scaleX: 1,
                  scaleY: 1,
                  selectable: true,
                  hasControls: true,
                  hasBorders: true,
              });

              // Add the image to the canvas
              newFabricCanvas.add(img);
              newFabricCanvas.centerObject(img);
              newFabricCanvas.renderAll();
          });
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);
  }
}


 



