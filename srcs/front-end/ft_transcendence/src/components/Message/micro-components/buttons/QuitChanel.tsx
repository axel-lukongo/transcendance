import { useMutation } from "@apollo/client";
import { IRequest } from '../../../interfaces/interfaces'
import { QUITE_CHANEL } from '../../graphql/Mutation'
import refuse_logo from '../../../../image/refuse-danger.svg'

export default function QuiteChanel({handleChanelRefetch,  element, label}: IRequest) {

	
	const [delContact] = useMutation(QUITE_CHANEL);

	const handleClic =  () => {
		delContact({
			variables: {
				input: {
					chanel_id: element.chanels.id
				}
			}
		}).then(() => {
			handleChanelRefetch();
		})
		.catch((error) => {
			console.log("Graphql error: ", error);
			console.log("HTML error: ", error.networkError.result);
		});
	};

	return (
		<button onClick={handleClic} className="req-chan-btn" >
			<img src={refuse_logo} alt="refuse" id="refuse-chan-req-btn"/>
		</button>
	)
}