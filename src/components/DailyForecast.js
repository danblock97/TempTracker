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
		<div className="bg-gray-800 text-white p-4 mb-5 rounded-xl">
			<h2 className="text-xl font-bold text-center mb-4">DAILY FORECAST</h2>
			<div className="divide-y divide-gray-600">
				{limitedForecastList.map((item, index) => (
					<div key={index} className="grid grid-cols-3 py-2 items-center">
						<p className="text-sm col-span-1">
							{new Date(item.dt_txt).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
						<div className="flex justify-center items-center">
							<img
								src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
								alt={item.weather[0].main}
								className="w-8 h-8"
							/>
							<span className="ml-2">{item.weather[0].main}</span>
						</div>
						<p className="text-lg font-semibold text-right col-span-1">
							{Math.round(item.main.temp)}°C
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Forecast;
