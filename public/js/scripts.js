
let annotations = [];
let currentColorIndex = 0;
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

// Initialize Shaka Player
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const player = new shaka.Player(video);
    const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

    player.load(manifestUri).then(function() {
        console.log('The video has now been loaded!');
        setupTimeline(video);
    }).catch(function(error) {
        console.error('Error code', error.code, 'object', error);
    });
});

function setupTimeline(video) {
    const timeline = document.getElementById('timeline');
    const duration = Math.floor(video.duration);
    timeline.style.setProperty('--duration', duration); // Set custom CSS property for dynamic width

    for (let i = 0; i < duration; i++) {
        const tick = document.createElement('div');
        tick.classList.add('tick');
        tick.dataset.time = i; // Set the dataset.time attribute

        // Add pencil icon and setup drag events
        const icon = document.createElement('div');
        icon.classList.add('icon');
        const img = document.createElement('img');
        img.src = 'icons/pencil.png';
        img.alt = 'Pencil';
        icon.appendChild(img);
        tick.appendChild(icon);

       

        // Add drag events to the pencil icon
        img.addEventListener('dragstart', handleDragStart);
        tick.addEventListener('dragover', handleDragOver);
        tick.addEventListener('drop', handleDrop);
        img.setAttribute('draggable', true);
       
        timeline.appendChild(tick);

        //const tick = document.getElementsByClassName('tick');
        tick.addEventListener('click', function() {
            console.log(`Clicked on tick at ${i} seconds.`);
            video.currentTime = i;
        });
    }
}


  // Function to handle drag start
  function handleDragStart(event) {
    const dragTime = event.target.parentNode.parentNode.dataset.time;
    console.log('Drag start:', dragTime);
    event.dataTransfer.setData('text/plain', dragTime);
}

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

// Remove the pencil icon from the old tick
const oldTick = document.querySelector(`.tick[data-time='${oldTime}'] .icon`);
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
});
updateAnnotationsList();
updateTimelineIcons();
}
}



// Fabric.js Canvas Initialization
const canvas = new fabric.Canvas('canvas', {
selection: false,
isDrawingMode: false
});
const playPauseButton = document.getElementById('play-pause-button');
const playPauseImage = playPauseButton.querySelector('img');
// Handle play/pause button click
playPauseButton.addEventListener('click', () => {
if (video.paused) {
    video.play();
    playPauseImage.src = 'icons/pause.png';
    playPauseImage.alt = 'Pause';
} else {
    video.pause();
    playPauseImage.src = 'icons/play.jpg';
    playPauseImage.alt = 'Play';
}
});
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const currentTimeInput = document.querySelector('.current-time-input');
    const totalTimeSpan = document.querySelector('.formatted-timeframe span:nth-child(2) span:first-child');

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    video.addEventListener('timeupdate', function() {
        currentTimeInput.value = formatTime(video.currentTime);
    });

    video.addEventListener('loadedmetadata', function() {
        totalTimeSpan.textContent = ` / ${formatTime(video.duration)}`;
    });
});

document.getElementById('play-pause-button').addEventListener('click', function() {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    // Toggle icon visibility
    if (playIcon.style.display === 'none') {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
});


function moveAnnotation(oldTime, newTime) {
console.log('Moving annotation from', oldTime, 'to', newTime);
video.currentTime=newTime;
oldTime = parseInt(oldTime);
newTime = parseInt(newTime);

// Find the annotation to move
let annotationIndex = annotations.findIndex(annotation => Math.floor(annotation.time) === oldTime);
if (annotationIndex !== -1) {
const annotation = annotations[annotationIndex];
annotation.time = newTime;
annotations.splice(annotationIndex, 1, annotation); // Update annotation time in the array

// Remove the annotation from the canvas at the old time
canvas.forEachObject(obj => {
    if (obj.time === oldTime) {
        canvas.remove(obj);
    }
});

// Load the annotation onto the canvas at the new time
annotations.forEach(ann => {
    if (Math.floor(ann.time) === newTime) {
        canvas.loadFromJSON(ann.content, () => {
            canvas.renderAll();
        });
    }
});

// Update UI or canvas accordingly
updateAnnotationsList();
updateTimelineIcons();
}
}




// Set the current drawing color
function setCurrentDrawingColor() {
    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = colors[currentColorIndex % colors.length];
        currentColorIndex++;
    }
}

// Drawing functionality
let drawingMode = '';
let isDrawing = false;

function drawFreehand() {
    canvas.isDrawingMode = true;
    drawingMode = '';
    setCurrentDrawingColor(); // Set new color for each new drawing
}
function activateCircleMode() {
    canvas.isDrawingMode = false;
    drawingMode = 'circle';
    setCurrentDrawingColor(); // Set new color for each new drawing

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
    setCurrentDrawingColor(); // Set new color for each new drawing
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
            // updateTimelineIcons(); // Remove pencil icon and pointer from timeline
    

    // Remove the object from the canvas
    canvas.remove(removedObject);
    // canvas.remove(event.target);
}
});
}



