//URL
const url = "https://jsonplaceholder.typicode.com/"

// XML http request constructor
const xhr = new XMLHttpRequest();

// Append user details to interface
function print(response , upadteFlag =null){
    if (upadteFlag == null) {
        for(value of response.slice(0,5)){
            console.log(value.name, value.username, value.email);
            let template = $('.baseUserDetails').clone();
            $(template).attr('id',`${value.id}`).removeClass('d-none baseUserDetails');
            $('._name', template).text(value.name);
            $('.userName', template).text(value.username);
            $('.email', template).text(value.email);
            $('.delete', template).attr("onclick","postRemove(this)");
            $('.update', template).attr("onclick","postUpdate(this)");
            $('.display').append(template);
        }
    } else {
        let id = response.id;
        let keys = Object.keys(response);
        for (i in keys){
            $(`#${id} p:eq("${i}")`).text(response[`${keys[i]}`]);
        }
    }
}

// API

// GET METHOD
$('#fetchBtn').on("click", fetch);


// POST METHOD
$('#postBtn').on('click', function(){
    let _name = prompt("Enter your name..") ?? "";
    let username = prompt("Enter username..") ?? "";
    let email = prompt("Enter your email..") ?? "";
    if(_name != "" && username != "" && email != ""){
        newPost({name:_name, username, email});
    } else if(_name != "" || username != "" || email != "") {
        alert("Please enter all input fields to create users.");
    }else {
        alert("Nothing to created.");
    }
});

// Update Method
function postUpdate(t_this){
    let userValues = $(t_this).siblings("p");
    const data = {
        Name : $(userValues[0]).text(),
        UserName : $(userValues[1]).text(),
        Email : $(userValues[2]).text()
    }
    const newdata = {};
    let keys = Object.keys(data);
    for (i =0; i<keys.length; i++){
        var valid = true;
        newdata[`${keys[i]}`] = prompt(`${keys[i]}  : ${data[keys[i]]}`,`${data[keys[i]]}`) ?? "";
        if ( newdata[`${keys[i]}`] == "") valid = false;
    }
    var valid = valid ?? "";
    if(JSON.stringify(data) === JSON.stringify(newdata)){
        alert("No Updation done")
    } else if( valid != "" && valid){
        updateRequest(newdata, $(t_this).closest('div').attr('id'));
    } 
    
}

// Fetch request
function fetch(){
    xhr.onload = ()=>{
        if(xhr.status >=200 && xhr.status <=299){
            print(JSON.parse(xhr.response));
            // console.log(JSON.parse(xhr.response));
        } else{
            $('.disply').append(`<p>error : somethig  went wrong</p>`);
        }
    };
    xhr.open("GET", `${url}users`);
    xhr.send();
} 


// Post request
function newPost(postData){
    console.log(postData);
    xhr.onload = ()=>{
        if(xhr.status >=200 && xhr.status <=299){
            print([JSON.parse(xhr.response)]);
            alert("Created Successfully.")
        }else{
            $('.disply').append(`<p>error : somethig  went wrong</p>`); 
        }
    }

    xhr.open("POST", `${url}users`);
    xhr.setRequestHeader("content-type", "application/json")
    xhr.send(JSON.stringify(postData))
}


// Update request
function updateRequest(data, id){

    xhr.onload = ()=>{
        if(xhr.status >= 200 && xhr.status <=299){
            print(JSON.parse(xhr.response), true);
            alert("Updated Successfully");
        } else{
            alert("Something went wrong");
        }
    }

    xhr.open("PUT", `${url}posts/${id}`);
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(JSON.stringify(data));
}


// Delete Request
function postRemove(t_this){
    let deleteId = $(t_this).closest('div').attr('id')
    console.log(deleteId);
    xhr.onload = ()=>{
        if(xhr.status >= 200 && xhr.status <= 299){
            $('#'+deleteId).remove();
            alert("deleted successfully.");
        } else
            alert("something went wrong");
    }
    xhr.open("DELETE",`${url}users/${deleteId}`);
    xhr.send();
}