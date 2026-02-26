import { AdminLayout } from "@/components/AdminLayout";
import { useAppointments, useUpdateAppointmentStatus } from "@/hooks/use-appointments";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminAppointments() {
  const { data: appointments, isLoading } = useAppointments();
  const updateStatus = useUpdateAppointmentStatus();

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Appointments</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-600">Patient</th>
                <th className="p-4 font-semibold text-slate-600">Contact</th>
                <th className="p-4 font-semibold text-slate-600">Date & Time</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments?.map(app => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{app.patientName}</div>
                    <div className="text-xs text-slate-500 mt-1 max-w-xs truncate" title={app.message}>{app.message || "No message"}</div>
                  </td>
                  <td className="p-4 text-slate-600">{app.phoneNumber}</td>
                  <td className="p-4">
                    <div className="font-semibold text-primary">{app.preferredDate}</div>
                    <div className="text-sm text-slate-500">{app.preferredTime}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      app.status === 'Confirmed' ? 'bg-primary/10 text-primary' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Select 
                      defaultValue={app.status} 
                      onValueChange={(val: any) => updateStatus.mutate({ id: app.id, status: val })}
                    >
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
              {appointments?.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
