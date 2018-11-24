import React from 'react';
import ReactDOM from 'react-dom';
import PollyForm from './PollyForm'
// import CandidateProfile from './CandidateProfile'
import Header from './Header'
// See ../node_modules/bootstrap/scss/_variables.scss to adjust bootstrap variables
import '../node_modules/bootstrap/scss/bootstrap.scss'
import './index.css'; // Override bootstrap defaults

class App extends React.Component {
    render() {
        // data = default values for the search forms
        let data = {
            title: 'Search by Address',
            content: ''
        }
        return (
            <div>
                <Header title="PollyWannaVote" />
                <PollyForm data={data} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
