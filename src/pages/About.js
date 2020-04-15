import React from 'react';

export default function About() {
    return(
        <>
            <div className="about">
                <h1> 
                    Weather Context Project - By Alex Kayser
                </h1>
                <p>
                    The aim of this React project is to show Context API in use. The data is provided by OpenWeatherMap API.
                </p>
                <p>Node modules: </p>
                <ul>
                    <li>ReactJS</li>
                    <li>node-sass</li>
                    <li>react-dom</li>
                    <li>react-router-dom</li>
                    <li>react-app</li>
                </ul>
            </div>
        </>
    );
}