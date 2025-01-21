let annotations = [];
let currentColorIndex = 0;
const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#FF33FF', '#33FFFF'];
let videoAspectRatio='';
let selectedMediaType='';
let svgMarkup;
let isInteracting = false;
const canvas = new fabric.Canvas('canvas', {
    selection: false,
    isDrawingMode: false,
    // allowTouchScrolling: true,
    });
const apirecUrl = CONFIG.API_REC_URL;
let player;
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userid');
    const videoUrl = urlParams.get('videourl');

    
    console.log('User ID:', userId);
    console.log('Video URL:', videoUrl);

        const video = document.getElementById('video');
        if(player){
            player.dispose();
        }
        if (selectedMediaType === '' || selectedMediaType === 'video') {
            if(video) {
                
                player = videojs('video', {
                    controls: true,
                    fluid: true,
                    enableSmoothSeeking: true,
                    html5: {
                        nativeVideoTracks: true,
                        nativeAudioTracks: true,
                        nativeTextTracks: false,
                        nativeControlsForTouch: false
                    }
                });

                
                // player.textTracks()[0]='disabled'
                console.log("Player:",player);

                const storedVideoSrc = localStorage.getItem('selectedVideoSrc');
                const defaultVideo = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
                const videoSrc = storedVideoSrc || defaultVideo;
                if (videoUrl) {
        return;
    }
                loadVideo(videoSrc);

                // Clear localStorage only after successful load
                if (storedVideoSrc) {
                    player.one('loadeddata', function() {
                        localStorage.removeItem('selectedVideoSrc');
                    });
                }
            }
        }
    }, 1000);
    function loadVideo(videoSrc) {
        const isHLS = videoSrc.includes('.m3u8');
        
        player.src({
            src: videoSrc,
            type: isHLS ? 'application/x-mpegURL' : 'video/mp4'
        });
    
        player.ready(function() {
            console.log('The video has now been loaded!');
            player.on('loadedmetadata', function() {
                //setupTimeline(video, player);
            });
        });
    
        player.on('error', function(error) {
            console.error('Error:', player.error());
        });
    }     
});
function loadVideo(videoSrc) {
    const isHLS = videoSrc.includes('.m3u8');
    const video = document.getElementById('video');
    player.src({
        src: videoSrc,
        type: isHLS ? 'application/x-mpegURL' : 'video/mp4'
    });

    player.ready(function() {
        console.log('The video has now been loaded!');
        player.on('loadedmetadata', function() {
            //setupTimeline(video, player);
        });
    });

    player.on('error', function(error) {
        console.error('Error:', player.error());
    });
}     








const playPauseButton = document.getElementById('play-pause-button');
const playPauseImage = playPauseButton.querySelector('img');
const audioWave = document.querySelector('.audio-wave');
playPauseButton.addEventListener('click', () => {
    console.log('Canvas outside conditions Z index: ',document.getElementById('canvas').style.zIndex);
if (player.paused) {
    console.log('inside play condition')
    player.play();
    console.log('Canvas inside if Z index: ',document.getElementById('canvas').style.zIndex);
   
    audioWave.classList.add('active');
} else {
    console.log('inside pause condition')
    player.pause();
    audioWave.classList.remove('active');
    console.log('Canvas inside else Z index: ',document.getElementById('canvas').style.zIndex);
}
});

function view() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });

    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    video.currentTime = 0;
    video.play();

    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';

    video.onended = function() {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    };

   
    const toolsDiv = document.querySelector('.tools');

   
    const toolsStyles = {
        display: toolsDiv.style.display,
        position: toolsDiv.style.position,
        top: toolsDiv.style.top,
        left: toolsDiv.style.left,
        right: toolsDiv.style.right,
        bottom: toolsDiv.style.bottom,
        width: toolsDiv.style.width,
        height: toolsDiv.style.height,
        zIndex: toolsDiv.style.zIndex
    };

    
    toolsDiv.style.display = 'none'; 

    
    const exitDiv = document.createElement('div');
    exitDiv.id = 'exit-view-mode';
    exitDiv.style.position = 'absolute';
    exitDiv.style.top = '10px';
    exitDiv.style.left = '10px';
    exitDiv.style.zIndex = '1000';

    // Set the innerHTML of the div to your SVG
    exitDiv.innerHTML = `
        <svg height="20px" width="20px" viewBox="0 0 304.588 304.588" xmlns="http://www.w3.org/2000/svg">
        <title>Back to Annotate mode</title>
            <g>
                <g>
                    <g>
                        <polygon style="fill:#abb0c4;" points="134.921,34.204 134.921,54.399 284.398,54.399 284.398,250.183 134.921,250.183 
                            134.921,270.384 304.588,270.384 304.588,34.204 "/>
                    </g>
                    <g>
                        <polygon style="fill:#abb0c4;" points="150.27,223.581 166.615,239.931 254.26,152.286 166.615,64.651 150.27,80.979 
                            210.013,140.733 0,140.733 0,163.838 210.008,163.838 "/>
                    </g>
                </g>
            </g>
        </svg>`;

   
    document.body.appendChild(exitDiv);

   
    exitDiv.addEventListener('click', () => {
        
        document.querySelectorAll('button').forEach(button => {
            button.disabled = false;
        });

       
        document.body.removeChild(exitDiv);

       
        video.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        
        Object.assign(toolsDiv.style, toolsStyles);
    });
}






function convertBase64ToBlob(base64String, mimeType) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
}





function playAudioAnnotationIfExists(currentTime) {


    annotations.forEach(annotation => {
        if (Math.abs(annotation.time - currentTime) <= 0.15 && annotation.type=='audio') {
            console.log('Found an audio annotation');
            console.log('Annotation time: ',annotation.time);
            const mimeType = "audio/webm";
           
            const blob = convertBase64ToBlob(annotation.content, mimeType);
            var url = URL.createObjectURL(blob);
            const existingAudioElements = document.querySelectorAll('audio');
            var audioElement = Array.from(existingAudioElements).find(audio => audio.src === url);

            if (!audioElement) {
               

                console.log('I am inside condition where audio element is being created');
                audioElement = document.createElement('audio');
                audioElement.className = 'audio-element';
                audioElement.controls = true;
                audioElement.src = url;
                document.body.appendChild(audioElement);
            }
    
           
            audioElement.play();
            
           
        }
        
        

    });
}
function setCurrentDrawingColor() {
    if (canvas.freeDrawingBrush) {
        
        canvas.freeDrawingBrush.color = selectedColor;
        
        console.log('inside free hand drawing condition')
    }
    console.log('outside free hand drawing condition')
}


let drawingMode = '';
let isDrawing = false;

function drawFreehand() {
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null; 
    }
    canvas.isDrawingMode = true;
    drawingMode = '';
    setCurrentDrawingColor(); 
   
}


function activateCircleMode() {
    isInteracting = true;
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null; 
    }
    canvas.isDrawingMode = false;
    drawingMode = 'circle';
    if (selectedMediaType === 'image') {
        const circle = new fabric.Circle({
            left: 230,
    
            top: 170,
    
            radius: 30,
            fill: 'transparent',
            stroke: selectedColor,
            strokeWidth: 2
        });
        canvas.add(circle).setActiveObject(circle);

    }
    else{
       if (videoAspectRatio < 1) {
    console.log('Oops!! This is portrait circle');
    const circle = new fabric.Circle({
        left: 100,

        top: 350,

        radius: 30,
        fill: 'transparent',
        stroke: selectedColor,
        strokeWidth: 2
    });
    canvas.add(circle).setActiveObject(circle);
   }
   else{

    const circle = new fabric.Circle({
        left: 230,

        top: 350,

        radius: 30,
        fill: 'transparent',
        stroke: selectedColor,
        strokeWidth: 2
    });
    canvas.add(circle).setActiveObject(circle);
   }

   isInteracting = false; 
   
}}
function activateRectangleMode() {
    isInteracting = true;
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null;  
    }
    canvas.isDrawingMode = false;
    drawingMode = 'rectangle';
    if (selectedMediaType === 'image') {
        const rect = new fabric.Rect({

            left: 250,
            top: 170,

            width: 60,
            height: 60,
            fill: 'transparent',
            stroke: selectedColor,
            strokeWidth: 2
        });
        canvas.add(rect).setActiveObject(rect);
    
    }else{
    if(videoAspectRatio<1){
        const rect = new fabric.Rect({

            left: 120,
            top: 350,

            width: 60,
            height: 60,
            fill: 'transparent',
            stroke: selectedColor,
            strokeWidth: 2
        });
        canvas.add(rect).setActiveObject(rect);
    }else{
        const rect = new fabric.Rect({

            left: 250,
            top: 370,

            width: 60,
            height: 60,
            fill: 'transparent',
            stroke: selectedColor,
            strokeWidth: 2
        });
        canvas.add(rect).setActiveObject(rect);
    }}
    isInteracting = false;
}

