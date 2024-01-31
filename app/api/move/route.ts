import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jsonFile from "@/oldDB/sell_goods.products.json";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    console.log(session);

    if (!session?.user)
      return new NextResponse("Unauthorized", { status: 401 });

    // const newItems = jsonFile.map((item) => ({
    //   name: item.name.toString(),
    //   price: Number(item.price),
    //   dealerPrice: Number(item.dealerPrice) || 0,
    //   wholesalePrice: Number(item.wholesale) || 0,
    //   quantity: Number(item.quantity),
    //   barcode: item.quantity.toString() || "",
    //   image: item.image.toString() || "",
    //   userId: session?.user.id,
    //   categoryId: "7a1fede2-2735-4ccf-961a-bd84562042db",
    // }));

    // for (const item of jsonFile) {
    //   const category = await db.category.findUnique({
    //     where: { name: item.category },
    //   });

    //   await db.product.create({
    //     data: {
    //       name: item.name.toString(),
    //       price: Number(item.price),
    //       dealerPrice: Number(item.dealerPrice) || 0,
    //       wholesalePrice: Number((item as any).wholesale) || 0,
    //       quantity: Number(item.quantity),
    //       barcode: item.quantity.toString() || "",
    //       image: item.image.toString() || "",
    //       userId: session?.user.id,
    //       categoryId: category.id,
    //     },
    //   });

    //   console.log(jsonFile.length);
    // }
    // const newItems = jsonFile.map((item) => ({
    //   name: item.category,
    // }));
    // console.log(newItems.length);
    // console.log(jsonFile.length);
    // await db.category.createMany({ data: newItems });

    // await db.product.deleteMany();

    return NextResponse.json("OK");
  } catch (error) {
    console.log("[SERVER_ID]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
