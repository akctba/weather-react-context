import React from 'react';

import { Consumer } from "./Context";
import {dateBuilder} from "./Util";

import LanguageCombo from "./LanguageCombo";
import Searchbar from './Searchbar';

class Weather extends React.Component {
    state = {}

    render() {
        return(
            <Consumer>
                {data => {
                    const { weather } = data;

                    return (
                        <div className="app">
                            <main>
                                <Searchbar />
                                <LanguageCombo />

                                 {(typeof weather.main != "undefined") ? ( 
                                    <div className="location-box">
                                        <div className="location">{weather.name}, {weather.sys.country}</div>
                                        <div className="date">{dateBuilder(new Date())}</div>
                                        <div className="temp">{Math.round(weather.main.temp)}&#8451;</div>
                                        <div className="feels">Feels like {Math.round(weather.main.feels_like)}&#8451;</div>
                                        <div className="feels">Min {Math.round(weather.main.temp_min)}&#8451; - Max {Math.round(weather.main.temp_max)}&#8451;</div>

                                        <div className="weather-list">
                                            <img alt={weather.weather[0].description}
                                                src={"http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"} />
                                            <p className="weather">
                                                {weather.weather[0].main}
                                            </p>
                                        </div>

                                    </div>
                                 ) : ('Wait...')}
                            </main>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Weather;
