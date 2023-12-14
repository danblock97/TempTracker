import axios from "axios";

export default async function handler(req, res) {
	const { location } = req.query;

	if (!location) {
		return res.status(400).json({ error: "Location is required" });
	}

	try {
		const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

		const response = await axios.get(url);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
