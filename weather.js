// a38c3dac0e25fb1e5ac8de4a2479d101  - your api id

const weather = () => {
  let city = 'Minsk';
  const search = document.querySelector('.search');
  const temp = document.getElementById('temp');
  const state = document.getElementById('state');

  document.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {
      let value = search.value;
      if (!value) return;
      city = value;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a38c3dac0e25fb1e5ac8de4a2479d101`)
        .then(data => { return data.json() })
        .then(data => {
          temp.textContent = `${data.name}: ${Math.floor(data.main.temp - 273)}'C,`;
          state.textContent = `${data.weather[0].description}`;
          console.log(data);
        })
        .catch(() => {
          temp.textContent = `city incorrect`;
          state.textContent = ``;
        });
    }
  });
}
export default weather;
