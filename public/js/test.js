//import { saveAnnotation, updateAnnotation } from './api.js';

// import WebMWriter from 'webm-writer';


let annotations = [];
let currentColorIndex = 0;
const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#FF33FF', '#33FFFF'];

window.onload = () => {
    document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    // Call the function to load the script
 // loadWebMWriterScript();
    
};

// Initialize Shaka Player
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const player = new shaka.Player(video);
    const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
    // const manifestUri = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';
    player.load(manifestUri).then(function() {
        console.log('The video has now been loaded!');
        //setupVideoPlayer(video);
        setupTimeline(video);
    }).catch(function(error) {
        console.error('Error code', error.code, 'object', error);
    });
});

function setupTimeline(video) {
    const timeline = document.getElementById('timeline');
    const duration = Math.floor(video.duration);
    timeline.style.setProperty('--duration', duration); 

    for (let i = 0; i < duration; i++) {
        const tick = document.createElement('div');
        tick.classList.add('tick');
        tick.dataset.time = i; 

        
        const icon = document.createElement('div');
        icon.classList.add('icon');
        const img = document.createElement('img');
        img.src = 'icons/pencil.png';
        img.alt = 'Pencil';
        icon.appendChild(img);
        tick.appendChild(icon);

       

        
        img.addEventListener('dragstart', handleDragStart);
        tick.addEventListener('dragover', handleDragOver);
        tick.addEventListener('drop', handleDrop);
        img.setAttribute('draggable', true);
    
        timeline.appendChild(tick);
    }
    for (let i = 0; i < duration; i++) {
        const tick2 = document.createElement('div');
        tick2.classList.add('tick2');
        tick2.dataset.time = i; 

        // tick2.addEventListener('click', function() {
        //     console.log(`Clicked on tick at ${i} seconds.`);
        //     video.currentTime = i;
        //     event.stopPropagation();
        // });
        tick2.addEventListener('click', function(event) {
            if (tick2.classList.contains('blocked')) {
                console.log(`Tick at ${i} seconds is blocked.`);
                event.stopPropagation();
                return;
            }
            console.log(`Clicked on tick at ${i} seconds.`);
            video.currentTime = i;
        });
        

        
          // Create the waveform container and append it to tick2
          const waveformContainer = document.createElement('div');
          waveformContainer.classList.add('waveform-container');
  
          const waveform = document.createElement('div');
          waveform.classList.add('waveform');
          waveform.style.cursor = 'default';
  
          const wave = document.createElement('wave');
          wave.style.display = 'block';
          wave.style.position = 'relative';
          wave.style.userSelect = 'none';
          wave.style.height = '150px';
          wave.style.overflow = 'auto hidden';
          const progressWave = document.createElement('wave');
        progressWave.id = 'progress-wave';
        progressWave.style.position = 'absolute';
        progressWave.style.zIndex = '3';
        progressWave.style.left = '0px';
        progressWave.style.top = '0px';
        progressWave.style.bottom = '0px';
        progressWave.style.overflow = 'hidden';
        progressWave.style.width = '242.4px';
        progressWave.style.display = 'block';
        progressWave.style.boxSizing = 'border-box';
        progressWave.style.borderRight = '1px solid rgb(170, 190, 209)';
        progressWave.style.pointerEvents = 'none';
        const canvas1 = document.createElement('canvas4');
        canvas1.width = 635;
        canvas1.height = 187;
        canvas1.style.position = 'absolute';
        canvas1.style.left = '0px';
        canvas1.style.top = '0px';
        canvas1.style.bottom = '0px';
        canvas1.style.height = '100%';
        canvas1.style.width = '508px';

        progressWave.appendChild(canvas1);
        wave.appendChild(progressWave);
        const canvas2 = document.createElement('canvas4');
        canvas2.width = 635;
        canvas2.height = 187;
        canvas2.style.position = 'absolute';
        canvas2.style.zIndex = '2';
        canvas2.style.left = '0px';
        canvas2.style.top = '0px';
        canvas2.style.bottom = '0px';
        canvas2.style.height = '100%';
        canvas2.style.pointerEvents = 'none';
        canvas2.style.width = '508px';

        wave.appendChild(canvas2);
        waveform.appendChild(wave);
        waveformContainer.appendChild(waveform);
        tick2.appendChild(waveformContainer);
        timeline.appendChild(tick2);

        // tick2.addEventListener('click', function(event) {
        //     console.log(`Clicked on tick at ${i} seconds.`);
        //     video.currentTime = i;

        //     const existingPointer = document.querySelector('.draggable-pointer');
        //     if (existingPointer) {
        //         existingPointer.remove();
        //     }

        //     const pointer = document.createElement('img');
        //     pointer.src = 'icons/pointer.png';
        //     pointer.alt = 'Pointer';
        //     pointer.classList.add('draggable-pointer');
        //     pointer.style.position = 'absolute';
        //     pointer.style.left = `${event.clientX}px`;
        //     pointer.style.top = `${event.clientY}px`;
        //     pointer.setAttribute('draggable', true);

        //     pointer.addEventListener('dragstart', handleDragStart);
        //     pointer.addEventListener('dragend', handleDragEnd);
        //     tick2.appendChild(pointer);
        // });

        // tick2.addEventListener('dragover', handleDragOver);
        // tick2.addEventListener('drop', handleDrop);
        
        
    }
}

function addClassToTicks(startTime, endTime) {
    for (let i = startTime; i <= endTime; i++) {
        const tick2 = document.querySelector(`.tick2[data-time="${i}"]`);
        if (tick2) {
            tick2.classList.add('blocked');
        }
    }
}
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.time);
    event.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
    event.preventDefault();
    const time = event.dataTransfer.getData('text/plain');
    const pointer = document.querySelector('.draggable-pointer');
    if (pointer) {
        event.currentTarget.appendChild(pointer);
        video.currentTime = parseInt(event.currentTarget.dataset.time, 10);
    }}

    function handleDragEnd(event) {
        event.preventDefault();
        const pointer = document.querySelector('.draggable-pointer');
        if (pointer) {
            pointer.style.left = `${event.clientX}px`;
            pointer.style.top = `${event.clientY}px`;
        }
    }
  
  function handleDragStart(event) {
    const dragTime = event.target.parentNode.parentNode.dataset.time;
    console.log('Drag start:', dragTime);
    event.dataTransfer.setData('text/plain', dragTime);
}
// console.log("Object: ",event.target);

//         if (event.target) {
//             console.log("Object: ",event.target);
//             const removedObject = event.target;
//             const currentTime = video.currentTime;
//             removeAnnotation(currentTime);
//             canvas.remove(removedObject);
//             console.log("Removed");
//         }
function handleDragOver(event) {
    console.log('Drag over:', event.target.dataset.time);
    event.preventDefault();
}

function handleDrop(event) {
console.log('Drop:', event.target.dataset.time);
event.preventDefault();
const oldTime = event.dataTransfer.getData('text/plain');
const newTime = event.target.dataset.time;
moveAnnotation(oldTime, newTime);



const oldTick = document.querySelector(`.tick[data-time='${oldTime}'] .icon`);
const icon = oldTick.querySelector('.icon img');
if(icon.alt == 'Pencil'){
// if(oldTick.icon.src=='Pencil.png')
if (oldTick) {
oldTick.style.display = 'none';
removePointerForPencilIcon(oldTick);
}

const annotationIndex = annotations.findIndex(annotation => Math.floor(annotation.time) === parseInt(oldTime));
if (annotationIndex !== -1) {
annotations.splice(annotationIndex, 1);
canvas.forEachObject(obj => {
    if (obj.time === oldTime) {
        canvas.remove(obj);
    }
});}
}else{
    if (oldTick) {
        oldTick.style.display = 'none';
        //removePointerForPencilIcon(oldTick);
        }
        
        const annotationIndex = annotations.findIndex(annotation => Math.floor(annotation.time) === parseInt(oldTime));
        if (annotationIndex !== -1) {
        annotations.splice(annotationIndex, 1);
        
        }
}

updateAnnotationsList();
updateTimelineIcons();

}



