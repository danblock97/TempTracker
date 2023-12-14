import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
	const [location, setLocation] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(location);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex justify-center items-center ml-4 mr-4 md:ml-10 md:mr-10"
		>
			<input
				type="text"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				placeholder="Enter Location"
				className="text-center w-full md:max-w-md p-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 outline-none transition duration-300 ease-in-out shadow-md"
			/>
		</form>
	);
};

export default SearchBar;
