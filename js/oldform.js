
const form = document.querySelector("#search-form"); // select form using Id
var email = form.elements.namedItem('email'); // select email input field
var isEmailValid = false;

function myApp(formId, input, emailLabel){
    this.formId = formId;
    this.input = input;
    this.emailLabel = emailLabel; 
    this.label = document.getElementById(this.emailLabel);
    this.onMail = function(focusText){
        this.label.classList.add(focusText); // input label effected onfocus
    },
    this.offMail = function(classesList, value){
        if ( value.length <= 0 || value=="" ) {this.label.classList.remove(classesList[0], classesList[1]) }  // input label effected onblur
    }
}
var app = new myApp("search-form", "email", "emailLabel");

// onFocus/onBlur events triggered directly from html inputs, below functions will be triggered
onMail = function(em){
    app.onMail('focusText');
    //document.getElementById('emailLabel').classList.add('focusText')
}
offMail = function(em){
    app.offMail(['focusText', 'error'], em);
   /*if( em.length <= 0 || em=="" ){
    document.getElementById('emailLabel').classList.remove('focusText', 'error')
   }*/
}

email.addEventListener('input', validate); // Adding event listener validate when an input provides
email.addEventListener('focus', onInputFocus); // Adding event listener validate when an input provides
email.addEventListener('blur', onInputBlur); // Adding event listener validate when an input provides

function onInputFocus(e){
    let emailInput = document.getElementById('searchBar');
    emailInput.classList.add("searchInputfocus");
}
function onInputBlur(e){
    let emailInput = document.getElementById('searchBar');
    emailInput.classList.remove("searchInputfocus");
}
// validate function when email input provides by user
function validate(e){
    

    let emailId = e.target.value;
    var emailLabel = document.getElementById('emailLabel');
    var emailInput = document.getElementById('searchBar');
    emailInput.classList.add("searchInputfocus");
    emailInput.classList.remove("searchInputError");
    //console.log(emailId.length);
    if( emailId.length > 0 ){
        emailLabel.classList.add('labelVisibility');
        emailInput.classList.add('inputPosition');

    }else{
        emailLabel.classList.remove('labelVisibility');
        emailInput.classList.remove('inputPosition');
        emailInput.classList.remove('inputPositionHorizontal');
    }
    
    if( validateEmail(emailId) ){
        emailLabel.classList.remove('error');
        emailInput.classList.add('inputPosition');
        emailInput.classList.add('inputPositionHorizontal');
        emailLabel.innerText = "EMAIL";
        isEmailValid = true;
    }else{    
        emailInput.classList.remove("searchInputfocus");
        emailInput.classList.add("searchInputError");    
        emailLabel.innerText = "Please add a valid email address";
        emailInput.classList.remove('inputPositionHorizontal');
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

var requestDetails = function(){   
     console.log("Fetching Details..");
}




        
        var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
        function doCORSRequest(options, printResult) {
            var x = new XMLHttpRequest();
            x.open(options.method, cors_api_url + options.url);
            x.onload = x.onerror = function() {
            printResult(        
                (x.responseText || '')
            );
            };
            if (/^POST/i.test(options.method)) {
				x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            x.send(options.data);
        }

        // Bind event
        (function() {
            
            document.getElementById('get').onclick = function(e) {
                var properEmail = document.getElementById('searchBar').value;
                var urlField = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email='+properEmail;
            e.preventDefault();

            if( isEmailValid == true ){
                document.getElementById("get").disabled = true;
                document.getElementById("get").innerText = 'Wait';
                doCORSRequest({
                    method: 'GET',
                    url: urlField,
                }, function printResult(result) {
                    localStorage.setItem('mailDetails', result);
                    var emailDetails = JSON.parse(localStorage.getItem('mailDetails'));
                    if( emailDetails.length == 0 ){
                        location.href='result.html?status='+false;
                    }else{
                        location.href='result.html?status='+true;
                    }
                });
            }else{
                document.getElementById("get").disabled = false;
            }
            
            };
        })();

