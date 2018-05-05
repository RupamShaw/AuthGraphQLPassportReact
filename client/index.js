import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Route, Switch, HashRouter } from 'react-router-dom';

import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/signupForm'
import DashBoard from './components/DashBoard'
import requireAuth from './components/requireAuthHOC'

const networkInterface = createNetworkInterface({//for cookies to be attached
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id//its purpose
  //is to identify every record that comes back from server
  //so rather refetching data for every queries i.e issued appolo 
  //will have ability to identify the info i.e already been pulled
  //down from server and store it in local cache


})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App>
         <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/dashBoard" component={requireAuth(DashBoard)} />
         </Switch>
        </App>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
