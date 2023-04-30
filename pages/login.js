import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import logo from "./logo.jpg"
function Login({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <Image className="w-52 mb-5" src={logo} alt="Logo" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: "/"})} className=" text-white p-5 bg-[#FF0E37] rounded-lg">Login with {provider.name}</button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps(){
  const providers = await getProviders();

  return { 
    props: {
      providers,
    },
  };
}