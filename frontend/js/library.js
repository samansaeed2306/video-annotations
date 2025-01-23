// Config class to handle configuration settings
class Config {
    static API_MED_URL = CONFIG.API_MED_URL;
    static API_URL = CONFIG.API_URL;
}

// Media Manager class to handle media operations
class MediaManager {
    constructor(userId) {
        this.userId = userId;
        this.apiUrl = Config.API_MED_URL;
        this.api = Config.API_URL;
        this.gallery = document.getElementById('gallery');
        this.imageGallery = document.getElementById('imageGallery');
        this.videoCount = 0;
    }

    async fetchMediaByUser() {
        try {
            const response = await fetch(`${this.apiUrl}/mediabyuser/${this.userId}`);
            const files = await response.json();
            files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            return files;
        } catch (error) {
            console.error('Error fetching media files:', error);
            return [];
        }
    }

    async uploadMedia(file, type) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${this.apiUrl}/upload/${this.userId}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.media && data.media.fileUrl && data.media.originalName) {
                if (type === 'video') {
                    this.addVideoCard(data.media.fileUrl, data.media.originalName);
                    this.refreshVideoGallery();
                } else {
                    this.addImageCard(data.media.fileUrl, data.media.originalName);
                    this.refreshImageGallery();
                }
            }
            return data;
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
            throw error;
        }
    }

    async deleteMedia(mediaId, card) {
        try {
            const response = await fetch(`${this.apiUrl}/delete/${mediaId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            
            if (data.message === 'Media deleted successfully!') {
                card.remove();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting media:', error);
            return false;
        }
    }
}

// UI Manager class to handle UI elements and events
class UIManager {
    constructor(mediaManager) {
        this.mediaManager = mediaManager;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loadMore = document.getElementById('loadMore');
        const fileInput = document.getElementById('fileInput');
        const loadMoreImages = document.getElementById('loadMoreImages');
        const imageFileInput = document.getElementById('imageFileInput');

        loadMore.addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.mediaManager.uploadMedia(file, 'video');
            }
        });

        loadMoreImages.addEventListener('click', (e) => {
            e.preventDefault();
            imageFileInput.click();
        });

        imageFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.mediaManager.uploadMedia(file, 'image');
            }
        });
    }

    simulateUpload() {
        const progressBar = document.getElementById('progress-bar');
        const progress = document.getElementById('progress');
        progressBar.style.display = 'block';
        let progressValue = 0;

        const interval = setInterval(() => {
            if (progressValue < 100) {
                progressValue += 10;
                progress.style.width = progressValue + '%';
            } else {
                clearInterval(interval);
                alert('Upload complete!');
                progressBar.style.display = 'none';
            }
        }, 100);
    }
}

// Recording Manager class to handle recording operations
class RecordingManager {
    constructor(userId) {
        this.userId = userId;
        this.api = Config.API_URL;
    }

    async fetchRecordings() {
        try {
            const response = await fetch(`${this.api}/rec/recordings/user/${this.userId}`);
            if (response.status === 404) {
                this.displayNoRecordingsMessage();
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching recordings:', error);
            return null;
        }
    }

    displayNoRecordingsMessage() {
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = `<p>No recordings found for user ID: <strong>${this.userId}</strong>.</p>`;
        messageContainer.style.color = 'red';
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userid');
    
    if (userId) {
        const mediaManager = new MediaManager(userId);
        const uiManager = new UIManager(mediaManager);
        const recordingManager = new RecordingManager(userId);
        
        // Initial load of media and recordings
        mediaManager.fetchMediaByUser();
        recordingManager.fetchRecordings();
    } else {
        console.error('User ID not found');
    }
});