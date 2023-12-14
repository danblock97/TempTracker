import React, { useState, useEffect } from "react";
import axios from "axios";

const Forecast = ({ city }) => {
	const [forecastData, setForecastData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchForecast = async () => {
			try {
				const response = await axios.get(
					`/api/forecast?location=${encodeURIComponent(city)}`
				);
				setForecastData(response.data);
				setError(null);
			} catch (err) {
				setError("Error fetching forecast data");
				console.error(err);
			}
		};

		if (city) {
			fetchForecast();
		}
	}, [city]);

	if (error) return <div className="text-red-500">{error}</div>;
	if (!forecastData) return <div className="text-gray-500"></div>;

	const numberOfForecastsToShow = 5;
	const limitedForecastList = forecastData.list.slice(
		0,
		numberOfForecastsToShow
	);

	return (
		<div className="bg-gray-900 text-white p-4 rounded-xl">
			<div className="flex justify-center md:justify-start mb-4">
				<h2 className="text-xl md:text-2xl font-semibold">
					Daily Forecast for {city}
				</h2>
			</div>
			<div className="flex justify-start items-center overflow-x-auto space-x-4">
				{limitedForecastList.map((item, index) => (
					<div
						key={index}
						className="min-w-[33%] md:min-w-0 p-4 bg-gray-800 text-center rounded-md shadow-md"
					>
						<p className="text-sm">
							{new Date(item.dt_txt).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
						<img
							src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
							alt={item.weather[0].main}
							className="w-16 h-16 mx-auto"
						/>
						<p className="text-lg font-semibold">
							{Math.round(item.main.temp)}°C
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Forecast;
