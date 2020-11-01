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

        if( requestDetails() ){
            //location.href='result.html?status='+true;

        }else{
            //location.href='result.html?status='+false;
        }
        
    }else{
        alert('Invalid Email So unable to send');
    }
    
});

var requestDetails = function(){
    
    const reqDetails = async () => {
        console.log("Fetching Details..");
        let properEmail = document.getElementById('searchBar').value;
        var requestURL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email='+properEmail;
        try {
            console.log(requestURL);
            const reqDetail = await fetch(requestURL);
            const data = await reqDetail.text();
            return data;
        } catch(e){
            return e.message
        }
    }
    
    reqDetails().then(data => {
        console.log(data);
        /*var landingCoursesData = "";
        for( var x in data){
            landingCoursesData += "<div class='col-md-3'><h4 class='LandingCourseHeads'>"+x+"</h4><ul>";
            var xObj = data[x];
            
            for( var y in xObj ){
                //console.log(xObj[y]);
                landingCoursesData += "<li class='landingLinks'><span class='glyphicon glyphicon-chevron-right'></span> <a href='course.php?id="+xObj[y]['id']+"&category="+xObj[y]['mcid']+"'>"+xObj[y]['title']+"</a></li>";
            }
            landingCoursesData += "</ul><a href='"+serverProtocol+"://lepakshifixit.com/category.php?id="+xObj[y]['mcid']+"' class='btn btn btn-xs btn-danger'><span class='glyphicon glyphicon-resize-full'></span> More</a></div>";
        }	
        document.getElementById("landingCoursesList").innerHTML = landingCoursesData;*/
    });


}




