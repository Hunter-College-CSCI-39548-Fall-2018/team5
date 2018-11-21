import React from 'react';

// Inner element rendered for candidate list

class Candidate extends React.Component {
    constructor(props){
        super(props)
        let cand_info = [];

        console.log(this.props.data)

        this.state = {candidateInfo: cand_info};
    }

    render() {
        
        return (
            <div className="candidate">
                
            </div>
        )
    }
}

export default Candidate;