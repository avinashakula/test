
const form = document.querySelector("#search-form"); // select form using Id
var email = form.elements.namedItem('email'); // select email input field
var isEmailValid = false;


function myApp(formId, input, emailId, emailLabel){
    this.isEmailValid = false;
    this.formId = formId;
    this.input = input;    
    this.emailLabel = emailLabel; 
    this.emailInput = document.querySelector("#"+this.formId);
    this.emailId = document.getElementById(emailId); 
    this.label = document.getElementById(this.emailLabel);    
    this.emailValidator = function(){
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return this.emailId.value.match(mailformat);
    },
    this.onMail = function(classesList){
        this.label.classList.add(classesList[0]); // input label effected onfocus
        this.emailId.classList.add(classesList[1]);
    },
    this.offMail = function(classesList, value, rClassesList){
        if ( value.length <= 0 || value=="" ) {this.label.classList.remove(classesList[0], classesList[1]) }  // input label effected onblur
        this.emailId.classList.add(rClassesList[0]);
    },
    this.validate = function(){
        let emailId = this.emailId.value;
        this.emailId.classList.add("searchInputfocus");
        this.emailId.classList.remove("searchInputError");

        if( emailId.length > 0 ){
            this.label.classList.add('labelVisibility');
            this.emailId.classList.add('inputPosition');    
        }else{
            this.label.classList.remove('labelVisibility');
            this.emailId.classList.remove('inputPosition', 'inputPositionHorizontal');
        }
        if( app.emailValidator() ){
            this.label.classList.remove('error');
            this.label.innerText = "EMAIL"; 
            this.emailId.classList.add('inputPosition', 'inputPositionHorizontal'); 
            this.isEmailValid = true;
        }else{    
            this.emailId.classList.remove('searchInputfocus', 'inputPositionHorizontal');
            this.emailId.classList.add("searchInputError");            
            this.label.innerText = "Please add a valid email address";
            this.isEmailValid = false;            
            this.label.classList.add('error');
        }
        
    },
    
    this.searchForMail = function(){
        // Searching for an Email
    }
    
}
    

var app = new myApp("search-form", "email", "searchBar", "emailLabel"); // Object

// Events & Handlers
onMail = function(em){
    app.onMail(['focusText', 'searchInputfocus']);
}
offMail = function(em){
    app.offMail(['focusText', 'error'], em, ['searchInputfocus']);  
}
onValue = function(){
    app.validate();
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

//Self Invoking a Method // Bind event
(function() {
    
    document.getElementById('get').onclick = function(e) {
        let properEmail = document.getElementById('searchBar').value;
        let urlField = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email='+properEmail;
        e.preventDefault();

        if( app.isEmailValid == true ){
            document.getElementById("get").disabled = true;
            document.getElementById("get").innerText = 'Wait';
            doCORSRequest({
                method: 'GET',
                url: urlField,
            }, function printResult(result) {
                localStorage.setItem('mailDetails', result);
                let emailDetails = JSON.parse(localStorage.getItem('mailDetails'));
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

