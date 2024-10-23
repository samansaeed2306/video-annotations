
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
    objectCaching:true,
    statefulCache:true,
    dirty:true
    });
window.onload = () => {
    

    selectedMediaType = localStorage.getItem('selectedMediaType') || '';
    localStorage.removeItem('selectedMediaType'); 

    const videoContainer = document.getElementById('video-container');
    const canvas2 = document.getElementById('canvas');
    const buttonsContainer = document.querySelector('.buttons-container');
    console.log("Selected Media Type: ",selectedMediaType);
    if (selectedMediaType === 'image') {
        const storedImageSrc = localStorage.getItem('selectedImageSrc');
        if (storedImageSrc) {
            const video = document.getElementById('video');
            if (video) {
                console.log('The video element has been removed');
                video.remove();
            }
            console.log("Video Container:", videoContainer);

            const img = document.createElement('img');
            img.id = 'media-element';
            img.src = storedImageSrc;
            img.style.display = 'block';
            console.log("Created img element:", img);
          
            

            

            img.style.position = 'absolute'; 
            img.style.top = '0';  
            img.style.left = '0'; 
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            
            if(videoContainer.contains(canvas2)) {
            videoContainer.appendChild(img); }
            console.log('videoContainer.contains(canvas): ',videoContainer.contains(canvas2));
           
            const observer = new MutationObserver((mutations) => {
                console.log('Observer alert!');
                if (videoContainer.contains(canvas)) {
                   
                        console.log("Inserting img element:", img);
                        videoContainer.insertBefore(img, canvas2);
                        console.log("Image element inserted after delay.");
                        console.log("Image element after delay insertion:", document.getElementById('media-element'));
                        observer.disconnect(); 
                 
                }
            });

            observer.observe(videoContainer, { childList: true });
            mediaElement = img;
            console.log("Removed Local Storage");
            localStorage.removeItem('selectedImageSrc');
            console.log("Image element after insertion:", document.getElementById('media-element'));

            img.onload = () => {
                console.log('Image has been successfully loaded');
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                console.log(`Image Aspect Ratio: ${aspectRatio.toFixed(2)} (Width: ${img.naturalWidth}, Height: ${img.naturalHeight})`);

                fabricCanvas.width = img.clientWidth;
                fabricCanvas.height = img.clientHeight;
                canvas.setWidth(img.clientWidth);
                canvas.setHeight(img.clientHeight);

                console.log(`Canvas resized to: ${img.clientWidth}x${img.clientHeight}`);
            };
            img.onerror = (e) => {
                console.error('Failed to load image', e);
            };
            if (buttonsContainer) {
                buttonsContainer.style.display = 'none'; 
                console.log("Buttons container hidden.");
            }

            console.log("Video Container after insertion:", videoContainer);
        }
    } 
    else {
        mediaElement = document.getElementById('video');
        console.log("This is a video element")
        // video.onload = () => {
        //     console.log('Video has been successfully loaded');
        //     const aspectRatio = video.naturalWidth / video.naturalHeight;
        //     console.log(`Video Aspect Ratio: ${aspectRatio.toFixed(2)} (Width: ${video.naturalWidth}, Height: ${video.naturalHeight})`);

        //     fabricCanvas.width = video.clientWidth;
        //     fabricCanvas.height = video.clientHeight;
        //     canvas.setWidth(video.clientWidth);
        //     canvas.setHeight(video.clientHeight);

        //     console.log(`Canvas resized to: ${video.clientWidth}x${video.clientHeight}`);
        // };
        // video.onerror = (e) => {
        //     console.error('Failed to load video', e);
        // };
        
    }

    
};


