"use client";
import React, { useEffect, useState } from "react";
import AuthMiddleware from "@/components/authMiddleware";
import Sidebar from "@/components/sidebar";
import Logo from "@/components/logo";
import BurgerMenu from "@/components/burgerMenu";
import { WorkoutPlan } from "@/interfaces";

const WorkoutPage: React.FC = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await fetch("http://localhost:5000/routes/user/getWorkoutPlan", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workout plan.");
        }

        const data: WorkoutPlan = await response.json();
        setWorkoutPlan(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <AuthMiddleware>
      <div className="min-h-screen bg-background text-tertiary flex flex-col items-center justify-center">
        <Logo width={150} height={150} />
        <div className="w-full max-w-4xl bg-secondary shadow-md rounded-lg p-6 mt-32">
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">
            {workoutPlan?.name || "Workout Plan"}
          </h1>
          {workoutPlan?.workouts.map((workout, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
                {workout.name}
              </h2>
              <table className="w-full table-auto border-collapse border border-primary text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-primary">Exercise</th>
                    <th className="px-4 py-2 border border-primary">Instructions</th>
                    <th className="px-4 py-2 border border-primary">Sets</th>
                    <th className="px-4 py-2 border border-primary">Reps</th>
                    <th className="px-4 py-2 border border-primary">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {workout.exercises.map((exercise, exerciseIdx) => (
                    <tr key={exerciseIdx}>
                      <td className="px-4 py-2 border border-primary">
                        {exercise.exerciseID?.name || "N/A"}
                      </td>
                      <td className="px-4 py-2 border border-primary">
                        <ul className="list-disc pl-4">
                          {exercise.exerciseID?.instructions?.map((instruction: string, instructionIdx: number) => (
                            <li key={instructionIdx}>{instruction}</li>
                          )) || <li>No instructions available</li>}
                        </ul>
                      </td>
                      <td className="px-4 py-2 border border-primary text-center">
                        {exercise.sets || "-"}
                      </td>
                      <td className="px-4 py-2 border border-primary text-center">
                        {exercise.reps || "-"}
                      </td>
                      <td className="px-4 py-2 border border-primary">
                        {exercise.notes || "No notes available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <BurgerMenu sidebarContent={<Sidebar />} />
      </div>
    </AuthMiddleware>
  );
};

export default WorkoutPage;
