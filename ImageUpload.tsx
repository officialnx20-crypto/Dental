import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Link as LinkIcon } from 'lucide-react';
import { uploadImage } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder: string;
}

export function ImageUpload({ value, onChange, folder }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please upload an image file', variant: 'destructive' });
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadImage(file, folder);
      onChange(url);
      toast({ title: 'Success', description: 'Image uploaded successfully' });
    } catch (error: any) {
      console.error(error);
      toast({ 
        title: 'Upload Failed', 
        description: error.message || 'Could not upload image.', 
        variant: 'destructive' 
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlValue.trim()) return;
    
    let url = urlValue.trim();
    // Transform Google Drive links to direct image links
    if (url.includes('drive.google.com') || url.includes('googleusercontent.com')) {
      const fileIdMatch = url.match(/\/d\/(.+?)(\/|$)/) || url.match(/id=(.+?)(&|$)/);
      if (fileIdMatch && fileIdMatch[1]) {
        url = `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
      }
    } else if (url.includes('drive.google.com/open?id=')) {
      const fileIdMatch = url.match(/id=(.+?)(&|$)/);
      if (fileIdMatch && fileIdMatch[1]) {
        url = `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
      }
    } else if (url.includes('drive.google.com/file/d/')) {
       const fileIdMatch = url.match(/\/d\/(.+?)(\/|view|$)/);
       if (fileIdMatch && fileIdMatch[1]) {
         url = `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
       }
    }
    
    onChange(url);
    setUrlValue('');
    setShowUrlInput(false);
    toast({ title: 'Success', description: 'Image URL added' });
  };

  return (
    <div className="w-full space-y-4">
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border group aspect-video bg-muted flex items-center justify-center">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button type="button" variant="destructive" size="icon" onClick={() => onChange('')}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {showUrlInput ? (
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <Input 
                placeholder="Paste Google Drive or Image URL" 
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                className="rounded-xl"
              />
              <Button type="submit" size="sm" className="rounded-xl">Add</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowUrlInput(false)} className="rounded-xl">Cancel</Button>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center cursor-pointer text-muted-foreground"
              >
                {isUploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 mb-2 opacity-50" />
                    <span className="text-xs font-medium text-center px-2">Upload Image</span>
                  </>
                )}
              </div>
              <div 
                onClick={() => setShowUrlInput(true)}
                className="aspect-video rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center cursor-pointer text-muted-foreground"
              >
                <LinkIcon className="w-6 h-6 mb-2 opacity-50" />
                <span className="text-xs font-medium text-center px-2">Paste URL / Drive Link</span>
              </div>
            </div>
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
