import React from 'react';
import ReactDOM from 'react-dom';
import PollyForm from './PollyForm'
import './index.css';

class App extends React.Component {
    render() {
        // data = default values for the search forms
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
            <div>
                <PollyForm data={data} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
