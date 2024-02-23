"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateTodo(formData) {
  const id = formData.get("id");
  const subject = formData.get("subject");
  const detail = formData.get("detail");
  const date = formData.get("date");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User it not authenticated within updateTodo server action");
    return;
  }

  const { data, error } = await supabase
    .from("todo")
    .update({
      subject,
      detail,
      date: date,
    })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/todo-list");

  return { message: "Success" };
}
