import React from 'react';

export default function Conditions(props) {
    return(
        props.condition.map((c, i) => (
            <div className="weather-list" key={"con"+i}>
                <img alt={c.description}
                    src={"http://openweathermap.org/img/wn/"+c.icon+"@2x.png"} />
                <p className="weather">
                    {c.description}
                </p>
            </div>
        ))
        
    );
}
