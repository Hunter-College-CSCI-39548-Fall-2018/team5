import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import CandidateProfile from './CandidateProfile';

// Inner element rendered for candidate list

class Candidate extends React.Component {
    constructor(props){
        super(props)
        let cand_info = [];

        //console.log(this.props.data)

        this.state = {candidateInfo: cand_info};
    }

    render() {
        const candidates = this.props.data.map((i) => (
            <div key={this.props.data.indexOf(i)}>
                <div className="candidate">
                    <div className="row">
                        <div className="col">{i.office}</div>
                        <div className="col">
                            <Link to={"/getCandidatesInfo/" + i.name + i.party}>{i.name}</Link>
                        </div>
                        <div className="col">{i.party}</div>
                    </div>
                    <Route 
                        path={"/getCandidatesInfo/" + i.name + i.party} 
                        render={(props) => (
                            <CandidateProfile {...props} opened={false} />
                        )}
                    />
                    
                </div>
            </div>
        ));
        
        return (
            <Router>
            <div className="candwrapper">
                {candidates}
            </div>
            </Router>
        )
    }
}

export default Candidate;