// Fabric.js Canvas Initialization
const canvas = new fabric.Canvas('canvas', {
selection: false,
isDrawingMode: false
});

const playPauseButton = document.getElementById('play-pause-button');
const playPauseImage = playPauseButton.querySelector('img');

playPauseButton.addEventListener('click', () => {
if (video.paused) {
    console.log('inside play condition')
    video.play();
    //playAudioAnnotationIfExists(video.currentTime);
   // playPauseImage.src = 'icons/pause.png';
    //playPauseImage.alt = 'Pause';
} else {
    console.log('inside pause condition')
    video.pause();
   // playPauseImage.src = 'icons/play.jpg';
   // playPauseImage.alt = 'Play';
}
});



function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function view() {
    const newAnnotations = [
        // {
        //     time: 12,
        //     startTime: 12,
        //     endTime: 15.398855307277017,
        //     content: 'GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQRChYECGF…J0TEToKQ+F7jwgkRhaxkMU8oe0QncJnc1SWP5oSUU3yc2K/c=',
        //     type: 'audio'
        // },
        // {
        //     time: 39,
        //     startTime: 39,
        //     endTime: 42.45430854410831,
        //     content: 'GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQRChYECGF…oi89iaSvZ+e/dkew2fFs7u1AgvfeENsGIezHt3y1pjyXyQA==',
        //     type: 'audio'
        // },
        {
            time: 26,
            content: '{"version":"4.5.0","objects":[{"type":"circle","version":"4.5.0","left":100,"top":100,"radius":30,"startAngle":0,"endAngle":6.283185307179586}]}'
        },
        {
            time: 51,
            content: '{"version":"4.5.0","objects":[{"type":"circle","version":"4.5.0","left":200,"top":200,"radius":30,"startAngle":0,"endAngle":6.283185307179586}]}'
        },
        {
            time: 2,
            content: '{"version":"4.5.0","objects":[{"type":"path","version":"4.5.0","path":[["M",100,100],["L",200,100],["L",200,200],["L",100,200],["Z"]]}]}'
        },
        {
            time: 22,
            content: '{"version":"4.5.0","objects":[{"type":"rect","version":"4.5.0","left":50,"top":50,"width":100,"height":100,"fill":"red"}]}',
            duration: 1.398834304746045,
            endTime: 23.398834304746046,
            startTime: 22
        }
    ];
    

    // Add all new annotations to the existing annotations array
    annotations.push(...newAnnotations);

    // Update annotations list and timeline icons
    updateAnnotationsList();
    updateTimelineIcons();
    
    const videoCanvas = document.getElementById('canvas'); // Replace 'video' with your actual video canvas ID
    const videoContext = videoCanvas.getContext('2d');

    // Function to update canvas with annotations
    function updateCanvas(timestamp) {
        canvas.clear();
        
        // Find and draw annotations for the current timestamp
        const annotation = annotations.find(a => a.time === timestamp);
        if (annotation) {
            console.log('Annotation time', annotation.time);
            try {
                canvas.loadFromJSON(annotation.content, canvas.renderAll.bind(canvas));
            } catch (error) {
                console.error('Error loading annotation JSON:', error);
            }
            
            // Draw the annotations from the Fabric.js canvas onto the video canvas
            const canvasElement = canvas.getElement();
            videoContext.drawImage(canvasElement, 0, 0, videoCanvas.width, videoCanvas.height);
        }
    }

    // Update canvas when video time updates
    video.ontimeupdate = function() {
        updateCanvas(Math.floor(video.currentTime));
    };

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });

    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    video.currentTime=0;
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';

    video.onended = function() {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    };
   

}

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const currentTimeInput = document.querySelector('.current-time-input');
    const totalTimeSpan = document.querySelector('.formatted-timeframe span:nth-child(2) span:first-child');

   
    
    

    video.addEventListener('timeupdate', function() {
        currentTimeInput.value = formatTime(video.currentTime);
    });

    video.addEventListener('loadedmetadata', function() {
        totalTimeSpan.textContent = ` / ${formatTime(video.duration)}`;
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     //const canvas = new fabric.Canvas('canvas-id');

//     // Sample annotation object
//     const annotation = {
//         time:5,
//         startTime: 5, // Start time in seconds
//         endTime: 10, // End time in seconds
//         content: '{"version":"4.5.0","objects":[{"type":"circle","version":"4.5.0","originX":"left","originY":"top","left":100,"top":70,"width":60,"height":60,"fill":"transparent","stroke":"#33FF57","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":2.43,"scaleY":2.43,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"radius":30,"startAngle":0,"endAngle":6.283185307179586}]}' 
//     };
//     updateAnnotationsList();
//     // Call the showAnnotations function with the annotation and a test time
    
//         const testtime = 3;
//         showAnnotations(annotation, testtime);

//     updateAnnotationsList();
//     });

// video.addEventListener('timeupdate', () => {
//     if (!video.paused) { // Check if the video is playing
//         playAudioAnnotationIfExists(video.currentTime);
//     }
// });
document.getElementById('play-pause-button').addEventListener('click', function() {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    


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

});


function moveAnnotation(oldTime, newTime) {
console.log('Moving annotation from', oldTime, 'to', newTime);
video.currentTime=newTime;
oldTime = parseInt(oldTime);
newTime = parseInt(newTime);


let annotationIndex = annotations.findIndex(annotation => Math.floor(annotation.time) === oldTime);
if (annotationIndex !== -1) {
const annotation = annotations[annotationIndex];
annotation.time = newTime;
annotations.splice(annotationIndex, 1, annotation); 

if(annotation.type!='audio'){
canvas.forEachObject(obj => {
    if (obj.time === oldTime) {
        canvas.remove(obj);
    }
});


annotations.forEach(ann => {
    if (Math.floor(ann.time) === newTime) {
        canvas.loadFromJSON(ann.content, () => {
            canvas.renderAll();
        });
    }
});

}
updateAnnotationsList();
updateTimelineIcons();

//updateAnnotation(annotation);
}

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
            // const base64String = annotation.content.split(',')[1];
            const blob = convertBase64ToBlob(annotation.content, mimeType);
            var url = URL.createObjectURL(blob);
            const existingAudioElements = document.querySelectorAll('audio');
            var audioElement = Array.from(existingAudioElements).find(audio => audio.src === url);

            if (!audioElement) {
                // Create a new audio element if not found

                console.log('I am inside condition where audio element is being created');
                audioElement = document.createElement('audio');
                audioElement.className = 'audio-element';
                audioElement.controls = true;
                audioElement.src = url;
                document.body.appendChild(audioElement);
            }
    
            // Play the audio element
            audioElement.play();
            
            // audio.play();
        }
        
        

    });
}
function setCurrentDrawingColor() {
    if (canvas.freeDrawingBrush) {
        currentColorIndex++;
        canvas.freeDrawingBrush.color = colors[currentColorIndex % colors.length];
        
        console.log('inside free hand drawing condition')
    }
    console.log('outside free hand drawing condition')
}


