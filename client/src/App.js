import React, {Fragment} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom';

// Components

import Header from './components/Header';
import Clients from './components/Client';
import editClient from './components/editCLient';
import newClient from './components/newClient';
import newProduct from './components/newProduct'
import Products from './components/Products';
import editProduct from './components/editProduct';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache({  
        addTypename: false
    }),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphqlErrors', graphQLErrors);
        console.log('networkError', networkError);
    }
});

function App() {
    return (
        <ApolloProvider client = { client }>
            <Router>
                <Fragment>
                    <Header/> 
                    <div className="container">
                        <Switch>
                            
                            <Route exact path='/' component={Clients}/>
                            <Route exact path='/client/edit/:id' component={editClient}/>
                            <Route exact path='/client/new' component={ newClient }/>
                            <Route exact path='/product/new' component= { newProduct }/>
                            <Route exact path='/products' component = { Products } />
                            <Route exact path='/product/edit/:id' component={editProduct}/>
                        </Switch> 
                    </div>
                    <br></br>
                </Fragment>
            </Router>   
		</ApolloProvider>
    );
}
export default App;