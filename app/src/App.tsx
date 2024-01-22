import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, TuserSchema } from "./schemas/user.schema";
import { useContext, useState } from "react";

// import { ContractAddress, ContractAbi } from "./constants/contractConstants";
import { SimpleStorageContext, SimpleStorageContextType } from "./Context/SimpleStorageContext";
import { shortenAddress } from "./utils/shortenAddres";

function App() {

  const [storedData, setStoredData ] = useState<any>();
  const { connectWallet, currentAccount, storeData, getData, balance, chainId, chainname } = useContext(SimpleStorageContext) as SimpleStorageContextType;

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
    <main className="flex flex-col justify-center items-center gap-5 min-w-screen min-h-screen w-full h-screen">
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

      <h1>This here is Simple Storage contract section:</h1>
      <div className="flex flex-col justify-center items-center gap-10 w-1/3 h-3/5 border-2 border-white rounded-md">
      <button
        type="button"
        className="w-1/5 h-8 bg-blue-400 disabled:bg-blue-900 rounded-md"
        onClick={connectWallet}
        >Connect</button>
        {
          chainId && (
            <ul>
              <li>chaind id: {chainId}</li>
              <li>current account: {shortenAddress(currentAccount)}</li>
              <li>chain name: {chainname}</li>
              <li>balance: {balance}</li>
            </ul>
          )
        }
      <button
        type="button"
        onClick={() => storeData(5)}
        className="w-1/5 h-8 bg-blue-400 disabled:bg-blue-900 rounded-md"
        >Set</button>
      <button
        type="button"
        onClick={() => setStoredData(getData)}
        className="w-1/5 h-8 bg-blue-400 disabled:bg-blue-900 rounded-md"
        >Get</button>

        {
          storedData && (
            <h1>{storedData}</h1>
          )
        }
      </div>
      
    </main>
  )
}

export default App
