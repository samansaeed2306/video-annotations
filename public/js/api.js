// api.js

const apiUrl = 'http://localhost:8080/api';

// Function to save a new annotation
 function saveAnnotation(annotation) {
  fetch(`${apiUrl}/addannotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(annotation)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);
    if (data && data.annotation && data.annotation.insertedId) {
      // Successfully received annotation with ID
      annotation.id = data.annotation.insertedId; // Assign the received ID
      console.log('Annotation ID:', annotation.id);
      console.log('Message:', data.message); // Print the success message
      return data; // Optionally return the data if needed
    } else {
      throw new Error('ID was not returned in the response');
    }
  })
  .catch(error => {
    console.error('Error saving annotation:', error);
  });
}

// Function to update an existing annotation
 function updateAnnotation(annotation) {
  fetch(`${apiUrl}/updateannotation/${annotation.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(annotation)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Annotation updated:', data.message);
  })
  .catch(error => {
    console.error('Error updating annotation:', error);
  });
}
