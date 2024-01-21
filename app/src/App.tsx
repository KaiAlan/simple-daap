import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, TuserSchema } from "./schemas/user.schema";

// import { ContractAddress, ContractAbi } from "./constants/contractConstants";

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TuserSchema>({
    resolver: zodResolver(userSchema)
  })


  const handleFormSubmit = async(data: TuserSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(data)
  }

  // console.log(ContractAbi);

  return (
    <main className="flex flex-col justify-center items-center min-w-screen min-h-screen w-full h-screen">
      <h1>Hello from vite app</h1>
      <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col justify-center items-center gap-5 w-1/3 h-3/5 border-2 border-white rounded-md"
      >

        <input type="text"
        {...register("email")}
        className="w-4/5 h-12 rounded-md p-2"
        placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-400 font-bold">
            {errors.email.message}
          </p>
        )}
        
        <input type="text"
        {...register("name")}
        className="w-4/5 h-12 rounded-md p-2"
        placeholder="Name"
        />
        { errors.name && (
          <p className="text-red-400 font-bold">
          {errors.name.message}
        </p>
        )}

        <input type="text"
        {...register("location", {required: true, minLength: 4})}
        className="w-4/5 h-12 rounded-md p-2"
        placeholder="Location"
        />
        { errors.location && (
          <p className="text-red-400 font-bold">
          {errors.location.message}
        </p>
        )}

        <input type="text"
        {...register("phoneNo")}
        className="w-4/5 h-12 rounded-md p-2"
        placeholder="Phone Number"
        />
        { errors.phoneNo && (
          <p className="text-red-400 font-bold">
          {errors.phoneNo.message}
        </p>
        )}


        <button
        type="submit"
        disabled={isSubmitting}
        className="w-1/5 h-8 bg-blue-400 disabled:bg-blue-900 rounded-md"
        >Submit</button>
      </form>
    </main>
  )
}

export default App
