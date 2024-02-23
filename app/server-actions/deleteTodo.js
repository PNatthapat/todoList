"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteTodo(formData) {
  const todoId = formData.get("id");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User it not authenticated within deleteTodo server action");
    return;
  }

  const { error } = await supabase
    .from("todo")
    .delete()
    .match({ id: todoId, user_id: user.id });

  if (error) {
    console.error("Error deleting data", error);
  }

  revalidatePath("/todo-list");

  return { message: "Success" };
}
