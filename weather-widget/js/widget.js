const API_KEY = '8b8119953214724510abd9fd45b0dd56'
const PLACE = 'Donetsk'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${PLACE}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        renderWidget(data)
    })
    .catch(err => {
        console.error(err)
    })

function renderWidget(data) {
    const widgetContainer = document.querySelector('.weatherWidget')
    const now = new Date()
    const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let content = `
            <div class="weatherWidget-header">
                <div class="weatherWidget-header__place">
                    ${data.name}
                </div>
                <button class="weatherWidget-header__reload">
                    <img src="./weather-widget/img/_refresh.svg" alt="reload weather">
                </button>
            </div>
            <div class="weatherWidget-body">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
                <div class="weatherWidget-body__info">
                    <div class="weatherWidget-body__info-temp">
                        ${Math.round(data.main.temp)}&deg;C
                    </div>
                    <div class="weatherWidget-body__info-status">
                        <h2>${data.weather[0].main}</h2>
                        <h4>${data.weather[0].description}</h4>
                    </div>
                    <div class="weatherWidget-body__info-date">
                        ${monthArray[now.getMonth()]}
                        <div>${now.getDate()}</div>
                    </div>
                </div>
            </div>
            <div class="weatherWidget-footer">
                <div class="weatherWidget-footer__wind">
                    <img src="./weather-widget/img/_arrow.svg" alt="wind direction" style="transform: rotate(${data.wind.deg}deg)">
                    <span>${data.wind.speed}m/s</span>
                </div>
                <div class="weatherWidget-footer__wind">
                    <img src="./weather-widget/img/_teardrop.svg" alt="humidity">
                    <span>${Math.round(data.main.humidity)}%</span>
                </div>
                <div class="weatherWidget-footer__wind">
                    Real feel: <span>${Math.round(data.main.feels_like)}&deg;C</span>
                </div>
            </div>
            <div class="weatherWidget-footer__pressure">
               <div class="weatherWidget-pressure__wind">
                    Real Atmospheric pressure : <span>${Math.round((data.main.pressure *3 / 4))} mm Hg</span>
               </div>
            </div>
            `

    widgetContainer.innerHTML = content
}


let buttonof = document.querySelector('.switch-btn')
let containerStatus =  document.querySelector('.weatherWidget')

buttonof.onclick = function() {
    buttonof.classList.toggle('switch-on')
    containerStatus.classList.toggle('weatherWidget__dark')
}