function activateTextMode() {
    isInteracting = true;
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null; 
    }
    canvas.isDrawingMode = false;
    drawingMode = 'text';
    if (selectedMediaType === 'image') {
        const text = new fabric.Textbox('Type here', {

            left: 150,
            top: 250,
    
            fontSize: 20,
            fontFamily: 'Arial',
            fill: selectedColor,
            width: 200
        });
        currentColorIndex++;
        canvas.add(text).setActiveObject(text);
    }else{
    if(videoAspectRatio<1){
        const text = new fabric.Textbox('Type here', {

            left: 150,
            top: 350,
    
            fontSize: 20,
            fontFamily: 'Arial',
            fill: selectedColor,
            width: 200
        });
        currentColorIndex++;
        canvas.add(text).setActiveObject(text);
    }
    else{
        const text = new fabric.Textbox('Type here', {

            left: 250,
            top: 380,
    
            fontSize: 20,
            fontFamily: 'Arial',
            fill: selectedColor,
            width: 200
        });
        currentColorIndex++;
        canvas.add(text).setActiveObject(text);
    }
    isInteracting = false;
}
}

function activateNoteMode() {
    isInteracting = true;
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null;  
    }
    console.log("Activate Note function")
    canvas.isDrawingMode = false;
    drawingMode = 'note';
    if (selectedMediaType === 'image') {
        const note = new fabric.Textbox('Note here', {

            left: 150,
            top: 100,
    
            fontSize: 14,
            fontFamily: 'Arial',
            fill: selectedColor,
            backgroundColor: '#ffffcc',
            width: 200
        });
        currentColorIndex++;
        canvas.add(note).setActiveObject(note);
    }else{
    if(videoAspectRatio<1){
        const note = new fabric.Textbox('Note here', {

            left: 150,
            top: 550,
    
            fontSize: 14,
            fontFamily: 'Arial',
            fill: selectedColor,
            backgroundColor: '#ffffcc',
            width: 200
        });
        currentColorIndex++;
        canvas.add(note).setActiveObject(note);
    }
    else{
        const note = new fabric.Textbox('Note here', {

            left: 250,
            top: 380,
    
            fontSize: 14,
            fontFamily: 'Arial',
            fill: selectedColor,
            backgroundColor: '#ffffcc',
            width: 200
        });
        currentColorIndex++;
        canvas.add(note).setActiveObject(note);
    }}
    isInteracting = false;
   
}
let eraserListener = null;

function deactivatePolylineMode() {
    if (isPolylineActive) {
        drawingMode = null;
        canvas.upperCanvasEl.classList.remove('canvas-plus-cursor');
        isPolylineActive = false;
       
        polylinePoints = [];
    }
}

function useEraser() {
    
    deactivatePolylineMode(); 
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
    }

    canvas.isDrawingMode = false;
    canvas.defaultCursor = 'crosshair';

    eraserListener = function(event) {
        const pointer = canvas.getPointer(event.e);
        const objects = canvas.getObjects();
        let objectsToRemove = new Set();
        let foundObject = null;

      
        for (const obj of objects) {
            if (obj instanceof fabric.Line || obj instanceof fabric.Polyline) {
                const { x, y } = pointer;
                const bbox = obj.getBoundingRect();
                if (x >= bbox.left && x <= bbox.left + bbox.width && y >= bbox.top && y <= bbox.top + bbox.height) {
                    foundObject = obj;
                    break;
                }
            } else if (obj.containsPoint(pointer)) {
                foundObject = obj;
                break;
            }
        }

       
        for (const obj of objects) {
            if (obj instanceof fabric.Line) {
                const { x, y } = pointer;
                const bbox = obj.getBoundingRect();
                if (x >= bbox.left && x <= bbox.left + bbox.width && y >= bbox.top && y <= bbox.top + bbox.height) {
                    findConnectedObjects(obj, objects, objectsToRemove);
                }
            }
        }

        if (foundObject && !objectsToRemove.has(foundObject)) {
            objectsToRemove.add(foundObject);
        }

        if (objectsToRemove.size > 0) {
            const currentTime = video.currentTime;
            objectsToRemove.forEach(obj => {
                canvas.remove(obj);
                //updateTimelineIcons();
            });
           
            canvas.renderAll();
            console.log(`Removed ${objectsToRemove.size} objects`);
        } else {
            console.log("No object found under the pointer.");
        }
    };
    
    canvas.on('mouse:down', eraserListener);
    
}
function findAssociatedAngleText(lineObj, allObjects, objectsToRemove) {
    const linePoints = [
        { x: lineObj.x1, y: lineObj.y1 },
        { x: lineObj.x2, y: lineObj.y2 }
    ];

    for (const obj of allObjects) {
        if (obj instanceof fabric.Text && obj.text.includes('°') && !objectsToRemove.has(obj)) {
            if (isNearPoint(obj, linePoints[0]) || isNearPoint(obj, linePoints[1])) {
                objectsToRemove.add(obj);
            }
        }
    }
}
function findConnectedObjects(startObj, allObjects, objectsToRemove) {
    objectsToRemove.add(startObj);

    const startPoints = [
        { x: startObj.x1, y: startObj.y1 },
        { x: startObj.x2, y: startObj.y2 }
    ];

    for (const obj of allObjects) {
        if (obj instanceof fabric.Line && !objectsToRemove.has(obj)) {
            const endPoints = [
                { x: obj.x1, y: obj.y1 },
                { x: obj.x2, y: obj.y2 }
            ];

            if (pointsMatch(startPoints, endPoints)) {
                findConnectedObjects(obj, allObjects, objectsToRemove);
            }
        } else if (obj instanceof fabric.Text && obj.text.includes('°')) {
           
            if (isNearPoint(obj, startPoints[0]) || isNearPoint(obj, startPoints[1])) {
                objectsToRemove.add(obj);
            }
        }
    }
}

function pointsMatch(points1, points2) {
    return points1.some(p1 => points2.some(p2 => 
        Math.abs(p1.x - p2.x) < 1 && Math.abs(p1.y - p2.y) < 1
    ));
}

function isNearPoint(textObj, point) {
    const textCenter = textObj.getCenterPoint();
    const distance = Math.sqrt(
        Math.pow(textCenter.x - point.x, 2) + Math.pow(textCenter.y - point.y, 2)
    );
    return distance < 20; 
}

function unpickTool() {
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null;  
    }
    canvas.isDrawingMode = false;
    canvas.defaultCursor = 'default';
    canvas.selection = true;
}
let isPolylineActive = false;
function activatePolylineMode() {
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null; 
    }
    drawingMode = 'polyline';
    canvas.isDrawingMode = false; 
    polylinePoints = [];
    canvas.upperCanvasEl.classList.add('canvas-plus-cursor');
    isPolylineActive = true;
}

function activateLineMode() {
    isInteracting = true;
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null; 
    }
    drawingMode = 'line';
    canvas.isDrawingMode = false; 
    if (selectedMediaType === 'image') {
        const line = new fabric.Line([50, 50, 200, 200], {
            left: 160,
            top: 100,
            stroke: selectedColor,
            strokeWidth: 2
        });
        canvas.add(line);
        canvas.setActiveObject(line)
    }
    else{
    if(videoAspectRatio<1){
        const line = new fabric.Line([50, 50, 200, 200], {
            left: 100,
            top: 300,
            stroke: selectedColor,
            strokeWidth: 2
        });
        canvas.add(line);
        canvas.setActiveObject(line)
    }
    else{
        const line = new fabric.Line([50, 50, 200, 200], {
            left: 230,
            top: 350,
            stroke: selectedColor,
            strokeWidth: 2
        });
        canvas.add(line);
        canvas.setActiveObject(line)
    }}
    isInteracting = false;
}

function activateImage() {
    isInteracting = true;
    if (eraserListener) {
        canvas.off('mouse:down', eraserListener);
        eraserListener = null;  
    }
    drawingMode = 'image';
    document.getElementById('imageInput').click();
}

