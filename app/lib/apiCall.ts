import axios from 'axios';
import { FC } from 'react';

interface fetchProps {
	url: string;
	onErr?: Function;
}

const fetchTBA: FC<fetchProps> = async ({ url, onErr }) => {
	// const options = {
	// 	method: 'GET',
	// 	url,
	// 	headers: {
	// 		'User-Agent': 'insomnia/8.6.1',
	// 		'X-TBA-Auth-Key': 'b0x6OyMXQj1bw90pvhTXLFoBsvLTk1ygBXSKCaDpFdDrLXmoZ52Yxws8VPCkvnFG',
	// 	},
	// };
	// return new Promise((resole, reject) => {
	// 	axios
	// 		.request(options)
	// 		.then(function (response) {
	// 			resole(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 			onErr != undefined ? onErr() : null;
	// 		});
	// });
	return new Promise(async () => await axios.get(url)
	}))
};

export default fetchTBA;
