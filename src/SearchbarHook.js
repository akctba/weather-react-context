import React, { Component } from 'react';
import './index.css';

import { WeatherConsumer } from "./weatherContext";

class Searchbar extends Component {

    state = {
        location: ""
    }

    static contextType = WeatherConsumer; //This code is generating a warning: Searchbar defines an invalid contextType. contextType should point to the Context object returned by React.createContext(). Did you accidentally pass the Context.Consumer instead?

    search = (dispatch, e) => {
        
        if(this.state.location) {
            if (e.key === "Enter") {

                dispatch({ type: "CLEAR_WEATHER", payload: null });

                fetch(`${process.env.REACT_APP_BASE}weather?q=${this.state.location}&lang=${this.context.language}&units=metric&APPID=${process.env.REACT_APP_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        dispatch({type: "SHOW_MESSAGE", payload: "Data doesn't found."});
                    }
                    return response.json();
                  })
                .then(result => {
                    if(typeof result == "undefined" || typeof result.main == "undefined" || result.cod === "404") {
                        dispatch({type: "SHOW_MESSAGE", payload: "No data to that location. " + (result.cod === "404" ? result.message : "") });
                    } else {
                        dispatch({ type: "SET_WEATHER", payload: result });
                    }
                }).catch(error => {
                    dispatch({type: "SHOW_MESSAGE", payload: error});
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

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                
                let endpoint = `${process.env.REACT_APP_BASE}weather?lat=${lat}&lon=${lon}&lang=${this.context.language}&units=metric&APPID=${process.env.REACT_APP_KEY}`;
        
                fetch(endpoint)
                    .then(response => {
                        if (!response.ok) {
                            console.warn("Response not ok");
                            dispatch({type: "SHOW_MESSAGE", payload: "Data doesn't found."});
                        }
                        return response.json();
                      })
                    .then(result => {
                        if(typeof result == "undefined" || typeof result.main == "undefined" || result.cod === "404") {
                            dispatch({type: "SHOW_MESSAGE", payload: "No data to that location." + (result.cod === "404" ? result.message : "") });
                        } else {
                            dispatch({ type: "SET_WEATHER", payload: result });
                        }

                    }).catch(error => {
                      console.warn("Catch errorrrrrrr Response not ok");
                      dispatch({type: "SHOW_MESSAGE", payload: error});
                    });
        
            }, error => {console.error(error)},
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000});
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
    }

    render() { 
        return(
            <WeatherConsumer>
                {value => {
                    const { dispatch, message } = value;
                    return (
                        <>
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
                        <div className={(message?"show-":"no-")+"message"}>
                            Message: {message}
                        </div>
                        </>
                    )
                }}
            </WeatherConsumer>
        );
    }
}

export default Searchbar;