function handleImageUpload(event) {
    // isInteracting = true;
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;

            
            fabric.Image.fromURL(dataURL, function(img) {
                
                img.set({
                    left: 50,
                    top: 50,

                    scaleX: 0.5,
                    scaleY: 0.5,

                    selectable: true,
                    hasControls: true,
                    hasBorders: true,
                });

                
                canvas.add(img);
                canvas.centerObject(img);
                canvas.renderAll();
                isInteracting = false;
            });
            
        };

       
        reader.readAsDataURL(file);
      //  isInteracting = false;
    }
    
}
// canvas.on('object:added', function(e) {
   
// });

canvas.on('mouse:down', function(options) {
    isInteracting = true;
    console.log("Inside mouse:down event",isInteracting);
    const pointer = canvas.getPointer(options.e);
    if (drawingMode === 'line') {
        
    }else if (drawingMode === 'polyline') {
        drawingMode = 'polyline';
        polylinePoints.push({ x: pointer.x, y: pointer.y });
        if (polylinePoints.length > 1) {
            const line = new fabric.Line([
                polylinePoints[polylinePoints.length - 2].x,
                polylinePoints[polylinePoints.length - 2].y,
                polylinePoints[polylinePoints.length - 1].x,
                polylinePoints[polylinePoints.length - 1].y
            ], {
                stroke: selectedColor,
                strokeWidth: 2
            });
            canvas.add(line);
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
                    fill: selectedColor
                });
                canvas.add(angleText);
            }
        }}});

canvas.on('mouse:move', function(options) {
    if (isDrawing && currentShape  && drawingMode === 'line') {
        const pointer = canvas.getPointer(options.e);
        currentShape.set({
            x2: pointer.x,
            y2: pointer.y
        });
    // if(drawingMode === 'polyline'){

    // }
        canvas.renderAll();
    }
});

canvas.on('mouse:up', function() {
    console.log("Inside mouse:up event",isInteracting);
    if (drawingMode === 'line') {
    isDrawing = false;
    currentShape = null;
    }
    if (isInteracting && drawingMode !== '') {
        saveState(); // Only save if a real interaction happened
        recordAnnotation(video.currentTime);
       
    }
    isInteracting = false;
    if(drawingMode !== 'polyline'){
        drawingMode = '';
    }
    
});

function calculateAngle(p1, p2, p3) {
    const dx1 = p2.x - p1.x;
    const dy1 = p2.y - p1.y;
    const dx2 = p3.x - p2.x;
    const dy2 = p3.y - p2.y;
    const angle = Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
    return Math.abs((angle * 180) / Math.PI); // Convert radians to degrees
}

function simulateCanvasClick(x, y) {
    const eventData = {
        clientX: x,
        clientY: y,
        target: canvas.upperCanvasEl, // The canvas element to trigger the event
    };

    // Simulate mousedown
    const mouseDownEvent = new MouseEvent('mousedown', eventData);
    canvas.upperCanvasEl.dispatchEvent(mouseDownEvent);

    // Simulate mouseup
    const mouseUpEvent = new MouseEvent('mouseup', eventData);
    canvas.upperCanvasEl.dispatchEvent(mouseUpEvent);

    console.log(`Simulated click at (${x}, ${y}) on the canvas.`);
}

const state = [];
let mods = 0;
canvas.on('object:added', () => {
    if (isInteracting) {
        saveState();
        recordAnnotation(video.currentTime);
        if(drawingMode === 'polyline'){
            console.log('This is a polyline');
        }else{
            simulateCanvasClick(0, 0);
       }
    // e.target.lockMovementX = false;
    // e.target.lockMovementY = false;
    // e.target.lockScalingX = false;
    // e.target.lockScalingY = false;  
    }
    
});

canvas.on('object:removed', () => {
    if (isInteracting) {
        saveState();
        recordAnnotation(video.currentTime);
}
});

canvas.on('object:modified', () => {
    if (isInteracting) {
        saveState();
        //recordAnnotation(video.currentTime);
        
    }
});
canvas.on('object:modified', updateAnnotation);
canvas.on('object:moving', updateAnnotation);
canvas.on('object:scaling', updateAnnotation);
canvas.on('object:rotating', updateAnnotation);

// canvas.on('touch:gesture', (e) => console.log('Gesture event:', e));
// canvas.on('touch:drag', (e) => console.log('Drag event:', e));
// canvas.on('touch:longpress', (e) => console.log('Long press event:', e));
// Track the start of the touch event
canvas.on('touch:start', function(e) {
    console.log('Touch start event:', e);
    // Initialize a timer for long press detection
    this.touchStartTime = Date.now();
});

// Track the touchmove event
canvas.on('touch:move', function(e) {
    console.log('Touch move event:', e);
});

// Track the touchend event
canvas.on('touch:end', function(e) {
    console.log('Touch end event:', e);
    const touchDuration = Date.now() - this.touchStartTime;

    // Detect if it's a long press (hold for 500ms or more)
    if (touchDuration >= 500) {
        console.log('Long press detected!');
    }
});

function updateAnnotation(e) {
    const obj = e.target;
    const currentTime = Math.floor(video.currentTime);
    
    const annotationIndex = annotations.findIndex(ann => 
        Math.floor(ann.time) === currentTime
    );

    if (annotationIndex !== -1) {
        annotations[annotationIndex].content = JSON.stringify(canvas);
        updateAnnotationsList();
    }

    canvas.renderAll();
}
canvas.on('text:changed', function(e) {
    let changedObject = e.target;
    if (changedObject && changedObject.type === 'textbox') {
        let time = video.currentTime; // Use the current video time
        let annotationIndex = annotations.findIndex(ann => Math.floor(ann.time) === Math.floor(time));
        
        if (annotationIndex !== -1) {
            // Parse the existing content
            let annotationContent = JSON.parse(annotations[annotationIndex].content);
            
            // Find the textbox in the parsed content and update it
            annotationContent.objects = annotationContent.objects.map(obj => {
                if (obj.type === 'textbox' && obj.left === changedObject.left && obj.top === changedObject.top) {
                    return {
                        ...obj,
                        text: changedObject.text
                    };
                }
                return obj;
            });
            
            // Update the annotation content
            annotations[annotationIndex].content = JSON.stringify(annotationContent);
            
            // Save the updated state
            saveState();
            
            console.log('Text annotation updated:', annotations[annotationIndex]);
        }
    }
});
// canvas.on('object:added', ()=>{saveState(); recordAnnotation(video.currentTime)});
// canvas.on('object:removed', ()=>{saveState(); recordAnnotation(video.currentTime)});
// canvas.on('object:modified', ()=>{saveState(); recordAnnotation(video.currentTime)});

function saveState() {
    mods += 1;
    if (mods < state.length) {
        state.length = mods;
    }
    state.push(JSON.stringify(canvas));
    console.log('I am inside savestate')
    
}

function undo() {
    if (mods > 0) {
        mods -= 1;
        canvas.loadFromJSON(state[mods]);
        canvas.renderAll();
    }
}

function redo() {
    if (mods < state.length - 1) {
        mods += 1;
        canvas.loadFromJSON(state[mods]);
        canvas.renderAll();
    }
}


const videoContainer = document.getElementById('video-container');
const video = document.getElementById('video');
const fabricCanvas = document.getElementById('canvas');

video.addEventListener('loadedmetadata', () => {
    

    fabricCanvas.width = video.clientWidth;
    fabricCanvas.height = video.clientHeight;
    canvas.setWidth(video.clientWidth);
    canvas.setHeight(video.clientHeight);
    videoAspectRatio = video.videoWidth / video.videoHeight;
    console.log(`Video Aspect Ratio: ${video.videoWidth}/${video.videoHeight}`);
    if (window.innerWidth > 520) {
    if (videoAspectRatio < 1) {
                console.log("This is a portrait video.");
                adjustForPortrait();
               
    } else if (videoAspectRatio > 1) {
        console.log("This is a landscape video.");
     
        toggleZoom();
        
    } else {
        console.log("This is a square video.");
   
        toggleZoom();
    }}
    console.log('Video Aspect Ratio Recorded: ',videoAspectRatio);
    if (videoAspectRatio < 1) {
        console.log("Hello");
    }
    console.log("Canvas Resizing!");
   
    
});


video.addEventListener('pause', () => {
    isInteracting = false;
  
    fabricCanvas.style.pointerEvents = 'none'; 
});


video.addEventListener('play', () => {
    isInteracting = false;
    canvas.isDrawingMode = false; 
    fabricCanvas.style.pointerEvents = 'none'; 
});


