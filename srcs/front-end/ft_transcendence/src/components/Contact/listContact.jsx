import { gql, useQuery } from "@apollo/client"

const CONTACTS = gql`query GetContactList($input: Int!){
	contacts(user_id: $input){
		pending
		contact {
		  nickname
		  email
		  token
		}
	  }
}` 


export default function ContactListPending() {

	const {data, isLoading, error} = useQuery(CONTACTS, {variables: {input: 1}});

	if (isLoading)
		return (<div><p>Loading...</p></div>);
	
	if (error){
		console.log(error);
		return (<div>An error as occured!</div>);
	}

	if (!data)
		return (<div>No data</div>);
	
	return (<div>
		<h3>List Contact</h3>
		{data.contacts.map((element, index) => (
			<li key={index}>
			{ element.pending && ( 
				<div>
					<h4>{element.contact.nickname.toString()}</h4>
					<div>email: {element.contact.email.toString()} </div>
					<div>token: {element.contact.token.toString()} </div>
					<div>Pending: {element.pending.toString()} </div>
				</div>
				)} 
			</li>
		))}
	</div>);
}