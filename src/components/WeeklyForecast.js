import React, { useState, useEffect } from "react";
import axios from "axios";

const WeeklyForecast = ({ city }) => {
	const [forecastData, setForecastData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWeeklyForecast = async () => {
			try {
				const response = await axios.get(
					`/api/forecast?location=${encodeURIComponent(city)}`
				);
				setForecastData(response.data);
				setError(null);
			} catch (err) {
				setError("Error fetching weekly forecast data");
				console.error(err);
			}
		};

		if (city) {
			fetchWeeklyForecast();
		}
	}, [city]);

	if (error) return <div className="text-red-500">{error}</div>;
	if (!forecastData) return <div className="text-gray-500"></div>;

	const dailyForecasts = forecastData.list.filter(
		(item, index) => index % 8 === 0
	);

	return (
		<div className="md:block bg-gray-800 text-white p-4 rounded-lg shadow-lg">
			<h2 className="text-xl font-bold text-center mb-4">WEEKLY FORECAST</h2>
			<div className="divide-y divide-gray-600">
				{dailyForecasts.map((item, index) => (
					<div key={index} className="grid grid-cols-4 py-2">
						<div className="text-left text-sm md:text-md">
							{new Date(item.dt * 1000).toLocaleDateString("en-US", {
								weekday: "short",
							})}
						</div>
						<div className="mr-6 flex justify-center items-center">
							<img
								src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
								alt={item.weather[0].main}
								className="w-8 h-8"
							/>
							<span className="ml-2 text-xs">{item.weather[0].main}</span>
						</div>
						<div className="text-right text-xs md:text-md">
							{Math.round(item.main.temp_max)}°C /{" "}
							{Math.round(item.main.temp_min)}°C
						</div>
						<p className="text-xs md:text-md md:font-semibold text-right col-span-1">
							Rain {forecastData.list[0].pop}%
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default WeeklyForecast;
