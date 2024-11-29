import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Workouts() {
    const workouts = [
        { id: 1, name: "'Full Body HIIT'", duration: "'30 min'", difficulty: "'Intermediate'" },
        { id: 2, name: "'Upper Body Strength'", duration: "'45 min'", difficulty: "'Advanced'" },
        { id: 3, name: "'Yoga Flow'", duration: "'60 min'", difficulty: "'Beginner'" },
        { id: 4, name: "'Core Crusher'", duration: "'20 min'", difficulty: "'Intermediate'" },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Workouts</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {workouts.map((workout) => (
                    <Card key={workout.id}>
                        <CardHeader>
                            <CardTitle>{workout.name}</CardTitle>
                            <CardDescription>
                                {workout.duration} | {workout.difficulty}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button>Start Workout</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
