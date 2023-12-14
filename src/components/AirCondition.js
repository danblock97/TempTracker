import React, { useState, useEffect } from "react";

const AirCondition = ({ city }) => {
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		async function fetchWeather() {
			try {
				const response = await fetch(
					`/api/weather?location=${encodeURIComponent(city)}`
				);
				const data = await response.json();
				setWeatherData(data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
				setWeatherData(null);
			}
		}

		fetchWeather();
	}, [city]);

	if (!weatherData) return <div></div>;

	const { main, wind } = weatherData;

	return (
		<div className=" text-white p-4">
			<div className="grid grid-cols-3 gap-4">
				<div className="flex flex-col items-center">
					<div className="text-md md:text-3xl font-semibold">
						{main.pressure} hPa
					</div>
					<div className="text-xs md:text-sm">Pressure</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="text-md md:text-3xl font-semibold">
						{Math.round(wind.speed)} mph
					</div>
					<div className="text-xs md:text-sm">Wind Speed</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="text-md md:text-3xl font-semibold">
						{main.humidity}%
					</div>
					<div className="text-xs md:text-sm">Humidity</div>
				</div>
			</div>
		</div>
	);
};

export default AirCondition;
