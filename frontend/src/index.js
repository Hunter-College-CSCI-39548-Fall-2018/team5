import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    render() {
        let data = [
            {
                title: "Search by Area",
                content: "aaaaaaaaa"
            },
            {
                title: "Search Specific",
                content: "bbbbbbbbbbbbbb"
            },
            {
                title: "How to Vote",
                content: "ccccccccccccc"
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

    click(i) {
        const newForm = this.state.pollyContent.slice();
        const index = newForm.indexOf(i)
        
        newForm[index].open = !newForm[index].open;
        this.setState({pollyContent: newForm});
    }

    render() {
        const sections = this.state.pollyContent.map((i) => (
            <div key={this.state.pollyContent.indexOf(i)}>
                <div className="title" onClick={this.click.bind(this, i)}>
                    <div className="arrow-wrapper">
                        <i className={i.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
                    </div>
                    <span className="title-text">
                        <input class="form-control" type="search" placeholder={i.title} aria-label="Search"></input>
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
