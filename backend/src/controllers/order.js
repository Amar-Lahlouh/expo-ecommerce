import { Product } from "../models/product.js";
import { Review } from "../models/review.js";

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const { orderItems, shippingAddress, paymentResult, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // validate products and stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      //iza hetat quantity akbr mn lstock
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }
    }

    // create order

    const order = await Order.create({
      user: user._id,
      clerkId: iser.clerkId,
      orderItems,
      shippingAddress,
      paymentResult,
      totalPrice,
    });

    //update stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }
    return res
      .status(200)
      .json({ message: "Order created Successfully", order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ clerkId: req.user.clerkId })
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    //check if order is been reviewd
    const ordersWithReviewStatus = await Promise.all(
      orders.map(async (order) => {
        const review = await Review.findOne({ orderId: order._id });
        return {
          ...order.toObject(),
          hasReviewed: !!review,
        };
      }),
    );

    return res.status(200).json({ orders: ordersWithReviewStatus });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
