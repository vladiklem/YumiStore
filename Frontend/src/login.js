var API = require('./API');

$(function () {
    $('#login').click(function () {
        var email = $('#email').val();
        var password = $('#password').val();
        if(email === "admin" && password ==="admin"){
            window.location.href = "http://localhost:8090/admin-page";
        }else{
            API.getUsersList(function (err, data) {
                console.log(data);
                if (err) throw err
                for(var i = 0;i<data.length;i++){
                    if(data[i].email === email && data[i].password === password){
                        window.location.href = "http://localhost:8090/customer-page";
                    }
                }
            })
        }
    })
    $('#register').click(function () {
        window.location.href = "http://localhost:8090/register-page";
    })
})