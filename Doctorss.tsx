import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useDoctors, useCreateDoctor, useUpdateDoctor, useDeleteDoctor } from "@/hooks/use-doctors";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, UserCircle } from "lucide-react";

export default function AdminDoctors() {
  const { data: doctors } = useDoctors();
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const deleteDoctor = useDeleteDoctor();
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: '', specialization: '', qualification: '', experience: '', imageUrl: '' });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ name: '', specialization: '', qualification: '', experience: '', imageUrl: '' });
    setIsOpen(true);
  };

  const handleEdit = (doc: any) => {
    setEditingId(doc.id);
    setFormData({ name: doc.name, specialization: doc.specialization, qualification: doc.qualification, experience: doc.experience, imageUrl: doc.imageUrl || '' });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateDoctor.mutateAsync({ id: editingId, ...formData });
    } else {
      await createDoctor.mutateAsync(formData);
    }
    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Manage Doctors</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew} className="gap-2 rounded-xl">
              <Plus className="w-4 h-4" /> Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Photo</label>
                <ImageUpload folder="doctors" value={formData.imageUrl} onChange={(url) => setFormData(p => ({...p, imageUrl: url}))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input required value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Specialization</label>
                <Input required value={formData.specialization} onChange={e => setFormData(p => ({...p, specialization: e.target.value}))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Qualification</label>
                  <Input required value={formData.qualification} onChange={e => setFormData(p => ({...p, qualification: e.target.value}))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Experience</label>
                  <Input required value={formData.experience} onChange={e => setFormData(p => ({...p, experience: e.target.value}))} />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={createDoctor.isPending || updateDoctor.isPending}>Save Doctor</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors?.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-slate-100">
              {doc.imageUrl ? (
                 <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
              ) : (
                 <UserCircle className="w-full h-full text-slate-300 bg-slate-50" />
              )}
            </div>
            <h3 className="font-bold text-lg">Dr. {doc.name}</h3>
            <p className="text-primary font-medium text-sm mb-4">{doc.specialization}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(doc)}>
                <Edit2 className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteDoctor.mutate(doc.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
