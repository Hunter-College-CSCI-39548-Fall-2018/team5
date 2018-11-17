import React from 'react';
import ReactDOM from 'react-dom';
import PollyForm from './PollyForm'
import './index.css';

class App extends React.Component {
    render() {
        // data = default vals for the search forms
        let data = [
            {
                title: "Search by Address",
                content: "Handle address input."
            },
            {
                title: "Search Specific",
                content: "Handle specific candidate searches."
            },
            {
                title: "How to Vote",
                content: "Show links for voting information."
            }
        ];
        return (
            <PollyForm data={data} />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
