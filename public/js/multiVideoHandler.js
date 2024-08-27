

let newAnnotations = [];
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
    
    existingContainer.style.backgroundColor = 'black';
    
    const buttonsContainer = document.querySelector('.buttons-container');
    const timeline = document.querySelector('.timeline');
  
    buttonsContainer.style.width = '650px';
    buttonsContainer.style.float = 'left';
    buttonsContainer.style.display = 'inline-block';
    buttonsContainer.style.left = '-400px';
    buttonsContainer.style.top = '-08px';

    timeline.style.width = '650px';
    timeline.style.float = 'left';
    timeline.style.display = 'inline-block';
    timeline.style.marginLeft = '0';
    timeline.style.left = '10px';
    timeline.style.top = '-08px';
  
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
    newContainer.style.height = '400px';
    newContainer.style.position = 'relative';
    newContainer.style.float = 'right';
    newContainer.style.top = '0.5px';
    newContainer.style.backgroundColor = 'black';
  
    const newVideo = document.createElement('video');
    newVideo.src = url;
    newVideo.style.width = '500px';
    newVideo.style.height = '281px'; // Keep the original aspect ratio

    // Center the video vertically in the container
    newVideo.style.position = 'absolute';
    newVideo.style.top = '50%';
    newVideo.style.left = '0';
    newVideo.style.transform = 'translateY(-50%)';
    newVideo.id = 'new-video2';
    // console.log('Video url:',newVideo.url);
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'new-canvas2';
  
    newContainer.appendChild(newVideo);
    newContainer.appendChild(newCanvas);
    containerWrapper.appendChild(newContainer);
    // newVideo.play();
    setupTimelineforVideo2();
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
      console.log('Video duration after laoding metadata:',newVideo.duration);
    });
    
    const icon1 = document.getElementById('toggle-icon');
    const icon2 = document.getElementById('toggle-icon2');
    
    function toggleIcons(activeIcon, inactiveIcon) {
        activeIcon.classList.toggle('disabled');
        activeIcon.classList.toggle('enabled');
        inactiveIcon.classList.toggle('disabled');
        inactiveIcon.classList.toggle('enabled');
          const isDisabled = icon1.classList.contains('disabled');
    
          
          document.getElementById('freehand').onclick = isDisabled ? freehandCanvas2 : drawFreehand;
          document.getElementById('circle').onclick = isDisabled ? CircleModeCanvas2 : activateCircleMode;
          document.getElementById('rect').onclick = isDisabled ? RectangleModeCanvas2 : activateRectangleMode;
          document.getElementById('line').onclick = isDisabled ? LineModeCanvas2 : activateLineMode;
          document.getElementById('polyline').onclick = isDisabled ? PolylineModeCanvas2 : activatePolylineMode;
          document.getElementById('text').onclick = isDisabled ? TextModeCanvas2 : activateTextMode;
          document.getElementById('image').onclick = isDisabled ? activateImageCanvas2 : activateImage;
          document.getElementById('note').onclick = isDisabled ?  NoteModeCanvas2 : activateNoteMode;
          document.getElementById('eraser').onclick = isDisabled ? useEraserCanvas2 : useEraser;
          document.getElementById('undo').onclick = isDisabled ? undoCanvas2 : undo;
          document.getElementById('redo').onclick = isDisabled ? redoCanvas2 : redo;
          // document.getElementById('microphone-icon').onclick = isDisabled ? redoCanvas2 : redo;
          const microphoneIcon = document.getElementById('microphone-icon');
          if (isDisabled) {
            microphoneIcon.removeEventListener('click', toggleMicrophone);
            microphoneIcon.addEventListener('click', toggleMicrophoneCanvas2); 
        } else {
            microphoneIcon.removeEventListener('click', toggleMicrophoneCanvas2);
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

  const newButtonsContainer = document.createElement('div');
    newButtonsContainer.className = 'buttons-container';
    newButtonsContainer.style.width = '650px';
    newButtonsContainer.style.float = 'left';
    newButtonsContainer.style.display = 'inline-block';
    newButtonsContainer.style.left = '-07px';
    newButtonsContainer.style.top = '-08px';
    newButtonsContainer.id='new-btn-container';
    document.getElementById('existing-btn-cont').style.left='0.4px';
    // timeline.style.left='-10%';
    
    // Add the same buttons as the original buttons-container
    newButtonsContainer.innerHTML = `
        <div class="video-buttons">
            <div class="button-with-menu">
                <span class="formatted-timeframe">
                    <span>
                        <input type="text" id="new-video-time" class="current-time-input" value="0:01" color="white">
                    </span>
                    <span>
                        <span>&nbsp;/&nbsp;1:00</span>
                        <span class="formatted-timeframe-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#868E96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </span>
                    </span>
                </span>
                <ul hidden="" class="menu-popup-container">
                    <li class="menu-popup-option-active">Standard</li>
                    <li class="menu-popup-option">Frames</li>
                </ul>
            </div>
        </div>
        <div class="video-buttons center">
            <button class="video-button" title="Previous">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
                </svg>
            </button>
            <button class="video-button" title="Play video" id="new-play-pause-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" background-color="#343a40">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path id="new-play-icon" d="M8 5v14l11-7z"></path>
                    <path id="new-pause-icon" d="M6 6h2v12H6zm3.5 0h2v12h-2z" style="display: none;"></path>
                </svg>
            </button>
            <button class="video-button" title="Next">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
                </svg>
            </button>
        </div>
        
    `;
    
    // Append the new buttons-container to the containerWrapper
    document.getElementById('parentbtncontainer').appendChild(newButtonsContainer);
    const newplayPauseButton = document.getElementById('new-play-pause-button');
// const newplayPauseImage = playPauseButton.querySelector('img');

newplayPauseButton.addEventListener('click', () => {
  const playIcon = document.getElementById('new-play-icon');
  const pauseIcon = document.getElementById('new-pause-icon');
  


  if (playIcon.style.display === 'none') {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
  } else {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      
  }
  video.onended = function() {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
  };
if (newVideo.paused) {
    console.log('inside play condition')
    newVideo.play();
    //playAudioAnnotationIfExists(video.currentTime);
   // playPauseImage.src = 'icons/pause.png';
    //playPauseImage.alt = 'Pause';
} else {
    console.log('inside pause condition')
    newVideo.pause();
   // playPauseImage.src = 'icons/play.jpg';
   // playPauseImage.alt = 'Play';
}
});
   

  // const video2 = document.getElementById('new-video2');
  // const currentTimeInput2 = document.getElementById('new-video-time');
  // // const totalTimeSpan = document.querySelector('.formatted-timeframe span:nth-child(2) span:first-child');

 
  
  

  // video2.addEventListener('timeupdate', function() {
  //     currentTimeInput2.value = newformatTime(video.currentTime);
  //     console.log('timeupdated');
  // });

  // video.addEventListener('loadedmetadata', function() {
  //     totalTimeSpan.textContent = ` / ${newformatTime(video.duration)}`;
  // });


function newformatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


      let drawingMode = '';
      let isDrawing = false;

    function setDrawingColor() {
        if (newFabricCanvas.freeDrawingBrush) {
            ColorIndex++;
            newFabricCanvas.freeDrawingBrush.color = shades[ColorIndex % shades.length]; 
        }  
    }
    function freehandCanvas2() {
      console.log("Freehand mode is disabled");
      newFabricCanvas.isDrawingMode = true;
      drawingMode = '';
      setDrawingColor();
    }
    function CircleModeCanvas2 () {
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
    
    function RectangleModeCanvas2 () {
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
    function LineModeCanvas2() { 
      drawingMode = 'line';
      newFabricCanvas.isDrawingMode = false; 
      newFabricCanvas.upperCanvasEl.classList.add('canvas-plus-cursor');
     }

     function PolylineModeCanvas2() {
      drawingMode = 'polyline';
      newFabricCanvas.isDrawingMode = false; // Disable freehand drawing mode
      polylinePoints = [];
      newFabricCanvas.upperCanvasEl.classList.add('canvas-plus-cursor');
     }

     function TextModeCanvas2() {
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
     function activateImageCanvas2() {

      document.getElementById('imageTool').click();
     }
     function NoteModeCanvas2() {
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
     
     function useEraserCanvas2() { 
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


     function toggleMicrophoneCanvas2(){
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
    
    function redoCanvas2() {
        if (newmods < state.length - 1) {
          newmods += 1;
          newFabricCanvas.loadFromJSON(newstate[newmods]);
          newFabricCanvas.renderAll();
        }
    }
    
   
    function undoCanvas2(){
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

function recordAnnotation2() {
  newVideo = document.getElementById('new-video2');
  const currentTime = newVideo.currentTime;
  if(newVideo.paused){
    const existingAnnotationIndex = newAnnotations.findIndex(annotation => Math.floor(annotation.time) === Math.floor(currentTime));
  const annotation = {
      time: currentTime,
      content: JSON.stringify(newFabricCanvas.toJSON()), // Store the canvas state
  };
  
  

  if (existingAnnotationIndex !== -1) {
    newAnnotations[existingAnnotationIndex] = annotation;
   
} else {
  newAnnotations.push(annotation);
  for (const annotation of newAnnotations) {
    console.log('Annotation:', annotation);
  }
    
}
console.log('Annotation recorded:', annotation);

  }else {
    console.log('Video is playing, not adding annotation');
}
}



function setupTimelineforVideo2() {
  const timelineWrapper = document.getElementById('timeline-wrapper');

  const timelineContainer = document.createElement('div');
  timelineContainer.id = 'timeline-container2';
  timelineContainer.style.width = '650px';
  timelineContainer.style.right = '-120px';
  const videoElement = document.getElementById('new-video2');
  videoElement.addEventListener('loadedmetadata', function() {
    console.log('Video URL:', videoElement.src);
    console.log('Video duration:', videoElement.duration);
    const newVideoDuration = Math.floor(videoElement.duration);
    timelineContainer.style.setProperty('--duration', newVideoDuration);
  // console.log('Video url:',videoElement.src);
  // console.log('Video duration:',videoElement.duration);
  // const newVideoDuration = Math.floor(videoElement.duration);
  timelineContainer.style.setProperty('--duration', newVideoDuration);

  for (let i = 0; i < newVideoDuration; i++) {
    const tick = document.createElement('div');
    tick.classList.add('newvideotick');
    tick.dataset.time = i;

    const icon = document.createElement('div');
    icon.classList.add('newvideoicon');
    const img = document.createElement('img');
    img.src = 'icons/pencil.png';
    img.alt = 'Pencil';
    img.style.display='none';
    icon.appendChild(img);
    tick.appendChild(icon);

    img.addEventListener('dragstart', handleDragStart);
    tick.addEventListener('dragover', handleDragOver);
    tick.addEventListener('drop', handleDrop);
    img.setAttribute('draggable', true);

    timelineContainer.appendChild(tick);
  }

  for (let i = 0; i < newVideoDuration; i++) {
    const tick2 = document.createElement('div');
    tick2.classList.add('newvideotick2');
    tick2.dataset.time = i;
    timelineContainer.appendChild(tick2);

    tick2.addEventListener('click', function (event) {
      if (tick2.classList.contains('blocked')) {
        console.log(`Tick at ${i} seconds is blocked.`);
        event.stopPropagation();
        return;
      }
      console.log(`Clicked on tick at ${i} seconds.`);
      videoElement.currentTime = i;
    });
  
  }


  // const pointer2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // pointer2.setAttribute('width', '13');
  // pointer2.setAttribute('height', '21');
  // pointer2.setAttribute('fill', 'none');
  // pointer2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  // pointer2.setAttribute('alt', 'draggable icon for progress bar');
  // pointer2.classList.add('pointer2');
  // pointer2.innerHTML = '<path d="M13 14.726C13 18.19 10.09 21 6.5 21S0 18.19 0 14.726C0 8.812 4.345 8 6.5 0 8 7.725 13 8.5 13 14.726z" fill="#CED0D1"></path><circle cx="6.5" cy="14.5" r="2.5" fill="#31373D"></circle>';
  // timelineContainer.appendChild(pointer2);

  function updatePointerAndTicks() {
    const percentage = (videoElement.currentTime / newVideoDuration) * 100;
    // pointer2.style.left = `calc(${percentage}% - 6.5px)`;

    const ticks2 = document.querySelectorAll('.newvideotick2');
    ticks2.forEach((tick2, index) => {
      if (index <= Math.floor(videoElement.currentTime)) {
        tick2.style.backgroundColor = 'red';
      } else {
        tick2.style.backgroundColor = 'white';
      }
    });
  }

  videoElement.addEventListener('timeupdate', updatePointerAndTicks);

  // pointer2.addEventListener('mousedown', (e) => {
  //   e.preventDefault();

  //   const movePointer = (e) => {
  //     const rect = timelineContainer.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const percentage = (x / rect.width) * 100;
  //     const newTime = (percentage / 100) * newVideoDuration;
  //     videoElement.currentTime = Math.min(Math.max(newTime, 0), newVideoDuration);
  //   };

  //   const stopDragging = () => {
  //     document.removeEventListener('mousemove', movePointer);
  //     document.removeEventListener('mouseup', stopDragging);
  //     updatePointerAndTicks();
  //   };

  //   document.addEventListener('mousemove', movePointer);
  //   document.addEventListener('mouseup', stopDragging);
  // });

  // videoElement.addEventListener('ended', () => {
  //   pointer2.style.left = `calc(100% - 29.5px)`;
  // });
});
  timelineWrapper.appendChild(timelineContainer);
}

 



