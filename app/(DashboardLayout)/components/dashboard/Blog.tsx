import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
  Avatar,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { useCartStore } from "@/lib/zustant/useCartStore";
import { toast } from "react-toastify";
const ecoCard = [
  {
    title: "Paracetamol 500mg",
    subheader: "September 14, 2023",
    photo: "/images/products/PHOTO-2024-10-05-02-24-29.jpg",
    salesPrice: 25,
    price: 30,
    rating: 5,
  },
  {
    title: "Amoxicillin 250mg",
    subheader: "September 14, 2023",
    photo: "/images/products/ذمممم.jpeg",
    salesPrice: 75,
    price: 85,
    rating: 4,
  },
  {
    title: "Ibuprofen 200mg",
    subheader: "September 14, 2023",
    photo: "/images/products/2222.jpeg",
    salesPrice: 45,
    price: 50,
    rating: 3,
  },
  {
    title: "Cough Syrup 100ml",
    subheader: "September 14, 2023",
    photo: "/images/products/٤٥٨٩٠.jpeg",
    salesPrice: 35,
    price: 40,
    rating: 4,
  },
  {
    title: "Aspirin 100mg",
    subheader: "September 14, 2023",
    photo: "/images/products/٦٦٦٦.jpeg",
    salesPrice: 20,
    price: 25,
    rating: 4,
  },
  {
    title: "Vitamin C 500mg",
    subheader: "September 14, 2023",
    photo: "/images/products/٦٦٧٨٦٥٦٧٨٩.jpeg",
    salesPrice: 60,
    price: 70,
    rating: 5,
  },
  {
    title: "Cetirizine 10mg",
    subheader: "September 14, 2023",
    photo: "/images/products/٦٦٧٨٩٩٩٩٩٩.jpeg",
    salesPrice: 30,
    price: 35,
    rating: 3,
  },
  {
    title: "Omeprazole 20mg",
    subheader: "September 14, 2023",
    photo: "/images/products/٦٧٦٥٤٥٦٧٨٩٠.jpeg",
    salesPrice: 50,
    price: 55,
    rating: 4,
  },
  {
    title: "Metformin 500mg",
    subheader: "September 14, 2023",
    photo: "/images/products/٧٧٧٧٧.jpeg",
    salesPrice: 40,
    price: 45,
    rating: 4,
  },
  {
    title: "Loratadine 10mg",
    subheader: "September 14, 2023",
    photo: "/images/products/2222.jpeg",
    salesPrice: 25,
    price: 30,
    rating: 3,
  },
  {
    title: "Antibiotic Cream 15g",
    subheader: "September 14, 2023",
    photo: "/images/products/PHOTO-2024-10-05-02-24-29.jpg",
    salesPrice: 20,
    price: 25,
    rating: 4,
  },
  {
    title: "Insulin Injection 10ml",
    subheader: "September 14, 2023",
    photo: "/images/products/ذمممم.jpeg",
    salesPrice: 150,
    price: 160,
    rating: 5,
  },
];
const Blog = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = useCartStore((state) => state.isInCart);

  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const handleCartToggle = (product: typeof ecoCard[0]) => {
    if (isInCart(product.title)) {
      removeFromCart(product.title);
      setCartItems((prev) => prev.filter((item) => item !== product.title));
      toast.info(`${product.title} has been removed from your cart!`); // Notify removal
    } else {
      addToCart(product);
      setCartItems((prev) => [...prev, product.title]);
      toast.success(`${product.title} has been added to your cart!`); // Notify addition
    }
  };

  return (
    <Grid container spacing={3}>
      {ecoCard.map((product, index) => (
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
            <Tooltip title="Add To Cart">
              <Fab
                size="small"
                sx={{
                  bottom: "75px",
                  right: "15px",
                  position: "absolute",
                  backgroundColor: cartItems.includes(product.title) ? "red" : "blue",
                  color: "white",
                  "&:hover": {
                    backgroundColor: cartItems.includes(product.title) ? "darkred" : "darkblue",
                  },
                }}
                onClick={() => handleCartToggle(product)}
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
      ))}
    </Grid>
  );
};

export default Blog;

