import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MealPlans() {
    const mealPlans = [
        { id: 1, name: "'High Protein Plan'", calories: 2500, meals: 5 },
        { id: 2, name: "'Vegetarian Delight'", calories: 2000, meals: 4 },
        { id: 3, name: "'Keto Kickstart'", calories: 1800, meals: 3 },
        { id: 4, name: "'Balanced Nutrition'", calories: 2200, meals: 4 },
    ];

    // TODO: Add fetch logic

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Meal Plans</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mealPlans.map((plan) => (
                    <Card key={plan.id}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>
                                {plan.calories} calories | {plan.meals} meals per day
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button>View Plan</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
