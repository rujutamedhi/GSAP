gsap.registerPlugin(MotionPathPlugin);

let circles = []; // Store references to circles
const path = document.querySelector('#path'); // Reference the path
let names=[];
let ratings=[];
let ingredient=[];
let z=0;
let y=0;
fetch('items.json')
  .then(response => response.json())
  .then(data => {
    const totalLength = path.getTotalLength(); // Get the total path length
    const interval = totalLength / data.length; // Equal spacing
    const svg = document.querySelector('svg'); // Reference the SVG element
    console.log(path.getTotalLength());

    data.forEach((item, index) => {
      const positionFraction = ((interval * index) + (interval / 2)) / totalLength; // Fractional position along the path

      // Store the name
      names.push(item.name);
      ratings.push(item.ratings);
      ingredient.push(item.ingredients)
      // Create and add the image
      const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      image.setAttribute('href', item.image); // Set the image source
      image.setAttribute('width', '12vw'); // Size of the image

      
      // Append to the SVG
      svg.appendChild(image);
// Use GSAP to align the image to the path
gsap.set(image, {
    motionPath: {
      path: 'M-64.696 12.032A1 1 0 00241.194-310.152 1 1 0 00-64.696 12.032',
      align: path,
      alignOrigin: [0.5, 0.5],
      start: positionFraction,
      end: positionFraction,
    },
  });
      // Store image and position
      circles.push({
        imageElement: image,
        position: (interval * index) + (interval / 2),
      });
    });

    // Set the first name initially
    const nameElement = document.querySelector('.name');
    if (nameElement) {
      nameElement.textContent = names[0];
    }
    const rate = document.querySelector('.rate');
    if (rate) {
      rate.textContent = ratings[0];
    }
    const ingred=document.querySelector('.ingredients')
    if(ingred){
      ingred.textContent=ingredient[0];
    }
  })
  .catch(error => console.error('Error loading JSON:', error));

console.log(names)
// Move circles to the next position when the button is clicked
z=0;





document.getElementById("nextButton").addEventListener("click", () => {
    const nam = document.getElementsByClassName("name");
     const rte=document.getElementsByClassName("rate")
     const ingre=document.getElementsByClassName("ingredients")
    // Check if there are any elements with the class 'name'
    if (nam.length > 0) {
      const currentNameElement = nam[0]; // Access the first name element
      const rt=rte[0];
      const ing=ingre[0]
      const timeline = gsap.timeline();
  
      // Step 1: Fade out the current name
      timeline.to(currentNameElement, {
        opacity: 0, // Fade out the current name
        duration: 0.5, // Adjust duration if needed
        ease: "power1.inOut",
      });
      gsap.to(ing,{
        opacity: 0, // Fade out the current name
        duration: 0.5, // Adjust duration if needed
        ease: "power1.inOut",
      })
      gsap.to(rt,{
        opacity: 0, // Fade out the current name
        duration: 0.5, // Adjust duration if needed
        ease: "power1.inOut",
      })
      // Step 2: Rotate images
      timeline.add(() => {
        // Rotate each circle (image and name)
        circles.forEach((circleData) => {
          const totalLength = path.getTotalLength(); // Get the total path length
          const interval = totalLength / 4; // Equal spacing
          const newPosition = (circleData.position - interval) % totalLength; // Calculate the new position along the path
          console.log(circles)
          const stepFraction = 0.25; // Fraction of path to move
          const currentFraction = circleData.position / totalLength;
          const newFraction = (currentFraction - stepFraction) ; // Move 0.25 distance
  
          // Animate image element
          gsap.to(circleData.imageElement, {
            duration: 1,
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: currentFraction,
              end: newFraction,
            },
            ease: "power1.inOut",
          });
  
          // Update the stored position
          circleData.position = newPosition;
        });
      }).add(() => {
        // Update the name's textContent
        currentNameElement.textContent = names[(y+1)%4];
        y = (y + 1) % names.length; // Cycle through the names
      }).to(currentNameElement, {
        opacity: 1, // Fade in the new name
        duration: 1, // Adjust duration if needed
        ease: "power1.inOut",
        delay:0.5
      }).add(() => {
        // Update the text immediately, so it's visible during the delay
        rt.textContent = ratings[y];
        ing.textContent = ingredient[y];
      }).from(rt, {
        opacity: 1, // Fade in the new text
        duration: 0.3, // Adjust duration if needed
        ease: "power1.inOut",
        y: -3,
        
      }).from(ing, {
        opacity: 1, // Fade in the new text
        duration: 0.3, // Adjust duration if needed
        ease: "power1.inOut",
        delay:-0.3,
        y: -3,
        
      })
      
      
      
    }
    
  });

