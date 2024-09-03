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

        if (window.innerWidth <= 300) {
            const buttons = [playPauseButton, previousButton, nextButton, audioVisualizerButton];
        buttons.forEach(button => {
            if (button) {
                button.style.border = 'none';
                button.style.background = 'none';
                button.style.padding = '0';
                button.style.margin = '0';
                button.style.cursor = 'pointer';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                button.style.position = 'relative'; 
                button.style.top = '-28px'; 
                button.style.left = '-225px';
            }
        });
            audioVisualizerButton.style.left = '-308px';
            audioVisualizerButton.style.top = '-18px';
            videoButtons.innerHTML = '';
            videoButtons.style.display = 'flex';
            videoButtons.style.justifyContent = 'space-between'; 
            videoButtons.style.alignItems = 'center'; 
            videoButtons.style.padding = '0 10px';
            // savebtn.style.left = '-200px';
            videoButtons.innerHTML = '';
            videoButtons.style.display = 'flex';
            videoButtons.style.justifyContent = 'space-between'; 
            videoButtons.style.alignItems = 'center'; 
            videoButtons.style.padding = '0 10px';

            videoButtons.appendChild(playPauseButton);
            videoButtons.appendChild(previousButton);
            videoButtons.appendChild(audioVisualizerButton);
            videoButtons.appendChild(nextButton);

            if (audioVisualizerButton) {
                audioVisualizerButton.style.display = 'block';
                audioVisualizerButton.style.width = '60px'; 
            }
        } else {
            
            videoButtons.innerHTML = '';
            videoButtons.style.display = 'flex';
            videoButtons.style.justifyContent = 'flex-start'; 

            videoButtons.appendChild(previousButton);
            videoButtons.appendChild(playPauseButton);
            videoButtons.appendChild(nextButton);
            if (audioVisualizerButton) {
                audioVisualizerButton.style.display = 'none';
                audioVisualizerButton.style.width = '40px'; 
                videoButtons.appendChild(audioVisualizerButton);
            }
        }
    } else {
        console.error("One or more required elements are not found in the DOM.");
    }
}

function toggleAudioWave() {
    const audioWave = document.querySelector('.audio-wave');
    audioWave.classList.toggle('active');
}

function closeHeader() {
    var header = document.querySelector('.header');
    if (header) {
        header.style.display = 'none';
    }
}


window.addEventListener('load', adjustVideoButtons);
window.addEventListener('resize', adjustVideoButtons);



