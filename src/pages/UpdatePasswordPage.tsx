import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/supbase";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast(error.message);
    } else {
      toast("Password updated successfully! Redirecting to home...");
      setTimeout(() => navigate("/login"), 1000);
    }

    setLoading(false);
  }

  return (
    <main className="p-4 flex items-center justify-center min-h-[100dvh]">
      <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 sm:min-w-sm shadow">
        <div className="flex items-center justify-center text-center">
          <p className="text-xl font-[600]">Update Password</p>
        </div>

        <div>
          <form action="" className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Password</Label>
              <Input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full bg-blue-400 hover:bg-blue-500">
              {loading ? (
                <Loader2 className="animate-spin mx-auto w-fit" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default UpdatePasswordPage;
