import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Profile() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john@example.com" />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" defaultValue="30" />
                        </div>
                        <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input id="weight" type="number" defaultValue="75" />
                        </div>
                        <div>
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input id="height" type="number" defaultValue="180" />
                        </div>
                        <Button type="submit">Update Profile</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
