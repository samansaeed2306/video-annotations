// State management using a singleton pattern
class AppState {
    static instance = null;
    
    constructor() {
        if (AppState.instance) {
            return AppState.instance;
        }
        
        this.currentTool = null;
        this.currentColor = '#FF5252';
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.startPoint = null;
        this.eraserMode = false;
        this.editMode = false;
        this.history = [];
        this.historyIndex = -1;
        this.polylinePoints = [];
        this.polylineLines = [];
        this.polylineAngles = [];
        
        AppState.instance = this;
    }
    
    static getInstance() {
        if (!AppState.instance) {
            AppState.instance = new AppState();
        }
        return AppState.instance;
    }
}

// Video player management
class VideoManager {
    constructor() {
        this.player1 = null;
        this.player2 = null;
        this.videoElement1 = document.querySelector('#video-player-1');
        this.imageElement = null; // Track the image element if mediaType is image
    }

    initializeMainPlayer() {
        const mediaType = localStorage.getItem('mediaType');
        const selectedMediaSrc = localStorage.getItem('selectedVideoSrc');
    
        // Check if the media is an image
        if (mediaType === 'image' && selectedMediaSrc) {
            console.log("Got an image");
            this.loadImage(selectedMediaSrc); // Load the image
            return; // Exit early; no need to initialize the video player
        }
    
        // Initialize the video player only if the media type is video
        if (!this.videoElement1) {
            console.warn('Video player 1 is not present in the DOM. Skipping video initialization.');
            return;
        }
    
        this.player1 = videojs('video-player-1', {
            controls: true,
            autoplay: 'muted',
            playsinline: true,
            fluid: false,
            preload: 'auto',
            responsive: true,
            fill: true,
            enableSmoothSeeking: true,
            controlBar: {
                remainingTimeDisplay: false,
                autoHide: false,
                pictureInPictureToggle: false
            },
            userActions: { hotkeys: true },
            html5: {
                nativeVideoTracks: true,
                nativeAudioTracks: true,
                nativeTextTracks: false,
                nativeControlsForTouch: false,
            }
        }, function onPlayerReady() {
            const player = this;
    
            try {
                if (selectedMediaSrc) {
                    player.src({
                        type: 'video/mp4', // Ensure this matches the actual type of the video file
                        src: selectedMediaSrc
                    });
    
                    player.on('error', function () {
                        console.error('Error loading video:', player.error());
                        // Provide a fallback video
                        player.src({
                            type: 'video/mp4',
                            src: 'https://andelwoodclub.tuneup.golf/storage/56/purchaseVideos/73Zp5B6G9TDlUYGAzcpJ0EMT8NRJljnNumaenQAH.mp4'
                        });
                    });
                } else {
                    // Default video source
                    player.src({
                        type: 'video/mp4',
                        src: 'https://andelwoodclub.tuneup.golf/storage/56/purchaseVideos/73Zp5B6G9TDlUYGAzcpJ0EMT8NRJljnNumaenQAH.mp4'
                    });
                }
    
                player.dimensions(player.currentWidth(), player.currentHeight());
            } catch (error) {
                console.error('Error initializing video player:', error);
            }
        });
    }
    
    loadImage(imageSrc) {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = 'Selected Image';
        imgElement.style.width = '100%';
        imgElement.style.height = 'auto';
    
        // Replace the video element with the image
        if (this.videoElement1) {
            this.videoElement1.replaceWith(imgElement);
            this.videoElement1 = null; // Clear the reference to avoid future issues
        }
    
        console.log('Image loaded:', imageSrc);
    }
   

    initializeSecondPlayer() {
        if (!this.player2) {
            this.player2 = videojs('video-player-2', {
                controls: true,
                autoplay: 'muted',
                playsinline: true,
                fluid: false,
                preload: 'auto',
                responsive: true,
                fill: true,
                enableSmoothSeeking: true,
                controlBar: {
                    remainingTimeDisplay: false,
                    autoHide: false,
                    pictureInPictureToggle: false
                },
                userActions: { hotkeys: true },
                html5: {
                    nativeVideoTracks: true,
                    nativeAudioTracks: true,
                    nativeTextTracks: false,
                    nativeControlsForTouch: false,
                }
            }, function onPlayerReady() {
                const player = this;
                player.src({
                    type: 'video/mp4',
                    src: 'https://andelwoodclub.tuneup.golf/storage/56/purchaseVideos/73Zp5B6G9TDlUYGAzcpJ0EMT8NRJljnNumaenQAH.mp4'
                });
                player.dimensions(player.currentWidth(), player.currentHeight());
            });

            this.videoElement2 = document.querySelector('#video-player-2');
        }
    }

