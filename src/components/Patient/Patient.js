import React from 'react';

const Patient = (props) => {

    const {name, gender, age, weight, phoneNumber,email} = props.patient;
    return (
        <tr className="row-bottom-style">
            <td>{props.sl}</td>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{age}</td>
            <td>{weight}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
        </tr>
    );
};

export default Patient;