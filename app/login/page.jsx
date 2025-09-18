"use client";

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { saveUserToDB } from "@/actions/saveuser";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      const func = async () => {
        try {
          console.log("Session data:", session); // Debug: Check session contents
          const { email, name, image } = session.user;
          if (!email) {
            console.error("Email is undefined in session");
            return;
          }
          await saveUserToDB({ name, email, image }); // Save to DB
          router.push(`/userpage/${email}`); // Redirect after success
        } catch (error) {
          console.error("Error saving user or redirecting:", error);
        }
      };
      func();
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="w-[100vw] h-[100vh] bg-[url('/Main_bg.jpg')] bg-cover bg-center flex justify-center items-center">
        <div className="w-[90%] h-[60%] md:w-[50%] md:h-[50%] lg:w-[30vw] lg:h-[60vh] bg-white/50 rounded-4xl border-0 border-black border-double flex flex-col justify-evenly items-center">
          <Image src="/pharamLogo.png" width={250} height={250} alt="pharma logo" />
          <div className="text-black">Welcome to <b>PharmaTrack</b></div>
          <button
            className="rounded-full w-[80%] h-12 bg-blue-500 text-white font-bold hover:bg-blue-400 cursor-pointer"
            onClick={() => signIn("github")}
          >
            Sign in with GitHub
          </button>
          <button
            className="rounded-full w-[80%] h-12 bg-blue-500 text-white font-bold hover:bg-blue-400 cursor-pointer"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </button>
          <div className="text-blue-800 w-[80%] text-[10px] flex justify-center items-center text-center">
            By signing in, you agree to our Terms & Privacy Policy.
          </div>
        </div>
      </div>
    );
  }

  return <div className="text-white text-center">Redirecting...</div>; // Fallback while redirecting
};

export default LoginPage;
