function loadDataPrepair() {
    load3daystogether(tformattedDate, nformattedDate, yformattedDate);
}

async function load3daystogether(tformattedDate, nformattedDate, yformattedDate) {
    await loadFunctionData(nformattedDate, kraina, misto, oblast, latitude, longitude, 'Today');
    await loadFunctionData(tformattedDate, kraina, misto, oblast, latitude, longitude, 'Tomorrow');
    await loadFunctionData(yformattedDate, kraina, misto, oblast, latitude, longitude, 'Yesterday');
}

const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const suggestions = document.getElementById('suggestions');
    var misto
    var oblast
    var kraina

    function showSuggestions(data) {
        suggestions.innerHTML = '';
        data.forEach(item => {
            const { name, country, region } = item;
            const li = document.createElement('li');
            let displayText = name;
            
            if (region && country) {
            displayText += `, ${region}, ${country}`;
            } else if (region) {
            displayText += `, ${region}`;
            } else if (country) {
            displayText += `, ${country}`;
            }

            misto = name;
            oblast = region;
            kraina = country;

            li.textContent = displayText;
            li.addEventListener('click', () => {
            cityInput.value = displayText;
            suggestions.innerHTML = '';
            });
            suggestions.appendChild(li);
        });
        }


    cityInput.addEventListener('input', () => {
        const inputValue = cityInput.value;
        const apiKey = '06c045501aa4429b89b90125232907';
        const apiUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${inputValue}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => showSuggestions(data))
            .catch(error => console.error(error));
    });

    

    form.addEventListener('submit', event => {
        event.preventDefault();
        const city = cityInput.value;
        console.log(city);
    });

    
    document.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            loadDataPrepair()   
        }
    });


    console.log('select place end-------------------------')

    var today_data = new Date();
    var day = today_data.getDate(); 
    var yesterday = day - 1
    var tomorrow = day + 1

    document.getElementById("yesterday").innerHTML += yesterday;
    document.getElementById("today").innerHTML += day;
    document.getElementById("tomorrow").innerHTML += tomorrow;

let latitude, longitude;

function getNData() {
return new Promise((resolve, reject) => {
    var ftoday_data = new Date();
    ftoday_data.setDate(ftoday_data.getDate());
    var nyear = ftoday_data.getFullYear();
    var nmonth = ftoday_data.getMonth() + 1;
    var nday = ftoday_data.getDate();
    nformattedDate = nyear + '-' + nmonth.toString().padStart(2, '0') + '-' + nday.toString().padStart(2, '0');
    resolve();
});
}

function getYData() {
return new Promise((resolve, reject) => {
    var ftoday_data = new Date();
    ftoday_data.setDate(ftoday_data.getDate() - 1);
    var yyear = ftoday_data.getFullYear();
    var ymonth = ftoday_data.getMonth() + 1;
    var yday = ftoday_data.getDate();
    yformattedDate = yyear + '-' + ymonth.toString().padStart(2, '0') + '-' + yday.toString().padStart(2, '0');
    resolve();
});
}

function getTData() {
return new Promise((resolve, reject) => {
    var ftoday_data = new Date();
    ftoday_data.setDate(ftoday_data.getDate() + 1);
    var tyear = ftoday_data.getFullYear();
    var tmonth = ftoday_data.getMonth() + 1;
    var tday = ftoday_data.getDate();
    tformattedDate = tyear + '-' + tmonth.toString().padStart(2, '0') + '-' + tday.toString().padStart(2, '0');
    resolve();
});
}

const successCallback = async (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);

    try {
        await getTData();
        await getNData();
        await getYData();

        console.log(tformattedDate, yformattedDate, nformattedDate);

        loadFunctionData(nformattedDate, kraina, misto, oblast, latitude, longitude, 'Today');
        loadFunctionData(tformattedDate, kraina, misto, oblast, latitude, longitude, 'Tomorrow');
        loadFunctionData(yformattedDate, kraina, misto, oblast, latitude, longitude, 'Yesterday');
    } catch (error) {
        console.error(error);
    }
};

