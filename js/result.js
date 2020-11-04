var emailDetails = JSON.parse(localStorage.getItem('mailDetails'));
if( emailDetails.length == 0 ){
    document.getElementById('content3').innerHTML = "<div id='noResults'><h2>Email not found!</h2></div>";
}else{
    document.getElementById('fullname').innerText = emailDetails.first_name + " " + emailDetails.last_name;
    document.getElementById('description').innerText = emailDetails.description;
    document.getElementById('address').innerText = emailDetails.address;
    document.getElementById('ph1').innerText = emailDetails.phone_numbers[0];
    document.getElementById('ph2').innerText = emailDetails.phone_numbers[1];
    document.getElementById('ph3').innerText = emailDetails.phone_numbers[2];
    document.getElementById('emaili').innerText = emailDetails.email;
    document.getElementById('rel1').innerText = emailDetails.relatives[0];
    document.getElementById('rel2').innerText = emailDetails.relatives[1];
}