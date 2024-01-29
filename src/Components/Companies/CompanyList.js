import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "../../api";
import "./CompanyList.css"; 

function CompanyList() {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companyData = await JoblyApi.getCompanies();
        setCompanies(companyData.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, []);

  return (
    <div className="company-list-container">
      <div className="company-list-content">
        {companies &&
          companies.map((company) => (
            <div className="CompanyCard" key={company.handle}>
              <CompanyCard company={company} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CompanyList;
