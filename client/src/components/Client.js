import React, {Component, Fragment} from 'react';
import { Query, Mutation } from 'react-apollo';

import { CLIENTS_QUERY } from '../queries'; 
import { DELETE_CLIENT } from '../mutations'

import { Link } from 'react-router-dom';

import Paginator from './Paginator'
import Success from './Success'

class Clients extends Component{
    limit = 5
    state={
        paginator: {
            offset: 0,
            page:1
        },
        alert:{
            show: false,
            message: ''
        }
    }
    
    previouspage = () =>{
        this.setState({
            paginator: {
                offset: this.state.paginator.offset - this.limit,
                page: this.state.paginator.page - 1 
            }
        })
    }

    nextpage = () =>{
        this.setState({
            paginator: {
                offset: this.state.paginator.offset + this.limit,
                page: this.state.paginator.page + 1 
            }
        })
    }
    render(){
        
        const { alert: {show, message}} = this.state
        const alert = (show) ? <Success message={message} /> : ''
        return (
            <Query query={CLIENTS_QUERY} pollInterval={400} variables={{limit: this.limit, offset:this.state.paginator.offset}}>
                {({loading, error ,data, startPolling, stopPolling})=>{
                    if(loading) return "Loading...";
                    if(error) return `Error: ${error.message}`;
                    return (
                        <Fragment>
                            <h2 className="text-center"> List's clients</h2>
                            {alert}
                            <ul className="list-group mt-4">
                                {data.getClients.map(item=>{
                                    const { id }= item
                                    return (

                                    <li key={item.id} className="list-group-item">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                {item.name} {item.last_name}
                                            </div>
                                        <div className="col-md-4 d-flex justify-content-end">
                                            <Link to={`client/edit/${item.id}`} className="btn btn-success d-block d-md-inline-block mr-2">
                                                &#x270E;
                                            </Link>
                                            <Mutation 
                                                mutation={DELETE_CLIENT}
                                                onCompleted={(data) => {
                                                    this.setState({
                                                        alert:{
                                                            show:true,
                                                            message: data.removeClient
                                                        }
                                                    },() => {
                                                        setTimeout(()=>{
                                                            this.setState({
                                                                alert:{
                                                                    show:false,
                                                                    message:''
                                                                }
                                                            })
                                                        },2500)
                                                    })
                                                }}
                                            >
                                                {removeClient => (
                                                    <button 
                                                    type="button" 
                                                    className="btn btn-danger d-block d-md-inline-block "
                                                    onClick={()=>{
                                                    if(window.confirm('Seguro que deseas eliminar este usuario?')){
                                                        removeClient({
                                                            variables: {id}
                                                        })
                                                    }
                                                    }}
                                                    >
                                                        &times;
                                                    </button>
                                                )}
                                                </Mutation>     
                                            </div>
                                        </div>
                                    </li>
                                )})}
                            </ul>
                            <Paginator 
                                page={this.state.paginator.page }
                                countPages = {data.countClients}
                                limit = {this.limit}
                                nextpage = {this.nextpage}
                                previouspage= {this.previouspage}
                            />
                        </Fragment>
                    )
                }}
            </Query> 
        )
    }
}
export default Clients;