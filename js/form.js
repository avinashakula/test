const form = document.querySelector("#search-form"); // select form using Id
var email = form.elements.namedItem('email'); // select email input field
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
    var emailInput = document.getElementById('searchBar');
    console.log(emailId.length);
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
        //emailLabel.classList.remove('labelVisibility');
        emailInput.classList.add('inputPosition');
        emailInput.classList.add('inputPositionHorizontal');
        emailLabel.innerText = "EMAIL";
        isEmailValid = true;
    }else{        
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

// When form submits
/*
form.addEventListener("submit", function(e){
    e.preventDefault();
    if( isEmailValid ){

        if( requestDetails() ){
            //location.href='result.html?status='+true;

        }else{
            //location.href='result.html?status='+false;
        }
        
    }else{

        document.getElementById('emailLabel').innerText = 'Please add a valid email address';
    }
    
});*/

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
            doCORSRequest({
                method: 'GET',
                url: urlField,
            }, function printResult(result) {
                console.log(result);        
                console.log(JSON.parse(result));
            });
            };
        })();




