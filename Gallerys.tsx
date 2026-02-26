import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useGallery, useCreateGalleryImage, useDeleteGalleryImage } from "@/hooks/use-gallery";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

export default function AdminGallery() {
  const { data: gallery } = useGallery();
  const createImg = useCreateGalleryImage();
  const deleteImg = useDeleteGalleryImage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', imageUrl: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return;
    await createImg.mutateAsync(formData);
    setIsOpen(false);
    setFormData({ title: '', imageUrl: '' });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Manage Gallery</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl">
              <Plus className="w-4 h-4" /> Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Upload Gallery Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <ImageUpload folder="gallery" value={formData.imageUrl} onChange={(url) => setFormData(p => ({...p, imageUrl: url}))} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Title (Optional)</label>
                <Input value={formData.title} onChange={e => setFormData(p => ({...p, title: e.target.value}))} placeholder="e.g., Reception Area" />
              </div>
              <Button type="submit" className="w-full" disabled={createImg.isPending || !formData.imageUrl}>Upload</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery?.map(img => (
          <div key={img.id} className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src={img.imageUrl} alt={img.title || ''} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
              {img.title && <p className="text-white text-center font-medium mb-4">{img.title}</p>}
              <Button variant="destructive" size="sm" onClick={() => deleteImg.mutate(img.id)}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
