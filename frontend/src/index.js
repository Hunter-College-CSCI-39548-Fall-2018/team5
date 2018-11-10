import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import './index.css';

class App extends React.Component {
    render() {
        let data = [
            {
                title: "Search by Address",
                content: "Handle address input."
            },
            {
                title: "Search Specific",
                content: "Handle specific candidate searches."
            },
            {
                title: "How to Vote",
                content: "Show links for voting information."
            }
        ];
        return (
            <PollyForm data={data} />
        );
    }
}

class PollyForm extends React.Component {
    componentWillMount() {
        let pollyform = [];
        
        this.props.data.forEach((i) => {
            pollyform.push({
                title: i.title,
                content: i.content,
                open: false
            });
        });

        this.setState({
            pollyContent: pollyform
        });
    }

    submit(i) {
        var new_content
        let newForm = this.state.pollyContent.slice();
        let index = newForm.indexOf(i)
        $.ajax({
            url : 'http://localhost:5000/getCandidatesByOffice',
            type: 'GET',
            processData: false,
            contentType: false,
            cache: false,
            dataType: 'json',
            success:function(data){
                console.log(data)
                console.log(data.positions_and_candidates)
                // console.log(new_content)
                newForm[0].content = new_content
                newForm[index].open = !newForm[index].open;
            },
            error:function(){
                console.log("Error.")
            }
        })
        this.setState({pollyContent: newForm});
    }

    render() {
        const sections = this.state.pollyContent.map((i) => (
            <div key={this.state.pollyContent.indexOf(i)}>
                <div className="title">
                    <div className="arrow-wrapper">
                        <i className={i.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
                    </div>
                    <span className="title-text">
                        <input className="form-control" type="text" placeholder={i.title} 
                        onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                this.submit(i)
                            }
                        }}>
                        </input>
                    </span>
                </div>
                <div className={i.open ? "content content-open" : "content"}>
                    <div className={i.open ? "content-text content-text-open" : "content-text"}>
                        {i.content}
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="pollyform">
            {sections}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
