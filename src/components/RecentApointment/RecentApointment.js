import React from 'react';

const RecentApointment = (props) => {
    const { date, time, name, phoneNumber } = props.patient;
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
            <td>
                <select className="btn btn-info action-btn-style" name="" id="">
                    <option className="bg-white text-secondary" value="Pending">Pending</option>
                    <option className="bg-white text-secondary" value="Approved">Approved</option>
                    <option className="bg-white text-secondary" value="Rejected">Rejected</option>
                </select>
            </td>
        </tr>
    );
};

export default RecentApointment;