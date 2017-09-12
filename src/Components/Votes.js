import React, { Component } from 'react';

class Votes extends Component {
    render() {
        const {score} = this.props;
        return (
            <div className="votes">
                <div className="voteButton">Up</div>
                <div className="voteScore">{score}</div>
                <div className="voteButton">Dn</div>
            </div>
        )
    }
}

export default Votes;