video.addEventListener('timeupdate', () => {
    isInteracting = false;
    // removeAnnotationsBeforeTime();
     //renderAnnotationsForCurrentTime(video.currentTime);
    // showAnnotationsAtCurrentTime(video.currentTime);
    if (!video.paused) { // Check if the video is playing
        playAudioAnnotationIfExists(video.currentTime);
    }
});

function adjustForPortrait() {
    // Reset any inline styles
    const video = document.getElementById('video');
    const container = document.getElementById('video-container');
    const canvas = document.getElementById('canvas');
    
    container.style.height = 'auto';
    container.style.width = 'auto';
    
    // Get video dimensions
    const videoWidth = video.style.width;
    const videoHeight = video.style.height;
    
    if (videoWidth < videoHeight) { // Portrait video
        // Adjust container to fit height
        const windowHeight = window.innerHeight;
        const newHeight = Math.min(videoHeight, windowHeight * 0.8); // 80% of window height
        container.style.height = newHeight + 'px';
        container.style.width = (newHeight * videoWidth / videoHeight) + 'px';
        const videojs = document.getElementsByClassName('.video-js .vjs-tech');
        videojs.style.top = '10%';
        // Shift the video to the right and canvas to the left
        video.style.position = 'absolute';
        video.style.left = '20px'; // Adjust this value as needed
        video.style.top = '20%';

        // Adjust canvas to match the new dimensions and position it on the left
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.style.width = container.style.width;
        canvas.style.height = container.style.height;
    } else { // Landscape or square video
        // For landscape, use the original CSS settings
        container.style.height = '80vh';
        container.style.width = 'auto';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        // Shift the video to the right and canvas to the left
        video.style.position = 'absolute';
        video.style.left = '0px'; // Adjust this value as needed
        // video.style.top = '30px';
        video.style.top = '5.4%';
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.top = '0';
    }
}

// function recordAnnotation(time) {
//     if(video.paused){
//     const existingAnnotationIndex = annotations.findIndex(annotation => Math.floor(annotation.time) === Math.floor(time));
//     const existingAnnotation = annotations.find(annotation => Math.floor(annotation.time) === Math.floor(time));
//     const annotation = {
//         time: time,
//         content: JSON.stringify(canvas.toJSON())
//     };

//     if (existingAnnotationIndex !== -1) {
//         annotations[existingAnnotationIndex] = annotation;
      
//     } else {
//         annotations.push(annotation);
//     }

//     console.log('Annotation recorded');
//     updateAnnotationsList();
//     //updateTimelineIcon(time);
//     }
//     else {
//     console.log('Video is playing, not adding annotation');
// }
//     }
    
function recordAnnotation(time) {
    if (video.paused) {
        const annotation = {
            time: time,
            content: JSON.stringify(canvas.toJSON())
        };

        // Add the new annotation without checking for duplicates
        annotations.push(annotation);

        console.log('Annotation recorded:', annotation);
        updateAnnotationsList();
        // updateTimelineIcon(time);
    } else {
        console.log('Video is playing, not adding annotation');
    }
}

function toggleClearAllIcon() {
    const clearAllIcon = document.getElementById('clear-all');
    
    if (annotations.length > 0) {
        clearAllIcon.style.display = 'block'; 
    } else {
        clearAllIcon.style.display = 'none'; 
    }
}
// function updateAnnotationsList() {
// annotations = Array.from(new Set(annotations.map(a => a.time))).map(time => annotations.find(a => a.time === time));

// annotations = annotations.filter(annotation => annotation.content && annotation.content !== '{"version":"4.5.0","objects":[]}');

// console.log('Inside list update:', annotations)
// const annotationsList = document.getElementById('annotations-list');
// annotationsList.innerHTML = '';
// annotations.forEach((annotation, index) => {
//     console.log('Processing annotation:', annotation);
//     if (annotation.content && annotation.content !== '{"version":"4.5.0","objects":[]}') {
//     console.log('Appending annotation to list:', annotation);
//     const listItem = document.createElement('li');
//     listItem.className = 'annotation-item';
    

   
//     if(annotation.type!= 'audio'){
//         const parsedContent = JSON.parse(annotation.content);
//         const annotationType = parsedContent.objects[parsedContent.objects.length - 1].type;
//         console.log(annotationType);
//     if(annotationType=='text'){
//             listItem.textContent = `polyline`;
//         }    
//     else if(annotationType=='rect'){
//         listItem.textContent = `rectangle`;
//     }
//     else if(annotationType=='textbox'){
//         const bgcolor = parsedContent.objects[parsedContent.objects.length - 1].backgroundColor;
//         if(bgcolor=='#ffffcc'){
//             listItem.textContent = `note`;
//         }
//         else{
//             listItem.textContent = `text box`;
//         }

//     }
  
//     else {
//         listItem.textContent = `${annotationType}`;
//     }
// }else{
//     listItem.textContent = `${annotation.type}`;
// }

    
//     const commentInput = document.createElement('input');
//     commentInput.type = 'text';
//     commentInput.placeholder = 'Add comment';
//     commentInput.value = annotation.comment || '';
//     commentInput.style.display = 'none'; 
//     commentInput.addEventListener('input', function() {
//         annotations[index].comment = commentInput.value;
//     });
//     const cancelButton = document.createElement('button');
// cancelButton.textContent = 'Cancel';
// cancelButton.style.display = 'none'; 
// cancelButton.addEventListener('click', function() {
//     commentInput.style.display = 'none';
//     cancelButton.style.display = 'none';
//     saveButton.style.display = 'none';
//     buttonsContainer.style.display='none';
//     listItem.removeChild(buttonsContainer);
// });

// const saveButton = document.createElement('button');
// saveButton.textContent = 'Save';
// saveButton.style.display = 'none'; 
// saveButton.addEventListener('click', function() {
//     annotations[index].comment = commentInput.value;
//     commentInput.style.display = 'none';
//     cancelButton.style.display = 'none';
//     saveButton.style.display = 'none';
//     buttonsContainer.style.display='none';
//     listItem.removeChild(buttonsContainer);
// });

//             const deleteIcon = document.createElement('img');
//             deleteIcon.src = 'icons/delete2.png'; // Path to your delete icon
//             deleteIcon.alt = 'Delete';
//             deleteIcon.style.width = '14px'; // Set the width as needed
//             deleteIcon.style.height = '14px'; // Set the height as needed
//             deleteIcon.style.backgroundColor='none';
//             deleteIcon.style.marginLeft= '10px'
           
           

//             deleteIcon.addEventListener('click', function() {
                
//                 annotations.splice(index, 1);
               
//                 const tick = document.querySelector(`.tick[data-time="${annotation.time}"]`);
//                 const tick3= document.querySelector(`.tick[data-time="${annotation.time}"] .has-audio`);
//                 if(tick3){
//                     tick3.classList.remove('has-audio');
//                     const icon = tick3.querySelector('.icon');
//                     const audioElement = tick3.querySelector('.audio-element');
                    
//                     if (icon) {
//                         icon.remove();
                       
//                     }
//                     if(audioElement){
//                         audioElement.remove();
//                     }
                    
                    
//                 }
//                 if (tick) {
//                     tick.classList.remove('has-drawing');
                    
//                     const icon = tick.querySelector('.icon');
                    
//                     if (icon) {
//                         icon.remove();
//                         //removePointerForPencilIcon(tick)
//                     }
                    
                
                
//                 }
                
//                 updateAnnotationsList();
//                 //updateTimelineIcons();
//                 renderAnnotationsForCurrentTime();
//             });
// const buttonsContainer = document.createElement('div');
// buttonsContainer.className = 'annotation-buttons';
// buttonsContainer.appendChild(commentInput);
// buttonsContainer.appendChild(cancelButton);
// buttonsContainer.appendChild(saveButton);


// listItem.appendChild(deleteIcon);
// listItem.appendChild(buttonsContainer);
// listItem.addEventListener('click', () => {
//     video.currentTime = annotation.time;
//     commentInput.style.display = 'block'; 
//     cancelButton.style.marginTop = '5px'; 
//     saveButton.style.marginTop = '5px'; 
//     cancelButton.style.display = 'inline-block'; 
//     saveButton.style.display = 'inline-block'; 
//     deleteIcon.style.display = 'inline-block';

// });


   
//     annotationsList.appendChild(listItem);
   
//     }else {
//     console.log('Skipping empty annotation:', annotation);
// }});
//     console.log('Inside list update 2:', annotations);
//     toggleClearAllIcon();
// }

