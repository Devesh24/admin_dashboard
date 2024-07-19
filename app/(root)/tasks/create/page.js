import TaskForm from "@/components/shared/TaskForm"

const createTask = () => {
  return (
    <div>
        <div className='relative top-0 w-full h-[70vh] bg-cover md:bg-center text-white flex justify-center items-end' style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url('/assets/images/banner.jpg')"}}>
            <div className="wrapper text-center">
                <p className="h1-bold mb-40">CREATE TASK</p>
            </div>
        </div>
        <div className="w-full flex-center min-h-screen">
            <TaskForm type="Create" />
        </div>
    </div>
  )
}

export default createTask