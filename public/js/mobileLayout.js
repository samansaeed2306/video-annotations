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
            // window.addEventListener('resize', () => {
            //     document.getElementById('play-pause-button').click();
            // });
            

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
                button.style.top = '560px'; 
                button.style.left = '-190px';
            //     if(button!=audioVisualizerButton){
            //     const svg = button.querySelector('svg');
            //     if (svg) {
            //         svg.style.width = '50px';  // Set desired width
            //     }
            
            // }
            }
        });

            // const progressbar = document.querySelector('.timeline .tick2');
            // console.log('Width of the progress bar',progressbar.style.width);
            audioVisualizerButton.style.left = '-278px';
            audioVisualizerButton.style.top = '570px';
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

            playPauseButton.style.left='-60';
            // playPauseButton.style.top='90px';

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
document.addEventListener('DOMContentLoaded', () => {
    const progressbar = document.querySelector('.timeline .tick2');
    if (progressbar) {
        console.log('Width of the progress bar', progressbar.style.width);
    } else {
        console.log('Element .timeline .tick2 not found');
    }
});

// adjustVideoButtons();
