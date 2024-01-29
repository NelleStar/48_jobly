import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  CardText,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import userContext from "../../userContext";
import "./JobCard.css";

function JobCard(props) {
  const user = useContext(userContext);
  // console.log("JobCard user:", user);
  // console.log("JobCard props:", props);

  const handleClick = () => props.applyJob(props.id);
  let applied = user.applications
    ? user.applications.includes(props.id)
    : false;

  // console.log("JobCard applied:", applied);

  return (
    <Card style={{ width: "120vh" }}>
      <CardBody>
        <CardTitle tag="h1">{props.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {props.companyName && (
            <NavLink
              to={`../companies/${props.companyHandle}`}
            >{`@${props.companyName}`}</NavLink>
          )}
        </CardSubtitle>
        <CardText tag="h3">
          <ListGroup>
            <div className="JobDetails">
              <ListGroupItem>Salary: {props.salary || "N/A"}</ListGroupItem>
              <ListGroupItem>
                Equity: {props.equity !== undefined ? props.equity : "N/A"}
              </ListGroupItem>
            </div>
          </ListGroup>
        </CardText>
        <Button onClick={handleClick} disabled={applied}>
          {applied ? "Applied" : "Apply"}
        </Button>
      </CardBody>
    </Card>
  );
}

export default JobCard;
