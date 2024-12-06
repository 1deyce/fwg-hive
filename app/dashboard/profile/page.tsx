"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UploadAvatar from "./uploadAvatar";
import useUserStore from "@/zustand/store/userStore";

export default function Profile() {
    const { getUser } = useUserStore();
    const user = getUser();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex space-y-4">
                        <div className="flex flex-col space-y-6 basis-1/2">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue={user?.name} /> 
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={user?.email} />
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
                            <Button type="submit" className="mx-auto w-1/2">
                                Update Profile
                            </Button>
                        </div>
                        <Separator orientation="vertical" className="bg-background" />
                        <div className="flex basis-1/2 justify-center">
                            <UploadAvatar />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
