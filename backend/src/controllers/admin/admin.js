import { Product } from "../../models/product.js";
import { Order } from "../../models/order.js";
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!image || !Array.isArray(image)) {
      return res.status(400).json({
        message: "Images must be an array",
      });
    }

    // 3. Check not empty
    if (image.length === 0) {
      return res.status(400).json({
        message: "At least 1 image is required",
      });
    }

    // 4. Max 3 images
    if (image.length > 3) {
      return res.status(400).json({
        message: "Maximum 3 images allowed",
      });
    }

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      images: [image],
    });
    return res.status(200).json({ data: product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create a product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    //-1 means make them in desc so from recent to old
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in fetching products" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product doesn't exists" });
    }
    const { name, description, price, stock, category, image } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category) updateData.category = category;
    if (image && Array.isArray(image)) {
      updateData.image = image;
    }
    await Product.findByIdAndUpdate(id, updateData, { new: true });
    return res.status(200).json({ message: "Product is updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update a product" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to Load all orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    //check the status if valid

    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    order.status = status;
    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }
    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }
    await order.save();
    return res.status(200).json({ message: "Order Updated", order });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to update a status of order" });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find().sort({ createdAt: -1 }); //latest user first

    return res
      .status(200)
      .json({ message: "Users are fetched successfully", customers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get all customers" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments(); //number of orders
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { sum: "$totalPrice" },
        },
      },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0; //total of all orders price
    const totalCustomers = await User.countDocuments(); //total users
    const totalProducts = await Product.countDocuments(); //total products

    return res
      .status(200)
      .json({ totalRevenue, totalCustomers, totalProducts, totalOrders });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to get all dashboard data" });
  }
};