function updateAnnotationsList() {
    // Filter out empty annotations based on their content
    annotations = annotations.filter(annotation => annotation.content && annotation.content !== '{"version":"4.5.0","objects":[]}');

    console.log('Inside list update:', annotations);

    const annotationsList = document.getElementById('annotations-list');
    annotationsList.innerHTML = ''; // Clear the current list

    annotations.forEach((annotation, index) => {
        console.log('Processing annotation:', annotation);

        if (annotation.content && annotation.content !== '{"version":"4.5.0","objects":[]}') {
            console.log('Appending annotation to list:', annotation);

            const listItem = document.createElement('li');
            listItem.className = 'annotation-item';

            if (annotation.type !== 'audio') {
                const parsedContent = JSON.parse(annotation.content);
                const annotationType = parsedContent.objects[parsedContent.objects.length - 1].type;

                console.log(annotationType);

                if (annotationType === 'text') {
                    listItem.textContent = `polyline`;
                } else if (annotationType === 'rect') {
                    listItem.textContent = `rectangle`;
                } else if (annotationType === 'textbox') {
                    const bgcolor = parsedContent.objects[parsedContent.objects.length - 1].backgroundColor;
                    listItem.textContent = bgcolor === '#ffffcc' ? `note` : `text box`;
                } else {
                    listItem.textContent = `${annotationType}`;
                }
            } else {
                listItem.textContent = `${annotation.type}`;
            }

            // Create input for comments
            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.placeholder = 'Add comment';
            commentInput.value = annotation.comment || '';
            commentInput.style.display = 'none';
            commentInput.addEventListener('input', function () {
                annotations[index].comment = commentInput.value;
            });

            // Create cancel button
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.style.display = 'none';
            cancelButton.addEventListener('click', function () {
                commentInput.style.display = 'none';
                cancelButton.style.display = 'none';
                saveButton.style.display = 'none';
                buttonsContainer.style.display = 'none';
                listItem.removeChild(buttonsContainer);
            });

            // Create save button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.style.display = 'none';
            saveButton.addEventListener('click', function () {
                annotations[index].comment = commentInput.value;
                commentInput.style.display = 'none';
                cancelButton.style.display = 'none';
                saveButton.style.display = 'none';
                buttonsContainer.style.display = 'none';
                listItem.removeChild(buttonsContainer);
            });

            // Create delete icon
            const deleteIcon = document.createElement('img');
            deleteIcon.src = 'icons/delete2.png';
            deleteIcon.alt = 'Delete';
            deleteIcon.style.width = '14px';
            deleteIcon.style.height = '14px';
            deleteIcon.style.backgroundColor = 'none';
            deleteIcon.style.marginLeft = '10px';

            deleteIcon.addEventListener('click', function () {
                annotations.splice(index, 1);
                updateAnnotationsList();
                renderAnnotationsForCurrentTime();
            });

            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'annotation-buttons';
            buttonsContainer.appendChild(commentInput);
            buttonsContainer.appendChild(cancelButton);
            buttonsContainer.appendChild(saveButton);

            listItem.appendChild(deleteIcon);
            listItem.appendChild(buttonsContainer);

            listItem.addEventListener('click', () => {
                video.currentTime = annotation.time;
                commentInput.style.display = 'block';
                cancelButton.style.marginTop = '5px';
                saveButton.style.marginTop = '5px';
                cancelButton.style.display = 'inline-block';
                saveButton.style.display = 'inline-block';
                deleteIcon.style.display = 'inline-block';
            });

            annotationsList.appendChild(listItem);
        } else {
            console.log('Skipping empty annotation:', annotation);
        }
    });

    console.log('Inside list update 2:', annotations);
    toggleClearAllIcon();
}


function confirmClearAll() {
    if (confirm("Are you sure you want to clear all annotations?")) {
      clearAll();
    }
  }

  function clearAll() {
    annotations = [];
    
    updateAnnotationsList();
    //updateTimelineIcons();

    console.log('All annotations have been cleared.');
    closeModal();
    renderAnnotationsForCurrentTime();

  }
const clearAllIcon = document.getElementById('clear-all');
clearAllIcon.addEventListener('click', function() {
    annotations = [];
    
    updateAnnotationsList();
    //updateTimelineIcons();

    console.log('All annotations have been cleared.');
    renderAnnotationsForCurrentTime();
});

function renderAnnotationsForCurrentTime() {
    console.log("Rendering annotations");

    // Maintain a set of annotation IDs currently rendered on the canvas
    let renderedAnnotationIds = new Set();

    // Filter annotations that need to be rendered
    let relevantAnnotations = annotations.filter(annotation => 
        annotation.type !== 'audio' 
    );

    // Collect objects to render
    let allObjectsToRender = [];

    relevantAnnotations.forEach((annotation, index) => {
        console.log(`Processing Annotation ${index + 1} at time ${annotation.time}`);
        
        // Parse and cache the annotation content if not already parsed
        annotation.parsedContent = annotation.parsedContent || JSON.parse(annotation.content);

        annotation.parsedContent.objects.forEach(obj => {
            allObjectsToRender.push(obj);
            renderedAnnotationIds.add(annotation.id); // Track rendered annotation IDs
        });
    });

    // Clear canvas if necessary and render new objects
    fabric.util.enlivenObjects(allObjectsToRender, function(enlivenedObjects) {
        canvas.clear(); // Clear canvas before adding objects
        enlivenedObjects.forEach(object => canvas.add(object)); // Add all objects to canvas
        canvas.renderAll(); // Render all objects
        console.log("Finished rendering annotations.");
    });
}

function renderAnnotationsForCurrentTime2(currentTime) {
    console.log("Rendering annotations for time:", currentTime);

    // Clear the canvas initially, but we will re-add all annotations that are supposed to remain visible
    canvas.clear();

    // Array to keep track of objects that will be added to the canvas
    let allObjectsToRender = [];

    // Loop through all annotations and render those that need to stay on the canvas
    annotations.forEach((annotation, index) => {
        if (annotation.type !== 'audio' && annotation.time <= currentTime) {
            console.log(`Rendering Annotation ${index + 1} as its time ${annotation.time} <= current time ${currentTime}`);

            // Parse the annotation content
            let parsedContent = JSON.parse(annotation.content);

            // Collect all objects from the annotation
            parsedContent.objects.forEach(obj => {
                allObjectsToRender.push(obj); // Add each object to the list of objects to render
            });
        } else {
            console.log(`Skipping Annotation ${index + 1} as its time ${annotation.time} is after the current time ${currentTime}`);
        }
    });

    // Add all objects to the canvas in one go
    fabric.util.enlivenObjects(allObjectsToRender, function(enlivenedObjects) {
        enlivenedObjects.forEach(object => {
            canvas.add(object); // Add each object to the canvas
        });

        // After adding all objects, render the canvas
        canvas.renderAll();
        console.log("Finished rendering annotations.");
    });
}


document.getElementById('microphone-icon').addEventListener('click', toggleMicrophone);

let isRecording = false;
let mediaRecorder;
let recordedChunks = [];
let audioStream;

function toggleMicrophone() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

async function startRecording() {
    isRecording = true;
    recordedChunks = [];
    document.getElementById('microphone-icon').classList.add('recording');
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };
    mediaRecorder.onstop = saveRecording;

    mediaRecorder.start();
    console.log('Recording started');
}

function stopRecording() {
    isRecording = false;
    document.getElementById('microphone-icon').classList.remove('recording');
    mediaRecorder.stop();
    
    audioStream.getTracks().forEach(track => track.stop());
    console.log('Recording stopped');
   
}
const timeline = document.getElementById('timeline');

async function saveRecording() {
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);

    const audioElement = document.createElement('audio');
    audioElement.className = 'audio-element';
    audioElement.controls = true;
    audioElement.src = url;
    //audioElement.style.width='200px';
  document.body.appendChild(audioElement);

   
    const startTime = video.currentTime;
    console.log(blob.size);
    const duration = (blob.size + 786.05)/17402.05;
    console.log('Duration of recording: ',duration);
    const endTime = startTime + duration; 
    const base64String = await convertBlobToBase64(blob);
    const annotation = {
        time: startTime,
        startTime: startTime,
        endTime: endTime,
        content: base64String,
        type: 'audio'
    };
    annotations.push(annotation);
     updateAnnotationsList();
     //updateTimelineIcons();
    console.log('Recording saved', annotation);
  
}


