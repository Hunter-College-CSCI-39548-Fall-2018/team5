import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            visible: false
        }
    }

    render() {
        
        return (
            <nav className="navbar fixed-top navbar-dark bg-primary">
                <a className="navbar-brand mb-0 h1" href="/"> {this.props.title} </a>
            </nav>
        )
    }
}

export default Header;