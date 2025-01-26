export interface Message {
    _id?: string;
    trainerInteractionID?: string;
    sender: "user" | "coach";
    content: string;
    timeStamp: string;
}

export interface TrainerInteraction {
    _id: string;
    userID: string;
    messages: Message[];
    timeStamp: string;
    title: string;
}
  
export interface SidebarProps {
    interactions: TrainerInteraction[];
    onSelectConversation: (id: string) => void;
    onStartNewConversation: () => void; // Prop to handle new session creation
}

export interface MessageBubbleProps {
  message: string;
  sender: "user" | "coach";
}

export interface MessageListProps {
    messages: Message[];
    loading: boolean;
}

export interface ChatInputProps {
    onNewMessage: (newMessages: Message[]) => void;
    setLoading: (loading: boolean) => void;
    trainerInteractionID?: string;
    onNewInteraction: (newID: string) => void;
}

export interface LogoProps {
    width?: number;
    height?: number;
}

export interface RegistrationFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    age: string;
    weight: string;
    height: string;
    fitnessLevel: string;
    goals: string[];
    preferences: string[];
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface Exercise {
    _id: string;
    name: string;
    instructions?: string[];
}
export interface WorkoutExercise {
    exerciseID: Exercise;
    sets: number;
    reps: number;
    notes: string;
}
  
export interface Workout {
    name: string;
    exercises: WorkoutExercise[];
}
  
export interface WorkoutPlan {
    name: string;
    workouts: Workout[];
}