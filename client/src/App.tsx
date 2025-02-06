import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AddGoal from "@/pages/add-goal";
import GoalDetails from "@/pages/goal-details";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/goals/new" component={AddGoal} />
      <Route path="/goals/:id" component={GoalDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}