    handleSplitScreen() {
        const secondWrapper = document.querySelector('#second-video-wrapper');
        if (secondWrapper.classList.contains('hidden')) {
            secondWrapper.classList.remove('hidden');
            this.initializeSecondPlayer();
        } else {
            secondWrapper.classList.add('hidden');
            if (this.player2) {
                this.player2.pause();
            }
        }
        return true; // To trigger canvas update
    }

    updateDimensions() {
        if (this.player1) {
            this.player1.dimensions(
                this.player1.currentWidth(),
                this.player1.currentHeight()
            );
        }
        if (this.player2) {
            this.player2.dimensions(
                this.player2.currentWidth(),
                this.player2.currentHeight()
            );
        }
    }
}

// Drawing tools and canvas management
class DrawingManager {
    constructor() {
        this.canvas = new fabric.Canvas('annotation-canvas', {
            width: window.innerWidth,
            height: window.innerHeight,
            selection: true,
            preserveObjectStacking: true
        });
        
        console.log('Canvas object:', this.canvas);
        
        this.state = AppState.getInstance();
        this.initializeEventListeners();
        this.initializeDebugListeners();
    }

    initializeEventListeners() {
        this.canvas.on('object:added', () => this.saveState());
        this.canvas.on('object:modified', () => this.saveState());
        this.canvas.on('object:removed', () => this.saveState());
        this.canvas.on('mouse:down', (e) => {
            console.log('Canvas mouse down:', e);
        });
    }

    initializeDebugListeners() {
        document.body.addEventListener('click', (e) => {
            console.log('Body clicked', e.target);
        });

        const videoContainer = document.querySelector('.video-container');
        videoContainer.addEventListener('click', (e) => {
            console.log('Video container clicked', e.target);
        });

        const upperCanvas = this.canvas.upperCanvasEl;
        upperCanvas.addEventListener('click', (e) => {
            console.log('Upper canvas clicked', e.target);
        });

        document.querySelectorAll('.video-js').forEach(video => {
            video.addEventListener('click', (e) => {
                console.log('Video element clicked', e.target);
            });
        });
    }

    updateDimensions() {
        const containerRect = document.querySelector('.video-container').getBoundingClientRect();
        this.canvas.setWidth(containerRect.width);
        this.canvas.setHeight(containerRect.height);
        this.canvas.renderAll();
    }

    initializeFreeDrawing() {
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = 2;
        this.canvas.freeDrawingBrush.color = this.state.currentColor;
    }

    initializeEraser() {
        this.state.eraserMode = true;
        this.canvas.isDrawingMode = false;
        this.canvas.selection = false;
        this.canvas.hoverCursor = 'crosshair';
        this.canvas.defaultCursor = 'crosshair';

        this.canvas.on('mouse:down', (options) => {
            if (!this.state.eraserMode) return;

            const pointer = this.canvas.getPointer(options.e);
            const objects = this.canvas.getObjects();

            for (let i = objects.length - 1; i >= 0; i--) {
                const object = objects[i];
                if (object.containsPoint(pointer)) {
                    this.canvas.remove(object);
                    this.canvas.renderAll();
                    break;
                }
            }
        });
    }

    initializeEditMode() {
        this.disableDrawing();
        const canvasContainer = this.canvas.wrapperEl;
        const upperCanvas = this.canvas.upperCanvasEl;
        canvasContainer.classList.add('drawing-mode');
        upperCanvas.classList.add('drawing-mode');

        this.canvas.selection = true;
        this.canvas.hoverCursor = 'move';
        
        this.canvas.getObjects().forEach(obj => {
            obj.selectable = true;
            obj.setControlsVisibility({
                mt: true,     // middle top
                mb: true,     // middle bottom
                ml: true,     // middle left
                mr: true,     // middle right
                bl: true,     // bottom left
                br: true,     // bottom right
                tl: true,     // top left
                tr: true,     // top right
                mtr: true     // rotate
            });
            
            if (obj instanceof fabric.IText) {
                obj.editable = true;
            }
        });

        this.canvas.renderAll();
    }

