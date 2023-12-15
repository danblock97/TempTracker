import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrentWeather = ({ city }) => {
	const [weatherData, setWeatherData] = useState(null);
	const [forecastData, setForecastData] = useState(null);

	useEffect(() => {
		async function fetchWeather() {
			try {
				const response = await axios.get(
					`/api/weather?location=${encodeURIComponent(city)}`
				);
				setWeatherData(response.data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
				setWeatherData(null);
			}
		}

		fetchWeather();
	}, [city]);

	useEffect(() => {
		const fetchForecast = async () => {
			try {
				const response = await axios.get(
					`/api/forecast?location=${encodeURIComponent(city)}`
				);
				setForecastData(response.data);
				console.log("forecast data", forecastData);
			} catch (error) {
				console.error("Error fetching forecast data:", error);
				console.error(error);
			}
		};

		if (city) {
			fetchForecast();
		}
	}, [city]);

	if (!weatherData) return <div></div>;
	if (!forecastData) return <div></div>;

	return (
		<div className="bg-gray-900 text-white p-4 rounded-xl mb-2">
			<h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
				{weatherData.name}, {forecastData.city.country}
			</h2>
			<div className="flex flex-col items-center">
				<img
					src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
					alt={weatherData.weather[0].main}
					className="w-16 h-16 mb-2"
				/>
				<div className="text-6xl font-light text-center">
					{Math.round(weatherData.main.temp)}°C
					<p className="text-xs text-gray-500 font-semibold mt-3 md:text-sm">
						Feels like {Math.round(weatherData.main.feels_like)}°C / High:{" "}
						{Math.round(weatherData.main.temp_max)}°C / Low:{" "}
						{Math.round(weatherData.main.temp_min)}°C
					</p>
					<p className="text-xs text-gray-500 font-semibold mt-3 md:text-sm">
						{forecastData.list[0].pop}% Chance of Rain
					</p>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
