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
	`
}

export default product