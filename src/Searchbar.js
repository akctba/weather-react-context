import React, { Component } from 'react';
import './index.css';

import { WeatherConsumer } from "./weatherContext";

class Searchbar extends Component {

    state = {
        location: ""
    }

    static contextType = WeatherConsumer;

    search = (dispatch, e) => {
        
        //console.log(`location com valor [${this.state.location}] `);
        if(this.state.location) {
            if (e.key === "Enter") {
                //console.log('ENTER pressionado location com valor ' + this.state.location);
                dispatch({ type: "FIND_BY_NAME", payload: e.target.value });
            }
        }
    }

    onChange = e =>
        this.setState({
        [e.target.name]: e.target.value
    });

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
                            <button type="button" className="gps">&#8982;</button>
                        </div>
                    )
                }}
            </WeatherConsumer>
        );
    }
}

export default Searchbar;