import React from 'react';
import $ from 'jquery'; 
import Candidate from './Candidate'
import SyncLoader from 'react-spinners/SyncLoader';


// Form used for ADDRESS querying
class PollyForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            has_data: false,
            open: false,
            candidates: [],
            city: '',
            address_one: '',
            address_two: '',
            state: '',
            zip: '',
            is_loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    submit(i) {
        let address = 
        this.state.address_one + " " +
        this.state.address_two + " " +
        this.state.city + " " +
        this.state.state + " " +
        this.state.zip

        console.log("Address:", address);
        console.log("Requesting data from /getCandidatesByOffice")
        this.setState({
            is_loading: true,
        })
        $.ajax({
            url : '/getCandidatesByOffice',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                'address': address
            },
            success:(data)=>{
                console.log(data)
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
                    candidates: data.positions_and_candidates,
                    is_loading: false
                });
            },
            error:function(){
                console.log("Error.")
            }
        })
    }

    handleChange(event) {
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        });
        console.log(name, ":", event.target.value, this.state)
    }

    handleSubmit(event) {
        alert('submit!');
        event.preventDefault();
        this.submit()
    }

    render() {
        return (
            <div className="pollyform">
                <div className="title">
                    <div className="arrow-wrapper">
                        <i className={this.props.data.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
                    </div>
                    <span className="title-text">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="col">
                                    <input className="form-control" type="text"
                                    name="address_one"
                                    placeholder={this.props.data.address_one}
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="col">
                                    <input className="form-control" type="text"
                                    name="address_two"
                                    placeholder={this.props.data.address_two}
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="col">
                                    <input className="form-control" type="text"
                                    name="city" 
                                    placeholder={this.props.data.city}
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="col">
                                    <input className="form-control" type="text"
                                    name="state" 
                                    placeholder={this.props.data.state}
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="col">
                                    <input className="form-control" type="text"
                                    name="zip" 
                                    placeholder={this.props.data.zip}
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </span>
                </div>
                    {this.state.is_loading && 
                        <div className="loadingwrapper">
                        <div className="row justify-content-center">
                        <SyncLoader color={"#356FF4"} position={"absolute"} margin={"10px"}/>
                        </div>
                        </div>
                    }
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
                <Candidate data={this.state.has_data ? this.state.candidates : this.state.has_data}
                           state={this.state.state} 
                />
            </div>
        )
    }

}

export default PollyForm;