// Function to unpick tool
function unpickTool() {
    canvas.isDrawingMode = false;
    canvas.defaultCursor = 'default';
    canvas.selection = true;
}

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
//             activeObject.set({
//                 width: Math.abs(pointer.x - activeObject.left),
//                 height: Math.abs(pointer.y - activeObject.top)
//             });
//             // canvas.add(rect);
//             // canvas.setActiveObject(rect);
//             //activeObject.setCoords();
//             canvas.renderAll();
//         });

//         canvas.on('mouse:up', function() {
//             isDrawing = false;
//             canvas.off('mouse:move');
//         });
//     }
// });

// Undo/Redo functionality
const state = [];
let mods = 0;
canvas.on('object:added', saveState);
canvas.on('object:removed', saveState);
canvas.on('object:modified', saveState);

function saveState() {
    mods += 1;
    if (mods < state.length) {
        state.length = mods;
    }
    state.push(JSON.stringify(canvas));
    console.log('I am inside savestate')
    recordAnnotation(video.currentTime);
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

// Synchronize canvas size with video size
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('video');
const fabricCanvas = document.getElementById('canvas');

video.addEventListener('loadedmetadata', () => {
    fabricCanvas.width = video.clientWidth;
    fabricCanvas.height = video.clientHeight;
    canvas.setWidth(video.clientWidth);
    canvas.setHeight(video.clientHeight);
});

// Event listener for video pause
video.addEventListener('pause', () => {
    canvas.isDrawingMode = true; // Enable drawing mode when video is paused
    fabricCanvas.style.pointerEvents = 'auto'; // Enable pointer events on canvas
});

// Event listener for video play
video.addEventListener('play', () => {
    canvas.isDrawingMode = false; // Disable drawing mode when video is playing
    fabricCanvas.style.pointerEvents = 'none'; // Disable pointer events on canvas
});

// Event listener for video time update
video.addEventListener('timeupdate', () => {
    showAnnotationsAtCurrentTime(video.currentTime);
});

// Function to record annotation
function recordAnnotation(time) {
    if (video.paused) {
    const annotation = {
        time: time,
        content: JSON.stringify(canvas.toJSON())
    };
   
    annotations.push(annotation);
    console.log('Inside record annotation')
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
    //         pencilPointer.style.top = `${icon.offsetTop - 20}px`; // Adjust top position as needed
    //         pencilPointer.style.left = `${icon.offsetLeft}px`; // Adjust left position as needed
            
    //     }
    // }
         // Hide pointer icon after a delay (if needed)
    // setTimeout(() => {
    //     const pencilPointer = document.getElementById('pencil-pointer');
    //     pencilPointer.style.display = 'none';
    // }, 2000); // Adjust delay (in milliseconds) as needed


    function createPointerForPencilIcon(tick) {
        if (tick.querySelector('.pointer')) {
            return; // Exit the function if a pointer already exists
        }
    const pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.style.left = '50%'; // Center the pointer horizontally
    pointer.style.top = '-20px'; // Position above the pencil icon
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#FF33FF', '#33FFFF'];

// Randomly select a color from the array
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    pointer.style.backgroundColor = randomColor;
    tick.appendChild(pointer);


// Add dragging logic to resize the pointer
let isDragging = false;
let startX;
let startWidth;

pointer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startWidth = pointer.offsetWidth;
    pointer.style.cursor = 'ew-resize'; // Change cursor to double arrow
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newWidth = startWidth + (e.pageX - startX);
        if (newWidth > 0) {
            pointer.style.width = newWidth + 'px';

            // Calculate and update annotation duration
            let annotationDuration = calculateAnnotationDuration(newWidth);
            updateAnnotationDuration(tick.id, annotationDuration);
        }
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        pointer.style.cursor = 'ew-resize'; // Keep cursor as double arrow
    }
});
}
function removePointerForPencilIcon(tick) {
console.log("Inside remove pointer function")

const pointer = tick.querySelector('.pointer');

if (pointer && pointer.parentNode === tick) { // Check if pointer exists and is a child of tick
tick.removeChild(pointer); // Safely remove the pointer
console.log("Removed pointer")
}
}
function calculateAnnotationDuration(width) {
const timelineWidth = timeline.offsetWidth;
return (width / timelineWidth) * video.duration;
}

