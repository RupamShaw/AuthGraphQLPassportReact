import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import query from '../queries/CurrentUser'
import logoutMutation from '../mutations/Logout'

class Header extends Component {
    onLogoutClick(){
       // console.log('logout mutation ',this.props.mutate)
        this.props.mutate({
            refetchQueries: [{query}]
        })
    }

    renderButtons(){
       const { loading, currentUser } = this.props.data
        if (loading) {
            return <div>Loading...</div>
        }
        if(currentUser){
            return( 
                <li>
                    <a onClick={this.onLogoutClick.bind(this)} > Logout </a>
                </li>
            )   
        }else{
            return(
                <div>
                    <li>
                        <Link to="/signup"> Signup </Link>
                    </li>
                    <li>
                        <Link to="/login"> Login </Link>
                    </li>     
                </div>
            )
        }

    }
    
    render() {
        //current user on iGraphQL   and app is diiferent
        //Note cause cookies to be attched  
        //console.log(this.props.data)//2 results of query
        //1 when query not completed and component rendered instantly
        //2when query fetched and rerender and data.loading is now false
        return (
            <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left" >
                Home
                </Link>
                <ul className="right">
                    {this.renderButtons()}
                </ul>
            </div>
            </nav>
        )
    }
}


export default graphql(logoutMutation)(
    graphql(query)(Header)
)