import { supabase } from "@/supbase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllowedRoutes = createAsyncThunk(
  "routes/fetchAllowedRoutes",
  async ({ role }: { role: string }) => {
    const { data, error } = await supabase
      .from("route_access")
      .select("route")
      .eq("role", role);

    if (error) {
      return ["/"] as string[];
    }

    if (data) {
      return data.map((r) => r.route) as string[];
    }

    return ["/"];
  }
);
