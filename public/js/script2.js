
const videoelement = document.getElementById('video'); 


document.getElementById('next-button').addEventListener('click', function() {
    if (videoelement) {
        videoelement.currentTime += 1;
        console.log("Current Time (Next):", videoelement.currentTime);
    }
});


document.getElementById('previous-button').addEventListener('click', function() {
    if (videoelement) {
        videoelement.currentTime -= 1; 
        if (videoelement.currentTime < 0) {
            videoelement.currentTime = 0;
        }
        console.log("Current Time (Previous):", videoelement.currentTime);
    }
});