function displayRecordings() {
    annotations.forEach(annotation => {
        if (Math.abs(annotation.time - video.currentTime) < 0.5 && annotation.type === 'audio') {
            console.log("Inside display Recordings function's condition !")
            const startTime = annotation.startTime;
            const endTime = annotation.endTime;
            const duration = endTime - startTime;
            const width = calculateWidthFromDuration(duration);
            
            

            const recordingElement = document.createElement('div');
            recordingElement.classList.add('recording');
            recordingElement.style.left = `${(startTime / video.duration) * 100}%`;
            recordingElement.style.width = `${width}px`;
            recordingElement.style.height='20px';
            //recordingElement.src=url;
            recordingElement.style.backgroundColor='red';
           

           timeline.appendChild(recordingElement);
        }
    });
}

function calculateWidthFromDuration(duration) {
    const timelineWidth = timeline.offsetWidth;
    return (duration / video.duration) * timelineWidth;
}
function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

let activateFirstTime = false;

function handleSaveButtonClick(buttonElement) {
    const svgElement = buttonElement.querySelector('svg'); 
    
    buttonElement.classList.toggle('active');

    if (buttonElement.classList.contains('active')) {
        svgElement.style.fill = '#FFFF00'; 

        
        annotations.forEach(annotation => {
            saveAnnotation(annotation);
        });

       
        const overlay = document.getElementById('overlay');
        overlay.classList.add('active');

       
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 1500);

        activateFirstTime = true;
    } else {
        svgElement.style.fill = '#FFFFFF';  

        
        deleteAllAnnotations();
      
       
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('active');

        activateFirstTime = false;
    }
}

document.getElementById('save-button').addEventListener('click', function() {
    handleSaveButtonClick(this);  
});
async function convertFramesToVideo(frames, video) {
    const videoOutput = new Whammy.Video(30); // 30 FPS

    let frameIndex = 0;
    let currentFrameTime = 0;

    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;

    while (currentFrameTime <= video.duration) {
        if (frameIndex < frames.length && frames[frameIndex].time == currentFrameTime) {
           
            videoOutput.add(frames[frameIndex].frame);
            frameIndex++;
        } else {
           
            video.currentTime = currentFrameTime;
            await new Promise(resolve => video.onseeked = resolve);

           
            ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
            
           
            videoOutput.add(tempCanvas);
        }
        currentFrameTime += 1 / 30; 
    }

    return videoOutput.compile();
}


function downloadVideo(blob) {
    if (!(blob instanceof Blob)) {
        console.error("Expected a Blob, but got:", blob);
        return;
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'annotated-video.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function exportAnnotatedVideo(video, canvas, annotations) {
    try {
        const frames = await captureFrames(video, canvas, annotations);
        displayFrames(frames);  
        const videoBlob = await convertFramesToVideo(frames, video);
        console.log('Blob size:', videoBlob.size, 'bytes');
        downloadVideo(videoBlob);
      
    } catch (error) {
        console.error('Error exporting video:', error);
    }
}


const container = document.createElement('div');
container.id = 'screenshot-container';
document.body.appendChild(container);
const imageData = [];
async function captureScreenshot(video, canvas, timestamp, annotations) {
    return new Promise((resolve, reject) => {
        
       
        const videoCanvas = document.createElement('canvas');
        const videoContext = videoCanvas.getContext('2d');

      
        videoCanvas.width = video.videoWidth;
        videoCanvas.height = video.videoHeight;
        console.log('Timestamp',timestamp);
       
         video.currentTime = timestamp;

        
            videoContext.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
            for (const annotation of annotations) {
            
            
            if (annotation.time==timestamp) {
                console.log('Annotation time',annotation.time);
                
                canvas.clear();
                canvas.loadFromJSON(annotation.content, canvas.renderAll.bind(canvas));
                
               
                const canvasElement = canvas.getElement();
                videoContext.drawImage(canvasElement, 0, 0, videoCanvas.width, videoCanvas.height);
            

           
            videoCanvas.toBlob((blob) => {
                if (blob) {
                    const base64String = convertBlobToBase64(blob);
                    console.log('Base64 String:',base64String);
                    imageData.push(base64String);
                    console.log('Number of images:', imageData.length);
                    const screenshotUrl = URL.createObjectURL(blob);
                    
                   
                    const img = document.createElement('img');
                    img.src = screenshotUrl;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.margin = '5px'; 

                   
                    container.appendChild(img);
                    console.log('Added image')
                    resolve(screenshotUrl); 

                } else {
                    reject('Failed to capture the screenshot.');
                }
            }, 'image/png');
        }
        else{

        }
      
    };
    
        
        
        video.onerror = () => {
            reject('Error occurred while seeking the video.');
        };
       
    });
   
}


const startBtnRight = document.getElementById('screen-recording');
const startBtnHeader = document.getElementById('screen-recording2');

let mediaRecorder2;
let chunks = [];
let stream; // Persisting the stream object
const displayMediaOptions = {
    video: {
        displaySurface: "browser",
    },
    audio: {
        suppressLocalAudioPlayback: false,
    },
    preferCurrentTab: true,
    selfBrowserSurface: "include",
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
};

async function screenRecorder(event) {
    try {
        const icon = event.target.id === 'screen-recording' ? startBtnRight : startBtnHeader;

        if (icon.classList.contains('start-recording')) {
            console.log('Starting screen recording...');
            if (!stream) {
                stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            }

            mediaRecorder2 = new MediaRecorder(stream);

            mediaRecorder2.ondataavailable = event => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                    console.log('Data available from MediaRecorder.');
                }
            };

            mediaRecorder2.onstop = async () => {
                console.log('MediaRecorder stopped. Processing data...');
                if (chunks.length === 0) {
                    console.error('No data recorded. Check MediaRecorder or stream setup.');
                    return;
                }

                const blob = new Blob(chunks, { type: 'video/webm' });
                chunks = []; // Clear chunks for the next recording

                // Log the Blob size for debugging
                console.log(`Recording size: ${blob.size} bytes`);

                // Upload video file to server
                await uploadRecording(blob);

                // Stop all tracks after processing and uploading
                stopStreamTracks(stream);
                stream = null;
            };

            mediaRecorder2.start();
            console.log('Screen recording started.');

            icon.classList.remove('start-recording');
            icon.classList.add('stop-recording');

            icon.src = 'icons/stop-record.png';
            icon.alt = 'Stop Recording';
            icon.title = 'Stop Recording';
        } else if (icon.classList.contains('stop-recording')) {
            if (mediaRecorder2) {
                mediaRecorder2.stop();
                console.log('Screen recording stopped.');

                icon.classList.remove('stop-recording');
                icon.classList.add('start-recording');

                icon.src = 'icons/screenrecorder.png';
                icon.alt = 'Start Recording';
                icon.title = 'Record Screen';
            }
        }
    } catch (error) {
        console.error('Error during recording:', error);
    }
}

