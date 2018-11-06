import React, { Component } from "react";

class ProfileCreds extends Component {
  render() {
    const { profile } = this.props;

    const experience = profile.experience.map((experience, index) => (
      <li className="list-group-item" key={index}>
        <h4>{experience.company}</h4>
        <p>
          {experience.from} - {experience.to === null ? "now" : experience.to}
        </p>
        <p>
          <strong>Position:</strong> {experience.title}
        </p>
        <p>
          <strong>Description:</strong> {experience.description}
        </p>
      </li>
    ));

    const education = profile.education.map((education, index) => (
      <li className="list-group-item" key={index}>
        <h4>{education.school}</h4>
        <p>
          {education.from} - {education.to === null ? "Now" : education.to}
        </p>
        <p>
          <strong>Degree: </strong>
          {education.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {education.fieldofstudy}
        </p>

        <p>
          <strong>Description:</strong> {education.description}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">{experience}</ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">{education}</ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
