"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import WeeklyForecast from "../components/WeeklyForecast";
import AirCondition from "@/components/AirCondition";
import Loading from "react-loading"; // Import the Loading component from react-loading

export default function Home() {
	const [city, setCity] = useState("");
	const [loading, setLoading] = useState(false); // Add a loading state

	useEffect(() => {
		const savedCity = sessionStorage.getItem("city");
		if (savedCity) {
			setCity(savedCity);
		}
	}, []);

	const handleSearch = (location) => {
		setLoading(true); // Set loading to true when searching
		setCity(location);
		sessionStorage.setItem("city", location);
		setLoading(false); // Set loading to false when data is loaded
	};

	return (
		<div className="bg-gray-900 min-h-screen text-white p-4 flex flex-col justify-between">
			<SearchBar onSearch={handleSearch} />
			{loading ? (
				// Display the loading component when loading is true
				<div className="flex justify-center items-center h-screen">
					<Loading type="bars" color="#ffffff" height={100} width={100} />
				</div>
			) : (
				city && (
					<div>
						<CurrentWeather city={city} />
						<AirCondition city={city} />
					</div>
				)
			)}
			{loading ? (
				// Display the loading component when loading is true
				<div className="flex justify-center items-center h-screen">
					<Loading type="bars" color="#ffffff" height={100} width={100} />
				</div>
			) : (
				city && (
					<div className="lg:flex lg:gap-4">
						<div className="flex-grow">
							<DailyForecast city={city} />
						</div>
						<div className="flex-grow">
							<WeeklyForecast city={city} />
						</div>
					</div>
				)
			)}
		</div>
	);
}
