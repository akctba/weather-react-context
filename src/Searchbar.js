import React, { Component } from 'react';
import './index.css';

/*********************
 * 
 * This file it's not in use, it's here just for historic pourpose.
 * See SearchbarHook.js to Hooks version.
 * 
 *********************/

import { WeatherConsumer } from "./weatherContext";

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

                //fetch(`${api.base}weather?q=${this.state.location}&lang=${this.context.language}&units=metric&APPID=${api.key}`)
                fetch(`${process.env.REACT_APP_BASE}weather?q=${this.state.location}&lang=${this.context.language}&units=metric&APPID=${process.env.REACT_APP_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        console.warn("Response not ok");
                        dispatch({type: "SHOW_MESSAGE", payload: "Data doesn't found."});
                        //throw new Error('Network response was not ok');
                    }
                    return response.json();
                  })
                .then(result => {
                  //dispatch({ type: "SET_WEATHER", payload: result });
                    if(typeof result == "undefined" || typeof result.main == "undefined" || result.cod === "404") {
                        dispatch({type: "SHOW_MESSAGE", payload: "No data to that location. " + (result.cod === "404" ? result.message : "") });
                    } else {
                        dispatch({ type: "SET_WEATHER", payload: result });
                    }
                }).catch(error => {
                    console.warn("Prime errorrrrrrr Response not ok");
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

        //console.log(this.context);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
        
                //let endpoint = `${api.base}weather?lat=${lat}&lon=${lon}&lang=${this.context.language}&units=metric&APPID=${api.key}`;
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
                        //console.log(result);
                        //return result;
                        if(typeof result == "undefined" || typeof result.main == "undefined" || result.cod === "404") {
                            dispatch({type: "SHOW_MESSAGE", payload: "No data to that location." + (result.cod === "404" ? result.message : "") });
                        } else {
                            dispatch({ type: "SET_WEATHER", payload: result });
                        }

                    }).catch(error => {
                      //TODO: show error message
                      console.warn("Catch errorrrrrrr Response not ok");
                      dispatch({type: "SHOW_MESSAGE", payload: error});
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