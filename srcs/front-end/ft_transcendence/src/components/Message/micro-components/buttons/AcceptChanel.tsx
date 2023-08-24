import { useMutation } from "@apollo/client";
import { IRequest } from "../../../interfaces/interfaces";
import { ACCEPT_CHANEL } from '../../graphql/Mutation'
import accept_logo from '../../../../image/accept-check-good-mark.svg'

export default function AcceptChanel({element, handleChanelRefetch, label}: IRequest ) {


	const [acceptChanel] = useMutation(ACCEPT_CHANEL)

	const handleClick = () =>{
			acceptChanel({
				variables: {
					input: {
						user_id: element.user_id,
						chanel_id: element.chanels.id,
						is_admin: false,
						is_muted: false,
						mute_start_time: 0,
					}
				}
			}).then((response) => {
				handleChanelRefetch();
			}).catch((error) => {
				console.log("Error: ", error.networkError.result);
			})
	}

	return (
		<button onClick={handleClick} className="req-chan-btn">
			<img src={accept_logo} alt="accept"  id="accept-chan-req-btn"/>
		</button>
	)
}