    disableEditMode() {
        const canvasContainer = this.canvas.wrapperEl;
        const upperCanvas = this.canvas.upperCanvasEl;
        canvasContainer.classList.remove('drawing-mode');
        upperCanvas.classList.remove('drawing-mode');

        this.canvas.selection = false;
        this.canvas.hoverCursor = 'default';
        
        this.canvas.getObjects().forEach(obj => {
            obj.selectable = false;
            obj.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                bl: false,
                br: false,
                tl: false,
                tr: false,
                mtr: false
            });
            
            if (obj instanceof fabric.IText) {
                obj.editable = false;
            }
        });

        this.canvas.renderAll();
    }
    Gotolibrary(){
        console.log("Go to Library!")
        window.location.href = 'pages/library.html'; 
    }
    initializePolyline() {
        this.state.polylinePoints = [];
        this.state.polylineLines = [];
        this.state.polylineAngles = [];

        this.canvas.on('mouse:down', (evt) => {
            const pointer = this.canvas.getPointer(evt.e);
            const currentPoint = { x: pointer.x, y: pointer.y };
            
            this.state.polylinePoints.push(currentPoint);
            
            if (this.state.polylinePoints.length >= 2) {
                const prevPoint = this.state.polylinePoints[this.state.polylinePoints.length - 2];
                const line = new fabric.Line(
                    [prevPoint.x, prevPoint.y, currentPoint.x, currentPoint.y],
                    {
                        stroke: this.state.currentColor,
                        strokeWidth: 2
                    }
                );
                this.canvas.add(line);
                this.state.polylineLines.push(line);

                if (this.state.polylinePoints.length >= 3) {
                    const points = this.state.polylinePoints;
                    const lastThreePoints = points.slice(-3);
                    const angle = this.calculateAngle(
                        lastThreePoints[0],
                        lastThreePoints[1],
                        lastThreePoints[2]
                    );

                    const midPoint = lastThreePoints[1];
                    const angleText = new fabric.Text(
                        `${angle.toFixed(1)}°`,
                        {
                            left: midPoint.x,
                            top: midPoint.y,
                            fontSize: 16,
                            fill: this.state.currentColor,
                            selectable: false
                        }
                    );
                    this.canvas.add(angleText);
                    this.state.polylineAngles.push(angleText);
                }
            }
            
            this.canvas.renderAll();
        });
    }
    initializeShape() {
        const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
            
                fileInput.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const imgSrc = e.target.result;
                            this.addShape('image', null, { src: imgSrc });
                        };
                        reader.readAsDataURL(file);
                    }
                });
            
                document.body.appendChild(fileInput);
                fileInput.click();
                document.body.removeChild(fileInput);
    }
    
    calculateAngle(point1, point2, point3) {
        const vector1 = {
            x: point1.x - point2.x,
            y: point1.y - point2.y
        };
        const vector2 = {
            x: point3.x - point2.x,
            y: point3.y - point2.y
        };

        const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
        const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
        const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
        
        let angle = Math.acos(dotProduct / (magnitude1 * magnitude2));
        angle = angle * 180 / Math.PI;
        
        return angle;
    }
    toggleFullScreen() {
        const fullscreenBtn = document.querySelector('.tool-btn .fullscreen');
    
        // Check if the button is active (i.e., it has the 'active' class)
        const isActive = fullscreenBtn && fullscreenBtn.classList.contains('active');
    
        // If not in full-screen and button is not active, enter full-screen
        if (!document.fullscreenElement && !isActive) {
            console.log("Entering full screen mode.");
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
            // Set the button as active
            //fullscreenBtn.classList.add('active');
        } 
        // If already in full-screen or the button is active, exit full-screen
        // else if (document.fullscreenElement || isActive) {
        //     console.log("Exiting full screen mode.");
        //     if (document.exitFullscreen) {
        //         document.exitFullscreen();
        //     } else if (document.mozCancelFullScreen) { // Firefox
        //         document.mozCancelFullScreen();
        //     } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        //         document.webkitExitFullscreen();
        //     } else if (document.msExitFullscreen) { // IE/Edge
        //         document.msExitFullscreen();
        //     }
        //     // Remove the active class from the button when exiting fullscreen
        //     fullscreenBtn.classList.remove('active');
        // }
    }
    
    
    addShape(shapeType, e, options = {}) {
        let shape;
        const pointer = e ? this.canvas.getPointer(e.e) : { x: 100, y: 100 };
        const defaultOptions = {
            left: pointer.x,
            top: pointer.y,
            fill: 'transparent',
            stroke: this.state.currentColor,
            strokeWidth: 2
        };

        const finalOptions = { ...defaultOptions, ...options };

        switch (shapeType) {
            case 'rectangle':
                shape = new fabric.Rect({
                    ...finalOptions,
                    width: 100,
                    height: 100
                });
                break;
            case 'circle':
                shape = new fabric.Circle({
                    ...finalOptions,
                    radius: 50
                });
                break;
            case 'triangle':
                shape = new fabric.Triangle({
                    ...finalOptions,
                    width: 100,
                    height: 100
                });
                break;
            case 'line':
                shape = new fabric.Line(
                    [pointer.x, pointer.y, pointer.x + 100, pointer.y + 100],
                    {
                        stroke: this.state.currentColor,
                        strokeWidth: 2
                    }
                );
                break;
            case 'text':
                shape = new fabric.IText('Type here', {
                    ...finalOptions,
                    fontFamily: 'Arial',
                    fontSize: 20,
                    fill: this.state.currentColor
                });
                break;
            case 'image':
                    // Add image to the canvas
                    fabric.Image.fromURL(options.src, (img) => {
                        img.set({
                            left: pointer.x,
                            top: pointer.y,
                            scaleX: 0.5,
                            scaleY: 0.5,
                        });
                        this.canvas.add(img);
                        this.canvas.setActiveObject(img);
                        this.canvas.renderAll();
                    });
                    break;
          
        }

        if (shape) {
            this.canvas.add(shape);
            this.canvas.setActiveObject(shape);
            this.canvas.renderAll();
        }
    }

    disableDrawing() {
        this.state.eraserMode = false;
        this.state.isDrawing = false;
        this.state.lastX = 0;
        this.state.lastY = 0;
        this.state.startPoint = null;
        this.canvas.isDrawingMode = false;
        this.canvas.selection = true;
        this.canvas.hoverCursor = 'default';
        this.canvas.defaultCursor = 'default';
        this.cleanupToolEvents();
    }

    cleanupToolEvents() {
        this.canvas.off('mouse:down');
        this.canvas.off('mouse:move');
        this.canvas.off('mouse:up');
    }

    saveState() {
        this.state.historyIndex++;
        this.state.history[this.state.historyIndex] = JSON.stringify(this.canvas);
        this.state.history.length = this.state.historyIndex + 1;
    }

    undo() {
        if (this.state.historyIndex > 0) {
            this.state.historyIndex--;
            this.loadState();
        }
    }

    redo() {
        if (this.state.historyIndex < this.state.history.length - 1) {
            this.state.historyIndex++;
            this.loadState();
        }
    }

    loadState() {
        this.canvas.loadFromJSON(this.state.history[this.state.historyIndex], () => {
            this.canvas.renderAll();
        });
    }

    clearCanvas() {
        this.canvas.clear();
        this.saveState();
    }

    setColor(color) {
        this.state.currentColor = color;
        if (this.canvas.isDrawingMode) {
            this.canvas.freeDrawingBrush.color = color;
        }
    }
}

