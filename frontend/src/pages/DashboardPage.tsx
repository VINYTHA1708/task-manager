import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getTasks, createTask, checkAdminAccess, type Task } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ListTodo, Plus, Shield, LogOut, AlertCircle, CheckCircle2, RefreshCw, Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const [newTask, setNewTask] = useState({ title: "", description: "", status: "PENDING" as "PENDING" | "COMPLETED" });
  const [creating, setCreating] = useState(false);

  const [adminResult, setAdminResult] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleGetTasks = async () => {
    setLoadingTasks(true);
    setMessage(null);
    try {
      const data = await getTasks();
      setTasks(data);
      setTasksLoaded(true);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setMessage(null);
    try {
      const created = await createTask(newTask);
      setTasks((prev) => [...prev, created]);
      setNewTask({ title: "", description: "", status: "PENDING" });
      setMessage({ type: "success", text: "Task created successfully" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setCreating(false);
    }
  };

  const handleAdminCheck = async () => {
    setCheckingAdmin(true);
    setAdminResult(null);
    try {
      const text = await checkAdminAccess();
      setAdminResult({ type: "success", text: text || "Admin access confirmed!" });
    } catch (err: any) {
      setAdminResult({ type: "error", text: err.message });
    } finally {
      setCheckingAdmin(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <ListTodo className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        {/* Global message */}
        {message && (
          <div className={`flex items-center gap-2 rounded-lg p-3 text-sm animate-fade-in ${message.type === "success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
            {message.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            {message.text}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Create Task */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="h-5 w-5 text-primary" /> Create Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" placeholder="Describe the task..." rows={3} value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={newTask.status} onValueChange={(v) => setNewTask({ ...newTask, status: v as "PENDING" | "COMPLETED" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : "Create Task"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Admin Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" /> Admin Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test whether your account has admin privileges.
              </p>
              <Button onClick={handleAdminCheck} variant="outline" className="w-full" disabled={checkingAdmin}>
                {checkingAdmin ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...</> : "Check Admin Access"}
              </Button>
              {adminResult && (
                <div className={`flex items-center gap-2 rounded-lg p-3 text-sm animate-fade-in ${adminResult.type === "success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                  {adminResult.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
                  {adminResult.text}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="h-5 w-5 text-primary" /> Tasks
            </CardTitle>
            <Button onClick={handleGetTasks} size="sm" variant="outline" disabled={loadingTasks}>
              {loadingTasks ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              {tasksLoaded ? "Refresh" : "Load Tasks"}
            </Button>
          </CardHeader>
          <CardContent>
            {!tasksLoaded && !loadingTasks && (
              <p className="text-center text-sm text-muted-foreground py-8">
                Click "Load Tasks" to fetch your tasks from the server.
              </p>
            )}
            {tasksLoaded && tasks.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No tasks yet. Create one above!
              </p>
            )}
            {tasks.length > 0 && (
              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <div key={task.id ?? i}>
                    {i > 0 && <Separator className="mb-3" />}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{task.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{task.description}</p>
                      </div>
                      <Badge variant={task.status === "COMPLETED" ? "default" : "secondary"} className="shrink-0">
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
