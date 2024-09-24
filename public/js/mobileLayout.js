function adjustVideoButtons() {
    const videoButtons = document.getElementById('video-btn-id');
    const playPauseButton = document.getElementById('play-pause-button');
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');
    const audioVisualizerButton = document.getElementById('audio-visualizer-button');
    const timeline = document.getElementById('timeline');

    console.log('videoButtons:', videoButtons);
    console.log('playPauseButton:', playPauseButton);
    console.log('previousButton:', previousButton);
    console.log('nextButton:', nextButton);
    console.log('audioVisualizerButton:', audioVisualizerButton);

    if (videoButtons && playPauseButton && previousButton && nextButton) {
        if (audioVisualizerButton) {
            console.log('audioVisualizerButton is present');
            audioVisualizerButton.style.display = 'block';
        } else {
            console.log('audioVisualizerButton is not present');
        }

        if (window.innerWidth <= 500) {
            // Set up the container for buttons
            zoomOut();
            // Clear existing content
            videoButtons.innerHTML = '';

            const buttons = [audioVisualizerButton, previousButton, playPauseButton, nextButton];
            buttons.forEach((button, index) => {
                if (button) {
                    button.style.position = 'static';
                    button.style.width = 'auto'; // Allow natural width
                    // videoButtons.appendChild(button);
                }
            });

            videoButtons.appendChild(playPauseButton);
            videoButtons.appendChild(previousButton);
            videoButtons.appendChild(audioVisualizerButton);
            videoButtons.appendChild(nextButton);
            

            if (audioVisualizerButton) {
                audioVisualizerButton.style.display = 'block';
                audioVisualizerButton.style.width = '100px';
                // audioVisualizerButton.style.marginLeft = '-90px';
                audioVisualizerButton.style.transform = 'translateX(-60px)';
                audioVisualizerButton.style.marginTop = '15px';

            }

            videoButtons.style.position = 'fixed';
            videoButtons.style.bottom = '0';
            videoButtons.style.left = '-4.5%'; 
            videoButtons.style.width = '100%';
            videoButtons.style.display = 'flex';
            videoButtons.style.justifyContent = 'space-between';
            videoButtons.style.alignItems = 'center';
            videoButtons.style.padding = '10px 10%';
            videoButtons.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
        } else {
            // // Reset styles for larger screens
            // videoButtons.style.position = 'static';
            // videoButtons.style.display = 'flex';
            // videoButtons.style.justifyContent = 'space-between';
            // videoButtons.style.backgroundColor = 'transparent';
            // videoButtons.style.padding = '0';

            // videoButtons.innerHTML = '';
            // videoButtons.appendChild(previousButton);
            // videoButtons.appendChild(playPauseButton);
            // videoButtons.appendChild(nextButton);

            if (audioVisualizerButton) {
                audioVisualizerButton.style.display = 'none';}
            //     audioVisualizerButton.style.width = '40px';
            //     audioVisualizerButton.style.marginLeft = '-10px';
            //     videoButtons.appendChild(audioVisualizerButton);
            // }

            // [previousButton, playPauseButton, nextButton, audioVisualizerButton].forEach(button => {
            //     if (button) {
            //         button.style.position = 'static';
            //         button.style.width = 'auto';
            //     }
            // });
        }
    } else {
        console.error("One or more required elements are not found in the DOM.");
    }
}

// The rest of the code remains unchanged
function toggleAudioWave() {
    const audioWave = document.querySelector('.audio-wave');
    audioWave.classList.toggle('active');
}

function closeHeader() {
    var header = document.querySelector('.header');
    var svgIcon = document.getElementById('header-open');
    
    if (header) {
        header.style.display = 'none';
    }
    svgIcon.style.display = 'block';
    console.log("Header closed, icon displayed.");
}

window.addEventListener('load', adjustVideoButtons);
window.addEventListener('resize', adjustVideoButtons);
document.addEventListener('DOMContentLoaded', () => {
    const progressbar = document.querySelector('.timeline .tick2');
    if (progressbar) {
        console.log('Width of the progress bar', progressbar.style.width);
    } else {
        console.log('Element .timeline .tick2 not found');
    }
});

document.getElementById('save-button-mobile').addEventListener('click', function() {
    handleSaveButtonClick(this);  
});

document.getElementById('screen-recording2').addEventListener('click', screenRecorder);

document.getElementById('library-btn').addEventListener('click', function() {
    window.location.href = 'pages/library.html'; 
});

function openHeader() {
    var header = document.querySelector('.header');
    var svgIcon = document.getElementById('header-open');
    
    if (header) {
        header.style.display = 'flex'; 
    }
    svgIcon.style.display = 'none'; 
    console.log("Header opened, icon hidden.");
}
