import axios from "axios";

const baseURL = process.env.API_URL;

const request = axios.create({
	baseURL,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

export default request;
