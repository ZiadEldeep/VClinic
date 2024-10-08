// app/checkout/page.tsx
"use client"
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useCartStore } from "@/lib/zustant/useCartStore";
import { useState } from "react";
import { toast } from "react-toastify"; // Import toast for notifications

const Checkout = () => {
  const cartItems = useCartStore((state) => state.cart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !address) {
      toast.error("Please fill in all fields!"); // Toast for error
      return;
    }

    // Here you would typically handle payment and order submission
    toast.success("Order placed successfully!"); // Success message
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Your Order</Typography>
            {cartItems.length === 0 ? (
              <Typography>No items in cart.</Typography>
            ) : (
              cartItems.map((product, index) => (
                <Stack key={index} spacing={1}>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography>${product.price}</Typography>
                </Stack>
              ))
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Shipping Information</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Checkout;
