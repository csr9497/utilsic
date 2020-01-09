import gql from 'graphql-tag';


export const NEW_CLIENT = gql`
mutation createClient($input: ClientInput){
    createClient(input : $input ){
        id
        name
        last_name
    }
}

`

export const UPDATE_CLIENT = gql`
    mutation updateClient($input: ClientInput){
        updateClient(input: $input){
            id
            name
            last_name
            job
            edad
            tipo
            emails{
                email
            }

        }
    }
`

export const DELETE_CLIENT = gql`
    mutation removeClient($id: ID!){
        removeClient(id: $id)
    }
`

export const NEW_PRODUCT = gql`
    mutation newProduct($input : ProductInput){
        createProduct(input : $input ){
            name
            model
            brand
            price
            stock
            delay
  }
}
`
export const UPDATE_PRODUCT = gql`
    mutation updateProduct($input: ProductInput){
        updateProduct(input: $input){
            name
            model
            brand
            price
            stock
            delay
  }
    }
`

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!){
        deleteProduct(id: $id)
    }
`