document.addEventListener('DOMContentLoaded', function() {

    
    setTimeout(() => {
    const video = document.getElementById('video');
   
    if (selectedMediaType === '' || selectedMediaType === 'video') {
    if(video){
    const player = new shaka.Player(video);
    const storedVideoSrc = localStorage.getItem('selectedVideoSrc');
    const manifestUri = storedVideoSrc || 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
    
    function loadVideo(manifestUri) {
        player.load(manifestUri).then(function() {
            console.log('The video has now been loaded!');
            setupTimeline(video);
        }).catch(function(error) {
            console.error('Error code', error.code, 'object', error);
        });
    }
    loadVideo(manifestUri);}
    localStorage.removeItem('selectedVideoSrc');}

}, 1000);

});
function setupTimeline(video) {
    const timeline = document.getElementById('timeline');
    const duration = Math.floor(video.duration);
    timeline.style.setProperty('--duration', duration);
    console.log(duration);
    video.currentTime = 3;
    console.log("Video's current Time: ",video.currentTime);
    svgMarkup = `<?xml version="1.0" ?>
    <svg id="pencil-svg" height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        <g transform="translate(0 -1028.4)">
            <g transform="matrix(1.0607 1.0607 -1.0607 1.0607 1146.8 34.926)">
                <path d="m-63 1003.4v11.3 0.7 1l2 2 2-2v-1-0.7-11.3h-4z" fill="#ecf0f1"/>
                <path d="m-61 1003.4v15l2-2v-1-0.7-11.3h-2z" fill="#bdc3c7"/>
                <rect fill="blue" height="11" width="4" x="-63" y="1004.4"/>
                <path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h4v-1c0-1.1-0.895-2-2-2z" fill="#7f8c8d"/>
                <g transform="translate(-7,1)">
                    <path d="m-55.406 1016 1.406 1.4 1.406-1.4h-1.406-1.406z" fill="#34495e"/>
                    <path d="m-54 1016v1.4l1.406-1.4h-1.406z" fill="#2c3e50"/>
                </g>
                <path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h2v-3z" fill="#95a5a6"/>
                <rect fill="blue" height="11" width="2" x="-61" y="1004.4"/>
            </g>
        </g>
    </svg>`;


    const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup);
    for (let i = 0; i < duration; i++) {
                const tick = document.createElement('div');
                tick.classList.add('tick');
                tick.dataset.time = i; 
        
                
                const icon = document.createElement('div');
                icon.classList.add('icon');
                const img = document.createElement('img');
                // img.src = 'icons/pencil.png';
                img.src = svgDataUrl;
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
        timeline.appendChild(tick2);

        tick2.addEventListener('click', function (event) {
            if (tick2.classList.contains('blocked')) {
                console.log(`Tick at ${i} seconds is blocked.`);
                event.stopPropagation();
                return;
            }
            console.log(`Clicked on tick at ${i} seconds.`);
            video.currentTime = i;
        });

        tick2.addEventListener('mousedown', (event) => {
            event.preventDefault();

            const startDraggingTick = (e) => {
                const rect = timeline.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                const newTime = (percentage / 100) * duration;
                video.currentTime = Math.min(Math.max(newTime, 0), duration);
            };

            const stopDraggingTick = () => {
                document.removeEventListener('mousemove', startDraggingTick);
                document.removeEventListener('mouseup', stopDraggingTick);
            };

            document.addEventListener('mousemove', startDraggingTick);
            document.addEventListener('mouseup', stopDraggingTick);
        });
    }

    
    const pointer2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    pointer2.setAttribute('width', '13');
    pointer2.setAttribute('height', '21');
    pointer2.setAttribute('fill', 'none');
    pointer2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    pointer2.setAttribute('alt', 'draggable icon for progress bar');
    pointer2.classList.add('pointer2');
    pointer2.innerHTML = '<path d="M13 14.726C13 18.19 10.09 21 6.5 21S0 18.19 0 14.726C0 8.812 4.345 8 6.5 0 8 7.725 13 8.5 13 14.726z" fill="#CED0D1"></path><circle cx="6.5" cy="14.5" r="2.5" fill="#31373D"></circle>';
    pointer2.style.display = 'none';
    timeline.appendChild(pointer2);

   
    function updatePointerAndTicks() {
        const percentage = (video.currentTime / duration) * 100;
        pointer2.style.left = `calc(${percentage}% - 6.5px)`; 
        
        const ticks2 = document.querySelectorAll('.tick2');
        ticks2.forEach((tick2, index) => {
            if (index <= Math.floor(video.currentTime)) {
                tick2.style.backgroundColor = 'red'; 
            } else {
                tick2.style.backgroundColor = 'white'; 
            }
        });
    }

    video.addEventListener('timeupdate', updatePointerAndTicks);

   
    pointer2.addEventListener('mousedown', (e) => {
        e.preventDefault();

        const movePointer = (e) => {
            const rect = timeline.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            const newTime = (percentage / 100) * duration;
            video.currentTime = Math.min(Math.max(newTime, 0), duration); 
        };

        const stopDragging = () => {
            document.removeEventListener('mousemove', movePointer);
            document.removeEventListener('mouseup', stopDragging);
            updatePointerAndTicks();
        };

        document.addEventListener('mousemove', movePointer);
        document.addEventListener('mouseup', stopDragging);
    });

    video.addEventListener('ended', () => {
        pointer2.style.left = `calc(100% - 29.5px)`; 
    });
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
        }
        
        const annotationIndex = annotations.findIndex(annotation => Math.floor(annotation.time) === parseInt(oldTime));
        if (annotationIndex !== -1) {
        annotations.splice(annotationIndex, 1);
        
        }
}

