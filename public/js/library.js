// Fetch media files from the server
fetch('http://localhost:8080/api/media/getmediafiles')
  .then(response => response.json())
  .then(files => {
    // Loop through each file and call addImageCard or addVideoCard based on file extension
    files.forEach(file => {
        console.log('File: ', file);
      // Check the file extension to decide if it's an image or video
      const fileExtension = file.split('.').pop().toLowerCase();
      const filePath = `../uploads`;
      console.log('File Path', filePath);
      const impfile = 'test.mp4';
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        // addImageCard('../../uploads/test.mp4', 'test');
      } else if (['mp4', 'webm'].includes(fileExtension)) {
        // const videoURL = filePath;
        // addVideoCard(videoURL, file);
        addVideoCard(`${filePath}/${file}`, file);
        // addVideoCard('../../uploads/test.mp4', 'test.mp4');
      }
    });
  })
  .catch(error => console.error('Error fetching media files:', error));

// DOM Elements
const gallery = document.getElementById('gallery');
const loadMore = document.getElementById('loadMore');
const fileInput = document.getElementById('fileInput');
const imageGallery = document.getElementById('imageGallery');
const imageFileInput = document.getElementById('imageFileInput');
const loadMoreImages = document.getElementById('loadMoreImages');

let videoCount = 0;

// Event Listeners
loadMore.addEventListener('click', function(e) {
    e.preventDefault();
    fileInput.click();
});

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        // addVideoCard(videoURL, file.name);
        console.log('File Name:',file.name);

        const apiUrl = 'http://localhost:8080/api/media'; 
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${apiUrl}/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Video uploaded:', data);
            // Optionally update the video src with the new path
            // video.src = `/uploads/${data.media.fileName}`;
            console.log('Video originalName:', data.media.originalName);
            if (data.media && data.media.fileUrl && data.media.originalName) {
                
                addVideoCard(data.media.fileUrl, data.media.originalName);
                console.log("Inside if condition");
                
            }
            window.location.reload();
        })
        .catch(error => console.error('Error uploading video:', error));
    }
});

loadMoreImages.addEventListener('click', function(e) {
    e.preventDefault();
    imageFileInput.click();
});

imageFileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        addImageCard(imageURL, file.name);

        const apiUrl = 'http://localhost:8080/api/media'; 
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${apiUrl}/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Image uploaded:', data);
            // Optionally update the image src with the new path
            // img.src = `/uploads/${data.media.fileName}`;
        })
        .catch(error => console.error('Error uploading image:', error));
    }
});

// Functions
function addVideoCard(videoSrc, title) {

    console.log('Inside add video card.Title: ',title);
    console.log('Video source: ',videoSrc);

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
        localStorage.setItem('selectedMediaType', 'video');
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

    editButton.addEventListener('click', function() {
        localStorage.setItem('selectedMediaType', 'image');
        localStorage.setItem('selectedImageSrc', imageSrc);
        window.location.href = '../index.html';
    });

    cardContent.appendChild(heading);
    cardContent.appendChild(editButton);

    card.appendChild(img);
    card.appendChild(cardContent);
    imageGallery.appendChild(card);
}

// // Example calls

// addVideoCard('../sampleVideos/burning-planet.mp4', 'burning-planet.mp4');
// addImageCard('../sampleVideos/dolphin.jfif', 'Dolphin');
