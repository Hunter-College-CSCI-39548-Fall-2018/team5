import React from 'react';

// General info links

class GenInfo extends React.Component {
    constructor(props){
        super(props)

        console.log(this.props)
    }

    render() {
        return (
            <div className="pollyform">
            <div className="title">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <a href={this.props.links.pollywannavote}>Home</a>
                        </div>
                        <div className="col">
                            <a href={this.props.links.stackoverflow}>Stackoverflow</a>
                        </div>
                        <div className="col">
                            <a href={this.props.links.google}>Google</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default GenInfo;