import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUsers,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { FiFolder } from "react-icons/fi";

export const menusUser = [
  {
    name: "پروفایل",
    link: "/dashboard/me/profile",
    icon: HiOutlineUserCircle,
  },
  {
    name: "لیست من",
    link: "/dashboard/me/mylist",
    icon: FiFolder,
    margin: false,
  },
  {
    name: "خروج",
    link: "/",
    icon: HiOutlineArrowRightOnRectangle,
    margin: false,
  },
];
export const menusAdmin = [
  { name: "پروفایل", link: "/dashboard/profile", icon: HiOutlineUserCircle },
  { name: "کاربران", link: "/dashboard/users", icon: HiOutlineUsers },
  { name: "دسته بندی", link: "/dashboard/category", icon: FiFolder, margin: false },
  { name: "فیلم", link: "/dashboard/movies", icon: FiFolder, margin: false },
  { name: "لیست من", link: "/dashboard/mylist", icon: FiFolder, margin: false },
  { name: " گزارش", link: "/dashboard/report", icon: FiFolder, margin: false },
  { name: " تنظیمات", link: "/dashboard/setting", icon: FiFolder, margin: false },
  {
    name: "خروج",
    link: "/",
    icon: HiOutlineArrowRightOnRectangle,
    margin: false,
  },
];
