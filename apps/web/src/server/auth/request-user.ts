import "server-only";

import type { User } from "@supabase/supabase-js";
import { createServerSupabaseAuthClient } from "@/lib/supabase/server";

function readBearerToken(request: Request) {
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }

  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

export async function getAuthenticatedUserFromRequest(request: Request): Promise<User | null> {
  const accessToken = readBearerToken(request);
  if (!accessToken) {
    return null;
  }

  const supabase = createServerSupabaseAuthClient();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) {
    return null;
  }

  return data.user ?? null;
}
