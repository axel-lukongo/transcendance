import { gql, useMutation } from "@apollo/client";

const ACCEPTE_CONTACT = gql`mutation ReplyAddContact($input: updateContact){
	replyAddContact(reply: $input) {
		id
	}
}`

export default function AcceptContact({element, refetch}) {

	const [acceptContact] = useMutation(ACCEPTE_CONTACT);

	const handleClick = (e) => {
		acceptContact({
			variables: {
				input: {
					id: element.id,
					pending: false
				}
			}
		})
		// console.log(element.id);
	} 


	return (<div>
		<button onClick={handleClick}>Accept</button>
	</div>);
}