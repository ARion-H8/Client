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
						obj_url
						obj_name
						texture_url
						texture_2
						texture_img1
						texture_img2
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
				quantity
			}
		}
	`,
	deleteCart: gql`
		mutation deleteCart{
			deleteCart(cartId: $cartId){
				_id
			}
		}
	`,
	deleteCartProduct: gql`
		mutation deleteCartProduct($cartId: String){
			deleteCartProduct(cartId: $cartId){
				_id
			}
		}
	`
}

export default product
