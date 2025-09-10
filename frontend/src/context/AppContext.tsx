import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, type NavigateFunction } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL as string;

interface User {
    _id: string;
    name: string;
    email: string;
    role?: string;
    image?:string
}

interface Car {
    _id: string;
    isAvailable: boolean;
}

interface AppContextType {
    navigate: NavigateFunction;
    axios: typeof axios;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    isOwner: boolean;
    setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
    fetchUser: () => Promise<void>;
    showLogin: boolean;
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void;
    fetchCars: () => Promise<void>;
    cars: Car[];
    setCars: React.Dispatch<React.SetStateAction<Car[]>>;
    pickupDate: string;
    returnDate: string;
    setPickupDate: React.Dispatch<React.SetStateAction<string>>;
    setReturnDate: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [cars, setCars] = useState<Car[]>([]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/data");
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === "owner");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const fetchCars = async () => {
        try {
            const { data } = await axios.get("/api/user/cars");
            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common["Authorization"] = "";
        toast.success("You have been logged out");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
        fetchCars();
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `${token}`;
            fetchUser();
        }
    }, [token]);

    return (
        <AppContext.Provider
            value={{
                navigate,
                axios,
                user,
                setUser,
                token,
                setToken,
                isOwner,
                setIsOwner,
                fetchUser,
                showLogin,
                setShowLogin,
                logout,
                fetchCars,
                cars,
                setCars,
                pickupDate,
                returnDate,
                setPickupDate,
                setReturnDate,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
