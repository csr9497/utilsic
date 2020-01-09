import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
    query getClients($limit: Int, $offset:Int){
        getClients(limit:$limit, offset:$offset){
            id
            name
            last_name
        }
        countClients
    }
`

export const CLIENT_QUERY = gql`
    query consultClient($id: ID){
        getClient(id:$id){
            id
            name
            last_name
            job
            emails{
             email
            }     
            edad
            tipo       
        }
    }
`

export const PRODUCTS_QUERY = gql`
    query getProducts($limit: Int, $offset:Int){
        getProducts(limit: $limit, offset: $offset){
            id
            name
            model
            brand
            price
            stock
            delay
        }
        countProducts
    }
`
export const PRODUCT_QUERY = gql`
    query getProduct($id : ID){
        getProduct(id : $id){
            id
            name
            model
            brand
            price
            stock
            delay
        }
    }
`