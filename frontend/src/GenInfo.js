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
                <div className="card-deck inner-gen shadow p-3 mb-5">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={this.props.links.google}>General Info Link</a></h5>
                        <p className="card-text">Describe the general info link...</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        <a href={this.props.links.google}>Google</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={this.props.links.google}>General Info Link</a></h5>
                        <p className="card-text">Describe the general info link...</p>
                        <a href={this.props.links.google}>Google</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={this.props.links.google}>General Info Link</a></h5>
                        <p className="card-text">Describe the general info link...</p>
                        <a href={this.props.links.google}>Google</a>
                    </div>
                </div>
                
                </div>
            </div>
        )
    }
}

export default GenInfo;