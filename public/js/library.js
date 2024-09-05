const gallery = document.getElementById('gallery');
const loadMore = document.getElementById('loadMore');
const fileInput = document.getElementById('fileInput');

let videoCount = 0;

loadMore.addEventListener('click', function(e) {
    e.preventDefault();
    fileInput.click();
});

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        addVideoCard(videoURL, file.name);
    }
});

function addVideoCard(videoSrc, title) {
    const card = document.createElement('div');
    card.className = 'card';

    const video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const heading = document.createElement('h3');
    heading.textContent = title;

    cardContent.appendChild(heading);
    card.appendChild(video);
    card.appendChild(cardContent);
    gallery.appendChild(card);

    videoCount++;
}


addVideoCard('../sampleVideos/rolling-tissues.mp4', 'rolling-tissues');
addVideoCard('../sampleVideos/burning-planet.mp4', 'burning-planet');