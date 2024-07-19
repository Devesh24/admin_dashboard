import UserForm from "@/components/shared/UserForm"

const createUser = () => {
  return (
    <div>
        <div className='relative top-0 w-full h-[70vh] bg-cover md:bg-center text-white flex justify-center items-end' style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url('/assets/images/banner.jpg')"}}>
            <div className="wrapper text-center">
                <p className="h1-bold mb-40">CREATE USER</p>
            </div>
        </div>
        <div className="w-full flex-center min-h-screen">
            <UserForm type="Create" />
        </div>
    </div>
  )
}

export default createUser