const typeCity = document.querySelector('.js-type-city');
const enter = document.querySelector('.js-enter');
const main = document.querySelector('main');
const page = document.querySelector('.js-next-page');

const apiKey = 'b718aeb3e6d7427c8ba30114242509';

function removePrevCard() {
  const prevCard = document.querySelector('.card');
  if (prevCard) prevCard.remove();
};

function showError(errorMessage) {
  const html = `
    <div class="calendar"></div>
    <div class="next-page js-next-page"></div>
    <div class="errorMess">${errorMessage}</div>
  `;
  //main.insertAdjacentHTML('afterend', html);
  main.innerHTML = html;
};

function displayCard({name, country, temp, condition, conditionIcon}) {
  const html =  `
    <div class="calendar">
    </div>
    <div class="next-page js-next-page">
      <div class="card">
        <h2 class="card-city">${name}<span>${country}</span></h2>
        <div class="card-weather">
          <div class="card-value">${temp}<sup>C</sup>
          </div>
        </div>
        <div class="card-description">${condition}
        </div>
        <div class="card-description js-card-description"><a href="https://www.weatherapi.com/" title="Free Weather API"><img src='${conditionIcon}' alt="Weather data by WeatherAPI.com" border="0"></a>
        </div>
      </div>
    </div>
  `;

  //main.insertAdjacentHTML('afterend', html);
  main.innerHTML = html;

}

async function getWeather(city) {
  const urlQuery = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(urlQuery);
  const data = await response.json();
  console.log(data);
  if (data.error) {
    removePrevCard();
    showError(data.error.message);
    
  } else {
    removePrevCard();

    //console.log(data.current.condition.code);
    //const info = conditions.find((obj) => obj.code === data.current.condition.code);

    const weatherData = {
      name: data.location.name, 
      country: data.location.country, 
      temp: data.current.temp_c, 
      condition: data.current.condition.text,
      conditionIcon: data.current.condition.icon
    };

    displayCard(weatherData);
  }
}

enter.addEventListener('click', async (event) => {
  //cancel sending form
  event.preventDefault();
  //trim() removing probels  
  let city = typeCity.value.trim();
  //console.log(city);
  const data = await getWeather(city);
});

  
  
    /*  
  const urlQuery = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(urlQuery).then((response) => {
  return response.json()
}).then((data) => {
  console.log(data);
  //Checking error
  if (data.error) {
    removePrevCard();
    showError(data.error.message);
    
  } else {
    removePrevCard();

    displayCard(
      data.location.name, 
      data.location.country, 
      data.current.temp_c, 
      data.current.condition.text)
  }
}) 
  */





