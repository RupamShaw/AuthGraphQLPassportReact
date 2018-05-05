import React from 'react';
import Header from './Header'
// import { Route, Switch } from 'react-router-dom';
//import SongList from './SongList';

const App = (props) => {
   // console.log('props.children',props.children)
    return (
        <div className="container">
            <Header />
            { props.children }
        </div>
    )
}

export default App;