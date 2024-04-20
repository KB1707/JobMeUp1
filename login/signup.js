const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
function validateForm() {
    // Get form inputs
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pno = document.getElementById("pno").value;
    var dob = document.getElementById("dob").value;
    var password = document.getElementById("password").value;
  
    // Simple validation for empty fields
    if (name === "" || email === "" || pno === "" || dob === "" || password === "") {
      alert("All fields are required");
      return false; // Prevent form submission
    }
  
    var emailReq = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if(!emailReq.test(email)) {
        alert("Invalid email address!");
        return false;
    }

    if(!passwordReq.test(password)) {
        alert("Password must contain at least one digit, one lowercase and one uppercase letter, and be between 6 to 20 characters long!");
        return false;
    }

  
    // Validate phone number format (10 digits)
    var pnoRegex = /^\d{10}$/;
    if (!pnoRegex.test(pno)) {
      alert("Phone number must be 10 digits");
      return false; // Prevent form submission
    }
  
    // All validations passed, allow form submission
    return true;
  }
  
  // Add form submission event listener
  document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      // Form is valid, submit it
      this.submit();
    }
  });
  