let drawingMode = '';
let isDrawing = false;

function drawFreehand() {
    canvas.isDrawingMode = true;
    drawingMode = '';
    setCurrentDrawingColor(); 
    //canvas.freeDrawingBrush= colors[currentColorIndex % colors.length]
}

  
function activateCircleMode() {
    canvas.isDrawingMode = false;
    drawingMode = 'circle';
    setCurrentDrawingColor(); 

    const circle = new fabric.Circle({
        left: 100,
        top: 70,
        radius: 30,
        fill: 'transparent',
        stroke: colors[currentColorIndex % colors.length],
        strokeWidth: 2
    });
    canvas.add(circle).setActiveObject(circle);
}
function activateRectangleMode() {
    canvas.isDrawingMode = false;
    drawingMode = 'rectangle';
    setCurrentDrawingColor(); 
    const rect = new fabric.Rect({
            left: 50,
            top: 50,
            width: 60,
            height: 60,
            fill: 'transparent',
            stroke: colors[currentColorIndex % colors.length],
            strokeWidth: 2
        });
        canvas.add(rect).setActiveObject(rect);
}

function activateTextMode() {
    canvas.isDrawingMode = false;
    drawingMode = 'text';
    const text = new fabric.Textbox('Type here', {
        left: 50,
        top: 50,
        fontSize: 20,
        fontFamily: 'Arial',
        fill: colors[currentColorIndex % colors.length],
        width: 200
    });
    currentColorIndex++;
    canvas.add(text).setActiveObject(text);
}

function activateNoteMode() {
    canvas.isDrawingMode = false;
    drawingMode = 'note';
    const note = new fabric.Textbox('Note here', {
        left: 50,
        top: 50,
        fontSize: 14,
        fontFamily: 'Arial',
        fill: colors[currentColorIndex % colors.length],
        backgroundColor: '#ffffcc',
        width: 200
    });
    currentColorIndex++;
    canvas.add(note).setActiveObject(note);
}

function useEraser() {
    canvas.isDrawingMode = false;
    canvas.on('mouse:down', function(event) {
        if (event.target) {
            const removedObject = event.target;
    
            const currentTime = video.currentTime;
            removeAnnotation(currentTime);
            // updateAnnotationsList();
            // updateTimelineIcons(); 
    

    
    canvas.remove(removedObject);
    // canvas.remove(event.target);
}
});
}




function unpickTool() {
    canvas.isDrawingMode = false;
    canvas.defaultCursor = 'default';
    canvas.selection = true;
}
function activatePolylineMode() {
    drawingMode = 'polyline';
    canvas.isDrawingMode = false; // Disable freehand drawing mode
    polylinePoints = [];
    canvas.upperCanvasEl.classList.add('canvas-plus-cursor');
}

function activateLineMode() {
    drawingMode = 'line';
    canvas.isDrawingMode = false; // Disable freehand drawing mode
    canvas.upperCanvasEl.classList.add('canvas-plus-cursor');
}

function activateImage() {
    document.getElementById('imageInput').click();
}

function handleImageUpload(event) {
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
                canvas.add(img);
                canvas.centerObject(img);
                canvas.renderAll();
            });
        };

        // Read the image file as a data URL
        reader.readAsDataURL(file);
    }
}
canvas.on('mouse:down', function(options) {
    const pointer = canvas.getPointer(options.e);
    if (drawingMode === 'line') {
        isDrawing = true;
       
        const points = [pointer.x, pointer.y, pointer.x, pointer.y];
        currentShape = new fabric.Line(points, {
            strokeWidth: 2,
            fill: colors[currentColorIndex % colors.length],
            stroke: colors[currentColorIndex % colors.length],
            originX: 'center',
            originY: 'center'
        });
        canvas.add(currentShape);
    }else if (drawingMode === 'polyline') {
        polylinePoints.push({ x: pointer.x, y: pointer.y });
        if (polylinePoints.length > 1) {
            const line = new fabric.Line([
                polylinePoints[polylinePoints.length - 2].x,
                polylinePoints[polylinePoints.length - 2].y,
                polylinePoints[polylinePoints.length - 1].x,
                polylinePoints[polylinePoints.length - 1].y
            ], {
                stroke: colors[currentColorIndex % colors.length],
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
                    fill: colors[currentColorIndex % colors.length]
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
        canvas.renderAll();
    }
});

canvas.on('mouse:up', function() {
    if (drawingMode === 'line') {
    isDrawing = false;
    currentShape = null;
    }
});
// canvas.on('mouse:down', function(opt) {
//     if (drawingMode === 'rectangle') {
//         isDrawing = true;
//         const pointer = canvas.getPointer(opt.e);
//         const rect = new fabric.Rect({
//             left: pointer.x,
//             top: pointer.y,
//             width: 0,
//             height: 0,
//             fill: 'transparent',
//             stroke: colors[currentColorIndex % colors.length],
//             strokeWidth: 2
//         });
//         currentColorIndex++;
//         canvas.add(rect);
//         canvas.setActiveObject(rect);

//         canvas.on('mouse:move', function(opt) {
//             if (!isDrawing) return;
//             const pointer = canvas.getPointer(opt.e);
//             const activeObject = canvas.getActiveObject();
// //             activeObject.set({
// //                 width: Math.abs(pointer.x - activeObject.left),
// //                 height: Math.abs(pointer.y - activeObject.top)
//             });
//             canvas.add(rect);
//             canvas.setActiveObject(rect);
//             activeObject.setCoords();
//             canvas.renderAll();
//             saveState();
//         });

//         canvas.on('mouse:up', function() {
//             isDrawing = false;
//             canvas.off('mouse:move');
//         });
//     }
// });
function calculateAngle(p1, p2, p3) {
    const dx1 = p2.x - p1.x;
    const dy1 = p2.y - p1.y;
    const dx2 = p3.x - p2.x;
    const dy2 = p3.y - p2.y;
    const angle = Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
    return Math.abs((angle * 180) / Math.PI); // Convert radians to degrees
}


const state = [];
let mods = 0;
canvas.on('object:added', ()=>{saveState(); recordAnnotation(video.currentTime)});
canvas.on('object:removed', ()=>{saveState(); recordAnnotation(video.currentTime)});
canvas.on('object:modified', ()=>{saveState(); recordAnnotation(video.currentTime)});

function saveState() {
    mods += 1;
    if (mods < state.length) {
        state.length = mods;
    }
    state.push(JSON.stringify(canvas));
    console.log('I am inside savestate')
    //recordAnnotation(video.currentTime);
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
});


video.addEventListener('pause', () => {
    canvas.isDrawingMode = true; 
    fabricCanvas.style.pointerEvents = 'auto'; 
});


video.addEventListener('play', () => {
    canvas.isDrawingMode = false; 
    fabricCanvas.style.pointerEvents = 'none'; 
});


video.addEventListener('timeupdate', () => {
    showAnnotationsAtCurrentTime(video.currentTime);
    if (!video.paused) { // Check if the video is playing
        playAudioAnnotationIfExists(video.currentTime);
    }
});


function recordAnnotation(time) {
    if(video.paused){
    const existingAnnotationIndex = annotations.findIndex(annotation => Math.floor(annotation.time) === Math.floor(time));
    const existingAnnotation = annotations.find(annotation => Math.floor(annotation.time) === Math.floor(time));
    const annotation = {
        time: time,
        content: JSON.stringify(canvas.toJSON())
    };

    if (existingAnnotationIndex !== -1) {
        annotations[existingAnnotationIndex] = annotation;
       // Object.assign(existingAnnotation, annotation);
        // updateAnnotation(existingAnnotation);
    } else {
        annotations.push(annotation);
        // saveAnnotation(annotation);
        // annotations.forEach(annotation => {
        //     console.log('annotations id got:',annotation.id);
        // })
    }

    console.log('Annotation recorded');
    updateAnnotationsList();
    updateTimelineIcon(time);
    const timeline = document.getElementById('timeline');
    const ticks = document.querySelectorAll('.timeline .tick');
    const annotationTime = Math.floor(video.currentTime);
    ticks.forEach(tick => {
        if (parseInt(tick.dataset.time) === annotationTime) {
            tick.classList.add('has-drawing');
            const icon = tick.querySelector('.icon');
            if(icon){
                icon.style.display='block';
            createPointerForPencilIcon(tick);
            }
        }
    });}
    else {
    console.log('Video is playing, not adding annotation');
}
    }
    //     if (icon && icon.querySelector('img').alt === 'Pencil') {
    //         const pencilPointer = document.getElementById('pencil-pointer');
    //         pencilPointer.style.display = 'block';
    //         console.log('pointer placed')
    //         pencilPointer.style.top = `${icon.offsetTop - 20}px`; 
    //         pencilPointer.style.left = `${icon.offsetLeft}px`; 
            
    //     }
    // }
         
    // setTimeout(() => {
    //     const pencilPointer = document.getElementById('pencil-pointer');
    //     pencilPointer.style.display = 'none';
    // }, 2000); // Adjust delay (in milliseconds) as needed


    function createPointerForPencilIcon(tick) {
        if (tick.querySelector('.pointer')) {
            return; 
        }
    const pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.style.left = '50%'; 
    pointer.style.top = '-20px'; 
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#FF33FF', '#33FFFF'];


    const randomColor = colors[currentColorIndex % colors.length];
    pointer.style.backgroundColor = randomColor;
    tick.appendChild(pointer);



let isDragging = false;
let startX;
let startWidth;

pointer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startWidth = pointer.offsetWidth;
    pointer.style.cursor = 'ew-resize'; 

    const tick = pointer.closest('.tick');
    if (tick) {
        annotationStartTime = parseFloat(tick.dataset.time);
        console.log('Annotation found at:', annotationStartTime);}
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newWidth = startWidth + (e.pageX - startX);
        if (newWidth > 0) {
            pointer.style.width = newWidth + 'px';

            
            let annotationDuration = calculateAnnotationDuration(newWidth);
            let annotationEndTime = annotationStartTime + annotationDuration;
            console.log('Annotation end time:', annotationEndTime);
            annotation = annotations.find(annotation => annotation.time === annotationStartTime);
            addClassToTicks(annotationStartTime,annotationEndTime);
            updateAnnotationDuration(annotationStartTime, annotationEndTime, annotationDuration);
            displayOnCanvas(annotation, annotationStartTime, annotationEndTime);

        }
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        pointer.style.cursor = 'ew-resize'; 
    }
});
}
function removePointerForPencilIcon(tick) {
console.log("Inside remove pointer function")

const pointer = tick.querySelector('.pointer');

if (pointer && pointer.parentNode === tick) { 
tick.removeChild(pointer); 
console.log("Removed pointer")
}
}
function calculateAnnotationDuration(width) {
const timelineWidth = timeline.offsetWidth;
return (width / timelineWidth) * video.duration;
}
function calculateAnnotationWidth(duration) {
    const timelineWidth = timeline.offsetWidth;
    return (duration / video.duration) * timelineWidth;
}