const errorCallback = (error) => {
console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

var all7DaysData

function loadFunctionData(testData, testKraina, testMisto, testOblast, testLatitude, testLongitude, testParametr) {

    var testingurl = ``    
    var testing7url =``

    if (testMisto || testOblast || testKraina) {
        testingurl = `http://api.weatherapi.com/v1/forecast.json?key=06c045501aa4429b89b90125232907&q=${testMisto},${testOblast},${testKraina}&dt=${testData}&hour=14`;
        testing7url = `http://api.weatherapi.com/v1/forecast.json?key=06c045501aa4429b89b90125232907&q=${testMisto},${testOblast},${testKraina}&days=7`;
    } else {
        testingurl = `http://api.weatherapi.com/v1/forecast.json?key=06c045501aa4429b89b90125232907&q=${testLatitude},${testLongitude}&dt=${testData}&hour=14`;
        testing7url = `http://api.weatherapi.com/v1/forecast.json?key=06c045501aa4429b89b90125232907&q=${testLatitude},${testLongitude}&days=7`;
    }

    console.log(testingurl);
    console.log(testing7url);
    console.log(testMisto)
    console.log(testOblast)
    console.log(testKraina)
    console.log(testData)
    
    fetch(testingurl)
    .then(response => response.json())
    .then(data => {
        
        if(testParametr === 'Today') {
            var todayData = data.forecast.forecastday[data.forecast.forecastday.length - 1];
            console.log(todayData)
            var todayElement = document.getElementById('today_info');
            todayElement.innerHTML =` <div class="center"> ${todayData.hour[0].temp_c} °C</div> 
            <div class="center"> ${todayData.hour[0].wind_kph} km/h, ${todayData.hour[0].wind_dir} </div>
            <div class="center"> ${todayData.hour[0].condition.text}</div>`;
            document.getElementById('today_icon').innerHTML = `<img src="${todayData.hour[0].condition.icon}">`;
            
        }
        else if(testParametr ==='Tomorrow'){
            var tomorrowData = data.forecast.forecastday[0];
            console.log(tomorrowData)
            var tomorrowElement = document.getElementById('tomorrow_info');
            tomorrowElement.innerHTML =` <div class="center"> ${tomorrowData.hour[0].temp_c} °C</div> 
            <div class="center"> ${tomorrowData.hour[0].wind_kph} km/h, ${tomorrowData.hour[0].wind_dir} </div>
            <div class="center"> ${tomorrowData.hour[0].condition.text}</div>`;
            document.getElementById('tomorrow_icon').innerHTML = `<img src="${tomorrowData.hour[0].condition.icon}">`;
        
        }
        else if(testParametr === 'Yesterday'){
            var yesterdayData = data.forecast.forecastday[data.forecast.forecastday.length - 1];
            console.log(yesterdayData)
            var yesterdayElement = document.getElementById('yesterday_info');
            yesterdayElement.innerHTML =` <div class="center"> ${yesterdayData.hour[0].temp_c} °C</div> 
            <div class="center"> ${yesterdayData.hour[0].wind_kph} km/h, ${yesterdayData.hour[0].wind_dir} </div>
            <div class="center"> ${yesterdayData.hour[0].condition.text}</div>`;
            document.getElementById('yesterday_icon').innerHTML = `<img src="${yesterdayData.hour[0].condition.icon}">`;
        }else{
            console.log('no data')
        }
    })
    fetch(testing7url)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecast_container');
            forecastContainer.innerHTML = ''; 
            
            all7DaysData = data
            data.forecast.forecastday.forEach(dayData => {
                const date = new Date(dayData.date).toLocaleDateString('en', { weekday: 'short' });
                const day = new Date(dayData.date).getDate(); 
                const forecastHourData = dayData.hour[14]; 
                const forecastBlock = document.createElement('div');
                forecastBlock.classList.add('forecast_block');
                forecastBlock.innerHTML = `
                <a onclick="showChildNumber(this)" class="hideblock">    
                    <div class="weather-column-7-days">
                        <div class="icon-and-day">
                            <div class="weather-7-icon"><img src="${forecastHourData.condition.icon}" alt="${forecastHourData.condition.text}"></div>
                            <div class="wether-7-day">
                                <div class="center">${day}</div>     
                                <div class="center">${date}</div>
                            </div>
                        </div>
                        <div class="wether-7-info">
                            <div class="center">${forecastHourData.temp_c} °C</div>
                            <div class="center">${forecastHourData.wind_kph} km/h, ${forecastHourData.wind_dir}</div>
                            <div class="center">${forecastHourData.condition.text}</div>
                        </div>
                    </div>
                </a>
                `;
                forecastContainer.appendChild(forecastBlock);
                
            });
        })
        .catch(error => console.error(error));
}

    function showChildNumber(element) {
        const parentElement = document.getElementById('forecast_container');
        const children = parentElement.children;
        var childNumber

        for (let i = 0; i < children.length; i++) {
            if (children[i].contains(element)) {
            childNumber = i;
            console.log(`Номер блока: ${childNumber}`);
            break;
            }
        }

        console.log(all7DaysData)
        console.log(all7DaysData.forecast.forecastday[childNumber].hour.length)
        
        const forecastContainer = document.getElementById('forecast_hour_container');
        
        forecastContainer.innerHTML = ''; 
        var each_hour = all7DaysData.forecast.forecastday[childNumber].hour
        
        for (var hour_id = 0; hour_id <= each_hour.length; hour_id += 2) {
                         
            const forecastHourData = each_hour[hour_id]; 
            const forecastBlock = document.createElement('div');
            forecastBlock.classList.add('forecast_block_hour');
            forecastBlock.innerHTML = `
                <div class="one-hour-block">
                    
                        <div class="">${hour_id}:00</div>
                        <div class=""><img src="${forecastHourData.condition.icon}" alt="${forecastHourData.condition.text}"></div>
                    
                        <div class="">${forecastHourData.temp_c} °C</div>
                        <div class="">${forecastHourData.wind_kph} km/h, ${forecastHourData.wind_dir}</div>
                        <div class="">${forecastHourData.condition.text}</div>
                    
                </div>
            `
            forecastContainer.appendChild(forecastBlock);
            setTimeout(() => {
                forecastBlock.style.opacity = '1';
            }, 10);
            
        }
    }