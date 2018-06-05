var API = require('./API');
var userData = {
    name: "",
    email: "",
    password: ""
}

$(function () {
    $('#create-user').click(function () {
        var name = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        userData.name = name;
        userData.email = email;
        userData.password = password;
        console.log("register");
        API.addNewUser(userData , function (err, data) {
            if (!err){
                console.log(data);
            }
        })
        window.location.href = "http://localhost:8090/?";
    })
})