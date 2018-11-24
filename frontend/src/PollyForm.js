import React from 'react';
import $ from 'jquery'; 
import Candidate from './Candidate'
// Form used for ADDRESS and SPECIFIC CANDIDATE querying

class PollyForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            has_data: false,
            open: false,
            candidates: []
        };
    }

    submit(i) {
        $.ajax({
            url : 'http://localhost:5000/getCandidatesByOffice',
            type: 'GET',
            processData: false,
            contentType: false,
            cache: false,
            dataType: 'json',
            success:(data)=>{
                
                /*
                for(var i=0; i<data.positions_and_candidates.length; i++){
                    console.log(
                        data.positions_and_candidates[i].name,
                        data.positions_and_candidates[i].office,
                        data.positions_and_candidates[i].party
                    )
                }*/
                // console.log(data.positions_and_candidates[0][0][0])
                // this.props.content = data.positions_and_candidates[0][0][0]
                // this.props.open = !this.props.open;
                this.props.data.open = !this.props.data.open;
                this.setState({
                    has_data: true,
                    candidates: data.positions_and_candidates
                });
            },
            error:function(){
                console.log("Error.")
            }
        })
    }

    render() {


        return (
            <div className="pollyform">
                <div className="title">
                    <div className="arrow-wrapper">
                        <i className={this.props.data.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
                    </div>
                    <span className="title-text">
                        <input className="form-control" type="text" placeholder={this.props.data.title} 
                        onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                this.submit(this.i)
                            }
                        }}>
                        </input>
                    </span>
                </div>
                <div className={this.props.data.open ? "content content-open" : "content"}>
                    <div className={this.props.data.open ? "content-text content-text-open" : "content-text"}>
                        {this.state.has_data ? this.renderList() : "noData"}
                    </div>
                </div>
            </div>
        )
    }

    renderList() {
        return (
            <div>
                <Candidate data={this.state.has_data ? this.state.candidates : this.state.has_data} />
            </div>
        )
    }

}

export default PollyForm;