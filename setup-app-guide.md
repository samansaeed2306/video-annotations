
# Quick Start
Install [Docker](https://www.docker.com/ "Docker") , then:
  
  **Clone repository:**
     
     git clone https://github.com/samansaeed2306/video-annotations.git
     
 **Build Image:**
 
     cd video-annotations
     docker build -t annotator .
     
   **Run App in Container:**

     docker run -p 3000:3000 -p 8080:8080 annotator

 Then open your browser on the same node to http://localhost:3000

  
  
      
