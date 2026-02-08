import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate, Link } from "react-router-dom";
import { healthCare1 } from "../assets/logos";
import { dummyLogin } from "@/services/utils/DummyLoginHelper";
import { motion } from "framer-motion";
import {
    LuMail, LuLock, LuArrowRight, LuArrowLeft,
    LuShieldCheck, LuUsers, LuActivity
} from "react-icons/lu";

const loginApi = async (credentials: any) => {
    const response = dummyLogin(credentials);
    return response;
};

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { mutate: loginMutate, isPending } = useMutation({
        mutationKey: ["loginApi"],
        mutationFn: loginApi,
        onSuccess: async (data) => {
            if (data.status === 200) {
                message.success("Login successful!");
                // Redirection logic based on role
                if (data.data?.role === 3) navigate("/auth/dashboard");
                else if (data.data?.role === 2) navigate("/auth/doctor/dashboard");
                else if (data.data?.role === 1) navigate("/auth/admin/dashboard");
                form.resetFields();
            } else {
                message.error(data.message || "Invalid credentials!");
            }
        },
    });

    const handleSubmit = (values: any) => {
        loginMutate({
            emailId: values.email,
            password: values.password,
        });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-500 flex items-center justify-center font-['Inter',sans-serif]">
            <div className="w-full max-w-6xl h-[600px] bg-white rounded-[3rem] shadow-2xl shadow-blue-100 overflow-hidden flex flex-col md:flex-row m-4">

                {/* LEFT SIDE - BRAND PANEL */}
                <div className="w-full md:w-1/2 bg-blue-600 relative overflow-hidden flex flex-col p-12 text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-32 -mb-32" />

                    <Link
                        to="/"
                        className="flex items-center gap-2 group mb-auto z-10"
                    >
                        <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md group-hover:bg-white/20 transition-colors">
                            <LuArrowLeft size={20} />
                        </div>
                        <span className="font-bold text-sm tracking-widest uppercase">Back to Home</span>
                    </Link>

                    <div className="relative z-10 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img src={healthCare1} alt="Logo" className="h-16 mb-8 filter brightness-0 invert" />
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                Modern Healthcare <br />
                                <span className="text-blue-200">Simplified.</span>
                            </h1>
                            <p className="text-blue-100 text-lg opacity-80 mt-6 max-w-md">
                                Experience the next generation of patient care management. Efficient, secure, and always accessible.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6 pt-12">
                            <div className="flex items-center gap-3 text-sm font-bold opacity-80">
                                <LuShieldCheck className="text-blue-300" size={24} />
                                <span>ISO Secured</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold opacity-80">
                                <LuUsers className="text-blue-300" size={24} />
                                <span>10k+ Users</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold opacity-80">
                                <LuActivity className="text-blue-300" size={24} />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - LOGIN FORM */}
                <div className="w-full md:w-1/2 flex flex-col p-12 md:p-20 bg-white">
                    <div className="mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-400 font-medium">Please enter your details to sign in.</p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="space-y-6"
                        requiredMark={false}
                    >
                        <Form.Item
                            name="email"
                            label={<span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</span>}
                            rules={[{ required: true, message: "Please enter your email" }]}
                        >
                            <Input
                                size="large"
                                placeholder="doctor@example.com"
                                prefix={<LuMail className="text-slate-300 mr-2" />}
                                className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:border-blue-500 hover:border-blue-300 transition-all font-medium"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</span>}
                            rules={[{ required: true, message: "Please enter your password" }]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="••••••••"
                                prefix={<LuLock className="text-slate-300 mr-2" />}
                                className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:border-blue-500 hover:border-blue-300 transition-all font-medium"
                            />
                        </Form.Item>

                        <div className="flex items-center justify-between pb-4">
                            <Link to="/register" className="text-sm font-bold text-blue-600 hover:text-blue-700">Create Account</Link>
                            <a href="#" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Forgot Password?</a>
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isPending}
                            className="w-full h-14 rounded-2xl bg-slate-900 border-none text-white font-extrabold text-lg shadow-xl shadow-slate-200 hover:!bg-blue-600 transition-all flex items-center justify-center gap-3"
                        >
                            Sign In <LuArrowRight size={20} />
                        </Button>
                    </Form>

                    <p className="mt-auto text-center text-xs font-bold text-slate-300 uppercase tracking-[0.2em] pt-12">
                        © 2026 Doccure Systems
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
