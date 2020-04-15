import React from 'react';

const PatientByDate = (props) => {

    const {name,date,_id} = props.patient; 
    return (
        <tr className="text-center">
            <td>{name}</td>
            <td>{date}</td>
            <td className="text-center">
                <select className="btn btn-primary text-capitalize action-btn-style" name="" id="">
                    <option className="bg-white text-secondary" value="Visited">Not Visited</option>
                    <option className="bg-white text-secondary" value="">Visited</option>
                </select>
            </td>
        </tr>
    );
};

export default PatientByDate;