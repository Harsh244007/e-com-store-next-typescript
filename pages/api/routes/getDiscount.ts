import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../db/db";
import DiscountsModal from "../models/DiscountCodeModel";

export default async function getDiscuont(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const discountInfo = req.body;
      if (discountInfo.price && discountInfo.discountCode && discountInfo.isValid) {
        discountInfo.discountCode= discountInfo.discountCode.toUpperCase()
        const newDiscount = new DiscountsModal(req.body);
        await newDiscount.save();
        return res.status(201).json(newDiscount);
      }
      return res.status(404).json({ message: "Body not received" });
    } catch (error) {
      console.error("Error creating discount:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const reqDiscountCode = req.query.discount as string;
      if (reqDiscountCode) {
        const getDiscountPrice = await DiscountsModal.findOne({ discountCode: reqDiscountCode.toUpperCase() },{_id:0,__v:0}).lean().exec();
        return res.status(200).json(getDiscountPrice);
      }
      return res.send(404);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
