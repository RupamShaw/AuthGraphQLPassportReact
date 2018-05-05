import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import AuthForm from './AuthForm'
import Header from './Header'
import signupMutation from '../mutations/Signup'
import query from '../queries/CurrentUser'

class SignupForm extends Component {
    constructor(props){
        super(props);

        this.state = { errors: [] }
    }

    onSubmit({email,password}){
        this.props.mutate({
            variables: { email,password },
            refetchQueries: [{query}]
        }).catch((res) => {
        const errors = res.graphQLErrors.map((error)=>error.message) 
        this.setState({ errors })
        })
    }

    componentWillUpdate(nextProps){
        // this.props //the old set of props
        // nextProps //the next set of props when component rerenders
    //console.log('this props and next props',this.props,nextProps)
        if(!this.props.data.currentUser && nextProps.data.currentUser){
         //redirect to dashboard   
            nextProps.history.push('/dashBoard')
        }
    }

    componentWillMount() {
        const {loading, currentUser} = this.props.data;
     
        // GraphQL query finished loading && user is authenticated
        if (!loading && currentUser) {
            // Redirect to dashboard
            this.props.history.push('/dashboard')
           // hashHistory.push('/dashboard');
        }
    }

    render() {
        //current user on iGraphQL   and app is diiferent
        //Note cause cookies to be attched  
       // console.log(this.props.mutate)
        return (
            <div>
               
               <h3>Signup</h3> 
               <AuthForm errors={this.state.errors} 
                    onSubmit = {this.onSubmit.bind(this)} 
                />
            </div>
        )

    } 
}

export default  graphql(query)(
    graphql(signupMutation)(SignupForm)
)
        // graphql(query)(SignupForm))

