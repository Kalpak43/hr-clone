import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/features/auth/authThunk";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/supbase";

function LoginPage() {
  const navigate = useNavigate();
  const dipatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isAdmin, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, isAdmin]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await dipatch(
      login({
        email,
        password,
      })
    );

    console.log(1);
  }

  return (
    <main className="p-4 flex items-center justify-center min-h-[100dvh]">
      <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 sm:min-w-sm shadow">
        <div className="flex items-center justify-center text-center">
          <p className="text-xl font-[600]">Login</p>
        </div>

        <div>
          <form action="" className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Email</Label>
              <Input
                type="email"
                placeholder="xyz@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Password</Label>
              <Input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs hover:text-blue-400" type="button">
                    Forgot Password
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                  </DialogHeader>
                  <ResetCard />
                </DialogContent>
              </Dialog>
            </div>

            <Button className="w-full bg-blue-400 hover:bg-blue-500">
              {loading ? (
                <Loader2 className="animate-spin mx-auto w-fit" />
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;

export function ResetCard() {
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoader, setResetLoader] = useState(false);

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      setResetMessage("Please enter your email.");
      return;
    }

    setResetLoader(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password", // Change to your actual redirect page
    });

    if (error) {
      setResetMessage(error.message);
    } else {
      setResetMessage("Password reset email sent! Check your inbox.");
    }

    setResetLoader(false);
  };

  return (
    <form className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Email</Label>
        <Input
          type="email"
          placeholder="xyz@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {resetMessage && <p className="text-xs">{resetMessage}</p>}
      <div className="text-right">
        <Button
          type="button"
          className=" bg-blue-400 hover:bg-blue-500"
          onClick={handlePasswordReset}
        >
          {resetLoader ? <Loader2 className="animate-spin" /> : "Confirm Email"}
        </Button>
      </div>
    </form>
  );
}
