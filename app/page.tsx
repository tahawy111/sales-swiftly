import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  

  if(!session) {
    redirect('/login')
  } 

  return <div></div>;
}
