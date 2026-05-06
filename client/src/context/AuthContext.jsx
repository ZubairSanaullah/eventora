import React from "react";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return true;
        } catch (err) {
            throw err;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return true;
        } catch (err) {
            throw err;
        }
    };

    const verifyOtp = async () => {
        try {
            const { data } = await api.post('/auth/verify-otp');
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return true;
        } catch (err) {
            throw err;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, verifyOtp, register }}>
            {children}
        </AuthContext.Provider>
    );
}