// function updateAnnotationDuration(pencilIconId, duration) {

// console.log(`Updating annotation for ${pencilIconId} to duration: ${duration} seconds`);

// const annotation = annotations.find(a => a.time === video.currentTime);
// console.log(`start time: ${video.currentTime}`);
// if (annotation) {
// annotation.duration = duration;
// console.log(`Real duration set: ${annotation.duration} `)
// annotation.startTime=video.currentTime;
// annotation.endTime = video.currentTime + duration;
// const annotationData = JSON.parse(annotation.content);
// let interval=1;
//     for (let time = annotation.startTime; time <= annotation.endTime; time += 0.01) {
//         // if (Math.abs(time - video.currentTime) < interval / 2) { // Adjust the condition as needed

//         showAnnotations(time);
//             // console.log(`Displaying annotation.content: ${annotation.content}`);
//             // console.log(`Displaying annotationData: ${annotationData}` )
//             // canvas.loadFromJSON(annotation.content, () => {
//             //     canvas.renderAll();
//             // });



//        // }
        
//     }
// // Ensure previous event listeners are removed to avoid multiple handlers
// // video.removeEventListener('timeupdate', handleTimeUpdate);
// // video.addEventListener('timeupdate', handleTimeUpdate);
// }
// }
function updateAnnotationDuration(startTime, endTime, duration) {
    console.log(`Updating annotation from ${startTime} to ${endTime} with duration: ${duration} seconds`);

    // Find the annotation
    const annotation = annotations.find(a => Math.floor(a.time) === Math.floor(startTime));
    if (annotation) {
        annotation.duration = duration;
        annotation.endTime = endTime;
        annotation.startTime=startTime;
        // Ensure the annotation is shown at all instances between start and end time
        for (let time = startTime; time <= endTime; time += 0.01) {
           // showAnnotations(annotation,time);
        }



        console.log('Updated annotation:', annotation);
    } else {
        console.log('Annotation not found for start time:', startTime);
    }
}

function displayOnCanvas(annotation, startTime, endTime) {
    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
        if (currentTime >= startTime && currentTime <= endTime) {
            canvas.clear();
            canvas.loadFromJSON(annotation.content, () => {
                canvas.renderAll();
            });
        } else {
            // Clear the canvas if the current time is outside the annotation range
           // canvas.clear();
        }
    });
}

function handleTimeUpdate() {
const currentTime = video.currentTime;
const canvas = document.getElementById('canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    const annotation = annotations.find(a => a.time <= currentTime);
    
if (annotation) {
    console.log(`Found annotation`);}
    
    // Parse the annotation content
    

    if (currentTime >= annotation.startTime && currentTime <= annotation.endTime) {
        // Display the annotation on the canvas
        console.log(`Displaying annotation: ${annotation.startTime}`);
        // const annotationData = JSON.parse(annotation.content);
        
    //let start = Math.max(annotation.startTime, startTime);
    //let end = Math.min(annotation.endTime, endTime);

    
    // let interval=1;
    // for (let time = annotation.startTime; time <= annotation.endTime; time += interval) {
    //     // if (Math.abs(time - video.currentTime) < interval / 2) { // Adjust the condition as needed
    //         console.log(`Displaying annotation.content: ${annotation.content}`);
    //         console.log(`Displaying annotationData: ${annotationData}` )
    //         canvas.loadFromJSON(annotation.content, () => {
    //             canvas.renderAll();
    //         });
    //    // }
        
    // }

    // Update the canvas rendering
    //canvas.renderAll();

    } else {
        
        console.log(`Removing annotation: ${annotation.id}`);
    
    }
} else {
    console.error('Canvas element not found');
}
}

// function updateAnnotationsList() {
//     const annotationsList = document.getElementById('annotations-list');
//     annotationsList.innerHTML = '';
//     annotations.forEach((annotation, index) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `Annotation at ${annotation.time.toFixed(2)}s`;
//         listItem.addEventListener('click', () => {
//             loadAnnotation(index);
//         });
//         annotationsList.appendChild(listItem);
//     });

