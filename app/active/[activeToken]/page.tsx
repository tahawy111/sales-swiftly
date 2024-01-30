import { db } from "@/lib/db";
import { verify } from "jsonwebtoken";

interface ActivePageProps {
  params: {
    activeToken: string;
  };
}

export default async function ActivePage({ params }: ActivePageProps) {
  let content = "Activating your account...";

  try {
    const decoded: any = verify(
      params.activeToken,
      `${process.env.ACTIVE_TOKEN_SECRET}`
    );
    console.log({ decoded });

    const user = await db.user.findFirst({
      where: { email: decoded.user.email },
    });

    if (user && !(decoded.exp < (new Date().getTime() + 1) / 1000))
      content = "Your account has been activated. 🎉🎉";
    else if (!(decoded.exp < (new Date().getTime() + 1) / 1000)) {
      await db.user.create({ data: decoded.user });
      content = "Your account has been activated. 🎉🎉";
    }
  } catch (error) {
    content = "Token is expired!!!. Please register again!";
  }

  return (
    <div className="h-full flex w-full justify-center items-center">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="dark:bg-[#27282d] px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <h1 className="text-center text-3xl font-bold text-slate-200 border-b border-b-slate-200"> Activation Page </h1>
          <h2 className="my-4 text-xl font-semibold text-center">{content}</h2>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 items-center flex">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
