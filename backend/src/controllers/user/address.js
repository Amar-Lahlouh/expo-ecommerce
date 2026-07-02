import { User } from "../../models/user.js";
export const addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    if (
      !label ||
      !fullName ||
      !streetAddress ||
      !city ||
      !state ||
      !zipCode ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = req.user;
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });
    await user.save();
    return res.status(200).json({ message: "Address added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAddresses = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const { idaddress } = req.params; //id from frontend
    const address = user.addresses._id(idaddress); //return the address
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    if (isDefault) {
      user.addresses.forEach((Addr) => {
        Addr.isDefault = false;
      });
    }

    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save();
    return res.status(200).json({
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { idaddress } = req.params;
    const user = req.user;
    user.addresses.pull(idaddress); //pull to delete from array
    await user.save();
    return res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
