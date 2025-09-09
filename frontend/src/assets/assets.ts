import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg";
import close_icon from "./close_icon.svg";
import users_icon from "./users_icon.svg";
import car_icon from "./car_icon.svg";
import location_icon from "./location_icon.svg";
import fuel_icon from "./fuel_icon.svg";
import addIcon from "./addIcon.svg";
import carIcon from "./carIcon.svg";
import carIconColored from "./carIconColored.svg";
import dashboardIcon from "./dashboardIcon.svg";
import dashboardIconColored from "./dashboardIconColored.svg";
import addIconColored from "./addIconColored.svg";
import listIcon from "./listIcon.svg";
import listIconColored from "./listIconColored.svg";
import cautionIconColored from "./cautionIconColored.svg";
import arrow_icon from "./arrow_icon.svg";
import star_icon from "./star_icon.svg";
import check_icon from "./check_icon.svg";
import tick_icon from "./tick_icon.svg";
import delete_icon from "./delete_icon.svg";
import eye_icon from "./eye_icon.svg";
import eye_close_icon from "./eye_close_icon.svg";
import filter_icon from "./filter_icon.svg";
import edit_icon from "./edit_icon.svg";
import calendar_icon_colored from "./calendar_icon_colored.svg";
import location_icon_colored from "./location_icon_colored.svg";
import testimonial_image_1 from "./testimonial_image_1.png";
import testimonial_image_2 from "./testimonial_image_2.png";
import main_car from "./main_car.png";
import banner_car_image from "./banner_car_image.png";
import user_profile from "./user_profile.png";
import upload_icon from "./upload_icon.svg";
import car_image1 from "./car_image1.png";
import car_image2 from "./car_image2.png";
import car_image3 from "./car_image3.png";
import car_image4 from "./car_image4.png";

export const cityList: string[] = ['New York', 'Los Angeles', 'Houston', 'Chicago'];

type Asset = string;

interface Assets {
    logo: Asset;
    gmail_logo: Asset;
    facebook_logo: Asset;
    instagram_logo: Asset;
    twitter_logo: Asset;
    menu_icon: Asset;
    search_icon: Asset;
    close_icon: Asset;
    users_icon: Asset;
    edit_icon: Asset;
    car_icon: Asset;
    location_icon: Asset;
    fuel_icon: Asset;
    addIcon: Asset;
    carIcon: Asset;
    carIconColored: Asset;
    dashboardIcon: Asset;
    dashboardIconColored: Asset;
    addIconColored: Asset;
    listIcon: Asset;
    listIconColored: Asset;
    cautionIconColored: Asset;
    calendar_icon_colored: Asset;
    location_icon_colored: Asset;
    arrow_icon: Asset;
    star_icon: Asset;
    check_icon: Asset;
    tick_icon: Asset;
    delete_icon: Asset;
    eye_icon: Asset;
    eye_close_icon: Asset;
    filter_icon: Asset;
    testimonial_image_1: Asset;
    testimonial_image_2: Asset;
    main_car: Asset;
    banner_car_image: Asset;
    car_image1: Asset;
    upload_icon: Asset;
    user_profile: Asset;
    car_image2: Asset;
    car_image3: Asset;
    car_image4: Asset;
}

export const assets: Assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_image4,
};

interface MenuLink {
    name: string;
    path: string;
    icon?: Asset;
    coloredIcon?: Asset;
}

export const menuLinks: MenuLink[] = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "My Bookings", path: "/my-bookings" },
];

export const ownerMenuLinks: MenuLink[] = [
    { name: "Dashboard", path: "/admin", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add car", path: "/admin/add-car", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Cars", path: "/admin/manage-cars", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/admin/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
];
