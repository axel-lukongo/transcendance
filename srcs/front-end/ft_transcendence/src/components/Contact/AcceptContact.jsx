import { gql, useMutation } from "@apollo/client";

const ACCEPTE_CONTACT = gql`mutation ReplyAddContact($input: updateContact){
	replyAddContact(reply: $input) {
		id
	}
}`

export default function AcceptContact({element, refetch}) {

	const [acceptContact] = useMutation(ACCEPTE_CONTACT);

	const handleClick = (e) => {
		console.log(e)
		acceptContact({
			variables: {
				input: {
					id: element.id,
					pending: false
				}
			}
		})
	} 


	return (<div>
		<button onClick={handleClick}>Accept</button>
	</div>);
}