// }
function removeAnnotation(time) {
    console.log(`Removing annotation at time: ${time}`);
    annotations = annotations.filter(annotation => annotation.time !== time);
    console.log(`Annotations after removal:`,annotations);
    // Remove the pencil icon from the old tick
const removeTime = document.querySelector(`.tick[data-time='${time}'] .icon`);
if (removeTime) {
removeTime.style.display = 'none';
removePointerForPencilIcon(removeTime);
}
    updateAnnotationsList();
    updateTimelineIcons();
}
function updateAnnotationsList() {
annotations = Array.from(new Set(annotations.map(a => a.time))).map(time => annotations.find(a => a.time === time));

annotations = annotations.filter(annotation => annotation.content && annotation.content !== '{"version":"4.5.0","objects":[]}');

console.log('Inside list update:', annotations)
const annotationsList = document.getElementById('annotations-list');
annotationsList.innerHTML = '';
annotations.forEach((annotation, index) => {
    console.log('Processing annotation:', annotation);
    if (annotation.content && annotation.content !== '{"version":"4.5.0","objects":[]}') {
    console.log('Appending annotation to list:', annotation);
    const listItem = document.createElement('li');
    listItem.className = 'annotation-item';
    

   
    if(annotation.type!= 'audio'){
        const parsedContent = JSON.parse(annotation.content);
        const annotationType = parsedContent.objects[0].type;
        console.log(annotationType);
    if(annotationType=='rect'){
        listItem.textContent = `rectangle ${formatTime(annotation.time)}`;
    }
  
    else {
        listItem.textContent = `${annotationType} ${formatTime(annotation.time)}`;
    }
}else{
    listItem.textContent = `${annotation.type} ${formatTime(annotation.time)}`;
}

    
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add comment';
    commentInput.value = annotation.comment || '';
    commentInput.style.display = 'none'; 
    commentInput.addEventListener('input', function() {
        annotations[index].comment = commentInput.value;
    });
    const cancelButton = document.createElement('button');
cancelButton.textContent = 'Cancel';
cancelButton.style.display = 'none'; 
cancelButton.addEventListener('click', function() {
    commentInput.style.display = 'none';
    cancelButton.style.display = 'none';
    saveButton.style.display = 'none';
    buttonsContainer.style.display='none';
    listItem.removeChild(buttonsContainer);
});

const saveButton = document.createElement('button');
saveButton.textContent = 'Save';
saveButton.style.display = 'none'; 
saveButton.addEventListener('click', function() {
    annotations[index].comment = commentInput.value;
    commentInput.style.display = 'none';
    cancelButton.style.display = 'none';
    saveButton.style.display = 'none';
    buttonsContainer.style.display='none';
    listItem.removeChild(buttonsContainer);
});
//updateAnnotation(annotations[index]);
//const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('img');
            deleteIcon.src = 'icons/delete2.png'; // Path to your delete icon
            deleteIcon.alt = 'Delete';
            deleteIcon.style.width = '14px'; // Set the width as needed
            deleteIcon.style.height = '14px'; // Set the height as needed
            deleteIcon.style.backgroundColor='none';
            deleteIcon.style.marginLeft= '10px'
           
           //deleteButton.appendChild(deleteIcon);

            deleteIcon.addEventListener('click', function() {
                // Remove annotation from the list
                annotations.splice(index, 1);
                // Remove pencil icon and pointer from the timeline
                const tick = document.querySelector(`.tick[data-time="${annotation.time}"]`);
                const tick3= document.querySelector(`.tick[data-time="${annotation.time}"] .has-audio`);
                if(tick3){
                    tick3.classList.remove('has-audio');
                    const icon = tick3.querySelector('.icon');
                    const audioElement = tick3.querySelector('.audio-element');
                    
                    if (icon) {
                        icon.remove();
                       
                    }
                    if(audioElement){
                        audioElement.remove();
                    }
                    
                    
                }
                if (tick) {
                    tick.classList.remove('has-drawing');
                    
                    const icon = tick.querySelector('.icon');
                    
                    if (icon) {
                        icon.remove();
                        removePointerForPencilIcon(tick)
                    }
                    
                
                
                }
                // Update the annotations list
                updateAnnotationsList();
                updateTimelineIcons();
            });
const buttonsContainer = document.createElement('div');
buttonsContainer.className = 'annotation-buttons';
buttonsContainer.appendChild(commentInput);
buttonsContainer.appendChild(cancelButton);
buttonsContainer.appendChild(saveButton);
//buttonsContainer.appendChild(deleteIcon);

listItem.appendChild(deleteIcon);
listItem.appendChild(buttonsContainer);
listItem.addEventListener('click', () => {
    commentInput.style.display = 'block'; 
    cancelButton.style.marginTop = '5px'; 
    saveButton.style.marginTop = '5px'; 
    cancelButton.style.display = 'inline-block'; 
    saveButton.style.display = 'inline-block'; 
    deleteIcon.style.display = 'inline-block';

});


    // listItem.appendChild(commentInput);
    // listItem.addEventListener('click', () => {
    //     commentInput.style.display = 'block';
        
    // });
    annotationsList.appendChild(listItem);
    // updateAnnotation(annotation);
    }else {
    console.log('Skipping empty annotation:', annotation);
}});
    console.log('Inside list update 2:', annotations);

}


function loadAnnotation(index) {
    const annotation = annotations[index];
    video.currentTime = annotation.time;
    canvas.loadFromJSON(annotation.content, () => {
        canvas.renderAll();
    });
}
function showAnnotations(annotation,time) {
    console.log('I am inside showAnnotations function');
    canvas.clear();

    // Check if the current time falls within the annotation's duration
    // if (time >= annotation.startTime && time <= annotation.endTime) {
        console.log('Start time: ',annotation.startTime);
        console.log('end time: ',annotation.endTime);
        // Load the annotation content to the canvas
        console.log('I am inside showAnnotations function if condition');
        canvas.loadFromJSON(annotation.content, () => {
            console.log('Annotation content:', annotation.content);

            console.log('Loading content')
            canvas.renderAll();
            console.log('Loaded')
        });
    // }
}
function showAnnotationsAtCurrentTime(currentTime) {
    canvas.clear();
    annotations.forEach(annotation => {
        if (Math.abs(annotation.time - currentTime) < 0.5 && annotation.type!='audio') { 
            canvas.loadFromJSON(annotation.content, () => {
                canvas.renderAll();
            });
        }
    });
}

function updateTimelineIcon(time) {
    const timeline = document.getElementById('timeline');
    const ticks = timeline.getElementsByClassName('tick');
    for (let tick of ticks) {
        if (parseInt(tick.dataset.time) === Math.floor(time)) {
            tick.classList.add('has-drawing');
            // createPointerForPencilIcon(icon);
        }
    }
}

