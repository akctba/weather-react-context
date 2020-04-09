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
                                        <div className="weather">
                                            <img alt={weather.weather[0].description}
                                                src={"http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"} />
                                            {weather.weather[0].main}
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
