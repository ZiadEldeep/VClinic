// Cart.tsx
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
  Button,
  Avatar,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { useCartStore } from "@/lib/zustant/useCartStore";
import { toast } from "react-toastify"; // Import toast

const Cart = () => {
  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemoveFromCart = (title: string) => {
    removeFromCart(title);
    toast.success(`${title} removed from cart!`); // Toast for removal
  };

  return (
    <Grid container spacing={3}>
      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
          سلة التسوق فارغة
        </Typography>
      ) : (
        cartItems.map((product, index) => (
          <Grid item xs={12} md={4} lg={3} key={index}>
            <BlankCard>
              <Typography component={Link} href="/">
                <Avatar
                  src={product.photo}
                  variant="square"
                  sx={{
                    height: 250,
                    width: "100%",
                  }}
                />
              </Typography>
              <Tooltip title="Remove From Cart">
                <Fab
                  size="small"
                  color="error"
                  sx={{ bottom: "75px", right: "15px", position: "absolute" }}
                  onClick={() => handleRemoveFromCart(product.title)}
                >
                  <IconBasket size="16" />
                </Fab>
              </Tooltip>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography variant="h6">{product.title}</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography variant="h6">${product.price}</Typography>
                    <Typography
                      color="textSecondary"
                      ml={1}
                      sx={{ textDecoration: "line-through" }}
                    >
                      ${product.salesPrice}
                    </Typography>
                  </Stack>
                  <Rating
                    name="read-only"
                    size="small"
                    value={product.rating}
                    readOnly
                  />
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        ))
      )}
      {/* Complete Purchase Button */}
      {cartItems.length > 0 && (
        <Grid item xs={12}>
            <Link
          href="/checkout">
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%', mt: 3 }}
            >
           Checkout 
          </Button>
              </Link>
        </Grid>
      )}
    </Grid>
  );
};

export default Cart;
