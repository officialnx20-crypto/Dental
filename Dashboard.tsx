import { AdminLayout } from "@/components/AdminLayout";
import { useAppointments } from "@/hooks/use-appointments";
import { useServices } from "@/hooks/use-services";
import { useDoctors } from "@/hooks/use-doctors";
import { Calendar, Users, Stethoscope, Clock } from "lucide-react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { data: appointments } = useAppointments();
  const { data: services } = useServices();
  const { data: doctors } = useDoctors();

  const pendingAppointments = appointments?.filter(a => a.status === 'Pending') || [];
  const todayAppointments = appointments?.filter(a => a.preferredDate === format(new Date(), 'yyyy-MM-dd')) || [];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Appointments" value={appointments?.length || 0} icon={Calendar} color="bg-primary" />
        <StatCard title="Pending Requests" value={pendingAppointments.length} icon={Clock} color="bg-amber-500" />
        <StatCard title="Active Services" value={services?.length || 0} icon={Stethoscope} color="bg-primary/60" />
        <StatCard title="Doctors" value={doctors?.length || 0} icon={Users} color="bg-primary/80" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold mb-6">Today's Appointments</h2>
        {todayAppointments.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No appointments scheduled for today.</p>
        ) : (
          <div className="space-y-4">
            {todayAppointments.map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900">{app.patientName}</h4>
                  <p className="text-sm text-slate-500">{app.phoneNumber}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{app.preferredTime}</div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                    app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    app.status === 'Confirmed' ? 'bg-primary/10 text-primary' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}
