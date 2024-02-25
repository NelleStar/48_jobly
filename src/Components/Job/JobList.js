import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import userContext from "../../userContext";
import JoblyApi from "../../api";
import "./JobList.css";

function JobList({ apply }) {
  const [jobs, setJobs] = useState(null);
  const user = useContext(userContext);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobData = await JoblyApi.getJobs();
        setJobs(jobData.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, []);

  if (user.token) {
    return (
      <div className="job-list-container">
        <div className="job-list-content">
          {jobs &&
            jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <JobCard
                  id={job.id}
                  title={job.title}
                  companyName={job.companyName}
                  companyHandle={job.companyHandle}
                  salary={job.salary}
                  equity={job.equity}
                  applyJob={apply}
                />
              </div>
            ))}
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

export default JobList;
