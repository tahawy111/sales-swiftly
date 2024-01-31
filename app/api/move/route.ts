import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jsonFile from "@/oldDB/sell_goods.products.json";
import { getServerSession } from "next-auth";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    console.log(session);

    // if (!session?.user)
    //   return new NextResponse("Unauthorized", { status: 401 });

    // const newItems = jsonFile.map((item) => ({
    //   name: item.name.toString(),
    //   price: Number(item.price),
    //   dealerPrice: Number(item.dealerPrice) || 0,
    //   wholesalePrice: Number(item.wholesale) || 0,
    //   quantity: Number(item.quantity),
    //   barcode: item.quantity.toString() || "",
    //   image: item.image.toString() || "",
    //   userId: session?.user.id,
    //   categoryId: "test",
    // }));
    // console.log(newItems.length);
    // console.log(jsonFile.length);
    // await db.product.createMany({ data: newItems });
    // // const newItems = jsonFile.map((item) => ({
    // //   name: item.category,
    // // }));
    // // console.log(newItems.length);
    // // console.log(jsonFile.length);
    // // await db.category.createMany({ data: newItems });

    // // await db.product.deleteMany();

    return NextResponse.json("OK");
  } catch (error) {
    console.log("[SERVER_ID]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
