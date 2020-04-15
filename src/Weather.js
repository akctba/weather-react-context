import React from 'react';

import { WeatherConsumer } from "./weatherContext";
import {dateBuilder, parseTime} from "./Util";

//import LanguageCombo from "./LanguageCombo";
import LanguageFunction from './LanguageFunction';
import Searchbar from './Searchbar';
import Conditions from './Conditions';

class Weather extends React.Component {
    state = {}

    // componentDidMount() {
    //     return(
    //         <WeatherConsumer>
    //         {value => {
    //             const { dispatch } = value;
    //             fetch(`https://api.openweathermap.org/data/2.5/weather?q=vancouver&lang=${this.context.language}&units=metric&APPID=720b1a41660c87e3beb3873ed2143b01`)
    //             .then(res => res.json())
    //             .then(result => {
    //                 //console.warn(result);
    //                 //return result;
    //                 dispatch({ type: "SET_WEATHER", payload: result });
    //             }).catch(error => {
    //                 console.error(error);
    //             })
    //         }}
    //         </WeatherConsumer>
    //     );
    // }

    render() {
        return(
            <WeatherConsumer>
                {data => {
                    const { weather } = data;
                    // console.log("dataaaa");
                    // console.log(data);
                    return (
                        <div className="app">
                            <main>
                                <Searchbar />
                                <LanguageFunction />
                                 {(typeof weather != "undefined" && typeof weather.main != "undefined") ? ( 
                                    <div className="location-box">
                                        <div className="location">{weather.name}, {weather.sys.country}</div>
                                        <div className="date">{dateBuilder(new Date())}</div>
                                        <div className="temp">{Math.round(weather.main.temp)}&#8451;</div>
                                        <div className="feels">Feels like {Math.round(weather.main.feels_like)}&#8451;</div>
                                        <div className="feels">Min {Math.round(weather.main.temp_min)}&#8451; - Max {Math.round(weather.main.temp_max)}&#8451;</div>
                                        <div className="feels">
                                            <span role="img" aria-labelledby="sunrise">&#x1f305;</span> {parseTime(weather.sys.sunrise, weather.timezone)} <span role="img" aria-labelledby="sunset">&#127748;</span> {parseTime(weather.sys.sunset, weather.timezone)}
                                        </div>

                                        <Conditions condition={weather.weather} />
 
                                    </div>
                                 ) : ('')}
                            </main>
                        </div>
                    );
                }}
            </WeatherConsumer>
        );
    }
}

export default Weather;
