//URL
const url = "https://jsonplaceholder.typicode.com/"


// Append user details to interface
function showUserDetails(response , upadteFlag =null){
    if (upadteFlag == null) {
        for(value of response.slice(0,5)){
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


// GET METHOD
$('#fetchBtn').on("click", fetchRequest);


// CREATE NEW USER METHOD
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

// Update USER Method
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

// API

// Fetch request
async function fetchRequest(){
    try{
        const data = await fetch(`${url}users`);
        if ( !data.ok) throw new Error("Failed to fetch user details");
        const response = await data.json();
        showUserDetails(response);
        alert("Successfully fetched user details")
    }catch(exception){
        alert("Error:", exception.message);
    }
} 


// Post request
async function newPost(postData){
    const reqObj = {
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(postData)
    }
    try{
        const data = await fetch(`${url}users`, reqObj);
        if ( !data.ok) throw new Error("Failed to create user details");
        const response = await data.json();
        showUserDetails([response]);
        alert("Created Successfully.")
    }catch(exception){
        alert("Error:", exception.message);
    }
}


// Update request
async function updateRequest(data, id){
    const reqObj = {
        method: "PUT",
        headers : {"content-type":"application/json"},
        body: JSON.stringify(data)
    }
    try{
        const data = await fetch(`${url}posts/${id}`, reqObj);
        if( !data.ok ) throw new Error("Failed to update user details");
        const response = await data.json();
        showUserDetails(response, true);
        alert("Updated Successfully");
    }catch(exception){
        alert("Error :", exception.message);
    }
}


// Delete Request
async function postRemove(t_this){
    let deleteId = $(t_this).closest('div').attr('id');
    try{
        const data = await fetch(`${url}users/${deleteId}`,{ method: "DELETE"});
        if( !data.ok) throw new Error("Failed to remove selected user details");
        $('#'+deleteId).remove();
        alert("deleted successfully.");

    }catch(exception){
        alert("Error :",exception.message);
    }
}