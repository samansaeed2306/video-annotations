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
                button.style.top = '-25px'; 
                button.style.left = '-20px';
            }
        });
        audioVisualizerButton.style.left = '-115px';
        audioVisualizerButton.style.top = '-18px';
        previousButton.style.left = '-30px';
        nextButton.style.left = '-25px';
        videoButtons.style.backgroundColor = 'transparent';

        if (window.innerWidth <= 768) {
           
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

window.addEventListener('load', adjustVideoButtons);
window.addEventListener('resize', adjustVideoButtons);



