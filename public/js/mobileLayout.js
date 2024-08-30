function adjustVideoButtons() {
    const videoButtons = document.getElementById('video-btn-id');
    const playPauseButton = document.getElementById('play-pause-button');
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');
    const audioVisualizerButton = document.getElementById('audio-visualizer-button');
    const timeline = document.getElementById('timeline');

    // Log the elements to check if they are found
    console.log('videoButtons:', videoButtons);
    console.log('playPauseButton:', playPauseButton);
    console.log('previousButton:', previousButton);
    console.log('nextButton:', nextButton);
    console.log('audioVisualizerButton:', audioVisualizerButton);

    if (videoButtons && playPauseButton && previousButton && nextButton) {
        // Check if audioVisualizerButton is present
        if (audioVisualizerButton) {
            console.log('audioVisualizerButton is present');
            audioVisualizerButton.style.display = 'block';
        } else {
            console.log('audioVisualizerButton is not present');
        }

        // Remove button borders and make them look like icons
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
                button.style.position = 'relative'; // Add relative positioning
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
            // Reorder buttons for small screens
            videoButtons.innerHTML = '';
            videoButtons.style.display = 'flex';
            videoButtons.style.justifyContent = 'space-between'; // Distribute space between buttons
            videoButtons.style.alignItems = 'center'; // Center buttons vertically
            videoButtons.style.padding = '0 10px'; // Optional padding for spacing

            videoButtons.appendChild(playPauseButton);
            videoButtons.appendChild(previousButton);
            videoButtons.appendChild(audioVisualizerButton);
            videoButtons.appendChild(nextButton);

            if (audioVisualizerButton) {
                audioVisualizerButton.style.display = 'block';
                audioVisualizerButton.style.width = '60px'; // Increase width for audio visualizer button
            }
        } else {
            // Restore original order for larger screens
            videoButtons.innerHTML = '';
            videoButtons.style.display = 'flex';
            videoButtons.style.justifyContent = 'flex-start'; // Align items to the start

            videoButtons.appendChild(previousButton);
            videoButtons.appendChild(playPauseButton);
            videoButtons.appendChild(nextButton);
            if (audioVisualizerButton) {
                audioVisualizerButton.style.display = 'none';
                audioVisualizerButton.style.width = '40px'; // Default width for audio visualizer button
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

// // Simulating video play/pause
// let isPlaying = false;
// function togglePlayPause() {
//     isPlaying = !isPlaying;
//     const playPauseButton = document.getElementById('play-pause-button');
//     const playPauseIcon = playPauseButton.querySelector('path:last-child');
//     const audioWave = document.querySelector('.audio-wave');

//     if (isPlaying) {
//         playPauseIcon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
//         playPauseButton.querySelector('.button-text').textContent = 'Pause';
//         audioWave.classList.add('active');
//     } else {
//         playPauseIcon.setAttribute('d', 'M8 5v14l11-7z');
//         playPauseButton.querySelector('.button-text').textContent = 'Play';
//         audioWave.classList.remove('active');
//     }
// }

// // Call this function when the page loads and when the window is resized
window.addEventListener('load', adjustVideoButtons);
window.addEventListener('resize', adjustVideoButtons);

// // Add event listener for play/pause button
// document.getElementById('play-pause-button').addEventListener('click', togglePlayPause);

// // Add event listener for audio visualizer button
// document.getElementById('audio-visualizer-button').addEventListener('click', toggleAudioWave);

