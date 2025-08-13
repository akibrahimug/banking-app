import { formatDateTime } from "@/lib/utils";

const CardApplicationsList = ({ applications = [] as any[] }) => {
  if (!applications.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
        No applications yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-700">Name</th>
            <th className="px-4 py-3 font-medium text-gray-700">Email</th>
            <th className="px-4 py-3 font-medium text-gray-700">Income</th>
            <th className="px-4 py-3 font-medium text-gray-700">Status</th>
            <th className="px-4 py-3 font-medium text-gray-700">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a: any) => (
            <tr key={a.$id} className="border-t">
              <td className="px-4 py-3">
                {a.firstName} {a.lastName}
              </td>
              <td className="px-4 py-3">{a.email}</td>
              <td className="px-4 py-3">
                ${Number(a.income || 0).toLocaleString()}
              </td>
              <td className="px-4 py-3 capitalize">{a.status}</td>
              <td className="px-4 py-3">
                {formatDateTime(new Date(a.$createdAt)).dateTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardApplicationsList;
