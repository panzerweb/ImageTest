console.log('Test Project');

//* Enable Tooltips -- Bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

//* Global Variables
const getInput = document.querySelectorAll('.wrapper input'); //The Entire Wrapper for inputs
const spacingRange = document.getElementById('spacing-range');
const spacingOutput = document.getElementById('spacing-range-value');
const blurRange = document.getElementById('blur-range');
const blurOutput = document.getElementById('blur-range-value');
const brightnessRange = document.getElementById('brightness-range');
const brightnessOutput = document.getElementById('brightness-range-value');
const contrastRange = document.getElementById('contrast-range');
const contrastOutput = document.getElementById('contrast-range-value');
const sepiaRange = document.getElementById('sepia-range');
const sepiaOutput = document.getElementById('sepia-range-value');
const grayScaleRange = document.getElementById('grayscale-range');
const grayScaleOutput = document.getElementById('grayscale-range-value');
const borderWidthRange = document.getElementById('border-width-range');
const borderWidthOutput = document.getElementById('border-width-range-value');
const resetButton = document.getElementById('reset-btn');
const img = document.getElementById('output'); //Image Element

//*Handles Update
function handleUpdate(){
    console.log(this.value);
    //Retrieves the px or % as a suffix
    const suffix = this.dataset.sizing || '';

    //If the input is range, set property
    if(this.type == 'range'){
        document.documentElement.style.setProperty(`--${this.name}`, `${this.value}${suffix}`);
        //Get the output elements
        const value = document.querySelector(`#${this.id}-value`);
            //If true, then output the value of the css property (pixels)
            if(value){
                value.textContent = `${this.value}${suffix}`;
            }
    }
    else if(this.type == 'color'){
        document.documentElement.style.setProperty(`--${this.name}`, this.value);
    }

}
//*Add Events, and call the function
getInput.forEach((event)=>{
    event.addEventListener('change', handleUpdate);
    event.addEventListener('input', handleUpdate);
    event.addEventListener('mousedown', handleUpdate);

})

//* Resetting button
resetButton.addEventListener('click', function(){
    //Reset the value and textual content of the range
    spacingRange.value = 0;
    spacingOutput.textContent = 0;
    blurRange.value = 0;
    blurOutput.textContent = 0;
    brightnessRange.value = 100;
    brightnessOutput.textContent = 100 + '%';
    contrastRange.value = 100;
    contrastOutput.textContent = 100 + '%';
    sepiaRange.value = 0;
    sepiaOutput.textContent = 0 + '%';
    grayScaleRange.value = 0;
    grayScaleOutput.textContent = 0 + '%';
    borderWidthRange.value = 0;
    borderWidthOutput.textContent = 0;

    const event = new Event('input');
    spacingRange.dispatchEvent(event);
    blurRange.dispatchEvent(event);
    brightnessRange.dispatchEvent(event);
    contrastRange.dispatchEvent(event);
    sepiaRange.dispatchEvent(event);
    grayScaleRange.dispatchEvent(event);
    borderWidthRange.dispatchEvent(event);
})


//* Manipulated Image Download

//I literally have no idea about this code here but Thanks ChatGPT :)

// Utility function to update the CSS styles of the image based on input values
function updateImageStyles() {
    //Retrieve the value of each input values + the suffix
    const spacing = document.getElementById('spacing-range').value + 'px';
    const blur = document.getElementById('blur-range').value + 'px';
    const brightness = document.getElementById('brightness-range').value + '%';
    const contrast = document.getElementById('contrast-range').value + '%';
    const sepia = document.getElementById('sepia-range');
    const grayscale = document.getElementById('grayscale-range');
    const bgColor = document.getElementById('color-bg').value;
    const borderColor = document.getElementById('border-color').value;
    const borderWidth = document.getElementById('border-width-range').value + 'px';


    // Sets the image style with the properties given by the values from the input elements
    img.style.filter = `blur(${blur}) brightness(${brightness}) contrast(${contrast}) sepia(${sepia}) grayscale(${grayscale})`;
    img.style.padding = spacing;
    img.style.backgroundColor = bgColor;
    img.style.borderColor = borderColor;
    img.style.borderWidth = borderWidth;
    img.style.borderStyle = 'solid';

}

