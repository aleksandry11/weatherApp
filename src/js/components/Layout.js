import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchWeather } from "../actions/weatherActions"

@connect((store) => {
    return {
        weather: store.weather.weather,
        error: store.weather.error
    };
})

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      msg: '',
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    
    if(!this.state.value) {
      this.setState({
        error: "",
        msg: "Enter your city"
      });
    } else {
      this.setState({msg: ''})
      this.props.dispatch(fetchWeather(this.state.value));      
    }    
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    let weather;
    if(!this.props.weather) {

    }
    else {                  
      weather = this.props.weather.list.map((city, i) =>
          <li key={i} class="city-item">
            <Link to={`/city/${city.id}`} style={{ 
              color: 'white'
              }}>              
                {city.name}, {city.sys.country}</Link> <img src={'http://openweathermap.org/images/flags/' + city.sys.country.toLowerCase() + '.png'}/> <br/>Temp: {city.main.temp} <img src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}/> {city.weather[0].description}              
            
          </li>          
      );
    }

    

    return (
       <div class="container">
          <div class="row">
              <div class="col-md-push-3 col-md-6 title weather">
                  <h1>Weather in your city</h1>
                  <form onSubmit={this.handleSubmit} class="form form-inline">
                    <div className="form-goup">                      
                      <input type="text" placeholder="Your city..." value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <span class="alert">{this.state.msg} {this.state.error}</span>
                  </form>
              </div>
            </div>
            <div class="row">
              <div class="col-md-push-3 col-md-6">
                <ul class="city-list">{weather}</ul>
              </div>
            </div>              
          </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  weather: state,
  ownProps
})

export default connect(mapStateToProps)(Layout)
