import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { educationDelete } from "../../actions/profileActions";

class Education extends Component {
  onDelete(id) {
    this.props.educationDelete(id);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td> {edu.school} </td>
        <td> {edu.degree} </td>
        <td> {edu.fieldofstudy} </td>

        <td>
          {" "}
          <Moment format="YYYY/MM/DD"> {edu.from} </Moment> -
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD"> {edu.to} </Moment>
          )}
        </td>

        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, edu._id)}
          >
            Delete
          </button>{" "}
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4"> Education credentials </h4>

        <table className="table">
          <thead>
            <tr>
              <th> School </th>
              <th> Degree </th>
              <th> Field of Study </th>
              <th> Dates </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  educationDelete: PropTypes.func.isRequired
};

export default connect(
  null,
  { educationDelete }
)(Education);