// Add event listeners to each input element to update the image styles in real-time whenever the input ('input') as an Event Listener value changes and call the updateImageStyle function
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateImageStyles);
});

//An Event Listener if the download button is click
document.getElementById('download').addEventListener('click', function() {

    // Get image element and style values from input elements
    const spacing = parseInt(document.getElementById('spacing-range').value);
    const blur = document.getElementById('blur-range').value + 'px';
    const brightness = document.getElementById('brightness-range').value + '%';
    const contrast = document.getElementById('contrast-range').value + '%';
    const sepia = document.getElementById('sepia-range').value + '%';
    const grayscale = document.getElementById('grayscale-range').value + '%';
    const bgColor = document.getElementById('color-bg').value;
    const borderColor = document.getElementById('border-color').value;
    const borderWidth = parseInt(document.getElementById('border-width-range').value);


    // Create a canvas element and get its drawing context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Calculate canvas size considering spacing and border
    canvas.width = img.naturalWidth + 2 * (spacing + borderWidth);
    canvas.height = img.naturalHeight + 2 * (spacing + borderWidth);


    // Fill the canvas with the background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the canvas filter and draw the image with padding and border
    ctx.filter = `blur(${blur}) brightness(${brightness}) contrast(${contrast}) sepia(${sepia}) grayscale(${grayscale})`;
    ctx.drawImage(img, spacing + borderWidth, spacing + borderWidth, img.naturalWidth, img.naturalHeight);


    // Draw the border
    if (borderWidth > 0) {
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(borderWidth / 2, borderWidth / 2, canvas.width - borderWidth, canvas.height - borderWidth);
    }

    // Create a link element and set the download attribute with the image data URL
    const link = document.createElement('a');
    link.download = 'manipulated-image.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Initialize image styles
updateImageStyles();


//* Uploading an image

/* 
1. Add an event 'load' on windows when opened.
2. select the input element as a query in the document itself.
3. Add an event 'change'.
4. If this.files && this.files[0] are true, then access the img element query
5. In the onload function of the img query, revoke the ObjectUrl the image.src 
    after creating an ObjectURL
*/

window.addEventListener('load', function(){
    document.querySelector('input[type="file"]').addEventListener('change', function(){   
        if(this.files && this.files[0]){
            let imgBefore = document.getElementById('output-before');
            let imgQuery = document.getElementById('output');

                imgQuery.src = URL.createObjectURL(this.files[0]);
                imgBefore.src = URL.createObjectURL(this.files[0]);

                imgQuery.onload = () =>{
                    URL.revokeObjectURL(imgQuery.src);
                }
                imgBefore.onload= () =>{
                    URL.revokeObjectURL(imgBefore.src);
                }
        }
    })
})

//* Downloading an image

//!!! NOTE :  THIS CODE IS UNUSED BUT USED FOR FUTURE REFERENCES

//1. Retrieve the file input and img element id
//2. Retrieve the parentNode of the img element as a download link
//3. Add an Event 'Change' to the input element and get the target first file
//4. Create a new FileReader
//5. Set up onload function on the new file
//6. Set the src attribute of the image to the target result
//7. Set the href attribute of the anchor element to the target result
//8. Set the download attribute of the anchor element to name of the file
//9. read the file as data URL (readAsDataUrl) --Outside the onload func()


// const inputElement = document.getElementById("image-upload");

// const imgElement = document.getElementById("output");

// const downloadImgLink = imgElement.parentNode;

// inputElement.addEventListener('change', function(event){
//     const imgFile = event.target.files[0];

//     const file_reader = new FileReader();

//     file_reader.onload = (event) =>{
//         imgElement.src = event.target.result;
//         downloadImgLink.href = event.target.result;
//         downloadImgLink.download = imgFile.name;

//     };
//     file_reader.readAsDataURL(imgFile);
// })