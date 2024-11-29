import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Challenges() {
    const challenges = [
        { id: 1, name: "'30-Day Squat Challenge'", participants: 1500, duration: "'30 days'" },
        { id: 2, name: "'Plank Master'", participants: 800, duration: "'14 days'" },
        { id: 3, name: "'10K Steps Daily'", participants: 2000, duration: "'30 days'" },
        { id: 4, name: "'Healthy Eating Challenge'", participants: 1200, duration: "'21 days'" },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Fitness Challenges</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge) => (
                    <Card key={challenge.id}>
                        <CardHeader>
                            <CardTitle>{challenge.name}</CardTitle>
                            <CardDescription>
                                {challenge.participants} participants | {challenge.duration}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button>Join Challenge</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