updateAnnotationsList();
updateTimelineIcons();

}






const playPauseButton = document.getElementById('play-pause-button');
const playPauseImage = playPauseButton.querySelector('img');
const audioWave = document.querySelector('.audio-wave');
playPauseButton.addEventListener('click', () => {
    console.log('Canvas outside conditions Z index: ',document.getElementById('canvas').style.zIndex);
if (video.paused) {
    console.log('inside play condition')
    video.play();
    console.log('Canvas inside if Z index: ',document.getElementById('canvas').style.zIndex);
   
    audioWave.classList.add('active');
} else {
    console.log('inside pause condition')
    video.pause();
    audioWave.classList.remove('active');
    console.log('Canvas inside else Z index: ',document.getElementById('canvas').style.zIndex);
}
});



function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// function view() {
   
//     const buttons = document.querySelectorAll('button');
//     buttons.forEach(button => {
//         button.disabled = true;
//     });

//     const playIcon = document.getElementById('play-icon');
//     const pauseIcon = document.getElementById('pause-icon');
    
//     video.currentTime=0;
//     video.play();

//     playIcon.style.display = 'none';
//     pauseIcon.style.display = 'block';


//     video.onended = function() {
//         playIcon.style.display = 'block';
//         pauseIcon.style.display = 'none';
//     };

//     const toolsDiv = document.querySelector('.tools');
//     toolsDiv.style.display = 'none'; 

//     const exitButton = document.createElement('button');
//     exitButton.id = 'exit-view-mode';
//     exitButton.innerHTML = 'Exit View Mode';
//     exitButton.style.position = 'absolute';
//     exitButton.style.top = '10px';
//     exitButton.style.left = '10px';
//     exitButton.style.zIndex = '1000';  // Make sure it stays above other elements

//     // Add exit button to the body
//     document.body.appendChild(exitButton);

//     exitButton.addEventListener('click', () => {
//         // Re-enable all the buttons
//         document.querySelectorAll('button').forEach(button => {
//             button.disabled = false;
//         });
//         // Remove the exit button
//        // document.body.removeChild(exitButton);
//         // Pause the video
//         video.pause();

//         // Show the tools div again
//         toolsDiv.style.display = 'block';

        
//     });
   

