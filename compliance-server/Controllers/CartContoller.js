const { Cart, CartItem } = require('../Models/CartModel');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Assuming you have user authentication middleware

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = new CartItem({ productId, quantity });
      cart.items.push(newItem);
    }

    await cart.save();

    res.status(201).json({ message: 'Item added to cart successfully', status: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have user authentication middleware

    const cart = await Cart.findOne({ user: userId }).populate('items.productId');

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
