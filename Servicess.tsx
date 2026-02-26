import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/hooks/use-services";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminServices() {
  const { data: services } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '' });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', imageUrl: '' });
    setIsOpen(true);
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({ name: service.name, description: service.description, imageUrl: service.imageUrl || '' });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateService.mutateAsync({ id: editingId, ...formData });
    } else {
      await createService.mutateAsync(formData);
    }
    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Manage Services</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew} className="gap-2 rounded-xl">
              <Plus className="w-4 h-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Image</label>
                <ImageUpload folder="services" value={formData.imageUrl} onChange={(url) => setFormData(p => ({...p, imageUrl: url}))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input required value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea required rows={4} value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} />
              </div>
              <Button type="submit" className="w-full" disabled={createService.isPending || updateService.isPending}>Save Service</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map(service => (
          <div key={service.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
            {service.imageUrl && (
              <img src={service.imageUrl} alt={service.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-2">{service.name}</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1">{service.description}</p>
              <div className="flex gap-2 mt-auto">
                <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => handleEdit(service)}>
                  <Edit2 className="w-4 h-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" className="gap-2" onClick={() => deleteService.mutate(service.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
