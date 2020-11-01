const form = document.querySelector("#search-form"); // select form using Id
let email = form.elements.namedItem('email'); // select email input field
var isEmailValid = false;


// onFocus Input Animation
onMail = function(em){
    document.getElementById('emailLabel').classList.add('focusText')
}
offMail = function(em){
   if( em.length <= 0 || em=="" ){
    document.getElementById('emailLabel').classList.remove('focusText', 'error')
   }
    
}

email.addEventListener('input', validate); // Adding event listener validate when an input provides

// validate function when email input provides by user
function validate(e){
    let emailId = e.target.value;
    var emailLabel = document.getElementById('emailLabel');
    if( validateEmail(emailId) ){
        emailLabel.classList.remove('error');
        isEmailValid = true;
    }else{
        isEmailValid = false;
        emailLabel.classList.add('error');
    }
}

// Validating Email provides by user
function validateEmail(inputText){
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(inputText.match(mailformat)){
        return true;
    }else{
        return false;
    }
}

// When form submits
form.addEventListener("submit", function(e){
    e.preventDefault();
    if( isEmailValid ){
        alert('Submitted');
    }else{
        alert('Invalid Email So unable to send');
    }
    
});




