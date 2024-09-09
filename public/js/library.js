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

    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    const icon = document.createElement('img');
    icon.src = '../icons/pencil.png';  
    icon.alt = 'Edit';
    editButton.appendChild(icon);


    editButton.addEventListener('click', function() {
        localStorage.setItem('selectedVideoSrc', videoSrc);
        window.location.href = '../index.html';
    });
   
    cardContent.appendChild(heading);
    cardContent.appendChild(editButton);

    card.appendChild(video);
    card.appendChild(cardContent);
    gallery.appendChild(card);

    videoCount++;
}

function loadVideo(manifestUri) {
    player.load(manifestUri).then(function() {
        console.log('The video has now been loaded!');
        setupTimeline(video);
    }).catch(function(error) {
        console.error('Error code', error.code, 'object', error);
    });
}
addVideoCard('../sampleVideos/rolling-tissues.mp4', 'rolling-tissues.mp4');
addVideoCard('../sampleVideos/burning-planet.mp4', 'burning-planet.mp4');


const imageGallery = document.getElementById('imageGallery');
const imageFileInput = document.getElementById('imageFileInput');
const loadMoreImages = document.getElementById('loadMoreImages');

loadMoreImages.addEventListener('click', function(e) {
    e.preventDefault();
    imageFileInput.click();
});

imageFileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        addImageCard(imageURL, file.name);
    }
});

function addImageCard(imageSrc, title) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title;

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const heading = document.createElement('h3');
    heading.textContent = title;
    
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.id = 'edit-button-img';
    const icon = document.createElement('img');
    icon.src = '../icons/pencil.png';  
    icon.alt = 'Edit';
    editButton.appendChild(icon);


    cardContent.appendChild(heading);
    cardContent.appendChild(editButton);

    card.appendChild(img);
    card.appendChild(cardContent);
    imageGallery.appendChild(card);
}

addImageCard('../sampleImages/dolphin.jfif', 'Dolphin');
// addImageCard('../sampleImages/scenery.jpg', 'Scenery');