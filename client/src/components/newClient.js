import React, { Component , Fragment } from 'react'

import { NEW_CLIENT } from '../mutations/index';
import { Mutation} from 'react-apollo';

class newClient extends Component{
    state = {
        client: {
            name : '',
            last_name : '',
            job: '',
            email : '',
            edad : '',
            tipo : ''
        },
        error: false,
        emails: [],
     }

     readField = i => e =>{
        const newEmail = this.state.emails.map((email,index) => {
            if(i !== index ) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({
            emails: newEmail
        })
        console.log([this.state.emails])
     }

     newField = () =>{
         this.setState({
             emails: this.state.emails.concat([{email: ''}])
         })
     }
     removeField = i => () =>{
        this.setState({
            emails: this.state.emails.filter((email,index) => i !== index)
        })
     }

    render( ){
        const { error } = this.state;
        let response = (error) ? <p className="alert alert-danger p-3 text-center">All fields are obligatory, please complete all fields </p> : '';
        return (
            <Fragment>
                <h2 className="text-center">New client</h2>

                {response}
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={NEW_CLIENT}
                        onCompleted = { ()=> this.props.history.push('/')}
                    >

                    { createClient => (    
                        <form className="col-md-8 m-3"
                        onSubmit= {
                            e => {
                                e.preventDefault();
                                const { name, last_name, job, edad, tipo } = this.state.client;

                                const {emails} = this.state
                                
                                if(name === '' || last_name=== '' || job==='' || tipo=== '' || edad==='' ){
                                    this.setState({
                                        error:true
                                    });
                                    return;
                                }
                                this.setState({
                                    error: false 
                                })
                                const input={
                                    name,
                                    last_name,
                                    job,
                                    edad: Number(edad),
                                    tipo,
                                    emails 
                                };
                                // console.log(input);
                                createClient({
                                        variables: {input}
                                })
                            }
                        }
                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="name" onChange={e => { this.setState ({ client : { ...this.state.client, name: e.target.value}})}}></input>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Last name</label>
                                    <input type="text" className="form-control" placeholder="last name" onChange={e => { this.setState ({ client : { ...this.state.client, last_name: e.target.value}})}}></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Job</label>
                                    <input type="text" className="form-control" placeholder="ocupation"  onChange={e => { this.setState ({ client : { ...this.state.client, job: e.target.value}})}}></input>
                                </div>

                                {this.state.emails.map((input,index) => (
                                    <div key={index} className="form-group col-md-12">
                                        <label>Correo: {index+1}: </label>
                                        <div className="input-group">
                                            <input type="email" placeholder="email" className="form-control" onChange={this.readField(index)}/>
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-danger" onClick={this.removeField(index)}>
                                                    &times; Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='form-group col-md-12 d-flex justify-content-center'>
                                    <button type="button" className="btn btn-warning" onClick={this.newField}>
                                        + Agregar email
                                    </button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Age</label>
                                    <input type="text" className="form-control" placeholder="age"  onChange={e => { this.setState ({ client : { ...this.state.client, edad: e.target.value}})}}></input>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Type client</label>
                                    <select className="form-control"  onChange={e => { this.setState ({ client : { ...this.state.client, tipo: e.target.value}})}}>
                                        <option value="">Chosee...</option>
                                        <option value="PREMIUM">Premium</option>
                                        <option value="BASICO">Clasic</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Save Changues</button>
                        </form>

                    )}
                    </Mutation> 
                </div>
            </Fragment>
        );
    }
}

export default newClient;