function updateTimelineIcons() {
const timeline = document.getElementById('timeline');
const ticks = timeline.getElementsByClassName('tick');
for (let tick of ticks) {
    
    tick.classList.remove('has-drawing');
    const icon = tick.querySelector('.icon');
    const audioElement = tick.querySelector('.audio-element');
    console.log('Inside updateTimelineIcons function')
    removePointerForPencilIcon(tick);
    if (icon) {
        icon.style.display = 'none';
        
        
    }if (audioElement) {
        audioElement.remove();
    }
}
annotations.forEach(annotation => {
    const time = Math.floor(annotation.time);
    const tick = timeline.querySelector(`.tick[data-time='${time}']`);
    if(annotation.type=='audio'){
        console.log('Inside audio condition timeline icons')
        if (tick) {
            tick.classList.add('has-audio');
            const icon = tick.querySelector('.icon');
            if (icon) {
                icon.style.display = 'block';
                icon.querySelector('img').src = 'icons/mic.png'; 
                icon.querySelector('img').alt = 'Mic';
            }
                const audioElement = document.createElement('audio');
                audioElement.className = 'audio-element';
                audioElement.controls = true;
                audioElement.src = `data:audio/webm;base64,${annotation.content}`;
                tick.appendChild(audioElement);

                const timelineWidth = timeline.offsetWidth;
                const startTimePercentage = (annotation.startTime/ video.duration)* 100;
                const durationPercentage = (annotation.endTime - annotation.startTime) / video.duration * 100;
               // audioElement.style.width = `${durationPercentage}%`;
                audioElement.style.left = `${startTimePercentage}%`;
                //audioElement.style.width = `${calculateWidthFromDuration(annotation.endTime - annotation.startTime)}px`;
        }
    }else{
        if (tick) {
            tick.classList.add('has-drawing');
            const icon = tick.querySelector('.icon');
            if (icon) {
                icon.style.display = 'block';
                console.log('Inside updateTimelineIcons function for creating pencil icon')
                createPointerForPencilIcon(icon);
            }
        }
    }
    
});

//     const ticks2 = document.querySelectorAll('.timeline .tick');
// ticks2.forEach(tick => {
//     const tickTime = parseInt(tick.dataset.time);
//     const hasDrawing = annotations.some(annotation => Math.floor(annotation.time) === tickTime);
//     if (!hasDrawing) {
//         const icon = tick.querySelector('.icon');
//         if (icon) {
//             tick.removeChild(icon);
//             removePointerForPencilIcon(tick);
//         }
//     }
// });
}
// const annotation = {
//     time:5, // End time in seconds
//     content: '{"version":"4.5.0","objects":[{"type":"circle","version":"4.5.0","originX":"left","originY":"top","left":100,"top":70,"width":60,"height":60,"fill":"transparent","stroke":"#33FF57","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":2.43,"scaleY":2.43,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"radius":30,"startAngle":0,"endAngle":6.283185307179586}]}' 
// };
// annotations.push(annotation);
//updateAnnotationsList();
//updateTimelineIcons();
// Display the annotation content at time 10 seconds
//displayOnCanvas(annotation, 5, 10);
// document.addEventListener('DOMContentLoaded', () => {
//     const dropdownButton = document.querySelector('.Dropdown');
//     const dropdownItems = document.querySelector('.Dropdown__items');

//     dropdownButton.addEventListener('click', () => {
//         dropdownItems.classList.toggle('hide');
//     });

//     document.addEventListener('click', (event) => {
//         if (!dropdownButton.contains(event.target)) {
//             dropdownItems.classList.add('hide');
//         }
//     });
// });
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

    // Save the recording with the corresponding video duration
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
     updateTimelineIcons();
    console.log('Recording saved', annotation);
    displayRecordings();
     // Store audio context for playback synchronization
    //  audioContexts.push({
    //     audio: audioElement,
    //     startTime: annotation.startTime,
    //     endTime: annotation.endTime,
    //     isPlaying: false
    // });
}


function displayRecordings() {
    annotations.forEach(annotation => {
        if (Math.abs(annotation.time - video.currentTime) < 0.5 && annotation.type === 'audio') {
            console.log("Inside display Recordings function's condition !")
            const startTime = annotation.startTime;
            const endTime = annotation.endTime;
            const duration = endTime - startTime;
            const width = calculateWidthFromDuration(duration);
            // const audioElements = document.getElementsByClassName('audio-element');
            // Array.from(audioElements).forEach(audio => {
            //     audio.style.width=`${calculateWidthFromDuration()}px`;
            //     audio.style.backgroundColor='red';  
            // });
            

            const recordingElement = document.createElement('div');
            recordingElement.classList.add('recording');
            recordingElement.style.left = `${(startTime / video.duration) * 100}%`;
            recordingElement.style.width = `${width}px`;
            recordingElement.style.height='20px';
            //recordingElement.src=url;
            recordingElement.style.backgroundColor='red';
            // recordingElement.addEventListener('click', () => {
            //     const audio = new Audio(annotation.content);
            //     audio.currentTime=startTime;
            //     // audio.style.backgroundColor='red';
            //     audio.play();
            // });

           timeline.appendChild(recordingElement);
        }
    });
}
// function setupVideoPlayer(video) {
//     video.addEventListener('timeupdate', () => {
//         const currentTime = video.currentTime;

//         audioContexts.forEach(context => {
//             if (currentTime >= context.startTime && currentTime <= context.endTime) {
//                 if (!context.isPlaying) {
//                     context.audio.play();
//                     context.isPlaying = true;
//                 }
//             } else {
//                 if (context.isPlaying) {
//                     context.audio.pause();
//                     context.isPlaying = false;
//                 }
//             }
//         });
//     });
// }
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
// video.addEventListener('timeupdate', () => {
//     annotations.forEach(annotation => {
//         if (annotation.type === 'audio') {
//             if (video.currentTime >= annotation.startTime && video.currentTime <= annotation.endTime) {
//                 const audio = new Audio(annotation.content);
//                 audio.currentTime = annotation.startTime;
//                 audio.play();
//             }
//         }
//     });
// });
// const activateFirstTime=false;
// document.getElementById('save-button').addEventListener('click', function() {
    
//     // Apply blur effect to the body
//    // document.body.style.filter = 'blur(5px)';
//    if(document.getElementsByClassName('save-btn').svg.style.fill == '#ffffff' && !activateFirstTime ) {
//     this.classList.toggle('active');
//     activateFirstTime=true;
// }
    
   
//     if (this.classList.contains('active')) {
//         annotations.forEach(annotation => {
//             saveAnnotation(annotation);
//         });
     
//         const overlay = document.getElementById('overlay');
//         overlay.classList.add('active');
    
//         setTimeout(() => {
//             document.body.classList.remove('blur');
//             overlay.classList.remove('active');
//             //document.body.style.filter = 'none';
//         }, 1500);
//     }else{
//         return;
//     }

// });
let activateFirstTime = false;

document.getElementById('save-button').addEventListener('click', function() {
    const svgElement = this.querySelector('svg'); // Select the SVG element inside the button

    // Toggle the active class
    this.classList.toggle('active');

    if (this.classList.contains('active')) {
        // If active, set the SVG fill color to yellow
        svgElement.style.fill = '#FFFF00';

        // Apply blur effect to the body
       // document.body.classList.add('blur');
       
        // Call saveAnnotation() for each annotation
        annotations.forEach(annotation => {
            saveAnnotation(annotation);
        });

        // Show overlay
        const overlay = document.getElementById('overlay');
        overlay.classList.add('active');

        // Remove blur and overlay after 1.5 seconds
        setTimeout(() => {
          //  document.body.classList.remove('blur');
            overlay.classList.remove('active');
        }, 1500);

        activateFirstTime = true;
    } else {
        // If not active, reset the SVG fill color to white
        svgElement.style.fill = '#FFFFFF';
        deleteAllAnnotations();
        // Remove blur effect from the body
       // document.body.classList.remove('blur');

        // Hide overlay immediately
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('active');

        activateFirstTime = false;
    }
});
  
//   function loadWebMWriterScript() {
//     fetch("https://unpkg.com/webm-writer@1.0.0/dist/webm-writer.min.js", {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Accept": "*/*"
//       }
//     })
//     .then(response => response.text())
//     .then(scriptText => {
//       // Create a new script element
//       const script = document.createElement('script');
//       script.text = scriptText;
//       document.head.appendChild(script);
//     })
//     .catch(error => {
//       console.error('Error loading script:', error);
//     });
//   }
// async function captureFrames(video, canvas, annotations) {
//     const frames = [];
//     let currentTime;

