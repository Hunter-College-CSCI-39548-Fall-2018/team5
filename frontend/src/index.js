import React from 'react';
import ReactDOM from 'react-dom';
import PollyForm from './PollyForm'
import './index.css';

class App extends React.Component {
    render() {
        // data = default values for the search forms
        let data = {
            title: 'Search by Address',
            content: ''
        }
        return (
            <div>
                <PollyForm data={data} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