// }

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

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const currentTimeInput = document.getElementById('ex-current-time-input');
    const totalTimeSpan = document.querySelector('.formatted-timeframe span:nth-child(2) span:first-child');

   
    
    

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
    if(videoAspectRatio<1){
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
                updateTimelineIcons();
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
        //resetCanvasStyles();
        const lowerCanvas = document.getElementById('canvas'); 
        const upperCanvas = document.querySelector('.upper-canvas'); 
        const canvasContainer = document.querySelector('.canvas-container'); 

    if (upperCanvas) {
        upperCanvas.style.height = '450px';
        upperCanvas.style.top = '19px';
        console.log("DONE")
    } else {
        console.error("upperCanvas element not found");
    }

    if (lowerCanvas) {
        lowerCanvas.style.height = '503px';
        console.log("DONE LOWER")
    } else {
        console.error("lowerCanvas element not found");
    }

    if (canvasContainer) {
        canvasContainer.style.height = '503px';
        console.log("DONE CONTAINER")
    } else {
        console.error("canvasContainer element not found");
    }
        zoomOut2x();
    } else if (videoAspectRatio > 1) {
        console.log("This is a landscape video.");
        // fabricCanvas.width = video.clientWidth;
        // fabricCanvas.height = video.clientHeight;
        // canvas.setWidth(video.clientWidth);
        // canvas.setHeight(video.clientHeight);
        toggleZoom();
        
    } else {
        console.log("This is a square video.");
        // fabricCanvas.width = video.clientWidth;
        // fabricCanvas.height = video.clientHeight;
        // canvas.setWidth(video.clientWidth);
        // canvas.setHeight(video.clientHeight);
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
    //canvas.isDrawingMode = true; 
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
     renderAnnotationsForCurrentTime(video.currentTime);
    // showAnnotationsAtCurrentTime(video.currentTime);
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
      
    } else {
        annotations.push(annotation);
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
    function createPointerForPencilIcon(tick) {
        if (tick.querySelector('.pointer')) {
            return; 
        }
    const pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.style.left = '50%'; 
    pointer.style.top = '-20px'; 
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#FF33FF', '#33FFFF'];


    const randomColor = selectedColor;
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
           
           // canvas.clear();
        }
    });
}

function handleTimeUpdate() {
const currentTime = video.currentTime;
const canvas = document.getElementById('canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
   
    const annotation = annotations.find(a => a.time <= currentTime);
    
if (annotation) {
    console.log(`Found annotation`);}
    
   

    if (currentTime >= annotation.startTime && currentTime <= annotation.endTime) {
        
        console.log(`Displaying annotation: ${annotation.startTime}`);

    } else {
        
        console.log(`Removing annotation: ${annotation.id}`);
    
    }
} else {
    console.error('Canvas element not found');
}
}


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
function toggleClearAllIcon() {
    const clearAllIcon = document.getElementById('clear-all');
    
    if (annotations.length > 0) {
        clearAllIcon.style.display = 'block'; 
    } else {
        clearAllIcon.style.display = 'none'; 
    }
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
        const annotationType = parsedContent.objects[parsedContent.objects.length - 1].type;
        console.log(annotationType);
    if(annotationType=='text'){
            listItem.textContent = `polyline ${formatTime(annotation.time)}`;
        }    
    else if(annotationType=='rect'){
        listItem.textContent = `rectangle ${formatTime(annotation.time)}`;
    }
    else if(annotationType=='textbox'){
        const bgcolor = parsedContent.objects[parsedContent.objects.length - 1].backgroundColor;
        if(bgcolor=='#ffffcc'){
            listItem.textContent = `note ${formatTime(annotation.time)}`;
        }
        else{
            listItem.textContent = `text box ${formatTime(annotation.time)}`;
        }

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

            const deleteIcon = document.createElement('img');
            deleteIcon.src = 'icons/delete2.png'; // Path to your delete icon
            deleteIcon.alt = 'Delete';
            deleteIcon.style.width = '14px'; // Set the width as needed
            deleteIcon.style.height = '14px'; // Set the height as needed
            deleteIcon.style.backgroundColor='none';
            deleteIcon.style.marginLeft= '10px'
           
           

            deleteIcon.addEventListener('click', function() {
                
                annotations.splice(index, 1);
               
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
                
                updateAnnotationsList();
                updateTimelineIcons();
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
   
    }else {
    console.log('Skipping empty annotation:', annotation);
}});
    console.log('Inside list update 2:', annotations);
    toggleClearAllIcon();
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
  
}
function confirmClearAll() {
    if (confirm("Are you sure you want to clear all annotations?")) {
      clearAll();
    }
  }

  function clearAll() {
    annotations = [];
    
    updateAnnotationsList();
    updateTimelineIcons();

    console.log('All annotations have been cleared.');
    closeModal();

  }