function updateAnnotationDuration(pencilIconId, duration) {
// Logic to update the annotation's duration
console.log(`Updating annotation for ${pencilIconId} to duration: ${duration} seconds`);

const annotation = annotations.find(a => a.time === video.currentTime);
console.log(`start time: ${video.currentTime}`);
if (annotation) {
annotation.duration = duration;
console.log(`Real duration set: ${annotation.duration} `)
annotation.startTime=video.currentTime;
annotation.endTime = video.currentTime + duration;
const annotationData = JSON.parse(annotation.content);
let interval=1;
    for (let time = annotation.startTime; time <= annotation.endTime; time += 0.01) {
        // if (Math.abs(time - video.currentTime) < interval / 2) { // Adjust the condition as needed

        showAnnotations(time);
            // console.log(`Displaying annotation.content: ${annotation.content}`);
            // console.log(`Displaying annotationData: ${annotationData}` )
            // canvas.loadFromJSON(annotation.content, () => {
            //     canvas.renderAll();
            // });



       // }
        
    }
// Ensure previous event listeners are removed to avoid multiple handlers
// video.removeEventListener('timeupdate', handleTimeUpdate);
// video.addEventListener('timeupdate', handleTimeUpdate);
}
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
        // Remove the annotation from the canvas
        console.log(`Removing annotation: ${annotation.id}`);
        // Canvas is already cleared, no further action needed
    }
} else {
    console.error('Canvas element not found');
}
}

// // Function to update the annotations list in the sidebar
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
    listItem.textContent = `Annotation at ${annotation.time.toFixed(2)}s`;

    // Create an input box for comments
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add comment';
    commentInput.value = annotation.comment || '';
    commentInput.style.display = 'none'; // Initially hidden
    commentInput.addEventListener('input', function() {
        annotations[index].comment = commentInput.value;
    });
    const cancelButton = document.createElement('button');
cancelButton.textContent = 'Cancel';
cancelButton.style.display = 'none'; // Initially hidden
cancelButton.addEventListener('click', function() {
    commentInput.style.display = 'none';
    cancelButton.style.display = 'none';
    saveButton.style.display = 'none';
});

const saveButton = document.createElement('button');
saveButton.textContent = 'Save';
saveButton.style.display = 'none'; // Initially hidden
saveButton.addEventListener('click', function() {
    annotations[index].comment = commentInput.value;
    commentInput.style.display = 'none';
    cancelButton.style.display = 'none';
    saveButton.style.display = 'none';
});
const buttonsContainer = document.createElement('div');
buttonsContainer.className = 'annotation-buttons';
buttonsContainer.appendChild(cancelButton);
buttonsContainer.appendChild(saveButton);

listItem.appendChild(commentInput);
listItem.appendChild(buttonsContainer);
listItem.addEventListener('click', () => {
    commentInput.style.display = 'block'; // Show the input box when the list item is clicked
    cancelButton.style.display = 'inline-block'; // Show the cancel button
    saveButton.style.display = 'inline-block'; // Show the save button
});


    // listItem.appendChild(commentInput);
    // listItem.addEventListener('click', () => {
    //     commentInput.style.display = 'block'; // Show the input box when the list item is clicked
        
    // });
    annotationsList.appendChild(listItem);
    }else {
    console.log('Skipping empty annotation:', annotation);
}});
    console.log('Inside list update 2:', annotations);

}


// Function to load a specific annotation
function loadAnnotation(index) {
    const annotation = annotations[index];
    video.currentTime = annotation.time;
    canvas.loadFromJSON(annotation.content, () => {
        canvas.renderAll();
    });
}
        // Function to show annotations at the current time
function showAnnotations(currentTime) {
    console.log('I am inside showAnnotations function')
    canvas.clear();
    annotations.forEach(annotation => {
            if(annotation.time <= annotation.endTime){
            canvas.loadFromJSON(annotation.content, () => {
                canvas.renderAll();
            });}
        }
    );
}
// Function to show annotations at the current time
function showAnnotationsAtCurrentTime(currentTime) {
    canvas.clear();
    annotations.forEach(annotation => {
        if (Math.abs(annotation.time - currentTime) < 0.5) { // Show annotation close to the current time
            canvas.loadFromJSON(annotation.content, () => {
                canvas.renderAll();
            });
        }
    });
}

// Function to update the timeline icon at the specific time
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
    console.log('Inside updateTimelineIcons function')
    removePointerForPencilIcon(tick);
    if (icon) {
        icon.style.display = 'none';
        
        
    }
}
annotations.forEach(annotation => {
    const time = Math.floor(annotation.time);
    const tick = timeline.querySelector(`.tick[data-time='${time}']`);
    if (tick) {
        tick.classList.add('has-drawing');
        const icon = tick.querySelector('.icon');
        if (icon) {
            icon.style.display = 'block';
            console.log('Inside updateTimelineIcons function for creating pencil icon')
            createPointerForPencilIcon(icon);
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
