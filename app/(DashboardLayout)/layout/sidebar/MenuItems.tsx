import {
  IconAperture,
  IconCopy,
  IconMapPin,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconUsers,
  IconReceipt2,
  IconStethoscope,
  IconPill,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Addresses",
    icon: IconMapPin,
    href: "/utilities/addresses",
  },
  {
    id: uniqueId(),
    title: "Customers",
    icon: IconUsers,
    href: "/utilities/customers",
  },
  {
    id: uniqueId(),
    title: "Prescriptions",
    icon: IconReceipt2,
    href: "/utilities/prescriptions",
  },
  {
    id: uniqueId(),
    title: "Physicians",
    icon: IconStethoscope,
    href: "/utilities/physicians",
  },
  {
    id: uniqueId(),
    title: "Prescription Items",
    icon: IconPill,
    href: "/utilities/prescription-items",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
