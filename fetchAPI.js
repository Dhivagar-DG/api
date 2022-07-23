$('h3').text('Fetch Api')

// FECTH API
const apiUrl = "https://jsonplaceholder.typicode.com/usrs";
// ######  Promise then catch
fetch(apiUrl)
.then((res)=>{
    if(res.status === 200) {
        console.log(res.statusText)
        return res.json();
    }
    else throw new Error("Somthing error occured");
}).then((data)=>{
    console.log(data);
}).catch((error)=> console.log(error));

// ############# Promise Async Await
async function apiAsync(){
    try {
        const response = await fetch(apiUrl);
        if (response.status !== 200) throw new Error("Something error occurred")
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err.message);
    }
}
apiAsync();