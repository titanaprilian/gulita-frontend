import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <div className="py-10 px-4 flex justify-center items-start">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Appearance */}
          <div>
            <Label className="font-semibold text-gray-700">Appearance</Label>
            <div className="flex items-center justify-between mt-2">
              <span>Dark Mode</span>
              <Button
                type="button"
                variant={darkMode ? "default" : "outline"}
                onClick={() => setDarkMode((d) => !d)}
                className={darkMode ? "bg-blue-700 text-white" : ""}
              >
                {darkMode ? "On" : "Off"}
              </Button>
            </div>
          </div>
          <Separator />
          {/* Notifications */}
          <div>
            <Label className="font-semibold text-gray-700">Notifications</Label>
            <div className="flex items-center justify-between mt-2">
              <span>Email Notifications</span>
              <Button
                type="button"
                variant={emailNotif ? "default" : "outline"}
                onClick={() => setEmailNotif((n) => !n)}
                className={emailNotif ? "bg-blue-700 text-white" : ""}
              >
                {emailNotif ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
          <Separator />
          {/* Danger Zone */}
          <div>
            <Label className="font-semibold text-red-600">Danger Zone</Label>
            <div className="flex flex-col gap-2 mt-2">
              <Button type="button" variant="destructive" onClick={() => setDeleteConfirm(true)}>
                Delete Account
              </Button>
              {deleteConfirm && (
                <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 mt-2">
                  <div>Are you sure? This action cannot be undone.</div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="destructive" onClick={() => alert("Account deleted (mock)")}>
                      Yes, Delete
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setDeleteConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