// Main application class
class DrawingApp {
    constructor() {
        this.state = AppState.getInstance();
        this.videoManager = new VideoManager();
        this.drawingManager = new DrawingManager();
        
        this.initializeApp();
    }

    initializeApp() {
        this.videoManager.initializeMainPlayer();
        this.setupEventListeners();
        this.drawingManager.updateDimensions(); // Initial update
        this.drawingManager.saveState(); // Save initial state

        // Video event listener for dimensions
        if(this.videoManager.player1){
        this.videoManager.player1.on('loadedmetadata', () => {
            this.drawingManager.updateDimensions();
        });
    }
        // Window resize handler
        window.addEventListener('resize', () => {
            this.videoManager.updateDimensions();
            this.drawingManager.updateDimensions();
            if (this.drawingManager.canvas) {
                this.drawingManager.canvas.setWidth(window.innerWidth);
                this.drawingManager.canvas.setHeight(window.innerHeight);
                this.drawingManager.canvas.renderAll();
            }
        });
    }

    setupEventListeners() {

       

        document.addEventListener('DOMContentLoaded', function () {
            const selectedMediaSrc = localStorage.getItem('selectedVideoSrc');
            const mediaType = localStorage.getItem('mediaType'); // Get the type of media
            const editMode = localStorage.getItem('editMode');
        
            if (editMode === 'true' && selectedMediaSrc && mediaType) {
                if (mediaType === 'image') {
                    // Handle image loading
                    const imgElement = document.createElement('img');
                    imgElement.src = selectedMediaSrc;
                    imgElement.alt = 'Selected Image';
                    imgElement.style.width = '100%'; // Adjust size as needed
                    imgElement.style.height = 'auto';
        
                    // Replace the video player with the image
                    const videoPlayer1 = document.getElementById('video-player-1');
                    const videoWrapper1 = videoPlayer1.parentNode;
                    videoWrapper1.replaceWith(imgElement);
                } else if (mediaType === 'video') {
                    // Handle video loading
                    const videoPlayer1 = document.getElementById('video-player-1');
                    const videoWrapper2 = document.getElementById('second-video-wrapper');
        
                    // Set the video source
                    videoPlayer1.src = selectedMediaSrc;
                    videoPlayer1.classList.remove('hidden'); // Ensure it's visible
                    videoWrapper2.classList.add('hidden'); // Hide the second video wrapper
                    videoPlayer1.load(); // Load the video source
                    videoPlayer1.play(); // Auto-play if desired
                }
            }
        
            // Clear editMode flag after loading the media
            localStorage.setItem('editMode', 'false');
        });
        
        // Tool selection
        document.querySelectorAll('.toolbar .tool-btn').forEach(tool => {
            tool.addEventListener('click', () => this.handleToolSelection(tool));
        });

        // Edit mode
        const editModeBtn = document.querySelector('.secondary-btn.edit-mode');
        if (editModeBtn) {
            editModeBtn.addEventListener('click', (e) => {
                if (this.state.editMode) {
                    editModeBtn.classList.remove('active');
                    this.drawingManager.disableEditMode();
                    this.state.editMode = false;
                } else {
                    editModeBtn.classList.add('active');
                    this.drawingManager.initializeEditMode();
                    this.state.editMode = true;
                    // Deactivate any other active tools
                    document.querySelectorAll('.toolbar .tool-btn').forEach(tool => {
                        tool.classList.remove('active');
                    });
                }
            });
        }
        
        const libBtn = document.querySelector('.secondary-btn.library');
        if (libBtn) {
            libBtn.addEventListener('click', () => {
                window.location.href = 'pages/library.html';  
            });
        }

        let mediaRecorder;
        const apirecUrl = CONFIG.API_REC_URL;
        let stream;
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
let recordedChunks = [];
const recordButton = document.getElementById("recordButton");
const downloadLink = document.getElementById("downloadLink");

recordButton.addEventListener("click", async () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        // Stop recording
        mediaRecorder.stop();
        recordButton.title = "Screen Record";
        return;
    }

    try {
        // Request screen capture
        stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        //     video: true,
        //     audio: true // Optional: capture audio
        // });

        // Create MediaRecorder
        mediaRecorder = new MediaRecorder(stream);

        // Listen for dataavailable event
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // Stop event: Save the video file
        mediaRecorder.onstop = async () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            
            recordedChunks = []; // Reset for future recordings
            await uploadRecording(blob); // Call the upload function

            // downloadLink.href = url;
            // downloadLink.download = "screen-recording.webm";
            // downloadLink.style.display = "block";
            // downloadLink.textContent = "Download Recording";
        };

        mediaRecorder.start();
        recordButton.title = "Stop Recording";

        // Optional: Handle stopping stream after recording
        stream.getVideoTracks()[0].onended = () => {
            if (mediaRecorder.state === "recording") {
                mediaRecorder.stop();
            }
        };
    } catch (err) {
        console.error("Error: " + err);
    }
});

