"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/fetch-user";

export default function Profile() {
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            setUser(userData);
        };
        getUserData();
    }, []);


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
                            <Input id="name" defaultValue={user.name} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" defaultValue="" />
                        </div>
                        <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input id="weight" type="number" defaultValue="" />
                        </div>
                        <div>
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input id="height" type="number" defaultValue="" />
                        </div>
                        <Button type="submit">Update Profile</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
