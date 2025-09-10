import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
    const {
        setShowLogin,
        user,
        logout,
        isOwner,
        axios,
        setIsOwner,
        token,
    } = useAppContext();

    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const changeRole = async () => {
        try {
            const { data } = await axios.post("/api/admin/change-role");
            if (data.success) {
                setIsOwner(true);
                toast.success(data.message);
                navigate("/admin");
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        setIsLoadingUser(false);
    }, [token]);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-borderColor flex items-center justify-between relative z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"
                }`}
        >
            <Link to="/">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={assets.logo}
                    alt="logo"
                    className="h-8"
                />
            </Link>

            <div className="hidden sm:flex items-center gap-8 text-gray-600 text-sm">
                {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path}>
                        {link.name}
                    </Link>
                ))}

                <div className="hidden lg:flex items-center gap-2 border border-borderColor px-3 py-1.5 rounded-full max-w-56">
                    <input
                        type="text"
                        placeholder="Search Car"
                        className="bg-transparent outline-none text-sm placeholder-gray-500 w-full"
                    />
                    <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-4">
                    {!isLoadingUser && user && (
                        <button
                            onClick={() => (isOwner ? navigate("/admin") : changeRole())}
                            className="text-sm cursor-pointer"
                        >
                            {isOwner ? "Dashboard" : "List Car"}
                        </button>
                    )}
                    {!isLoadingUser && (
                        <button
                            onClick={() => (user ? logout() : setShowLogin(true))}
                            className="px-5 py-2 bg-primary hover:bg-primary-dull transition-all text-white text-sm rounded-lg"
                        >
                            {user ? "Logout" : "Login"}
                        </button>
                    )}
                </div>
            </div>

            <button
                className="sm:hidden z-50"
                aria-label="Toggle menu"
                onClick={() => setOpen(!open)}
            >
                <img
                    src={open ? assets.close_icon : assets.menu_icon}
                    alt="menu-icon"
                    className="w-6 h-6"
                />
            </button>

            <div
                className={`sm:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white border-l border-borderColor shadow-lg transition-transform duration-300 z-40 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col p-6 gap-6 pt-20 text-gray-600 text-sm">
                    {menuLinks.map((link, index) => (
                        <Link key={index} to={link.path} onClick={() => setOpen(false)}>
                            {link.name}
                        </Link>
                    ))}

                    {!isLoadingUser && user && (
                        <button
                            onClick={() => {
                                setOpen(false);
                                isOwner ? navigate("/admin") : changeRole();
                            }}
                            className="text-left"
                        >
                            {isOwner ? "Dashboard" : "List Car"}
                        </button>
                    )}
                    {!isLoadingUser && (
                        <button
                            onClick={() => {
                                setOpen(false);
                                user ? logout() : setShowLogin(true);
                            }}
                            className="px-5 py-2 bg-primary hover:bg-primary-dull transition-all text-white text-sm rounded-lg"
                        >
                            {user ? "Logout" : "Login"}
                        </button>
                    )}
                </div>
            </div>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black opacity-30 sm:hidden z-30"
                />
            )}
        </motion.nav>
    );
};

export default Navbar;
