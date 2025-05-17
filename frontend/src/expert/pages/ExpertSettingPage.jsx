import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from 'lucide-react';

const ExpertSettingPage = () => {
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);

  const handleConnect = (platform) => {
    alert(`Connecting to ${platform}...`);
  };

  const handlePasswordUpdate = () => {
    alert("Redirecting to password update...");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action is irreversible.");
    if (confirmDelete) {
      alert("Account deletion in process...");
    }
  };

  return (
    <div className="px-2 space-y-6  max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Settings</h1>

     {/* Contact Info */}
<div>
  <h2 className="text-lg font-medium mb-2">Contact Information</h2>
  <Card className={"gap-0 py-3 pt-0"}>
    <CardContent className="space-y-4 pt-6">
      <div className="flex justify-between items-center">
        <div>
          <Label>Email</Label>
          <p className="text-muted-foreground">user@example.com</p>
        </div>
        <Button size="sm" variant="outline">Edit</Button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Label>Phone</Label>
          <p className="text-muted-foreground">+91 9876543210</p>
        </div>
        <Button size="sm" variant="outline">Edit</Button>
      </div>
    </CardContent>
  </Card>
</div>


      {/* Social Media Connections */}
      <div>
        <h2 className="text-lg font-medium mb-2">Social Media Connections</h2>
        <Card className={"gap-0 py-3 pt-0"}>
          <CardContent className="space-y-4 pt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                <Label>Connect LinkedIn</Label>
              </div>
              <Button onClick={() => handleConnect("LinkedIn")}>Connect</Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Twitter className="w-5 h-5" />
                <Label>Connect Twitter</Label>
              </div>
              <Button onClick={() => handleConnect("Twitter")}>Connect</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <div>
        <h2 className="text-lg font-medium mb-2">Notification Settings</h2>
        <Card className={"gap-0 py-3 pt-0"}>
          <CardContent className="space-y-4 pt-6">
            <div className="flex justify-between items-center">
              <Label>Receive notifications on Email</Label>
              <Switch
                className="cursor-pointer"
                checked={notifyEmail}
                onCheckedChange={setNotifyEmail}
              />
            </div>
            <div className="flex justify-between items-center">
              <Label>Receive notifications on WhatsApp</Label>
              <Switch
                className="cursor-pointer"
                checked={notifyWhatsApp}
                onCheckedChange={setNotifyWhatsApp}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Password Settings */}
      <div className=''>
        <h2 className="text-lg font-medium mb-2">Privacy / Security</h2>
        <Card className={"gap-0 py-3 pt-0"}>
          <CardContent className="space-y-4 pt-6">
            <Label>Password</Label>
            <p className="text-muted-foreground">••••••••</p>
            <Button onClick={handlePasswordUpdate}>Update Password</Button>
          </CardContent>
        </Card>
      </div>

      {/* Delete Account */}
      <div className="flex justify-end py-6">
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default ExpertSettingPage;
