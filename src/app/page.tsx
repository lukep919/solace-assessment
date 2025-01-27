import db from "@/db";
import { advocates } from "@/db/schema";
import SearchForm from "@/components/SearchForm";

export default async function Home({
  searchParams
}: {
  searchParams: { search: string };
}) {
  const searchTerm = searchParams.search ?? "";
  const allAdvocates = await db.select().from(advocates);

  const filteredAdvocates = allAdvocates.filter((advocate) => {
    const searchString = searchTerm.toLowerCase();
    return (
      advocate.firstName.toLowerCase().includes(searchString) ||
      advocate.lastName.toLowerCase().includes(searchString) ||
      advocate.city.toLowerCase().includes(searchString) ||
      advocate.degree.toLowerCase().includes(searchString) ||
      (advocate.specialties as string[]).some((s) =>
        s.toLowerCase().includes(searchString)
      )
    );
  });

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-2xl font-bold mb-8">Solace Advocates</h1>

      <div className="mb-8">
        <SearchForm searchTerm={searchTerm} />
        <p className="mb-2">Showing {filteredAdvocates.length} results</p>
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
              <tr
                key={advocate.id}
                className="border-gray-200 bg-gray-20 text-center"
              >
                <td className="border p-2">{advocate.firstName}</td>
                <td className="border p-2">{advocate.lastName}</td>
                <td className="border p-2">{advocate.city}</td>
                <td className="border p-2">{advocate.degree}</td>
                <td className="border p-2 text-left">
                  <ul>
                    {(advocate.specialties as string[]).map((s) => (
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
