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
	`,
	cart:gql`
		query {
			user{
				cart{
					_id
					product{
						_id
						name
						price
						image
					}
					quantity
				}
			}
		}
	`,
	addCart:gql`
		mutation addCart ($newCart: newCartItem){
			addCart(newCartItem:$newCart){
				quantity
			}
		}
	`,
	editCart: gql`
		mutation editCart($cartId: String, $quantity: Int){
			editCart(cartId: $cartId, quantity: $quantity){
				_id
				product {
					_id
					name
					price
					image
				}
				user {
					_id
					username
					email
					password
				}
				quantity
			}
		}
	`,
	deleteCart: gql`
		mutation deleteCart($cartId: String){
			deleteCart(cartId: $cartId){
				_id
				product {
					_id
					name
					price
					image
				}
				user {
					_id
					username
					email
					password
				}
				quantity
			}
		}
	`
}

export default product
