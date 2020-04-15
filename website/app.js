/* Global Variables */
// EXAMPLE API KEY https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

const urlAPI = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = ',es&appid=300964441d9ac24a633de4475b182466'; // country + key

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


const formButton = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Get Data from API
const getAPIdata = async (url='') => {

    const req = await fetch(url)
    try{
        const recived = req.json();
        console.log(recived);
        return(recived);

    } catch(error){
        console.log('error', error);
    }
}


//POST DATA revieved
const postData = async (url='', data = {}) => {
    //console.log('begininig postData');
    //console.log(data)
    const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
    try{
        const newData = await res.json();
        //console.log (`Ì'm the postData function on try step:`);
        //console.log(newData);
        return newData;

    } catch(error) {
        console.log('error', error);
    }
}

const updateUI = async () => {
    const req = await fetch('/add');
    try{
        const allData = await req.json();
        date.innerHTML = allData.date;
        temp.innerHTML = allData.temp;
        content.innerHTML = allData.feel;

    } catch(error){
        console.log('error', error);
    }
}



const clickForm =  (e) => {
    const zip = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    buildedUrl = urlAPI+zip+key;
    console.log(`sending the url ${buildedUrl}`);
    getAPIdata(buildedUrl)
    .then(
        function(data){ 
            postData('/addData', {temp: data.main.temp, date: newDate, feel: feel});
            }
    )
    .then(
        function(newData){ 
            updateUI();
        }
        
    )

}
        
formButton.addEventListener('click', clickForm);

