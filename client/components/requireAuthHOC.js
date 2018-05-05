import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import query from '../queries/CurrentUser';

const wrapperComponent = (WrappedComponent) => {

class RequireAuth extends Component{

    componentWillUpdate(nextProps){
       //console.log( '*********',nextProps.data.loading , nextProps.data.currentUser)
        if(!nextProps.data.loading && !nextProps.data.currentUser){
            nextProps.history.push('/login')
        }
   }

   render(){
      // console.log('requireAuth currentuser',this.props.data.currentUser )
    if (this.props.data.currentUser) {
       return < WrappedComponent {...this.props} />
    } 
    return (
        <div>
          Please log in to see this page.
        </div>
      )

   }
}
 
return graphql(query)(RequireAuth)

}

export default wrapperComponent;
