import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CompanyCard from "./CompanyCard";
import JobCard from "../Job/JobCard";
import JoblyApi from "../../api";
import userContext from "../../userContext";
import "./CompanyDetails.css";

function CompanyDetails({ applyJob }) {
  const { handle } = useParams();
  const [data, setData] = useState(null);
  const user = useContext(userContext);

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const res = await JoblyApi.request(`companies/${handle}`);
        setData(res.company);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };
    getCompanyData();
  }, [handle]);

  if (data && user.token) {
    return (
      <div className="company-details-container">
        <div className="company-details-content">
          <div className="CompanyDetails">
            <div className="companyInfo">
              <h1>{data.name}</h1>
              <h2>{data.description}</h2>
            </div>
            <div className="Jobs">
              {data.jobs.map((job) => (
                <div className="JobCard" key={job.id}>
                  <JobCard
                    id={job.id}
                    title={job.title}
                    companyName={data.name}
                    companyHandle={handle}
                    salary={job.salary}
                    equity={job.equity}
                    applyJob={applyJob}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please log in to see this page</h1>
      </div>
    );
  }
}

export default CompanyDetails;
