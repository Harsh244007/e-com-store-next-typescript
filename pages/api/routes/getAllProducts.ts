import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../db/db";
import ProductsModal from "../models/Products";

export default async function getAllProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const page = parseInt(req.query.page as string) || 1;

    const pageSize = 5;

    const skip = (page - 1) * pageSize;

    const products = await ProductsModal.find({},{_id:0}).skip(skip).limit(pageSize).lean().exec();

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
