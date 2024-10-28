// Fetch media files from the server

// const apiUrl = 'http://174.138.56.121:8080/api/media'; 
// const apiUrl = 'http://192.168.100.191:8080/api/media'; 
const apiUrl = 'http://localhost:8080/api/media'; 
fetch(`${apiUrl}/getmediafiles`)
  .then(response => response.json())
  .then(files => {
    // Loop through each file and call addImageCard or addVideoCard based on file extension
    files.forEach(file => {
        console.log('File: ', file.fileName);
      // Check the file extension to decide if it's an image or video
      const fileExtension = file.fileName.split('.').pop().toLowerCase();
      const filePath = `../uploads`;
      console.log('File Path', filePath);
    //   const testfile = 'test.mp4';
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {

        addImageCard(`${filePath}/${file.fileName}`, file.originalName);
        // addImageCard('../../uploads/test.mp4', 'test');
      } else if (['mp4', 'webm', 'mov', 'hevc','MOV'].includes(fileExtension)) {
        // const videoURL = filePath;
        // addVideoCard(videoURL, file);
        addVideoCard(`${filePath}/${file.fileName}`, file.originalName);
        
        // addVideoCard('../../uploads/test.mp4', 'test.mp4');
      }

      addRecording();

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

        
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${apiUrl}/upload?nocache=${new Date().getTime()}`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Video uploaded:', data);
            refreshVideoGallery();
            // Optionally update the video src with the new path
            // video.src = `/uploads/${data.media.fileName}`;
            console.log('Video originalName:', data.media.originalName);
            if (data.media && data.media.fileUrl && data.media.originalName) {
                
                
               
                console.log("Inside if condition");
                
            }
            addVideoCard(data.media.fileUrl, data.media.originalName);
            // window.location.reload();
            refreshVideoGallery();
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
        // addImageCard(imageURL, file.name);

        
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

            console.log('Image originalName:', data.media.originalName);
            if (data.media && data.media.fileUrl && data.media.originalName) {
                
                addImageCard(data.media.fileUrl, data.media.originalName);
                console.log("Inside if condition of image");
                
            }
            // window.location.reload();
            refreshImageGallery();
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
    video.playsInline = true;
    video.loop = true;
    video.muted = true;




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
    

    heading.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = heading.textContent;
        heading.style.display= 'none';
        cardContent.insertBefore(input, editButton);



        // Handle when the user clicks outside or presses Enter to save the new title
        input.addEventListener('blur', () => {
            saveTitle(input.value);
            if (input.parentNode) {  
                cardContent.removeChild(input);
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveTitle(input.value);
                if (input.parentNode) {  
                    cardContent.removeChild(input);
                }
            }
        });

        input.focus(); 
    });

   
    function saveTitle(newTitle) {
        heading.textContent = newTitle;
        heading.style.display= 'block';
        
        console.log('New title saved:', newTitle);


        fetch(`${apiUrl}/getall`)
        .then(response => response.json())
        .then(files => {
            
            const media = files.find(file => file.fileName === videoSrc.split('/').pop());

            if (media) {
                const mediaId = media._id;

              
                const payload = { originalName: newTitle };

               
                fetch(`${apiUrl}/update/${mediaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Media id (frontend):', mediaId);
                    console.log('Media updated successfully (frontend):', data);
                })
                .catch(error => console.error('Error updating media:', error));
            } else {
                console.error('Media not found with the given filename.');
            }
        })
        .catch(error => console.error('Error fetching media files:', error));
    }
    
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

    heading.addEventListener('click', function () {
        const input = document.createElement('input');
        input.id = 'titleInput'; 
        input.type = 'text';
        input.value = heading.textContent;
        heading.style.display= 'none';
        cardContent.insertBefore(input, editButton);



      
        input.addEventListener('blur', () => {
            saveimgTitle(input.value);
            cardContent.removeChild(input);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveimgTitle(input.value);
                cardContent.removeChild(input);
            }
        });

        input.focus(); 
    });

    
    function saveimgTitle(newTitle) {
        heading.textContent = newTitle;
        heading.style.display= 'block';
     
        console.log('New title saved image:', newTitle);

        fetch(`${apiUrl}/getall`)
        .then(response => response.json())
        .then(files => {
            
            const media = files.find(file => file.fileName === imageSrc.split('/').pop());

            if (media) {
                const mediaId = media._id;

              
                const payload = { originalName: newTitle };

               
                fetch(`${apiUrl}/update/${mediaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Media id (frontend):', mediaId);
                    console.log('Media updated successfully (frontend):', data);
                })
                .catch(error => console.error('Error updating media:', error));
            } else {
                console.error('Media not found with the given filename.');
            }
        })
        .catch(error => console.error('Error fetching media files:', error));
    }
    
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
document.getElementById("backtoindex").addEventListener("click", function() {
    window.location.href = "../index.html"; 
});
// // Example calls

// addVideoCard('../sampleVideos/burning-planet.mp4', 'burning-planet.mp4');
// addImageCard('../sampleVideos/dolphin.jfif', 'Dolphin');

function refreshVideoGallery() {
    fetch(`${apiUrl}/getmediafiles`)
        .then(response => response.json())
        .then(files => {
          
            gallery.innerHTML = ''; 

         
            files.forEach(file => {
                const fileExtension = file.fileName.split('.').pop().toLowerCase();
                const filePath = `../uploads/${file.fileName}`;
               if (['mp4', 'webm'].includes(fileExtension)) {
                    addVideoCard(filePath, file.originalName);
                }
            });
        })
        .catch(error => console.error('Error fetching media files:', error));
}

function refreshImageGallery() {
    fetch(`${apiUrl}/getmediafiles`)
        .then(response => response.json())
        .then(files => {
           
            imageGallery.innerHTML = '';

        
            files.forEach(file => {
                const fileExtension = file.fileName.split('.').pop().toLowerCase();
                const filePath = `../uploads/${file.fileName}`;
                if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                    addImageCard(filePath, file.originalName);
                }
            });
        })
        .catch(error => console.error('Error fetching media files:', error));
}

document.getElementById('fileInput').addEventListener('change', simulateUpload);
document.getElementById('imageFileInput').addEventListener('change', simulateUpload);

function simulateUpload() {
    document.getElementById('progress-bar').style.display='block';
    const progressBar = document.getElementById('progress');
    let progress = 0;

   
    progressBar.style.width = '0%';

    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 10; 
            progressBar.style.width = progress + '%'; 
        } else {
            clearInterval(interval); 
            alert('Upload complete!');
            document.getElementById('progress-bar').style.display='none';
        }

    }, 100); 
    
}

function removeInput() {
    const inputElement = document.getElementById('titleInput');
    if (inputElement) {
        cardContent.removeChild(inputElement);
    }
}



function createVideoCard(videoUrl, title) {
    const card = document.createElement('div');
    card.classList.add('recording-card');

    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    videoElement.controls = true; 

    const titleElement = document.createElement('h3');
    titleElement.innerText = title;

    card.appendChild(videoElement);
    card.appendChild(titleElement);

    return card;
}

async function addRecording() {
    try {
        const response = await fetch('http://localhost:8080/api/rec/recordings/getAll'); 
        const recordings = await response.json();

        // Check for errors in the response
        if (response.status === 404) {
            console.log(recordings.message); // No recordings found
            return;
        }

        // Display the recordings
        displayRecordings(recordings);
    } catch (error) {
        console.error('Error fetching recordings:', error);
    }
}

function displayRecordings(recordings) {
    const gallery = document.getElementById('recordings-gallery');
    gallery.innerHTML = ''; 
    recordings.forEach(recording => {
        let card;
        
        card = createVideoCard(recording.videoUrl, "hello");
       

        if (card) {
            gallery.appendChild(card);
        }
    });
}

// Function to fetch recordings from the API based on user ID
async function fetchRecordingsByUserId(userId) {
    try {
        const response = await fetch(`http://localhost:8080/api/rec/recordings/user/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const recordings = await response.json(); // Assuming the API returns a JSON array
        return recordings; // Return the fetched recordings
    } catch (error) {
        console.error('Error fetching recordings:', error);
        alert('Failed to fetch recordings. Please try again.');
        return [];
    }
}



// Event listener for the button click
document.getElementById('hello').addEventListener('click', () => {
    const input = document.getElementById('userIdInput');
    input.style.display = 'block'; // Show the input box
    input.focus(); // Focus the input box

    // Add an event listener to capture the Enter key
    input.onkeypress = async function(event) {
        if (event.key === 'Enter') {
            const userId = input.value.trim();
            if (userId) {
                const recordings = await fetchRecordingsByUserId(userId); // Fetch recordings from the API
                displayRecordings(recordings); // Display the fetched recordings
            } else {
                alert("Please enter a valid User ID.");
            }
            input.value = ''; // Clear the input
            input.style.display = 'none'; // Hide the input box after submission
        }
    };
});

