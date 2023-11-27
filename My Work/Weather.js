const apiKey = "fb3b875ea1ce4aae0063c60c33679710";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`
const forcastUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&appid="
let searchbtn = document.getElementById("searchbtn")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const forcastRes = await fetch(forcastUrl + apiKey + `&q=${city}`)
    if (response.status == 404) {
        document.querySelector(".weather").style.display = "none"
        gsap.to(".card", {
            delay: .5,
            height: "25vh",
        })
        gsap.to(".card2 ", {
            delay: .5,
            display: "none",
            ease: "power2.inOut",
            height: "0vh",
        })
        gsap.to(".card2 .weatherFive", {
            delay: 0.2,
            y:"500px",
            ease: "power2.inOut",
        })
        setTimeout(() => {
            gsap.from(".errormsg", {
                display: "block",
                scale: 0
            })
            gsap.to(".errormsg", {
                display: "block",
                scale: 1
            })
        }, 1000);
    }
    else {
        let data = await response.json()
        console.log(data)
        document.querySelector(".city-name").innerHTML = data.name + ` (${data.sys.country})`
        document.querySelector(".Temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".Temp").innerHTML = data.main.temp + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/p"
        let weather = data.weather[0].main
        let weatherImg = document.querySelector(".weather img")
        switch (weather) {
            case "Clear":
                weatherImg.src = "Weather images/clear.png"
                console.log("clear");
                break;
            case "Clouds":
                weatherImg.src = "Weather images/clouds.png"
                console.log("clouds");
                break;
            case "Rain":
                weatherImg.src = "Weather images/rain.png"
                console.log("rain");
                break;
            case "Snow":
                weatherImg.src = "Weather images/snow.png"
                console.log("snow");
                break;
            case "Smoke":
                weatherImg.src = 'Weather images/smoke.png'
                console.log("Smoke");
                break;
            case "Drizzle":
                weatherImg.src = "Weather images/drizzle.png"
                console.log("Drizzle");
                break;
            case "Mist":
                weatherImg.src = "Weather images/mist.png"
                console.log("Mist");
                break;
            default:
                console.log("default");
                break;
        }

        if (forcastRes == 404) {
            gsap.to(".card2 .weatherFive", {
                display: "none",
                ease: "power2.inOut",
                height: "0vh",
            })
            alert("sdfg")
        }
        else {
            let forcastData = await forcastRes.json()
            let counter = 4;
            let tbody = document.getElementById("tbody");
            let tabletext = ''
            console.log(forcastData)
            for (let index = 0; index < 5; index++) {
                console.log(forcastData.list[counter].weather[0].main);
                tabletext += `<tr>
            <td>${forcastData.list[counter].dt_txt}</td>
            <td>${forcastData.list[counter].main.temp} °C</td>
            <td>${forcastData.list[counter].main.humidity} %</td>
            <td>${forcastData.list[counter].wind.speed} Km/h</td>
            <td><img id="img" src="" alt="${forcastData.list[counter].weather[0].main}"></td>
        </tr>`
                console.log(forcastData.list[counter].main.temp);
                counter = counter + 8
            }
            tbody.innerHTML = tabletext
            let weatherImg = document.querySelectorAll("#img");
            weatherImg.forEach((element, i) => {
                if (element.alt == "Clear") {
                    element.src = "Weather images/clear.png"
                }
                else if (element.alt == "Clouds") {
                    element.src = "Weather images/clouds.png"
                }
                else if (element.alt == "Rain") {
                    element.src = "Weather images/rain.png"
                }
                else if (element.alt == "Snow") {
                    element.src = "Weather images/snow.png"
                }
                else if (element.alt == "Smoke") {
                    element.src = "Weather images/smoke.png"
                }
                else if (element.alt == "Drizzle") {
                    element.src = "Weather images/drizzle.png"
                }
                else if (element.alt == "Mist") {
                    element.src = "Weather images/mist.png"
                }
                else {
                    console.log("default");
                }

            });
        }
        document.querySelector(".errormsg").style.display = "none"

        gsap.to(".card", {
            ease: "power2.inOut",
            height: "85vh",
        },)
        gsap.to(".card2", {
            display: "block",
            ease: "power2.inOut",
            height: "85vh",
        })
        gsap.to(".card", {
            x: "0px",
            height: "85vh",
        },)
        gsap.from(".weatherFive", {
            y:"500px",
            delay: .2,
            ease: "power2.inOut",
        },)
        gsap.to(".weatherFive", {
            y:"0px",
            delay: .2,
            ease: "power2.inOut",
        },)



        setTimeout(() => {
            gsap.from(".weather", {
                display: "block",
                scale: 0
            })
            gsap.to(".weather", {
                display: "block",
                scale: 1,
            })
        }, 150);
    }

}
searchbtn.addEventListener("click", () => {
    let cityname = document.getElementById("cityname")
    checkWeather(cityname.value)
})