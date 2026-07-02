export const addToWishList = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    //check if product already exists

    if (user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product is already in wishlist" });
    }
    user.wishlist.push(productId);
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to wishlist successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromWishList = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    if (!user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product is not exists in wishlist" });
    }
    user.wishlist.pull(productId);
    await user.save();
    return res
      .status(200)
      .json({ message: "Product deleted from wishlist successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    //where wishlist is an array of ids not data
    const user = await User.findById(req.user._id).populate("wishlist");
    return res.status(200).json({
      message: "wishlist sent successfully",
      wishlist: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
