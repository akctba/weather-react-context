import React, { Component } from 'react';
import './index.css';

import { WeatherConsumer } from "./weatherContext";

const api = {
    key: "720b1a41660c87e3beb3873ed2143b01",
    base: "https://api.openweathermap.org/data/2.5/"
}

class Searchbar extends Component {

    state = {
        location: ""
    }

    static contextType = WeatherConsumer; //This code is generating a warning: Searchbar defines an invalid contextType. contextType should point to the Context object returned by React.createContext(). Did you accidentally pass the Context.Consumer instead?

    search = (dispatch, e) => {
        //console.log(`location com valor [${this.state.location}] `);
        if(this.state.location) {
            if (e.key === "Enter") {
                //console.log('ENTER pressionado location com valor ' + this.state.location);
                //dispatch({ type: "FIND_BY_NAME", payload: e.target.value });

                dispatch({ type: "CLEAR_WEATHER", payload: null });

                fetch(`${api.base}weather?q=${this.state.location}&lang=${this.context.language}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                  //console.warn(result);
                  //return result;
                  dispatch({ type: "SET_WEATHER", payload: result });
                }).catch(error => {
                  console.error(error);
                })
            }
        }
    }

    onChange = e =>
        this.setState({
        [e.target.name]: e.target.value
    });

    findByLocation = (dispatch) => {
        this.setState({location: ''});
        dispatch({ type: "CLEAR_WEATHER", payload: null });

        console.log(this.context);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
        
                //let endpoint = `${api.base}weather?lat=${lat}&lon=${lon}&lang=${this.context.language}&units=metric&APPID=${api.key}`;
                let endpoint = `${api.base}weather?lat=${lat}&lon=${lon}&lang=${this.context.language}&units=metric&APPID=${api.key}`;
        
                fetch(endpoint)
                    .then(res => res.json())
                    .then(result => {
                        //console.log(result);
                        //return result;
                        dispatch({ type: "SET_WEATHER", payload: result });

                    }).catch(error => {
                      //TODO: show error message
                    });
        
            }, error => {console.error(error)},
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000});
          } else {
            console.error("Geolocation is not supported by this browser.");
          }

        // dispatch({ type: "FIND_BY_LOCATION", payload: '' });
    }

    // componentDidMount() {
    //     fetch(`${api.base}weather?q=vancouver&lang=en&units=metric&APPID=${api.key}`)
    //         .then(res => res.json())
    //         .then(result => {
    //             console.warn(result);
    //             return result;
    //         }).catch(error => {
    //             console.error(error);
    //         })
    // }

    render() { 
        return(
            <WeatherConsumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className = "search-box" >
                            <input type = "text"
                            name="location" id="location"
                            className = "search-bar"
                            placeholder = "Search..."
                            onChange={this.onChange}
                            value={this.state.location}
                            onKeyPress={this.search.bind(this, dispatch)}
                            />
                            <button type="button" className="gps" onClick={this.findByLocation.bind(this, dispatch)}>&#8982;</button>
                        </div>
                    )
                }}
            </WeatherConsumer>
        );
    }
}

export default Searchbar;