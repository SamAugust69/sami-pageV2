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

const handleExportLog = async (forms: Array<any>, setLoading?: React.SetStateAction<any>) => {
	const clonedForms = structuredClone(forms);
	setLoading && setLoading(true);
	clonedForms.map((log: any) => {
		log.disabled = true;
		axios
			.request({
				method: 'POST',
				url: 'https://api.samifart.com/',
				headers: { 'Content-Type': 'application/json' },
				data: log,
			})
			.then(function (response) {
				console.log(response.data);
				setLoading && setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
			});
	});
};

export { handleDeleteLog, handleFetchLog, handleExportLog };
