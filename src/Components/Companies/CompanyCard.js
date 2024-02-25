import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ company }) {
  return (
    <Card className="company-card">
      <CardBody>
        <CardTitle tag="h5" className="company-name">
          <NavLink to={`./${company.handle}`}>{company.name}</NavLink>
        </CardTitle>
        <CardSubtitle tag="h6" className="company-description">
          {`@ ${company.description}`}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

export default CompanyCard;
