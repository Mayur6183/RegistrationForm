$(document).ready(function () {

    function validateName() {
        const name = $('#name').val().trim();
        if (name.length === 0) {
            $('#nameError').html('Name is required.');
            return false;
        } else if (!/^[A-Za-z\s]+$/.test(name)) {         // Check if name contains only letters
            $('#nameError').html('Name can only contain letters.');
            return false;
        } 
        else {
            $('#nameError').html('');
            return true;
        }
    }

    function validateAddress() {
        const address = $('#address').val().trim();
        if (address.length === 0) {
            $('#addressError').html('Address is required.');
            return false;
        } else {
            $('#addressError').html('');
            return true;
        }
    }

  

    function validateAge() {
        const age = $('#age').val().trim();
        if (age === '' || isNaN(age) || age < 18) {
            $('#ageError').html('Age should be 18 years or more.');
            return false;
        } else {
            $('#ageError').html('');
            return true;
        }
    }

    function validateGender() {
        const gender = $('input[name="gender"]:checked').val(); // Get the selected gender
        if (!gender) {
            $('#genderError').html('Gender is required.'); // Display error if not selected
            return false;
        } else {
            $('#genderError').html(''); // Clear error if selected
            return true;
        }
    }

    function validateCity() {
        const city = $('#city').val().trim();
        if (city.length === 0) {
            $('#cityError').html('City is required.');
            return false;
        } else if (!/^[A-Za-z\s]+$/.test(city)) {         // Check if name contains only letters
            $('#cityError').html('City can only contain letters.');
            return false;
        } 
        else {
            $('#cityError').html('');
            return true;
        }
    }

    function validateDist() {
        const dist = $('#dist').val().trim();
        if (dist.length === 0) {
            $('#distError').html('District is required.');
            return false;
        } else if (!/^[A-Za-z\s]+$/.test(dist)) {         // Check if name contains only letters
            $('#distError').html('Dist can only contain letters.');
            return false;
        } 
        else {
            $('#distError').html('');
            return true;
        }
    }



    // change button color as per the event 

    let modebtn=document.querySelector('#btn')
    let currmode='green'; //'pink'()
    
    modebtn.addEventListener("click",()=>{
        if(currmode==="green"){
            currmode="purple"
            document.querySelector("button").style.backgroundColor="Purple";
        }
        else{
            currmode="green";
            document.querySelector("button").style.backgroundColor="Red";
        }
        console.log(currmode);
 } )

    function validateMobile() {
        const mobile = $('#mobile').val().trim();
        const mobilePattern = /^\d{10}$/;
        if (!mobile.match(mobilePattern)) {
            $('#mobileError').html('Mobile number must be exactly 10 digits.');
            return false;
        } else {
            $('#mobileError').html('');
            return true;
        }
    }

    function validateEmail() {
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            $('#emailError').html('Email is required.');
            return false;
        } else if (!emailPattern.test(email)) {
            $('#emailError').html('Please enter a valid email address.');
            return false;
        } else {
            $('#emailError').html('');
            return true;
        }
    }




$('#department').on('change', function () {
    const selectedValue = $(this).val();

    if (selectedValue === 'Other') {
        $('#otherDepartmentRow').css('visibility', 'visible'); // Show the "Other" input field
        $('#otherDeptInput').attr('required', true);           // Make it required
        
    } else {
        $('#otherDepartmentRow').css('visibility', 'hidden');  // Hide the "Other" input field
        $('#otherDeptInput').val('');                          // Clear the input field
        $('#otherDeptInput').attr('required', false);          // Remove required attribute
    }
});



    // Attach 'input' events to form fields
    $('#name').on('input', validateName);
    $('#address').on('input', validateAddress);
    $('#age').on('input', validateAge);
    $('#city').on('input', validateCity);
    $('#mobile').on('input', validateMobile);
    $('#email').on('input', validateEmail);
    $('#dist').on('input', validateDist);
    $('#gender-row').on('input', validateGender);
    // $('#otherDeptInput').on('input', validateOtherDepartment);


    // function validateOtherDepartment() {
    //     const otherDepartment = $('#otherDeptInput').val().trim();
    //     if (otherDepartment.length === 0) {
    //         $('#otherDepartmentError').html('Please provide the department name.');
    //         return false;
    //     } else {
    //         $('#otherDepartmentError').html('');
    //         return true;
    //     }
    // }   


    function validateOtherDepartment() {
        const  otherDepartment = $('#otherDeptInput').val().trim();

        if ( otherDepartment.length === 0) {
            $('#otherDepartmentError').html('Department  is required.');
            return false;
        } else if (!/^[A-Za-z\s]+$/.test( otherDepartment)) {         // Check if name contains only letters
            $('#otherDepartmentError').html('Department can only contain letters.');
            return false;
        } 
        else {
            $('#otherDepartmentError').html('');
            return true;
        }
    }






    function appendToTable(data) {
        const tableBody = $('#dataTable tbody');
        const row = `<tr style="display: none;">
            <td>${data.name}</td>
            <td>${data.address}</td>
            <td>${data.city}</td>
            <td>${data.dist}</td>
            <td>${data.mobile}</td>
            <td>${data.age}</td>
            <td>${data.gender}</td>
            <td>${data.email}</td>
            <td>${data.department !== 'Other' ? data.department : data.otherDepartment}</td> <!-- This line handles the department -->
        </tr>`;

        // Append row to the table
        tableBody.append(row);

        // Slide down the newly added row
        tableBody.find('tr:last').slideDown('slow');
    }



    $('#registrationForm').on('submit', function (event) {
        event.preventDefault();

        let formDataList=[];
        const selectedDepartment = $('#department').val();

        // Validate fields based on selected department
        const isFormValid = validateName() && validateAddress() && validateAge() && validateMobile() && validateEmail() &&
            (selectedDepartment !== 'Other' || validateOtherDepartment()); // Only validate 'Other Department' if 'Other' is selected

        if (isFormValid) {
            const formData = {
                name: $('#name').val().trim(),
                address: $('#address').val().trim(),
                city: $('#city').val().trim(),
                dist: $('#dist').val().trim(),
                mobile: $('#mobile').val().trim(),
                email: $('#email').val().trim(),
                age: $('#age').val().trim(),
                gender: $('input[name="gender"]:checked').val(),
                department: $('#department').val(),
                otherDepartment: selectedDepartment === 'Other' ? $('#otherDeptInput').val().trim() : '' // Only get "Other Department" if selected
            };


            appendToTable(formData);
            

            // Show table if it's the first submission

            if (formDataList.length === 1) {
                $('#dataTable').css('visibility', 'visible');
            }
            // $('#dataTable').css('visibility', 'visible');
            alert('Form submitted successfully!');
           
            $('#registrationForm')[0].reset();
        }
        else {
            alert('Please correct the errors and try again.');
        }
    });

    function resetForm() {
        $('#registrationForm')[0].reset(); // Reset all form fields
        $('#otherDepartmentRow').css('visibility', 'hidden'); // Hide "Other Department" input field
        $('#otherDeptInput').val(''); // Clear the "Other Department" input field
        // $('#otherDeptInput').attr('required', false); // Remove required attribute from "Other Department"

        // Clear all error messages
        $('#nameError').html('');
        $('#addressError').html('');
        $('#cityError').html('');
        $('#distError').html('');
        $('#mobileError').html('');
        $('#emailError').html('');
        $('#ageError').html('');
        $('#genderError').html('');
        $('#otherDepartmentError').html('');
    }

 // Attach reset button event handler
 $('#resetbtn').on('click', function () {
    resetForm();
});

});
