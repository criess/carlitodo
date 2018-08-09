import ReactDOM from 'react-dom';
import React from 'react';
import MainScreen from 'screens/main';

if ( document.getElementById('carlitodo-app') ) {
    ReactDOM.render(
        <MainScreen/>,
        document.getElementById('carlitodo-app')
    );
}