// Utility to upload the recording
async function uploadRecording(blob) {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userid')

    if (!userId) {
        console.error('User ID not found in URL.');
        return;
    }

    console.log('Uploading recording...');

    const formData = new FormData();
    formData.append('video', blob, 'screen-recording.webm');

    try {
        const response = await fetch(`${apirecUrl}/recordings/${userId}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Recording uploaded successfully.');
        } else {
            const errorData = await response.json();
            console.error('Error uploading recording:', errorData);
        }
    } catch (uploadError) {
        console.error('Error during upload:', uploadError);
    }
}

// Utility to stop all tracks of a MediaStream
function stopStreamTracks(stream) {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        console.log('Stopped all MediaStream tracks.');
    }
}

startBtnRight.addEventListener('click', screenRecorder);
startBtnHeader.addEventListener('click', screenRecorder);

       
const captureArea = document.getElementById('video-container');


let isZoomedIn = false;
let zoomScale = 1.6;

const toggleZoom = () => {
  console.log("Inside toggle Zoom function");
  console.log("Apect ratio of the video:",videoAspectRatio);
  if(videoAspectRatio<1){
     zoomScale = 1.2;
  }
  else{
    isZoomedIn = !isZoomedIn;

    
    if (isZoomedIn) {
        video.style.transform = `scale(${zoomScale})`;
        console.log(`Video Transform: scale(${zoomScale})`);
        console.log(`Video Position: ${video.style.position}`);

        
        const videoWidth = video.clientWidth * zoomScale;
        const videoHeight = video.clientHeight * zoomScale;
        
        
        fabricCanvas.width = videoWidth;
        fabricCanvas.height = videoHeight;
        fabricCanvas.top = '-80px';
        
        canvas.setWidth(videoWidth);
        canvas.setHeight(videoHeight);

        
        const offsetX = (videoWidth - video.clientWidth) / 2;
        const offsetY = (videoHeight - video.clientHeight) / 2;

        
        const canvasonSwitch = document.getElementById('toggle-icon');
        if (canvasonSwitch.style.display == 'block') {
            canvasonSwitch.style.left = '50px';
            canvasonSwitch.style.top = '510px';
        }

        
        canvas.wrapperEl.style.position = 'absolute';
        canvas.wrapperEl.style.left = `${-offsetX}px`;
        canvas.wrapperEl.style.top = `${-offsetY}px`;
        
        canvas.calcOffset();

        const controlBar = document.querySelector('.vjs-custom-theme .vjs-control-bar');

        if (controlBar) {
        
            // //controlBar.style.backgroundColor = 'transparent';
            // controlBar.style.border = 'none';
           
            // controlBar.style.bottom = '-70px';
            // controlBar.style.width = '1490px';
            // controlBar.style.left =  `${-offsetX}px`;
            // controlBar.style.left =  `-286px`;
            controlBar.style.zIndex= '4';
        }

    } 
    
    else {
       
        video.style.transform = 'scale(1)';
        
        
        fabricCanvas.width = video.clientWidth;
        fabricCanvas.height = video.clientHeight;

        canvas.setWidth(video.clientWidth);
        canvas.setHeight(video.clientHeight);

       
        canvas.wrapperEl.style.position = 'absolute';
        canvas.wrapperEl.style.left = '3px';
        canvas.wrapperEl.style.top = '0.5px';

   
        const canvasonSwitch = document.getElementById('toggle-icon');
        if (canvasonSwitch.style.display == 'block') {
            canvasonSwitch.style.left = '150px';
            canvasonSwitch.style.top = '500px';
        }

        canvas.calcOffset();

        const videoElement = document.getElementById('video');


        if (videoElement) {
            videoElement.classList.remove('vjs-custom-theme');
        }
        const controlBar = document.querySelector('.vjs-control-bar');
        if (controlBar) {
            
            controlBar.style.backgroundColor = ''; 
            controlBar.style.bottom = '';
            controlBar.style.width = '';
            controlBar.style.left = '';
        }
    
    }}
};
function zoomOut2x() { 
    if (window.innerWidth > 520) {
    video.style.transform = 'scale(0.5)';
    video.style.marginTop = '-220px';
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.backgroundColor='black';
    videoContainer.style.height='445px';
    videoContainer.style.margin = '55px 0px'; // Update bottom margin to 100px
    const canvases = document.getElementById('canvas');
    canvases.style.top='-28px';
    // fabricCanvas.width = video.clientWidth;
    // fabricCanvas.height = video.clientHeight;
    
    // canvas.setWidth(video.clientWidth);
    // canvas.setHeight(video.clientHeight);
    
    
    // canvas.wrapperEl.style.position = 'absolute';
    // canvas.wrapperEl.style.left = '3px';
    // canvas.wrapperEl.style.top = '-25px';
    
    // const upperCanvas = document.querySelector('upper-canvas');
    // const lowerCanvas = document.querySelector('lower-canvas');
    // const canvasContainer = document.querySelector('canvas-container');
    
    // upperCanvas.height = '450px';
    // upperCanvas.top = '19px';

    // lowerCanvas.style.height = '503px';
    
    // canvasContainer.style.height = '503px';

    // if (upperCanvas) {
    //     upperCanvas.style.height = '450px';
    //     upperCanvas.style.top = '19px';
    // } else {
    //     console.error("upperCanvas element not found");
    // }

    // if (lowerCanvas) {
    //     lowerCanvas.style.height = '503px';
    // } else {
    //     console.error("lowerCanvas element not found");
    // }

    // if (canvasContainer) {
    //     canvasContainer.style.height = '503px';
    // } else {
    //     console.error("canvasContainer element not found");
    // }

    const canvasonSwitch = document.getElementById('toggle-icon');
    if (canvasonSwitch.style.display == 'block') {
        canvasonSwitch.style.left = '150px';
        canvasonSwitch.style.top = '500px';
    }
    
    canvas.calcOffset();
}
    
    }
function zoomOut() { 
video.style.transform = 'scale(1)';


fabricCanvas.width = video.clientWidth;
fabricCanvas.height = video.clientHeight;

canvas.setWidth(video.clientWidth);
canvas.setHeight(video.clientHeight);


canvas.wrapperEl.style.position = 'absolute';
canvas.wrapperEl.style.left = '3px';
canvas.wrapperEl.style.top = '0.5px';


const canvasonSwitch = document.getElementById('toggle-icon');
if (canvasonSwitch.style.display == 'block') {
    canvasonSwitch.style.left = '150px';
    canvasonSwitch.style.top = '500px';
}

canvas.calcOffset();

}
    // videoContainer.addEventListener('dblclick',() => {
    //     toggleZoom(); 
    //     resizeVideoButton.classList.toggle('active');
    // });

const resizeVideoButton = document.getElementById('resize-video');


resizeVideoButton.addEventListener('click', () => {
    toggleZoom(); 
    resizeVideoButton.classList.toggle('active');
});


document.getElementById('toggle-sidebar-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.annotations');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.add('expanded');
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'block';
    } else {
        sidebar.classList.remove('expanded');
        sidebar.classList.add('collapsed');
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'none';
    }
});


document.getElementById('library').addEventListener('click', function() {
    window.location.href = 'pages/library.html'; 
});
document.getElementById('canvas').addEventListener('click', (event) => {
    console.log('Canvas clicked');
    console.log("Canvas z-index: ",document.getElementById('canvas').style.zIndex);
    console.log("Canvas position: ",document.getElementById('canvas').style.position);
    console.log("Canvas height: ",document.getElementById('canvas').style.height);
    console.log("Canvas width: ",document.getElementById('canvas').style.width);
    console.log("Canvas top: ",document.getElementById('canvas').style.top);
    console.log("Canvas left: ",document.getElementById('canvas').style.left);
    console.log("Canvas pointer events: ",document.getElementById('canvas').style.pointerEvents);
    console.log("Canvas bg color: ",document.getElementById('canvas').style.backgroundColor);
  });

  const loopButton = document.getElementById('loop');
  let isLooping = false;
  
  loopButton.addEventListener('click', function() {
      isLooping = !isLooping; 
      video.loop = isLooping; 
      
      if (isLooping) {
          loopButton.classList.add('active-loop'); 
      } else {
          loopButton.classList.remove('active-loop'); 
      }
  });
  

const volumeSlider = document.querySelector('.volume-slider');
const muteIcon = document.getElementById('mute-icon');
const volumeIcon = document.getElementById('volume-icon');

video.volume = volumeSlider.value / 100;

// Add event listener to the volume slider
volumeSlider.addEventListener('input', (event) => {
    const volumeValue = event.target.value / 100;
    video.volume = volumeValue; // Update video volume

    // Check volume level and update icon
    if (volumeValue === 0) {
        volumeIcon.style.display = 'none';
        muteIcon.style.display = 'block';
    } else {
        volumeIcon.style.display = 'block';
        muteIcon.style.display = 'none';
    }
});

const timeInput = document.getElementById('ex-current-time-input');


const timeStringToSeconds = (timeString) => {
    const parts = timeString.split(':');
    if (parts.length !== 2) return NaN;
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
};


const secondsToTimeString = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

timeInput.addEventListener('change', () => {
    const inputTime = timeInput.value;

   
    const newTime = timeStringToSeconds(inputTime);
    const videoDuration = video.duration;

   
    if (!isNaN(newTime) && newTime >= 0 && newTime <= videoDuration) {
        
        video.currentTime = newTime;
    } else {
        // If invalid, revert to the previous correct time
        timeInput.value = secondsToTimeString(video.currentTime);
    }
});

// Optional: Update input field when video current time changes
video.addEventListener('timeupdate', () => {
    timeInput.value = secondsToTimeString(video.currentTime);
});

function updateSVGFillColor(buttonId, color) {
    // Find the button by its ID
    const button = document.getElementById(buttonId);

    if (!button) {
        console.error(`Button with ID ${buttonId} not found.`);
        return;
    }

    // Find the first <svg> element inside the button
    const svgElement = button.querySelector('svg');

    if (!svgElement) {
        console.error(`No SVG found inside button with ID ${buttonId}.`);
        return;
    }

    // Update the fill attribute of the main SVG element
    svgElement.setAttribute('fill', color);
}

// function updatePencilColor(svgMarkup, selectedColor) {
//     const color = selectedColor || 'blue';

//     if (!svgMarkup) {
//         console.error("svgMarkup is undefined or empty.");
//         return svgMarkup; // Return as-is if invalid
//     }

//     try {
//         // Update only the first occurrence of the fill attribute
//         const updatedSvgMarkup = svgMarkup.replace(/(<rect[^>]*fill=")[^"]*"/g, (match, p1) => {
//             return `${p1}${color}"`;
//         });

//         return updatedSvgMarkup;
//     } catch (error) {
//         console.error("Error updating SVG markup:", error, svgMarkup);
//         return svgMarkup; // Return original if there's an error
//     }
// }




// let reloadCount = 0;

// function handleUrlChange() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get('userid');
//     const videoUrl = urlParams.get('videourl');

//     if (!userId || !videoUrl) {
//         console.error('Either userId or videoUrl is missing in the URL.');
        
//         return;
//     }

//     console.log('User ID:', userId);
//     console.log('Video URL:', videoUrl);

    
//     downloadAndUploadVideo(videoUrl, userId);
// }


// async function downloadAndUploadVideo(videoUrl, userId) {
//     try {
//         console.log('Downloading video from:', videoUrl);
//         const response = await fetch(videoUrl);

//         if (!response.ok) {
//             throw new Error(`Failed to download video. Status: ${response.status}`);
//         }

//         const blob = await response.blob();
//         const fileName = videoUrl.split('/').pop() || 'downloaded-video.webm'; 
//         const file = new File([blob], fileName, { type: blob.type });
//         // const downloadLink = document.createElement('a');
//         // downloadLink.href = URL.createObjectURL(blob);
//         // downloadLink.download = fileName; 
//         // document.body.appendChild(downloadLink);
//         // downloadLink.click();
//         // document.body.removeChild(downloadLink);

//         // console.log('Downloaded file:', file);

//         // Prepare the file for upload
//         const formData = new FormData();
//         formData.append('file', file);

//         console.log('Uploading video...');
//         const uploadResponse = await fetch(`${mediaurl}/upload/${userId}`, {
//             method: 'POST',
//             body: formData,
//         });

//         if (!uploadResponse.ok) {
//             throw new Error(`Failed to upload video. Status: ${uploadResponse.status}`);
//         }

//         const data = await uploadResponse.json();
//         console.log('Video uploaded successfully:', data);

       
//         const videoURL = URL.createObjectURL(file);
//         // localStorage.setItem('selectedMediaType', 'video');
//         localStorage.setItem('selectedVideoSrc', videoURL);
        
//         // if (reloadCount < 1) {
//         //     reloadCount++;
//         //     console.log(`Reloading the page... (${reloadCount}/3)`);
//             // window.location.reload();
//         //     return; 
//         // }
//         //addVideoCard(videoURL, file.name);
       
        
//     } catch (error) {
//         console.error('Error in downloading or uploading video:', error);
//     }
//     //reloadpage();
// }

// function updateUrl() {
//     // Get the current URL
//     const currentUrl = window.location.href;

//     // Parse the URL
//     const url = new URL(currentUrl);

//     // Get the 'userid' parameter value
//     const userId = url.searchParams.get('userid');

//     // Check if the 'userid' already contains the appended string
//     const appendString = '123wee';
//     if (userId && !userId.includes(appendString)) {
//         // Append '123wee' to the 'userid' parameter
//         const updatedUserId = `${userId}${appendString}`;
//         url.searchParams.set('userid', updatedUserId);

//         // Update the browser's URL without reloading the page
//         history.replaceState(null, '', url.toString());

//         // Reload the page if necessary
//         //reloadpage();
//     } else {
//         console.log("Update already applied or 'userid' not found.");
//     }
// }




// // let currentUrl = window.location.href;
// // setInterval(() => {
// //     if (currentUrl !== window.location.href) {
// //         currentUrl = window.location.href;
// //         handleUrlChange();
// //     }
// // }, 500);
// handleUrlChange();
// updateUrl();


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
        console.log(blob);
        const fileName = videoUrl.split('/').pop() || 'downloaded-video.webm'; 
        const file = new File([blob], fileName, { type: blob.type });

        // Prepare the file for upload
        const formData = new FormData();
        formData.append('file', file);

        console.log('Uploading video...');
        const uploadResponse = await fetch(`${mediaurl}/upload/${userId}`, {
            method: 'POST',
            body: formData,
        })

        .then(response => response.json())
        .then(data => {
            console.log('Video uploaded:', data);
           
            console.log('Video fileName:', data.media.fileUrl);
            // if (data.media && data.media.fileUrl && data.media.originalName) {
                const fileExtension = data.media.fileName.split('.').pop().toLowerCase();
                const filePath = `../uploads/${data.media.fileName}`;
               if (['mp4', 'webm'].includes(fileExtension)) {
                   // addVideoCard(filePath, file.originalName);
                   
                }
                console.log('Updating Local Storage with: ', filePath);
                localStorage.setItem('selectedMediaType', 'video');
                localStorage.setItem('selectedVideoSrc', filePath);
                loadVideo(filePath);
                
            // }
            }
        );
        // if (!uploadResponse.ok) {
        //     throw new Error(`Failed to upload video. Status: ${uploadResponse.status}`);
        // }

        // const data = await uploadResponse.json();
        // console.log('Video uploaded successfully:', data);

        // // Save the uploaded file details in localStorage
        // const videoURL = URL.createObjectURL(file);
        // const newMedia = {
        //     type: 'video',
        //     title: fileName,
        //     src: videoURL,
        // };
//     const getmedia = fetch(`${mediaurl}/mediabyuser/${userId}`)
//     .then(response => response.json())
//     .then(files => {
//     // Loop through each file and call addImageCard or addVideoCard based on file extension
//     files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
//     files.forEach(file => {
//         console.log('File: ', file.fileName);
//       // Check the file extension to decide if it's an image or video
//       const fileExtension = file.fileName.split('.').pop().toLowerCase();
//       const filePath = `../uploads`;
//       console.log('File Path', filePath);
//     //   const testfile = 'test.mp4';
//       if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {

//         console.log("Inisde image");
//       } else if (['mp4', 'webm', 'mov', 'hevc','MOV'].includes(fileExtension)) {
//         // const videoURL = filePath;
//         // addVideoCard(videoURL, file);
//         const fullPath = `${filePath}/${fileName}`;
//        // console.log(`Video: ${filePath}/${file.fileName}`);
//        // const fullPath = `${filePath}/${fileName}`;
//         console.log("video",fullPath);
//         // addVideoCard(`${filePath}/${file.fileName}`, file.originalName);
//         localStorage.setItem('selectedMediaType', 'video');
//         localStorage.setItem('selectedVideoSrc', fullPath);
//         window.location.href = '../index.html';
//         // addVideoCard('../../uploads/test.mp4', 'test.mp4');
//       }

//       //addRecording();

//     });
//   })

    // if(!getmedia.ok){
    //     console.log('Get response not okay!')
    // }
        // localStorage.setItem('selectedMediaType', 'video');
        // localStorage.setItem('selectedVideoSrc', videoURL);

        // Retrieve the existing media list from localStorage
        // const mediaList = JSON.parse(localStorage.getItem('mediaList')) || [];
        // mediaList.push(newMedia);

        // // Update the media list in localStorage
        // localStorage.setItem('mediaList', JSON.stringify(mediaList));

        // console.log('Updated mediaList in localStorage:', mediaList);
    } catch (error) {
        console.error('Error in downloading or uploading video:', error);
    }
}

function updateUrl() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const userId = url.searchParams.get('userid');
    const appendString = '123wee';

    if (userId && !userId.includes(appendString)) {
        const updatedUserId = `${userId}${appendString}`;
        url.searchParams.set('userid', updatedUserId);
        history.replaceState(null, '', url.toString());
    } else {
        console.log("Update already applied or 'userid' not found.");
    }
}

handleUrlChange();
//setTimeout(updateUrl, 3000);
// Assuming your button has an ID 'myButton'
// let clickCount = 0; // Track the number of clicks

// const button = document.getElementById('reloadpage');

// if (button) {
//     // Function to handle the clicks
//     const simulateClick = () => {
//         if (clickCount < 2) { // Strictly allow only two clicks
//             button.click();
//             clickCount++;
//             console.log(`Click ${clickCount} triggered`);
//         }
//     };

//     // Simulate clicks with strict limits
//     setTimeout(() => {
//         simulateClick(); // First click

//         setTimeout(() => {
//             simulateClick(); // Second click
                

//         }, 0); // Immediate second click
//     }, 3000); 
//     // setTimeout(() => {
//     //     location.reload(); 

        
//     // }, 2000);
// } else {
//     console.error('Button with ID "reloadpage" not found.');
// }