//import React, { Component } from 'react';
import React, { useState } from 'react';
import './index.css';

import { WeatherConsumer } from "./weatherContext";

// April 20th - changing from class to Hooks
//class Searchbar extends Component {
const Searchbar = props => {

    // this is a Hook...
    const [location, setLocation] = useState('');

    // ... that substitute the state
    // state = {
    //     location: ""
    // }

    // const contextType = WeatherConsumer; //This code is generating a warning: Searchbar defines an invalid contextType. contextType should point to the Context object returned by React.createContext(). Did you accidentally pass the Context.Consumer instead?

    const search = (dispatch, language, e) => {
        
        if(location) {
            if (e.key === "Enter") {

                dispatch({ type: "CLEAR_WEATHER", payload: null });

                fetch(`${process.env.REACT_APP_BASE}weather?q=${location}&lang=${language}&units=metric&APPID=${process.env.REACT_APP_KEY}`)
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

    const onChange = e => {
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
        setLocation(e.target.value);
    }

    const findByLocation = (dispatch, language) => {
        setLocation('');
        dispatch({ type: "CLEAR_WEATHER", payload: null });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                
                let endpoint = `${process.env.REACT_APP_BASE}weather?lat=${lat}&lon=${lon}&lang=${language}&units=metric&APPID=${process.env.REACT_APP_KEY}`;
        
                fetch(endpoint)
                    .then(response => {
                        if (!response.ok) {
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
                      dispatch({type: "SHOW_MESSAGE", payload: error});
                    });
        
            }, error => {console.error(error)},
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000});
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
    }

//    render() {  remove the render fucntion
        return(
            <WeatherConsumer>
                {value => {
                    const { dispatch, message, language } = value;
                    return (
                        <>
                        <div className = "search-box" >
                            <input type = "text"
                            name="location" id="location"
                            className = "search-bar"
                            placeholder = "Search..."
                            onChange={onChange}
                            value={location}
                            onKeyPress={search.bind(this, dispatch, language)}
                            />
                            <button type="button" className="gps" onClick={findByLocation.bind(this, dispatch, language)}>&#8982;</button>
                        </div>
                        <div className={(message?"show-":"no-")+"message"}>
                            Message: {message}
                        </div>
                        </>
                    )
                }}
            </WeatherConsumer>
        );
//    } //remove render function
}

export default Searchbar;