console.log(ratings)
console.log(ingredient)
  document.getElementById("backButton").addEventListener("click", () => {
    const nam = document.getElementsByClassName("name");
    const rte=document.getElementsByClassName("rate")
    const ingre=document.getElementsByClassName("ingredients")
    // Check if there are any elements with the class 'name'
    if (nam.length > 0) {
      const currentNameElement = nam[0]; // Access the first name element
      const rt=rte[0];
      const ing=ingre[0]
      const timeline = gsap.timeline();
  
      // Step 1: Fade out the current name
      timeline.to(currentNameElement, {
        opacity: 0, // Fade out the current name
        duration: 0.5, // Adjust duration if needed
        ease: "power1.inOut",
      });
  
      // Step 2: Rotate images
      timeline.add(() => {
        // Rotate each circle (image and name)
        circles.forEach((circleData) => {
          const totalLength = path.getTotalLength(); // Get the total path length
          const interval = totalLength / 4; // Equal spacing
          const newPosition = (circleData.position + interval) % totalLength; // Calculate the new position along the path
          console.log(circles)
          const stepFraction = 0.25; // Fraction of path to move
          const currentFraction = circleData.position / totalLength;
          const newFraction = (currentFraction + stepFraction) ; // Move 0.25 distance
  
          // Animate image element
          gsap.to(circleData.imageElement, {
            duration: 1,
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: currentFraction,
              end: newFraction,
            },
            ease: "power1.inOut",
          });
  
          // Update the stored position
          circleData.position = newPosition;
        });
      });
  
      // Step 3: Update the name and fade it in
      timeline.add(() => {
        // Update the name's textContent
        if(y==0){
          y=3
          currentNameElement.textContent = names[(y)];
        }
        else{
        currentNameElement.textContent = names[y-1];
        }
        console.log(y)
        y = (y - 1) % names.length; // Cycle through the names
      }).to(currentNameElement, {
        opacity: 1, // Fade in the new name
        duration: 1, // Adjust duration if needed
        ease: "power1.inOut",
        delay:0.5
      });
      gsap.to(ing,{
        opacity: 0, // Fade out the current name
        duration: 0.5, // Adjust duration if needed
        ease: "power1.inOut",
      })
      gsap.to(rt,{
        opacity: 0, // Fade out the current name
        duration: 0.5, // Adjust duration if needed
        ease: "power1.inOut",
      })
      timeline.add(() => {
        // Update the name's textContent
        // if(y==0){
        //   y=3
        //   rt.textContent = ratings[(y)];
        // }
        // else{
        rt.textContent = ratings[y+1];
        ing.textContent=ingredient[y+1]
        // }
        console.log(y)
        // y = (y - 1) % names.length; // Cycle through the names
      }).from(rt, {
        opacity: 1, // Fade in the new text
        duration: 0.3, // Adjust duration if needed
        ease: "power1.inOut",
        y: -3,
      }).from(ing,{
        opacity: 1, // Fade in the new text
        duration: 0.3, // Adjust duration if needed
        ease: "power1.inOut",
        delay:-0.3,
        y: -3,
      });
    }
    
  });







  let currentIndex = 0; // Tracks the current item
  const items = document.querySelectorAll('.item'); // Get all items (images)
  gsap.to(items[currentIndex], {
    duration: 0.3,
    backgroundColor: "#ffbaba", // Add the background color
    borderRadius:'10px'
  });
// Function to handle the "next" button click
document.getElementById("nextButton").addEventListener("click", function() {
  const items = document.querySelectorAll('.item'); // Get all items (images)
  
  // Remove the 'selected' class from the current item with GSAP animation
  gsap.to(items[currentIndex], {
    duration: 0.3,
    backgroundColor: "transparent", // Remove the background color
    onComplete: () => {
      // Move to the next item, loop back to the first item if we're at the last one
      currentIndex = (currentIndex + 1) % items.length;

      // Add the 'selected' class to the next item with GSAP animation
      gsap.to(items[currentIndex], {
        duration: 0.3,
        backgroundColor: "#ffbaba", // Add the background color
        borderRadius:'10px'
      });
    }
  });
});

// You can also implement the "previous" function similarly if you need it.
function previous() {
  const items = document.querySelectorAll('.item');
  
  // Remove the 'selected' class from the current item with GSAP animation
  gsap.to(items[currentIndex], {
    duration: 0.3,
    backgroundColor: "transparent", // Remove the background color
    onComplete: () => {
      // Move to the previous item, loop back to the last item if we're at the first one
      currentIndex = (currentIndex - 1 + items.length) % items.length;

      // Add the 'selected' class to the previous item with GSAP animation
      gsap.to(items[currentIndex], {
        duration: 0.3,
        backgroundColor: "#ffbaba", // Add the background color
        borderRadius:'10px'
      });
    }
  });
}
