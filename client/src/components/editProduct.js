import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { PRODUCT_CONSULT } from '../queries'
import FormEdit from './FormEdit'


class editProduct extends Component{
    state= {
        
    }

    render(){
        const { id } = this.props.match.params
        console.log(id)
        return(
            <Fragment>
                <h1 className="text-center">Edit Product</h1>

                <div className="row justify-content-center">
                    <Query query={PRODUCT_CONSULT} variables={{id}}>
                        {({ loading, error, data , refetch}) => {
                            if(loading) return 'Loading...'
                            if(error) return `Error ${error.message}`

                            return (
                                <FormEdit product={data} id={id} refetch={refetch}>

                                </FormEdit>
                            )
                        }}


                    </Query>
                </div>
            </Fragment>
        )
    }
}

export default editProduct