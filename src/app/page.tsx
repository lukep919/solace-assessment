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
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  }, [advocates, searchTerm]);

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-2xl font-bold mb-8">Solace Advocates</h1>

      <div className="mb-8">
        <label htmlFor="search-term" className="text-lg font-bold mb-2">Search</label>
        <p className="mb-2">
          Searching for: {searchTerm}
        </p>
        <input
          id="search-term"
          className="border border-gray-300 rounded-md p-2 mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded-md mb-4" onClick={() => setSearchTerm("")} type="button">Reset Search</button>

        <p className="mb-2">
          Showing {filteredAdvocates.length} results
        </p>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-gray-200 bg-gray-20">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Degree</th>
            <th className="border p-2">Specialties</th>
            <th className="border p-2">Years of Experience</th>
            <th className="border p-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id} className="border-gray-200 bg-gray-20 text-center">
                <td className="border p-2">{advocate.firstName}</td>
                <td className="border p-2">{advocate.lastName}</td>
                <td className="border p-2">{advocate.city}</td>
                <td className="border p-2">{advocate.degree}</td>
                <td className="border p-2 text-left">
                  <ul>
                    {advocate.specialties.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2">{advocate.yearsOfExperience}</td>
                <td className="border p-2">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
