import React from 'react';

const Prescription = (props) => {
    const{date, time, name, phoneNumber} = props.patient;
    return (
        <tr>
            <td>{props.sl}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{name}</td>
            <td>{phoneNumber}</td>
            <td className="text-center">
                <button className="btn btn-primary action-btn-style">View</button>
            </td>
        </tr>
    );
};

export default Prescription;