const clearAllIcon = document.getElementById('clear-all');
clearAllIcon.addEventListener('click', function() {
    annotations = [];
    
    updateAnnotationsList();
    updateTimelineIcons();

    console.log('All annotations have been cleared.');
    renderAnnotationsForCurrentTime(video.currentTime);
});
// function showAnnotationsAtCurrentTime(currentTime) {
//     console.log("Show Annotations at Current time");
//     canvas.clear();
//     annotations.forEach(annotation => {
//         if (Math.abs(annotation.time - currentTime) < 0.5 && annotation.type!='audio') { 
//             canvas.loadFromJSON(annotation.content, () => {
//                 canvas.renderAll();
//             });
//         }
//     });
// }
function renderAnnotationsForCurrentTime(currentTime) {
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
//Annotation at 3 second will remain till 5 seconds by this
// function renderAnnotationsForCurrentTime(currentTime) {
//     console.log("Rendering annotations for time:", currentTime);

//     // Clear the canvas initially
//     canvas.clear();

//     // Array to hold all annotations that need to be rendered (including those in the past)
//     let annotationsToRender = [];

//     // First loop to collect annotations that should persist (those before or at the current time)
//     annotations.forEach((annotation) => {
//         if (annotation.time <= currentTime && annotation.type !== 'audio') {
//             annotationsToRender.push(annotation);  // Collect annotations to render
//         }
//     });

//     // Now we sort annotations by time to ensure proper rendering order
//     annotationsToRender.sort((a, b) => a.time - b.time);

//     // Loop through the sorted annotations and render them in sequence
//     annotationsToRender.forEach((annotation, index) => {
//         canvas.loadFromJSON(annotation.content, () => {
//             canvas.renderAll();  // Render each annotation on the canvas in order
//             console.log(`Rendered annotation ${index + 1} at time ${annotation.time}`);
//         });
//     });

//     console.log("Finished rendering annotations.");
// }
//annotation at 3 seconds will remove existing annotation at 5 seconds 
// function renderAnnotationsForCurrentTime(currentTime) {
//     console.log("Rendering annotations for time:", currentTime);
    
//     // Clear the canvas initially
//     canvas.clear();
    
//     annotations.forEach((annotation, index) => {
//         if (annotation.time <= currentTime && annotation.type !== 'audio') {
//             console.log(`Rendering Annotation ${index + 1} as its time ${annotation.time} <= current time ${currentTime}`);

//             // Load annotation content onto the canvas only if it matches the current time or after
//             canvas.loadFromJSON(annotation.content, () => {
//                 canvas.renderAll(); // Render the canvas after loading
//             });
//         } else {
//             console.log(`Skipping Annotation ${index + 1} as its time ${annotation.time} is after the current time ${currentTime}`);
//         }
//     });
// }

// function removeAnnotationsBeforeTime() {
//     // Sort annotations by time in chronological order
//     annotations.sort((a, b) => a.time - b.time);

//     // Iterate over the annotations array
//     annotations.forEach((currentAnnotation, currentIndex) => {
//         console.log(`Processing Annotation ${currentIndex + 1} at time ${currentAnnotation.time}`);

//         // Clear the canvas for the current annotation
//         canvas.clear();

//         // // Iterate through annotations up to the current annotation's time
//         // annotations.forEach((annotation, index) => {
//         //     if (annotation.time <= currentAnnotation.time && annotation.type !== 'audio') {
//         //         console.log(`Rendering Annotation ${index + 1} as its time ${annotation.time} <= current time ${currentAnnotation.time}`);

//         //         // Load annotation content onto the canvas using loadFromJSON
//         //         canvas.loadFromJSON(annotation.content, () => {
//         //             canvas.renderAll(); // Render the canvas after loading
//         //         });
//         //     } else {
//         //         console.log(`Skipping Annotation ${index + 1} as its time ${annotation.time} is after the current time ${currentAnnotation.time}`);
//         //     }
//         // });

//         // Optional: Save the state after rendering the annotations up to this point
//         saveState();
//     });
// }

// function showAnnotationsAtCurrentTime(currentTime) {
    // console.log("Show Annotations at Current time");
    // canvas.clear();
    // annotations.forEach((annotation, index) => {
    //     console.log(`Annotation ${index + 1}:`);
    //     console.log(annotation.content);
    //     console.log("Annotation's time:",annotation.time);
    //     console.log("Current time:",currentTime);
    // });
    // annotations.forEach(annotation => {
    //     // Check if the annotation's time matches the current time and it's not audio
    //     if (Math.abs(annotation.time - currentTime) < 0.5 && annotation.type != 'audio') {
    //         console.log("Found an annotation");

    //         // Parse the annotation content and get all objects
    //         let objects = JSON.parse(annotation.content).objects;

    //         // Loop through each object and add it to the canvas
    //         objects.forEach(obj => {
    //             // Enliven each object (to convert it from plain JSON to a fabric.js object)
    //             fabric.util.enlivenObjects([obj], function (enlivenedObjects) {
    //                 enlivenedObjects.forEach(enlivenedObj => {
    //                     canvas.add(enlivenedObj); // Add the enlivened object to the canvas
    //                 });
    //                 canvas.renderAll(); // Render the canvas after adding all objects
    //             });
    //         });
    //     }
    //     if (Math.abs(annotation.time - currentTime) <= 0.05 && annotation.type != 'audio') {
    //         console.log("Found an annotation 2");

    //         // Parse the annotation content and get all objects
    //         let objects = JSON.parse(annotation.content).objects;

    //         // Loop through each object and add it to the canvas
    //         objects.forEach(obj => {
    //             // Enliven each object (to convert it from plain JSON to a fabric.js object)
    //             fabric.util.enlivenObjects([obj], function (enlivenedObjects) {
    //                 enlivenedObjects.forEach(enlivenedObj => {
    //                     canvas.add(enlivenedObj); // Add the enlivened object to the canvas
    //                 });
    //                 canvas.renderAll(); // Render the canvas after adding all objects
    //             });
    //         });
    //     }
    // });
// }


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
     updateTimelineIcons();
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



const startBtn = document.getElementById('screen-recording');

let mediaRecorder2;
let chunks = [];
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
  
  async function screenRecorder(){
    try {
        const icon = startBtn;

        if (icon.classList.contains('start-recording')) {
            
            const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

            mediaRecorder2 = new MediaRecorder(stream);

            mediaRecorder2.ondataavailable = event => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder2.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'screen-recording.webm';
                a.click();
                chunks = [];
            };

            mediaRecorder2.start();
            console.log('Screen recording started');

            
            icon.classList.remove('start-recording');
            icon.classList.add('stop-recording');
           
            icon.src = 'icons/stop-record.png';
            icon.alt = 'Stop Recording';
            icon.title='Stop Recording'
        } else if (icon.classList.contains('stop-recording')) {
           
            if (mediaRecorder2) {
                mediaRecorder2.stop();
                console.log('Screen recording stopped');

                
                icon.classList.remove('stop-recording');
                icon.classList.add('start-recording');
                
                icon.src = 'icons/screenrecorder.png';
                icon.alt = 'Start Recording';
                icon.title='Record Screen'
            }
        }
    } catch (error) {
        console.error('Error during recording:', error);
    }
  }

startBtn.addEventListener('click', screenRecorder);

       
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
    videoContainer.addEventListener('dblclick',() => {
        toggleZoom(); 
        resizeVideoButton.classList.toggle('active');
    });

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


function updatePencilColor(svgMarkup, selectedColor) {
    // Set the default color to blue if no color is provided
    console.log("Inside update pencil color");
    const color = selectedColor || 'blue';

    // Update the fill color of the rect elements in the SVG markup
    const updatedSvgMarkup = svgMarkup.replace(/(<rect[^>]*fill=")[^"]*"/g, (match, p1) => {
        console.log("Rects color changed");
        return `${p1}${color}"`;
    });

    // Return the updated SVG markup
    return updatedSvgMarkup;
}