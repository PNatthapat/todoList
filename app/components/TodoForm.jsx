import { addTodo } from "../server-actions/addTodo";

export default function todoForm() {
  return (
    <form action={addTodo} className="mb-6">
      <div className="mb-4">
        <label htmlFor="subject" className="block text-white mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="detail" className="block text-white mb-2">
          Detail
        </label>
        <input
          type="text"
          id="detail"
          name="detail"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-white mb-2">
          Date
        </label>
        <input
          type="text"
          id="date"
          name="date"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded"
      >
        Add Todo-List
      </button>
    </form>
  );
}