//     // Sort annotations by time to process them sequentially
//     annotations.sort((a, b) => a.time - b.time);

//     for (let annotation of annotations) {
//         currentTime = annotation.time;
//         video.currentTime = currentTime;
//         await new Promise(resolve => video.onseeked = resolve);

//         // Draw annotations on canvas
//         canvas.clear();
//         canvas.loadFromJSON(annotation.content, canvas.renderAll.bind(canvas));

//         // Capture the frame
//         const frame = await html2canvas(canvas.getElement(), {
//             logging: false,
//             useCORS: true
//         });
//         frames.push({ time: currentTime, frame });
//     }

//     return frames;
// }



// function displayFrames(frames) {
//     const container = document.getElementById('frame-container');
//     for (let i = 0; i < Math.min(frames.length, 5); i++) {
//         const img = document.createElement('img');
//         img.src = frames[i].frame.toDataURL();
//         container.appendChild(img);
//     }
// }




// async function convertFramesToVideo(frames, video) {
//     const videoOutput = new Whammy.Video(30); // 30 FPS

//     let frameIndex = 0;
//     let currentFrameTime = 0;

//     const tempCanvas = document.createElement('canvas');
//     const ctx = tempCanvas.getContext('2d');
//     tempCanvas.width = video.videoWidth;
//     tempCanvas.height = video.videoHeight;

//     while (currentFrameTime <= video.duration) {
//         if (frameIndex < frames.length && frames[frameIndex].time <= currentFrameTime) {
//             // Add the annotated frame
//             videoOutput.add(frames[frameIndex].frame, 1000 / 30);
//             frameIndex++;
//         } else {
//             // Capture the original frame from the video
//             video.currentTime = currentFrameTime;
//             await new Promise(resolve => video.onseeked = resolve);

//             // Draw the current video frame onto the temporary canvas
//             ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
            
//             // Add the canvas frame to the video output
//             videoOutput.add(tempCanvas);
//         }
//         currentFrameTime += 1 / 30;
//     }

//     return videoOutput.compile();
// }
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
            // Add the annotated frame without duration
            videoOutput.add(frames[frameIndex].frame);
            frameIndex++;
        } else {
            // Capture the original frame from the video
            video.currentTime = currentFrameTime;
            await new Promise(resolve => video.onseeked = resolve);

            // Draw the current video frame onto the temporary canvas
            ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
            
            // Add the canvas frame to the video output without duration
            videoOutput.add(tempCanvas);
        }
        currentFrameTime += 1 / 30; // Move to the next frame time
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
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// async function convertWebMtoMP4(webMBlob) {
//     const ffmpeg = createFFmpeg({ log: true });
//     await ffmpeg.load();
    
//     ffmpeg.FS('writeFile', 'input.webm', await fetchFile(webMBlob));
//     await ffmpeg.run('-i', 'input.webm', 'output.mp4');
//     const data = ffmpeg.FS('readFile', 'output.mp4');

//     const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' });
//     downloadVideo(mp4Blob);
// }
async function exportAnnotatedVideo(video, canvas, annotations) {
    try {
        const frames = await captureFrames(video, canvas, annotations);
        displayFrames(frames);  // Display the captured frames
        const videoBlob = await convertFramesToVideo(frames, video);
        console.log('Blob size:', videoBlob.size, 'bytes');
        downloadVideo(videoBlob);
        // await convertWebMtoMP4(videoBlob);
    } catch (error) {
        console.error('Error exporting video:', error);
    }
}


// document.getElementById('export-button').addEventListener('click', async () => {
//    try{
//     const video = document.getElementById('video');
    
//     // const annotations = // Load your annotations list here;
//     await exportAnnotatedVideo(video, canvas, annotations);
//     console.log('Video export complete!');
//    }
//    catch(error){
//     console.error('Error exporting video:', error);
//    }
// });


// async function captureFrames(video, canvas, annotations) {
//     const frames = [];
//     let currentTime;

//     // Sort annotations by time to process them sequentially
//     annotations.sort((a, b) => a.time - b.time);

//     for (let annotation of annotations) {
//         currentTime = annotation.time;
//         video.currentTime = currentTime;
//         await new Promise(resolve => video.onseeked = resolve);

//         // Draw annotations on canvas
//         canvas.clear();
//         canvas.loadFromJSON(annotation.content, canvas.renderAll.bind(canvas));

//         // Capture the frame
//         const frame = await html2canvas(canvas.getElement(), {
//             logging: false,
//             useCORS: true
//         });
//         frames.push({ time: currentTime, frame });
//     }

//     return frames;
// }

// function displayFrames(frames) {
//     const container = document.getElementById('frame-container');
//     for (let i = 0; i < Math.min(frames.length, 5); i++) {
//         const img = document.createElement('img');
//         img.src = frames[i].toDataURL();
//         container.appendChild(img);
//     }
// }
// async function convertFramesToVideo(frames, video, canvas) {
//     const videoOutput = new Whammy.Video(30); // 30 FPS

//     let frameIndex = 0;
//     let currentFrameTime = 0;
    
//     const tempCanvas = document.createElement('canvas');
//     const ctx = tempCanvas.getContext('2d');
//     tempCanvas.width = video.videoWidth;
//     tempCanvas.height = video.videoHeight;

//     while (currentFrameTime <= video.duration) {
//         if (frameIndex < frames.length && frames[frameIndex].time <= currentFrameTime) {
//             // Add the annotated frame
//             videoOutput.add(frames[frameIndex].frame, 1000 / 30);
//             frameIndex++;
//         } else {
//             // Capture the original frame from the video
//             video.currentTime = currentFrameTime;
//             await new Promise(resolve => video.onseeked = resolve);

//             // Draw the current video frame onto the temporary canvas
//             ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
            
//             // Add the canvas frame to the video output
//             videoOutput.add(tempCanvas, 1000 / 30);
//         }
//         currentFrameTime += 1 / 30;
//     }

//     return videoOutput.compile();
// }


// function downloadVideo(blob) {
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     a.download = 'annotated-video.webm';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }
// async function exportAnnotatedVideo(video, canvas, annotations) {
//     const frames = await captureFrames(video, canvas, annotations);
//     displayFrames(frames.map(f => f.frame));  // Display the captured frames
//     const videoBlob = convertFramesToVideo(frames, video);
//     downloadVideo(videoBlob);
// }

// document.getElementById('export-button').addEventListener('click', async () => {
//     try {
//         const video = document.getElementById('video');
        
//         // const annotations = // Load your annotations list here;
//         await exportAnnotatedVideo(video, canvas, annotations);
//         console.log('Video export complete!');
//     } catch (error) {
//         console.error('Error exporting video:', error);
//     }
// });

// async function captureScreenshot(video, canvas, timestamp) {
//     return new Promise((resolve, reject) => {
//         // Create an offscreen canvas for capturing video frames
//         const videoCanvas = document.createElement('canvas');
//         const videoContext = videoCanvas.getContext('2d');

//         // Set videoCanvas size to video size
//         videoCanvas.width = video.videoWidth;
//         videoCanvas.height = video.videoHeight;

//         // Seek to the specified time
//         video.currentTime = timestamp;
        
//         // Wait for the video to seek to the correct time
//         video.onseeked = async () => {
//             // Draw the video frame onto the videoCanvas
//             videoContext.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);

