console.log('client side js is uploaded!');


const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector("#messageOne");
const messagetwo = document.querySelector("#messageTwo");
const messageThree  = document.querySelector("#messageThree");


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(input.value);
    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";
    messageThree.textContent = "";
    fetch(`/weather?address=${input.value}`).then(result=>{
    
    result.json().then(data=>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
        }else{
            console.log(data.address);
            console.log(data.weather);
            messageOne.textContent = `City of : ${data.address}`;
            messageTwo.textContent = `Current Degree : ${data.weather}`;
            messageThree.textContent = `Weather Summary : ${data.summary}`;
        }
    }).catch(error=>{
        console.log(`something is wrong ${error}`);
    });
})
});


