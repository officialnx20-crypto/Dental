import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AdminLayout } from "@/components/AdminLayout";
import { useSettings, useUpdateSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();

  const form = useForm({
    defaultValues: {
      clinicAddress: "",
      mapLocationLink: "",
      phoneNumber: "",
      whatsappNumber: "",
      emergencyNumber: "",
      email: "",
      aboutText: "",
      websiteMode: "Public",
      socialLinks: { facebook: "", instagram: "", twitter: "" }
    }
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = async (data: any) => {
    await updateSettings.mutateAsync(data);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Clinic Settings</h1>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={updateSettings.isPending}>
          {updateSettings.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <Label className="text-lg font-bold">Maintenance Mode</Label>
            <p className="text-sm text-slate-500">Hide the public website and show a maintenance screen.</p>
          </div>
          <Switch 
            checked={form.watch('websiteMode') === 'Private'}
            onCheckedChange={(checked) => form.setValue('websiteMode', checked ? 'Private' : 'Public')}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Contact Information</h3>
            <div>
              <Label>Phone Number</Label>
              <Input {...form.register('phoneNumber')} />
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input {...form.register('whatsappNumber')} />
            </div>
            <div>
              <Label>Emergency Number</Label>
              <Input {...form.register('emergencyNumber')} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" {...form.register('email')} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Location & About</h3>
            <div>
              <Label>Clinic Address</Label>
              <Textarea {...form.register('clinicAddress')} rows={2} />
            </div>
            <div>
              <Label>Google Maps Embed URL</Label>
              <Input {...form.register('mapLocationLink')} />
            </div>
            <div>
              <Label>About Text (Footer/Hero)</Label>
              <Textarea {...form.register('aboutText')} rows={3} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg border-b pb-2">Social Links</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Facebook URL</Label>
              <Input {...form.register('socialLinks.facebook')} />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <Input {...form.register('socialLinks.instagram')} />
            </div>
            <div>
              <Label>Twitter URL</Label>
              <Input {...form.register('socialLinks.twitter')} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
