import React, { Component, Fragment } from 'react'
import { CLIENT_QUERY } from '../queries'
import { Query } from 'react-apollo'

import FormEditClient from './FormEditClient'
import { UPDATE_CLIENT } from '../mutations'

class editClient extends Component{
    state = { }
    render( ){
        const { id } = this.props.match.params
        // console.log(id)
        return (
        <Fragment>
            <h2 className="text-center">Edit client</h2>
            <div className="row justify-content-center">
                <Query query={ CLIENT_QUERY } variables={{id}} refetchQueries= {UPDATE_CLIENT}>
                    {({loading , error, data, refetch }) =>{
                        if(loading) return 'Loading...'
                        if(error) return `Error ${error.message}`
                        return (
                            <FormEditClient 
                            client={data.getClient} 
                            refetch = {refetch}
                            />
                            )
                        // console.log(data)    
                        }}
                </Query>  
            </div>
        </Fragment>
        );
    }
}

export default editClient;