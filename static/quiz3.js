// Get the form element
const form = document.getElementById('testForm');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);

  // Create an object to store the form data
  const testData = {};

  // Iterate over form data and store it in the object
  for (let pair of formData.entries()) {
    testData[pair[0]] = pair[1];
  }

  // Log the form data for testing
  console.log('Form Data:', testData);

  // You can do further processing with the form data here, like sending it to a server
});