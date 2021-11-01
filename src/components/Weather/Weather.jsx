import './weather.scss';

import axios from 'axios';

import { useState } from 'react';

// Icons

import { AiOutlineSearch } from 'react-icons/ai';

const Weather = () => {

    const API_KEY = 'b190a0605344cc4f3af08d0dd473dd25';

    // All items to be retrieved from API with their corresponding states to be updated.

    const [ input, setInput ] = useState('');
    const [ location, setLocation ] = useState('London');
    const [ temp, setTemp ] = useState(0);
    const [ feelsLike, setFeelslike ] = useState(0);
    const [ humidity, setHumidity ] = useState(0);
    const [ description, setDescription ] = useState('Partly Sunny');
    const [ icon, setIcon ] = useState('02d');

    // Below tracks what the user has written into the input field.

    const onChangeHandler = e => {
        setInput(e.target.value);
    }

    // Below prevents a default refresh and also fetches data from the API of which the input      changes dynamically based on what the user has typed.

    const submitHandler = async e => {
        e.preventDefault();

        const result = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`);

        // Data to be retrieved and updated via state shown below

        
        setLocation(result.data.name);
        setTemp(result.data.main.temp);
        setFeelslike(result.data.main.feels_like);
        setHumidity(result.data.main.humidity);
        setDescription(result.data.weather[0].description);
        setIcon(result.data.weather[0].icon);
        
    }

    return (
        <div className="weather">

            <h1 className="weather__title">Weather App by <span>Vay Kaushik</span></h1>

            <div className="weather__card">

                <div className="weather__card__search">
                    <input type="text" value={input} onChange={onChangeHandler} placeholder="Search location i.e. 'London'"/>
                    <button type="submit" onClick={submitHandler}><AiOutlineSearch/></button>
                </div>

                <div className="weather__card__data">
                    <h2 className="location"><span>{location}</span></h2>
                    <h1 className="weather__card__title">Current Temp: <span>{temp}</span><span className="symbol">°C</span></h1>
                    <h1 className="weather__card__title">Feels Like: <span>{feelsLike}</span><span className="symbol">°C</span></h1>
                    <h1 className="weather__card__title">Humidity: <span>{humidity}</span><span className="symbol">%</span></h1>
                    <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="icon" />
                    <h1 className="weather__card__title">Description: {description}</h1>
                </div>

            </div>
        </div>
    );
};

export default Weather;