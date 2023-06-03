import axios from "axios";

const handleDeleteLog = (logToDeleteId: string) => {
	console.log(logToDeleteId);
};

const handleFetchLog = async (setLog: any) => {
	axios
		.request({ method: "GET", url: "https://api.samifart.com/" })
		.then((response) => {
			console.log("Retrieved logs from server");
			setLog(response.data);
		})
		.catch((error) => {
			console.log("Couldn't retrieve logs from server");
		});
};

export { handleDeleteLog, handleFetchLog };
