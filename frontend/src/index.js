import React from 'react';
import ReactDOM from 'react-dom';
import PollyForm from './PollyForm'
import SpecificCand from './SpecificCand'
import GenInfo from './GenInfo'
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
        let profile = {
            first_name: 'First Name',
            last_name: 'Last Name',
            state: 'State',
            content: ''
        }
        let links = {
            stackoverflow: 'https://www.stackoverflow.com',
            google: 'https://www.google.com',
            pollywannavote: '/'
        }
        return (
            <div>
                <Header title="PollyWannaVote" />
                <PollyForm data={data} />
                <SpecificCand data={profile} />
                <GenInfo links={links} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
