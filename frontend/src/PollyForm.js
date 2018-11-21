import React from 'react';
import $ from 'jquery'; 
import Candidate from './Candidate'
// Form used for ADDRESS and SPECIFIC CANDIDATE querying

class PollyForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {hasData: false};
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
                
                
                for(var i=0; i<data.positions_and_candidates.length; i++){
                    console.log(
                        data.positions_and_candidates[i].name,
                        data.positions_and_candidates[i].office,
                        data.positions_and_candidates[i].party
                    )
                }
                // console.log(data.positions_and_candidates[0][0][0])
                // this.props.content = data.positions_and_candidates[0][0][0]
                // this.props.open = !this.props.open;
                this.setState({hasData: true});
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
                        <i className={this.props.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
                    </div>
                    <span className="title-text">
                        <input className="form-control" type="text" placeholder={this.props.title} 
                        onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                this.submit(this.i)
                            }
                        }}>
                        </input>
                    </span>
                </div>
                <div className={this.props.open ? "content content-open" : "content"}>
                    <div className={this.props.open ? "content-text content-text-open" : "content-text"}>
                        {this.renderList()}
                    </div>
                </div>
            </div>
        )
    }

    renderList() {
        return (
            <div>
                <Candidate data={this.props.data.candidates} /> a
            </div>
        )
    }

}

export default PollyForm;