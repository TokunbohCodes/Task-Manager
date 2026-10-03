import { MdAddBox } from 'react-icons/md'
const TaskForm = () => {
  return (
    <form className="flex flex-1 items-center rounded-lg">
      <input
        type="text"
        name=""
        id="title"
        className="w-0 h-12 flex-1 outline-0 border border-gray-700 rounded-tl-lg rounded-bl-lg pl-6 text-lg capitalize"
      />
      <button
        type="submit"
        className=" -ml-1 cursor-pointer p-0 m-0 border rounded-tr-lg rounded-br-lg border-cl"
      >
        <MdAddBox className="size-11 text-green-700 pointer-events-none" />
      </button>
    </form>
  )
}

export default TaskForm
