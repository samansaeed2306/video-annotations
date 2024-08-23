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
    const canvasonSwitch2 = document.getElementById('toggle-icon2');
    canvasonSwitch2.style.display = 'block';
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
    // setupTimelineforvideo2();
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
    
    const icon1 = document.getElementById('toggle-icon');
    const icon2 = document.getElementById('toggle-icon2');
    
    function toggleIcons(activeIcon, inactiveIcon) {
        activeIcon.classList.toggle('disabled');
        activeIcon.classList.toggle('enabled');
        inactiveIcon.classList.toggle('disabled');
        inactiveIcon.classList.toggle('enabled');
          const isDisabled = icon1.classList.contains('disabled');
    
          
          document.getElementById('freehand').onclick = isDisabled ? drawFreehandDisabled : drawFreehand;
          document.getElementById('circle').onclick = isDisabled ? activateCircleDisabled : activateCircleMode;
          document.getElementById('rect').onclick = isDisabled ? activateRectangleDisabled : activateRectangleMode;
          document.getElementById('line').onclick = isDisabled ? activateLineDisabled : activateLineMode;
          document.getElementById('polyline').onclick = isDisabled ? activatePolylineDisabled : activatePolylineMode;
          document.getElementById('text').onclick = isDisabled ? activateTextDisabled : activateTextMode;
          document.getElementById('image').onclick = isDisabled ? activateImageDisabled : activateImage;
          document.getElementById('note').onclick = isDisabled ?  activateNoteDisabled : activateNoteMode;
          document.getElementById('eraser').onclick = isDisabled ? useEraserDisabled : useEraser;
          document.getElementById('undo').onclick = isDisabled ? undoDisabled : undo;
          document.getElementById('redo').onclick = isDisabled ? redoDisabled : redo;
          // document.getElementById('microphone-icon').onclick = isDisabled ? redoDisabled : redo;
          const microphoneIcon = document.getElementById('microphone-icon');
          if (isDisabled) {
            microphoneIcon.removeEventListener('click', toggleMicrophone);
            microphoneIcon.addEventListener('click', toggleMicrophoneDisabled); 
        } else {
            microphoneIcon.removeEventListener('click', toggleMicrophoneDisabled);
            microphoneIcon.addEventListener('click', toggleMicrophone); 
        }

          console.log('Toggled state: ', icon1.className);
    
    }

    icon1.addEventListener('click', () => {
      toggleIcons(icon1, icon2);
  });
  
  icon2.addEventListener('click', () => {
      toggleIcons(icon2, icon1);
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
     
     function useEraserDisabled() { 
      newFabricCanvas.isDrawingMode = false;
      newFabricCanvas.on('mouse:down', function(event) {
        if (event.target) {
            const removedObject = event.target;
    
            // const currentTime = video.currentTime;
           // removeAnnotation(currentTime); to be added 
            // updateAnnotationsList();
            // updateTimelineIcons(); 
    

    
            newFabricCanvas.remove(removedObject);
    // canvas.remove(event.target);
}
});
     }

      let recording = false;
      let audioRecorder;
      let recordedchunks = [];
      let audioStr;


     function toggleMicrophoneDisabled(){
      console.log('Toggle Microphone for new video');
      
        if (recording) {
            stopRecordingnewVideo();
        } else {
            startRecordingnewVideo();
        }
    }
    

    async function startRecordingnewVideo() {
      recording = true;
      recordedchunks = [];
      document.getElementById('microphone-icon').classList.add('recording');
      audioStr = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRecorder = new MediaRecorder(audioStr);
      audioRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedchunks.push(event.data);
          }
      };
      audioRecorder.onstop = saveRecording;
  
      audioRecorder.start();
      console.log('Recording started');
  }
  
  function stopRecordingnewVideo() {
    recording = false;
      document.getElementById('microphone-icon').classList.remove('recording');
      audioRecorder.stop();
      
      audioStr.getTracks().forEach(track => track.stop());
      console.log('Recording stopped');
     
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

    const newstate = [];
    let newmods = 0;
    newFabricCanvas.on('object:added', ()=>{console.log('added'); newsaveState(); recordAnnotation2()});
    newFabricCanvas.on('object:removed', ()=>{newsaveState(); recordAnnotation2()});
    newFabricCanvas.on('object:modified', ()=>{newsaveState(); recordAnnotation2()});
    
    function newsaveState() {
      newmods += 1;
        if (newmods < newstate.length) {
          newstate.length = newmods;
        }
        newstate.push(JSON.stringify(newFabricCanvas));
        console.log('I am inside savestate for new canvas. Currentmod:',newmods)
        console.log('State array length', newstate.length)
        //recordAnnotation(video.currentTime);
    }
    
    // function undo() {
    //     if (mods > 0) {
    //         mods -= 1;
    //         canvas.loadFromJSON(state[mods]);
    //         canvas.renderAll();
    //     }
    // }
    
    function redoDisabled() {
        if (newmods < state.length - 1) {
          newmods += 1;
          newFabricCanvas.loadFromJSON(newstate[newmods]);
          newFabricCanvas.renderAll();
        }
    }
    
    function recordAnnotation2(){

    }
    function undoDisabled(){
      if (newmods > 0) {
        newmods --;
        newFabricCanvas.loadFromJSON(newstate[newmods], () => {
            newFabricCanvas.renderAll();
            console.log('Undo action performed. Current state:', newmods);
        });
        console.log('State array length', newstate.length)
    }
    }
  
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

// function setupTimelineforvideo2() {
//   const timeline = document.getElementById('timeline-container2');
//   const videoElement = document.getElementById('new-video2');
//   const newvideoduration = Math.floor(videoElement.duration);
//   timeline.style.setProperty('--duration', newvideoduration);

//   for (let i = 0; i < newvideoduration; i++) {
//               const tick = document.createElement('div');
//               tick.classList.add('newvideotick');
//               tick.dataset.time = i; 
      
              
//               const icon = document.createElement('div');
//               icon.classList.add('newvideoicon');
//               const img = document.createElement('img');
//               img.src = 'icons/pencil.png';
//               img.alt = 'Pencil';
//               icon.appendChild(img);
//               tick.appendChild(icon);
      
             
      
              
//               img.addEventListener('dragstart', handleDragStart);
//               tick.addEventListener('dragover', handleDragOver);
//               tick.addEventListener('drop', handleDrop);
//               img.setAttribute('draggable', true);
          
//               timeline.appendChild(tick);
//           }
//   // Create the timeline ticks
//   for (let i = 0; i < newvideoduration; i++) {
//       // const tick = document.createElement('div');
//       // tick.classList.add('tick');
//       // tick.dataset.time = i;
//       // timeline.appendChild(tick);

//       const tick2 = document.createElement('div');
//       tick2.classList.add('newvideotick2');
//       tick2.dataset.time = i;
//       timeline.appendChild(tick2);

//       tick2.addEventListener('click', function (event) {
//           if (tick2.classList.contains('blocked')) {
//               console.log(`Tick at ${i} seconds is blocked.`);
//               event.stopPropagation();
//               return;
//           }
//           console.log(`Clicked on tick at ${i} seconds.`);
//           videoElement.currentTime = i;
//       });
//   }

//   // Create the pointer (draggable SVG icon)
//   const pointer2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//   pointer2.setAttribute('width', '13');
//   pointer2.setAttribute('height', '21');
//   pointer2.setAttribute('fill', 'none');
//   pointer2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//   pointer2.setAttribute('alt', 'draggable icon for progress bar');
//   pointer2.classList.add('pointer2');
//   pointer2.innerHTML = '<path d="M13 14.726C13 18.19 10.09 21 6.5 21S0 18.19 0 14.726C0 8.812 4.345 8 6.5 0 8 7.725 13 8.5 13 14.726z" fill="#CED0D1"></path><circle cx="6.5" cy="14.5" r="2.5" fill="#31373D"></circle>';

//   timeline.appendChild(pointer2);

//   // Update pointer position and tick colors based on video time
//   function updatePointerAndTicks() {
//       const percentage = (videoElement.currentTime / newvideoduration) * 100;
//       pointer2.style.left = `calc(${percentage}% - 6.5px)`; // Center pointer over tick
      
//       // Update tick2 colors
//       const ticks2 = document.querySelectorAll('.tick2');
//       ticks2.forEach((tick2, index) => {
//           if (index <= Math.floor(videoElement.currentTime)) {
//               tick2.style.backgroundColor = 'red'; // Colored portion
//           } else {
//               tick2.style.backgroundColor = 'white'; // Uncolored portion
//           }
//       });
//   }

//   videoElement.addEventListener('timeupdate', updatePointerAndTicks);

//   // Handle dragging of the pointer
//   pointer2.addEventListener('mousedown', (e) => {
//       e.preventDefault();

//       const movePointer = (e) => {
//           const rect = timeline.getBoundingClientRect();
//           const x = e.clientX - rect.left;
//           const percentage = (x / rect.width) * 100;
//           const newTime = (percentage / 100) * newvideoduration;
//           videoElement.currentTime = Math.min(Math.max(newTime, 0), newvideoduration); // Constrain within bounds
//       };

//       const stopDragging = () => {
//           document.removeEventListener('mousemove', movePointer);
//           document.removeEventListener('mouseup', stopDragging);
//           updatePointerAndTicks(); // Ensure final update after dragging
//       };

//       document.addEventListener('mousemove', movePointer);
//       document.addEventListener('mouseup', stopDragging);
//   });

//   videoElement.addEventListener('ended', () => {
//       pointer2.style.left = `calc(100% - 29.5px)`; 
//   });
// }

 



