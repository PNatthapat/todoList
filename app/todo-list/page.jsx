import { cookies } from "next/headers";
import EditTodo from "../components/EditTodo";
import TodoForm from "../components/TodoForm";
import { deleteTodo } from "../server-actions/deleteTodo";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function todoList() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const { data: todo, error } = await supabase
    .from("todo")
    .select("*")
    .eq("user_id", user.id)
    .order("subject", { ascending: true });

  if (error) {
    console.error("Error fetching todo");
  }
  console.log({ user });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Todo - List
          </h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </form>
        </div>
        <div>
          <p className="italic bg-rose-900 py-2 px-4 rounded">
            User is: {user.email}
          </p>
        </div>
        <TodoForm />
        <div className="mt-6">
          {todo.map((todo) => (
            <div
              key={todo.id}
              className="mb-4 p-4 bg-gray-800 rounded-lg shadow"
            >
              <h2 className="text-xl text-white mb-2">
                [{todo.date}] <b>{todo.subject}</b> - {todo.detail}
              </h2>
              <div className="flex space-x-2">
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </form>
                <EditTodo todo={todo} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
