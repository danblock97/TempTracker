"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import WeeklyForecast from "../components/WeeklyForecast";
import AirCondition from "@/components/AirCondition";
import Loading from "react-loading";

export default function Home() {
	const [city, setCity] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const savedCity = sessionStorage.getItem("city");
		if (savedCity) {
			setCity(savedCity);
		}
	}, []);

	const handleSearch = (location) => {
		setLoading(true);
		setCity(location);
		sessionStorage.setItem("city", location);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	return (
		<div className="bg-gray-900 min-h-screen text-white p-4 flex flex-col justify-between">
			<SearchBar onSearch={handleSearch} />
			{loading ? (
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
