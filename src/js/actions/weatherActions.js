import axios from "axios";

export function fetchWeather(name) {
  return function(dispatch) {
    axios.get(`http://api.openweathermap.org/data/2.5/find?q=${name}&type=like&units=metric&APPID=6f1ab98335d5439d3392bb7b107793bf`)
      .then((response) => {
        dispatch({type: "FETCH_WEATHER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_WEATHER_REJECTED", payload: err})
      })
  }
}

