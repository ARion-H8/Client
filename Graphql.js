import gql from 'graphql-tag'

let product = {
	show: gql`
		query {
			products{
					_id
					name
					price
					image
			}
		}
	`,
	signIn: gql`
		mutation signIn($email: String, $password: String){
			signIn(email: $email, password: $password){
				password
				email
				token
			}
		}
	`,
	signUp: gql`
		mutation signUp($newUser: newUser){
			signUp(newUser: $newUser){
				username
				password
				email
			}
		}
	`
}

export default product