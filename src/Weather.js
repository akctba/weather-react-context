import React from 'react';

import { WeatherConsumer } from "./weatherContext";
import {dateBuilder} from "./Util";

//import LanguageCombo from "./LanguageCombo";
import LanguageFunction from './LanguageFunction';
import Searchbar from './Searchbar';

class Weather extends React.Component {
    state = {}

    render() {
        return(
            <WeatherConsumer>
                {data => {
                    const { weather } = data;

                    return (
                        <div className="app">
                            <main>
                                <Searchbar />
                                <LanguageFunction />  <span>Selected language {data.language}</span>
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
            </WeatherConsumer>
        );
    }
}

export default Weather;
