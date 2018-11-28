import React from 'react';
import $ from 'jquery'; 

// Specific Candidate Query

class SpecificCand extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            has_data: false,
            open: false,
            cand_profile: [],
            first_name: '',
            last_name: '',
            state: '',
        };
        console.log(this.props.title)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    submit(i) {
        let profile = 
        this.state.first_name +
        this.state.last_name +
        this.state.state        

        console.log(profile);
        $.ajax({
            url : 'http://localhost:5000/getCandidatesInfo',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                'profile': profile
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
                    cand_profile: data.profile_info
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
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" type="text"
                                    name="first_name"
                                    placeholder={this.props.data.first_name}
                                    onChange={this.handleChange}
                            />
                        </div>
                        <div className="col">
                            <input className="form-control" type="text"
                                    name="last_name"
                                    placeholder={this.props.data.last_name}
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
                        <input type="submit" value="Submit" />
                    </div>
                </form>
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
                <SpecificCand data={this.state.has_data ? this.state.cand_profile : this.state.has_data} />
            </div>
        )
    }    
}

export default SpecificCand;