//             // Draw annotations on canvas
//             canvas.clear();
//             canvas.renderAll();

//             // Draw the annotations from the fabric.js canvas onto the videoCanvas
//             const canvasElement = canvas.getElement();
//             videoContext.drawImage(canvasElement, 0, 0, videoCanvas.width, videoCanvas.height);

//             // Capture the frame from the videoCanvas
//             videoCanvas.toBlob((blob) => {
//                 if (blob) {
//                     resolve(URL.createObjectURL(blob)); // Return the URL of the captured image
//                 } else {
//                     reject('Failed to capture the screenshot.');
//                 }
//             }, 'image/png');
//         };

//         // Handle errors
//         video.onerror = () => {
//             reject('Error occurred while seeking the video.');
//         };
//     });
// }

// const container = document.createElement('div');
// container.id = 'screenshot-container';
// document.body.appendChild(container);
// async function captureScreenshot(video, canvas, timestamp) {
//     return new Promise((resolve, reject) => {
//         // Create an offscreen canvas for capturing video frames
//         const videoCanvas = document.createElement('canvas');
//         const videoContext = videoCanvas.getContext('2d');

//         // Set videoCanvas size to video size
//         videoCanvas.width = video.videoWidth;
//         videoCanvas.height = video.videoHeight;

//         // Seek to the specified time
//         video.currentTime = timestamp;

//         // Wait for the video to seek to the correct time
//         video.onseeked = async () => {
//             // Draw the video frame onto the videoCanvas
//             videoContext.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);

//             // Find the annotation for the current timestamp
//             const annotation = annotations.find(a => a.time === timestamp);

//             if (annotation) {
//                 // Draw annotations on canvas
//                 canvas.clear();
//                 canvas.loadFromJSON(annotation.content, canvas.renderAll.bind(canvas));
                
//                 // Draw the annotations from the fabric.js canvas onto the videoCanvas
//                 const canvasElement = canvas.getElement();
//                 videoContext.drawImage(canvasElement, 0, 0, videoCanvas.width, videoCanvas.height);
//             }

//             // Capture the frame from the videoCanvas
//             videoCanvas.toBlob((blob) => {
//                 if (blob) {
//                     resolve(URL.createObjectURL(blob)); // Return the URL of the captured image
//                 } else {
//                     reject('Failed to capture the screenshot.');
//                 }
//             }, 'image/png');

         
//         };
        
//         // Handle errors
//         video.onerror = () => {
//             reject('Error occurred while seeking the video.');
//         };
//     });
// }


// document.getElementById('export-button').addEventListener('click',  () => {
// captureScreenshot(video, canvas, 17)// Capture at 10 seconds
//     .then((screenshotUrl) => {
//         // Create an image element to display the screenshot
//         const img = document.createElement('img');
//         img.src = screenshotUrl;
//         img.style.width='100px';
//         img.style.height='100px';
//         img.style.left='-20%';
//         document.body.appendChild(img);
//     })
//     .catch((error) => {
//         console.error(error);
//     });


    // captureScreenshot(video, canvas, 30) // Capture at 10 seconds
    // .then((screenshotUrl) => {
    //     // Create an image element to display the screenshot
        
    // })
    // .catch((error) => {
    //     console.error(error);
  //  });
// });

// Create a container element for the screenshots
const container = document.createElement('div');
container.id = 'screenshot-container';
document.body.appendChild(container);
const imageData = [];
async function captureScreenshot(video, canvas, timestamp, annotations) {
    return new Promise((resolve, reject) => {
        
        // Create an offscreen canvas for capturing video frames
        const videoCanvas = document.createElement('canvas');
        const videoContext = videoCanvas.getContext('2d');

        // Set videoCanvas size to video size
        videoCanvas.width = video.videoWidth;
        videoCanvas.height = video.videoHeight;
        console.log('Timestamp',timestamp);
        // Seek to the specified time
         video.currentTime = timestamp;

        // Wait for the video to seek to the correct time
        // video.onseeked = async () => {
            // Draw the video frame onto the videoCanvas
            videoContext.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
            for (const annotation of annotations) {
            // Find the annotation for the current timestamp
            // const annotation = annotations.find(a => a.time === timestamp);
            
            if (annotation.time==timestamp) {
                console.log('Annotation time',annotation.time);
                // Draw annotations on canvas
                canvas.clear();
                canvas.loadFromJSON(annotation.content, canvas.renderAll.bind(canvas));
                
                // Draw the annotations from the fabric.js canvas onto the videoCanvas
                const canvasElement = canvas.getElement();
                videoContext.drawImage(canvasElement, 0, 0, videoCanvas.width, videoCanvas.height);
            

            // Capture the frame from the videoCanvas
            videoCanvas.toBlob((blob) => {
                if (blob) {
                    const base64String = convertBlobToBase64(blob);
                    console.log('Base64 String:',base64String);
                    imageData.push(base64String);
                    console.log('Number of images:', imageData.length);
                    const screenshotUrl = URL.createObjectURL(blob);
                    
                    // Create an image element to display the screenshot
                    const img = document.createElement('img');
                    img.src = screenshotUrl;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.margin = '5px'; // Add some spacing between images

                    // Append the image to the container
                    container.appendChild(img);
                    console.log('Added image')
                    resolve(screenshotUrl); // Return the URL of the captured image

                } else {
                    reject('Failed to capture the screenshot.');
                }
            }, 'image/png');
        }
        else{

        }
       // }
    };
    
        
        // Handle errors
        video.onerror = () => {
            reject('Error occurred while seeking the video.');
        };
       
    });
   
}

// To be included in export feature (uncomment)
// document.getElementById('export-button').addEventListener('click', async () => {
//     // Clear the container before adding new images
//     container.innerHTML = '';
    
//     // Define the timestamps at which you want to capture screenshots
//     const timestamps = [10, 20, 30]; // Example timestamps (in seconds)
    
//     // Array to hold the promises for each screenshot
//     const screenshotPromises = timestamps.map(timestamp => 
      
//         captureScreenshot(video, canvas, timestamp, annotations),
//        // console.log('timestamp:',timestamp),
//     );

//     try {
//         // Wait for all screenshots to be captured
//         await Promise.all(screenshotPromises);
//         container.childNodes.forEach((child, index) => {
//             console.log(`Child ${index + 1}:`, child);
//         });
//         console.log('Number of images calling:', imageData.length);
        
//         console.log('Screenshots captured and displayed.');
//     } catch (error) {
//         console.error('Error capturing screenshots:', error);
//     }

   
// });

// Function to refresh the gallery by fetching media files
function refreshGallery() {
    fetch(`${apiUrl}/getmediafiles`)
        .then(response => response.json())
        .then(files => {
            // Clear the current gallery
            gallery.innerHTML = ''; // or imageGallery.innerHTML = '' for images

            // Loop through each file and add it to the gallery
            files.forEach(file => {
                const fileExtension = file.fileName.split('.').pop().toLowerCase();
                const filePath = `../uploads/${file.fileName}`;
                if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                    addImageCard(filePath, file.originalName);
                } else if (['mp4', 'webm'].includes(fileExtension)) {
                    addVideoCard(filePath, file.originalName);
                }
            });
        })
        .catch(error => console.error('Error fetching media files:', error));
}

// Call refreshGallery() after successfully uploading a video/image
// .then(data => {
//     if (data.media && data.media.fileUrl && data.media.originalName) {
//         // Optionally refresh the entire gallery
//         refreshGallery(); // Uncomment this line to refresh the gallery
//     }
// });
