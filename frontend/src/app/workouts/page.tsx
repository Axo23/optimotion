"use client";
import React, { useEffect, useState } from "react";
import AuthMiddleware from "@/components/authMiddleware";
import Sidebar from "@/components/sidebar";
import Logo from "@/components/logo";
import BurgerMenu from "@/components/burgerMenu";
import { WorkoutPlan } from "@/interfaces";

const WorkoutPage: React.FC = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await fetch("http://localhost:5000/routes/user/getWorkoutPlan", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workout plans.");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setWorkoutPlans(
            data.sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime())
          );
        } else {
          setWorkoutPlans([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlans();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <AuthMiddleware>
      <div className="min-h-screen bg-background text-tertiary flex flex-col items-center p-6">
        <Logo width={150} height={150} />
        <div className="w-full  flex flex-wrap justify-between gap-6 mt-28">
          {workoutPlans.map((workoutPlan, index) => (
            <div
              key={index}
              className="bg-secondary shadow-lg rounded-lg p-6 w-full"
            >
              <h1 className="text-3xl font-bold mb-4 text-center text-primary">
                {workoutPlan.name}
              </h1>
              {/* Workouts are now placed horizontally */}
              <div className="flex flex-row gap-4">
                {workoutPlan.workouts.map((workout, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-background p-4 rounded-lg border border-primary"
                    style={{ minWidth: "300px" }} // Ensures workouts are side by side
                  >
                    <h2 className="text-xl font-semibold text-primary mb-2 text-center">
                      {workout.name}
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-primary text-left">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 border border-primary">Exercise</th>
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <BurgerMenu sidebarContent={<Sidebar />} />
      </div>
    </AuthMiddleware>
  );
};

export default WorkoutPage;
