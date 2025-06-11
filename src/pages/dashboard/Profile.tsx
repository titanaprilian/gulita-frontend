import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialProfile = {
  name: "John Doe",
  email: "john.doe@email.com",
  ageGroup: "41-49",
};

const ageGroups = ["Below 40", "41-49", "50-59", "60 or older"];

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleEdit = () => setEditing(true);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
  };

  return (
    <div className="py-10 px-4 flex justify-center items-start">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="ageGroup">Age Group</Label>
              <select
                id="ageGroup"
                name="ageGroup"
                value={profile.ageGroup}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                {ageGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-2">
              {editing ? (
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              ) : (
                <Button type="button" variant="outline" className="w-full" onClick={handleEdit}>
                  Edit Profile
                </Button>
              )}
            </div>
            {saved && <div className="text-green-600 text-sm text-center">Profile updated!</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
