import React, { useState, useEffect } from "react";
import "./login.scss";
import { RiLockPasswordLine, RiUser3Line } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useGetValue } from "../../hooks/useGetValue";
import { useDispatch } from "react-redux";
import { setAuthData, logout } from "../../context/slices/authSlice";
import { toast } from "react-toastify";
import { BOT_URLS } from "../../config/botUrls";

const initialState = {
    username: "",
    password: ""
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const { formData, setFormData, handleChange } = useGetValue(initialState)
    const dispatch = useDispatch()

    // Login sahifasiga kirganda eski token va URL'ni tozalash
    useEffect(() => {
        // Eski token va botBaseUrl'ni tozalash
        dispatch(logout());
        localStorage.removeItem("x-auth-token");
        localStorage.removeItem("bot-base-url");
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.username.trim()) {
            toast.error("Username kiritilmagan");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("Password kiritilmagan");
            return;
        }

        if (BOT_URLS.length === 0) {
            toast.error("Bot URL'lar ro'yxati bo'sh. Config faylni tekshiring.");
            return;
        }

        setLoading(true);

        try {
            // Har bir bot URL'iga parallel login so'rovi yuborish
            const loginPromises = BOT_URLS.map(async (botUrl) => {
                try {
                    // URL'ni tozalash
                    let cleanUrl = botUrl.trim();
                    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
                        cleanUrl = `https://${cleanUrl}`;
                    }
                    cleanUrl = cleanUrl.replace(/\/+$/, "");

                    const response = await fetch(`${cleanUrl}/users/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: formData.username.trim(),
                            password: formData.password,
                        }),
                    });

                    const result = await response.json();

                    // Agar muvaffaqiyatli bo'lsa, response'dan kelgan botBaseUrl'ni ishlatish
                    if (response.ok && result.data?.accessToken) {
                        // Response'dan kelgan botBaseUrl'ni olish (majburiy)
                        const responseBotUrl = result.data?.botBaseUrl;
                        
                        if (!responseBotUrl) {
                            // Agar response'da botBaseUrl bo'lmasa, xato
                            return { 
                                success: false, 
                                botUrl: cleanUrl, 
                                error: { message: "Response'da botBaseUrl topilmadi" } 
                            };
                        }
                        
                        // Response'dan kelgan botBaseUrl'ni ishlatish (majburiy)
                        let finalBotUrl = responseBotUrl.trim();
                        if (!finalBotUrl.startsWith("http://") && !finalBotUrl.startsWith("https://")) {
                            finalBotUrl = `https://${finalBotUrl}`;
                        }
                        finalBotUrl = finalBotUrl.replace(/\/+$/, "");
                        
                        return {
                            success: true,
                            botBaseUrl: finalBotUrl, // Response'dan kelgan URL
                            originalRequestUrl: cleanUrl, // So'rov yuborilgan URL (debug uchun)
                            token: result.data.accessToken,
                            data: result.data
                        };
                    }

                    return { success: false, botUrl: cleanUrl, error: result };
                } catch (error) {
                    // Xato bo'lsa, null qaytarish
                    return { success: false, botUrl: botUrl, error: error.message };
                }
            });

            // Barcha so'rovlarni kutish
            const results = await Promise.all(loginPromises);

            // Barcha muvaffaqiyatli javoblarni topish
            const successfulLogins = results.filter(result => result.success === true);

            if (successfulLogins.length > 0) {
                // Response'dan kelgan botBaseUrl'ga qarab to'g'ri botni tanlash
                // Har bir admin o'zining botiga tegishli bo'lgani uchun, 
                // faqat bitta bot muvaffaqiyatli javob qaytarishi kerak
                // Lekin agar bir nechta bo'lsa, birinchi muvaffaqiyatli javobni olish
                // (response'dan kelgan botBaseUrl bilan)
                const selectedLogin = successfulLogins[0];
                const { token, botBaseUrl } = selectedLogin;
                
                // Debug uchun
                console.log("✅ Login muvaffaqiyatli!");
                console.log("Selected bot URL (from response):", botBaseUrl);
                console.log("Original request URL:", selectedLogin.originalRequestUrl);
                console.log("Response data:", selectedLogin.data);
                
                // Token va URL'ni saqlash (response'dan kelgan botBaseUrl'ni ishlatish)
                dispatch(setAuthData({ token, botBaseUrl }));
                
                toast.success("Login Successful");
                
                // Sahifani to'liq yangilash (cache va barcha ma'lumotlarni yangilash uchun)
                setTimeout(() => {
                    window.location.href = "/admin/dashboard";
                }, 500); // Toast ko'rinishi uchun biroz kutish
            } else {
                // Barcha so'rovlar muvaffaqiyatsiz bo'lsa
                const firstError = results.find(r => r.error);
                const errorMessage = firstError?.error?.message || 
                                   firstError?.error?.error || 
                                   "Login xatosi. Username yoki password noto'g'ri.";
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Serverga ulanib bo'lmadi. Internet aloqasini tekshiring.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="title">Admin Panel</h2>
                <p className="subtitle">Login to your dashboard</p>

                <form onSubmit={handleSubmit} className="form">

                    <div className="input-group">
                        <label htmlFor="emailID">Username</label>
                        <div className="password-wrapper">
                            <RiUser3Line />
                            <input
                                name="username"
                                id="emailID"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group password-group">
                        <label htmlFor="passwordID">Password</label>

                        <div className="password-wrapper">
                            <RiLockPasswordLine />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="passwordID"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                            </span>
                        </div>
                    </div>

                    <div className="extra-row">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            Remember me
                        </label>

                        <a href="#" className="forgot">
                            Forgot password?
                        </a>
                    </div>

                    <button className="btn" type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
