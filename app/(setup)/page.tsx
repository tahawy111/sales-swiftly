import { redirect } from "next/navigation";

interface SetupPageProps {
  
}

export default function SetupPage({ }: SetupPageProps) {
    if(true) {
        redirect('/dashboard')
    }
    return (
        <div>SetupPage</div>
    )
}
