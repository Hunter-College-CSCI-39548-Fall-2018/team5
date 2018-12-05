import React from 'react';
import ReactDOM from 'react-dom';
import PollyForm from './PollyForm'
import SpecificCand from './SpecificCand'
import GenInfo from './GenInfo'
import EmailForm from './EmailForm';
// import CandidateProfile from './CandidateProfile'
import Header from './Header'
// See ../node_modules/bootstrap/scss/_variables.scss to adjust bootstrap variables
import '../node_modules/bootstrap/scss/bootstrap.scss'
import './index.css'; // Override bootstrap defaults

class App extends React.Component {
    render() {
        // data = default values for the search forms
        let data = {
            city: 'City',
            address_one: 'Street Address',
            address_two: 'Apartment',
            state: 'State',
            zip: 'Zip Code',
            content: ''
        }
        let links = {
            usagov: 'https://www.usa.gov/voting',
            registertovote: 'https://www.usa.gov/register-to-vote',
            ballotpedia: 'https://ballotpedia.org/Main_Page',
            voteeasy: 'https://voteeasy.votesmart.org/map'
        }
        return (
            <div>
                <Header title="PollyWannaVote" />
                <PollyForm data={data} />
                <SpecificCand title="Specific Candidate" />
                <GenInfo links={links} />
                <EmailForm />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
