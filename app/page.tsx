import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="container mx-auto px-4 py-8">
                <nav className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Fitness Hub</h1>
                    <div className="space-x-4">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Fitness Hub</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Your ultimate fitness companion for a healthier lifestyle
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personalized Workouts</CardTitle>
                            <CardDescription>
                                Tailored exercise plans to meet your fitness goals
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Access a wide range of workouts designed by fitness experts</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Exciting Challenges</CardTitle>
                            <CardDescription>
                                Push your limits with our fitness challenges
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Join community challenges and track your progress</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Nutritious Meal Plans</CardTitle>
                            <CardDescription>
                                Fuel your body with balanced meal plans
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Discover delicious and healthy recipes to support your fitness
                                journey
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4">Why Choose Fitness Hub?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Expert Guidance</h4>
                            <p>Get advice from certified fitness professionals</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Progress Tracking</h4>
                            <p>Monitor your fitness journey with detailed analytics</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Community Support</h4>
                            <p>Connect with like-minded individuals and stay motivated</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Flexible Plans</h4>
                            <p>Customize your fitness routine to fit your lifestyle</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h3>
                    <p className="text-xl text-gray-600 mb-8">
                        Join Fitness Hub today and start your journey to a healthier you!
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/signup">Sign Up Now</Link>
                    </Button>
                </div>
            </main>
        </div>
    );
}
