import React, { Component } from 'react'


class Paginator extends Component{

    
    state={
        paginator:{
            pages: Math.ceil( Number(this.props.countPages)/ this.props.limit ) 
        }
    }

    render(){
        const { page } = this.props
        const btnPrevious = (page > 1) ? <button type="button" onClick={this.props.previouspage} className="btn btn-success mr-2"> &laquo;
        Previous</button> : '' 

        const {pages} = this.state.paginator
        
        const btnNext = ( page !== pages) ? <button type="button" onClick={this.props.nextpage} className="btn btn-success mr-2"> Next &raquo; </button> : ''
        return( 
            <div className="mt-5 d-flex justify-content-center">
                {btnPrevious}
                {btnNext}
            </div>
        )
    }
}

export default Paginator