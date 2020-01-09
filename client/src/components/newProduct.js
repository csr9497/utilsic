import React, {Component, Fragment} from 'react'
import { NEW_PRODUCT } from '../mutations'
import { Mutation } from 'react-apollo'

class newProduct extends Component{
    state = {
        name: '',
        model:'',
        brand:'',
        price: '',
        stock: '',
        delay:''
    }

    updateState = e =>{
        const { name, value } = e.target

        this.setState({
            [name] : value,
        })
    }

    validationForm = () => {
        const { name, model, brand, price, stock, delay } = this.state
        const valid = !name || !model || !brand || !price || !stock || !delay 
        return valid
    }

    render(){
        return(
            <Fragment>
                <h1 className="text-center mb-5"> New Product</h1>
                <div className="row justify-content-center">
                    <Mutation 
                        mutation = { NEW_PRODUCT }
                        onCompleted = { () => this.props.history.push('/products')}
                    >
                    { newProduct => (
                        <form className="col-md-8"
                            onSubmit = {
                                e => {
                                    e.preventDefault()
                                    const { name,model, brand, price, stock, delay } = this.state

                                    const input = {
                                        name,
                                        model,
                                        brand,
                                        price: Number(price),
                                        stock: Number(stock),
                                        delay
                                    }

                                    newProduct({
                                        variables: {input}
                                    })
                                }
                            }
                        >
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    type="text"
                                    name="name"     
                                    className="form-control" 
                                    placeholder="Nombre del Producto"
                                    onChange={this.updateState}
                                />
                            </div>
                            <div className="form-group">
                                <label>Model:</label>
                                <input 
                                    type="text"
                                    name="model"     
                                    className="form-control" 
                                    placeholder="Modelo del Producto"
                                    onChange={this.updateState}
                                />
                            </div>
                            <div className="form-group">
                                <label>Marca:</label>
                                <input 
                                    type="text"
                                    name="brand"     
                                    className="form-control" 
                                    placeholder="Marca del Producto"
                                    onChange={this.updateState}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">$</div>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        className="form-control" 
                                        placeholder="Precio del Producto"
                                        onChange={this.updateState}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Stock:</label>
                                <input 
                                    type="number" 
                                    name="stock" 
                                    className="form-control" 
                                    placeholder="stock del Producto"
                                    onChange={this.updateState} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Tiempo de espera</label>
                                <input 
                                    type="text" 
                                    name="delay" 
                                    className="form-control" 
                                    placeholder="Tiempo de espera del Producto"
                                    onChange={this.updateState} 
                                />
                            </div>
                            
                            <button 
                                disabled={this.validationForm()}
                                type="submit" 
                                className="btn btn-success float-right">
                                    Crear Producto
                            </button>
                        </form>
                    )}
                    </Mutation>
                </div>
            </Fragment>
        )
    }
}

export default newProduct