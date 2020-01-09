import React, {Component, Fragment} from 'react'
import { Query , Mutation } from 'react-apollo'
import { Link } from 'react-router-dom';
import { PRODUCTS_QUERY } from '../queries'
import { DELETE_PRODUCT } from '../mutations';
import Paginator from './Paginator'
import Success from './Success'



class Products extends Component{
    limit = 3 
    state = {
        paginator:{
            offset: 0,
            page: 1
        },
        alert:{
            show: false,
            message: ''
        }
    }

    previousPage = () => {
        this.setState({
            paginator:{
                offset: this.state.paginator.offset - this.limit,
                page: this.state.paginator.page - 1
            }
        })
    }
    

    nextPage = () => {
        this.setState({
            paginator:{
                offset: this.state.paginator.offset + this.limit,
                page: this.state.paginator + 1
            }
        })
    }

    render(){


        const { alert: {show, message}} = this.state
        const alert = (show) ? <Success message={message} /> : ''
        return(
            <Query query={ PRODUCTS_QUERY } pollInterval={400} variables={{limit: this.limit, offset: this.state.paginator.offset}}>
                {({ loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Loading...'
                    if(error) return `Error: ${error.message}`
                    return (
                        <Fragment>
                            <h2 className="text-center">List's products</h2>

                            { alert}
                            <ul className="list-group mt-4">
                            <table>
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Name</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Delay</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.getProducts.map( item =>{
                                        const { id } = item
                                        return (
                                            <tr key={ item.id }>
                                                <td>{ item.name}</td>
                                                <td>{ item.model}</td>
                                                <td>{ item.brand}</td>
                                                <td>{ item.price}</td>
                                                <td>{ item.stock}</td>
                                                <td>{ item.delay}</td>
                                                <td>
                                                    <Mutation 
                                                        mutation={DELETE_PRODUCT}
                                                        onCompleted={(data) => {
                                                            this.setState({
                                                                alert:{
                                                                    show:true,
                                                                    message: data.deleteProduct
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
                                                    {deleteProduct => (
                                                        <button 
                                                        type="button" 
                                                        className="btn btn-danger d-block d-md-inline-block "
                                                        onClick={()=>{
                                                        if(window.confirm('Seguro que deseas eliminar este producto?')){
                                                              deleteProduct({
                                                                variables: {id}
                                                            })
                                                        }
                                                        }}
                                                        >
                                                            &times;
                                                        </button>
                                                    )}
                                                    </Mutation>     
                                                    <Link to={`product/edit/${item.id}`} className="btn btn-success d-block d-md-inline-block mr-2">
                                                        &#x270E;
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </ul>
                        <Paginator 
                                page={this.state.paginator.page }
                                countPages = {data.countProducts}
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

export default Products