import React from 'react';
import ReactDOM from 'react-dom';
import PollyForm from './PollyForm'
import CandidateProfile from './CandidateProfile'
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
        let cand_dat = {
            name: 'name',
            year: 'year',
            party: 'party'
        }
        return (
            <div>
                <Header title="PollyWannaVote" />
                <PollyForm data={data} />
                <CandidateProfile cand_dat={cand_dat} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
