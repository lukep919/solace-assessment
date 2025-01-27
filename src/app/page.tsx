"use client";

import { useEffect, useMemo, useState } from "react";

type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt: string;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const filteredAdvocates = useMemo(() => {
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(filter.toLowerCase()) ||
        advocate.city.toLowerCase().includes(filter.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(filter.toLowerCase()) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(filter.toLowerCase())
        )
      );
    });
  }, [advocates, filter]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{filter}</span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setFilter("")} type="button">Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id} style={{ textAlign: "center" }}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td style={{ textAlign: "left" }}>
                  <ul>
                    {advocate.specialties.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
