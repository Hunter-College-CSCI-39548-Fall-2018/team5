import React from 'react';

// General info links

class GenInfo extends React.Component {
    constructor(props){
        super(props)

        console.log(this.props)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card-deck inner-gen shadow p-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={this.props.links.usagov} className="general">Voting and Elections</a></h5>
                        <p className="card-text">Find answers to common questions about voting in the United States.</p>
                        <p className="card-text"><small className="text-muted">Provided by usa.gov</small></p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={this.props.links.registertovote} className="general">Register to Vote</a></h5>
                        <p className="card-text">Learn if you're eligible to vote, how to register, check, or update your information. 
                        Find the deadline to register to vote in your state.</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={this.props.links.ballotpedia} className="general">Ballotpedia</a></h5>
                        <p className="card-text">Get Information on initiative supporters and opponents, financial reports, litigation news,
                         status updates, poll numbers, and more.</p>
                         <p className="card-text"><small className="text-muted">The "Encyclopedia" of American Politics.</small></p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={this.props.links.voteeasy} className="general">Vote Easy</a></h5>
                        <p className="card-text">Wondering who to vote for this election? Check out vote easy to help you find out which candidates are most like you!</p>
                        <p className="card-text"><small className="text-muted">We used their API for our project.</small></p>
                    </div>
                </div>
                
                </div>
            </div>
        )
    }
}

export default GenInfo;