let dropDownSelect=document.querySelectorAll(".dropdown select");
let button=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");

for(let select of dropDownSelect){
    for(currCode in countryList){
        console.log(currCode,countryList[currCode]);
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}
const exchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<"1"){
        amtVal=1;
        amount.value="1";
    }
    console.log(amount);
    let URL=`https://v6.exchangerate-api.com/v6/a7b51964a66d5f4058ecae0f/latest/${fromCurr.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    let exchangeRate=data.conversion_rates[toCurr.value];

    let totalExchangeRate=amtVal*exchangeRate;
    console.log(totalExchangeRate);
    let msg=document.querySelector(".msg");

    msg.innerText=`${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];

    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

button.addEventListener("click",(event)=>{
    event.preventDefault();
    exchangeRate();
})

window.addEventListener("load",()=>{
    exchangeRate();
})