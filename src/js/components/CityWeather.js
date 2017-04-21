import React from "react"
import { connect } from "react-redux"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import axios from "axios"

import GoogleMap from "./GoogleMap"

class CityWeather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            country: '',
			weather: [],
			location: {
				lat: '',
				lng: ''
			}

        }    
    }

    componentDidMount() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&units=metric&APPID=6f1ab98335d5439d3392bb7b107793bf`)
        .then((response) => {
            this.setState({
                city: response.data.city.name,
                country: response.data.city.country,
				weather: response.data.list,
				location: {
					lat: response.data.city.coord.lat,
					lng: response.data.city.coord.lon
				} 
            });
        }).catch((err) => console.log(err))

		
    }

    render() {   		
		Tabs.setUseDefaultStyles(false);  
		console.log(this.state.location)  
		const weather = this.state.weather.map((weather, index) => {
			return (
				<tr key={index} class="active">
					<td>{weather.dt_txt}</td>
					<td><img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/> {weather.weather[0].description}</td>
					<td>{weather.main.temp}</td>
					<td>{weather.main.pressure}</td>
					<td>{weather.main.humidity}</td>
					<td>{weather.wind.speed}</td>
				</tr>
			)
		})

        return (
             <div class="container">
				<div class="row">
					<div class="col-md-12 title">
						<h1>Weather in {this.state.city}</h1>
						<div id="mapWrap">
							<GoogleMap center={this.state.location} />
						</div>
					</div>
					<div class="col-md-12">
						<div class="table-responsive">
							<table class="table table-hover table-condensed">
								<tbody>
								<tr class="success">
									<th>Date</th>
									<th>Weather</th>
									<th>Temperature</th>
									<th>Pressure</th>
									<th>Humidity</th>
									<th>Wind, m/s</th>
								</tr>
								{weather}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.params.id
    }
}

export default connect(mapStateToProps)(CityWeather)