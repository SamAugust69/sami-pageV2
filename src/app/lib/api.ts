import axios from 'axios';

const handleDeleteLog = (logToDeleteId: string) => {
	console.log(logToDeleteId);
	axios
		.request({
			method: 'DELETE',
			url: `https://api.samifart.com/${logToDeleteId}`,
			headers: { 'Content-Type': 'application/json' },
		})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
};

const handleFetchLog = async (setLog: any) => {
	axios
		.request({ method: 'GET', url: 'https://api.samifart.com/' })
		.then((response) => {
			console.log('Retrieved logs from server');
			setLog(response.data);
		})
		.catch((error) => {
			console.log("Couldn't retrieve logs from server");
		});
};

export { handleDeleteLog, handleFetchLog };
