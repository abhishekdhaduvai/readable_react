import React from 'react';
import PropTypes from 'prop-types';

class Timestamp extends React.Component {

    PropTypes = {
        time: PropTypes.number.isRequired,
    }

    render() {
        const { time } = this.props;
        var mins = Math.floor(time/(1000*60));
        var hours = Math.floor(time/(1000*60*60));
        var days = Math.floor(hours/24);
        var months = Math.floor(days/30);
        var years = Math.floor(months/12);
        var duration = "";

        if(years > 1){
            duration = "over a year ago";
        }
        else if(years === 1){
            duration = "a year ago";
        }
        else if(months>1){
            duration = `${months} months ago`;
        }
        else if(days>1){
            duration = `${days} days ago`;
        }
        else if(hours>1){
            duration = `${hours} hours ago`;
        }
        else if(mins>1){
            duration = `${mins} mins ago`;
        }
        else{
            duration = "just now";
        }
        
        return (
            <span>{duration}</span>
        )        
    }
}

export default Timestamp;