async function uploadRecording(blob) {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userid');

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

        // Other UI controls
        const clearAllBtn = document.querySelector('.tool-btn.clear-all');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.drawingManager.clearCanvas());
        }

        const mobileClearBtn = document.querySelector('.mobile-clear-btn');
        if (mobileClearBtn) {
            mobileClearBtn.addEventListener('click', () => this.drawingManager.clearCanvas());
        }

        const colorPickerBtn = document.querySelector('.tool-btn.color-picker');
        if (colorPickerBtn) {
            colorPickerBtn.addEventListener('click', () => this.handleColorPicker());
        }

        const splitScreenBtn = document.querySelector('.split-screen');
        if (splitScreenBtn) {
            splitScreenBtn.addEventListener('click', () => {
                if (this.videoManager.handleSplitScreen()) {
                    this.drawingManager.updateDimensions();
                }
            });
        }
           
        // const fullscreenBtn = document.querySelector('.tool-btn .fullscreen');
        // if(fullscreenBtn){
        //     fullscreenBtn.addEventListener('click', () => {
        //         console.log("Full screen btn clicked!")
        //         this.toggleFullScreen();
        //     });
        // }
        
        
    }

    handleToolSelection(toolElement) {
        const tools = document.querySelectorAll('.toolbar .tool-btn');
        const canvasContainer = this.drawingManager.canvas.wrapperEl;
        const upperCanvas = this.drawingManager.canvas.upperCanvasEl;
        
        if (toolElement.classList.contains('active')) {
            toolElement.classList.remove('active');
            this.drawingManager.disableDrawing();
            canvasContainer.classList.remove('drawing-mode');
            upperCanvas.classList.remove('drawing-mode');
            upperCanvas.style.cursor = 'default';
        } else {
            tools.forEach(t => t.classList.remove('active'));
            toolElement.classList.add('active');
            
            canvasContainer.classList.add('drawing-mode');
            upperCanvas.classList.add('drawing-mode');
            upperCanvas.style.cursor = 'crosshair';
            
            const toolName = toolElement.classList[1];
            this.activateTool(toolName);
        }
    }

    activateTool(toolName) {
        // First disable edit mode if it's active
        if (this.state.editMode) {
            const editModeBtn = document.querySelector('.secondary-btn.edit-mode');
            if (editModeBtn) {
                editModeBtn.classList.remove('active');
            }
            this.drawingManager.disableEditMode();
            this.state.editMode = false;
            const canvasContainer = this.drawingManager.canvas.wrapperEl;
            const upperCanvas = this.drawingManager.canvas.upperCanvasEl;
            canvasContainer.classList.add('drawing-mode');
            upperCanvas.classList.add('drawing-mode');
        }

        this.drawingManager.disableDrawing();
        this.drawingManager.cleanupToolEvents();
        
        switch (toolName) {
            case 'draw':
                this.drawingManager.initializeFreeDrawing();
                break;
            case 'eraser':
                this.drawingManager.initializeEraser();
                break;
            case 'polyline':
                this.drawingManager.initializePolyline();
                break;
            case 'rectangle':
            case 'circle':
            case 'triangle':
            case 'line':
            case 'text':
                this.drawingManager.canvas.on('mouse:down', (e) => 
                    this.drawingManager.addShape(toolName, e));
                break;
            case 'image':
                this.drawingManager.initializeShape();
                break;
            case 'fullscreen':
                this.drawingManager.toggleFullScreen();

        }
    }

    handleColorPicker() {
        const input = document.createElement('input');
        input.type = 'color';
        input.value = this.state.currentColor;
        input.addEventListener('change', (e) => {
            this.drawingManager.setColor(e.target.value);
        });
        input.click();
    }


}

 
 
// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new DrawingApp();
});