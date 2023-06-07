let weather = {
    "apiKey":'02523e2eab3e39c09b7bb514be0635be',
    
    fetchWeather : function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) =>response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather : function(data) {
        const {name} = data;
        const {icon} = data.weather[0];
        const {description} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        //console.log(name,icon,description,temp,humidity,speed,"https://openweathermap.org/img/wn/"+icon+".png");
        document.querySelector(".city").innerText = "Weather in " + name;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".temp").innerText = temp+"°C"; 
        document.querySelector(".wind").innerText = 'Wind Speed '+speed +'km/h';
        document.querySelector(".humidity").innerText = 'Humidity ' +humidity+"%";
        document.querySelector(".description").innerText = description;
        document.querySelector(".weather").classList.remove("loading");
        //document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

weather.fetchWeather("Lucknow");

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup" , function(event){
    if (event.key == 'Enter')
        weather.search();
});



function displayTime(){
    var date = new Date();
    var dd = date.getDate();
    if(dd<10)dd="0"+dd;

    var mm = (date.getMonth() + 1);
    if(mm<10)mm="0"+mm;

    var yyyy = date.getFullYear();
    
    var dN = "AM"; 
    var hh = (date.getHours());
    if(hh<10)hh="0"+hh;
    if(hh>12){hh=hh-12;
        dN="PM";
    }
    
    var MM = (date.getMinutes());
    if(MM<10)MM="0"+MM;

    var ss = (date.getSeconds());
    if(ss<10)ss="0"+ss;

    var newDate = dd+'-'+mm+'-'+yyyy;
    var time = hh+':'+MM+':'+ss+" "+ dN;
    document.getElementById("date").innerHTML= newDate;
    document.getElementById("time").innerHTML = time;
    setInterval("displayTime()",1000);
}
setTimeout("displayTime()",1000);
