import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Shield,
    Users,
    Building2,
    BarChart3,
    Zap,
    Lock,
    ArrowRight,
    ChevronRight,
    Sparkles,
    Globe,
    LogOut,
    LayoutDashboard,
    ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store";
import { useLogout } from "@/features/auth/hooks/useLogout";

/* ───── tiny animated counter ───── */
function AnimatedNumber({ value }: { value: string }) {
    return (
        <span className="tabular-nums font-extrabold text-4xl md:text-5xl bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
            {value}
        </span>
    );
}

/* ───── feature card ───── */
function FeatureCard({
    icon: Icon,
    title,
    description,
    gradient,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
}) {
    return (
        <div className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
            {/* glow */}
            <div
                className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${gradient}`}
            />
            <div className="relative">
                <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${gradient} mb-5`}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

/* ───── user dropdown ───── */
function UserDropdown() {
    const user = useAuthStore((s) => s.user);
    const logoutMutation = useLogout();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    if (!user) {
        return (
            <>
                <Link
                    to="/login"
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
                >
                    Sign in
                </Link>
                <Link
                    to="/register"
                    className="text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-lg px-5 py-2 transition-colors shadow-lg shadow-primary-600/25"
                >
                    Get Started
                </Link>
            </>
        );
    }

    const initials = user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/[0.06] transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-xs font-bold text-white">
                    {initials}
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-200 max-w-[120px] truncate">
                    {user.name}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/[0.08] bg-[#12121f] shadow-2xl shadow-black/40 py-2 z-50 animate-[fadeIn_150ms_ease]">
                    {/* user info */}
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-sm font-bold text-white">
                                {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* menu items */}
                    <div className="py-1">
                        <Link
                            to="/admin"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Admin Dashboard
                        </Link>
                        <button
                            onClick={() => {
                                setOpen(false);
                                logoutMutation.mutate();
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-white/[0.06] hover:text-red-300 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ───── main landing page ───── */
export function LandingPage() {
    return (
        <div className="min-h-screen bg-[#07070f] text-white overflow-x-hidden">
            {/* ─── nav ─── */}
            <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#07070f]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold shadow-lg shadow-primary-500/20">
                            HR
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                            Hỏi Dân IT
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
                        <a
                            href="#features"
                            className="hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#stats"
                            className="hover:text-white transition-colors"
                        >
                            Stats
                        </a>
                        <a
                            href="#tech"
                            className="hover:text-white transition-colors"
                        >
                            Tech Stack
                        </a>
                    </div>

                    <div className="flex items-center gap-3">
                        <UserDropdown />
                    </div>
                </div>
            </nav>

            {/* ─── hero ─── */}
            <section className="relative pt-36 pb-24 px-6">
                {/* radial glow behind hero */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary-600/20 via-primary-800/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* pill badge */}
                    <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 text-xs font-medium text-primary-300 mb-8">
                        <Sparkles className="w-3.5 h-3.5" />
                        Powered by Spring Boot &amp; React
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                        <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                            HR Management
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-cyan-400 bg-clip-text text-transparent">
                            Made Simple
                        </span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A modern, full-stack HR administration platform with
                        role-based access control, company management, and a
                        beautiful admin dashboard — built for{" "}
                        <span className="text-white font-medium">
                            HoiDanIT
                        </span>
                        .
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/admin"
                            className="group flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold rounded-xl px-7 py-3.5 shadow-2xl shadow-primary-600/30 transition-all duration-300"
                        >
                            Open Dashboard
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a
                            href="#features"
                            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl px-7 py-3.5 transition-all duration-300"
                        >
                            Explore Features
                            <ChevronRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* floating dashboard mockup glow */}
                <div className="relative max-w-5xl mx-auto mt-20">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 via-cyan-500/10 to-primary-600/20 rounded-3xl blur-2xl" />
                    <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-1">
                        <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden">
                            {/* fake browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                <div className="ml-3 flex-1 h-6 rounded-md bg-white/[0.06] flex items-center px-3">
                                    <span className="text-[11px] text-slate-500">
                                        localhost:5173/admin
                                    </span>
                                </div>
                            </div>
                            {/* dashboard preview */}
                            <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    {
                                        label: "Total Users",
                                        val: "248",
                                        color: "from-blue-500/20 to-blue-500/5",
                                        iconColor: "text-blue-400",
                                        Icon: Users,
                                    },
                                    {
                                        label: "Companies",
                                        val: "36",
                                        color: "from-emerald-500/20 to-emerald-500/5",
                                        iconColor: "text-emerald-400",
                                        Icon: Building2,
                                    },
                                    {
                                        label: "Roles",
                                        val: "12",
                                        color: "from-amber-500/20 to-amber-500/5",
                                        iconColor: "text-amber-400",
                                        Icon: Shield,
                                    },
                                    {
                                        label: "Permissions",
                                        val: "64",
                                        color: "from-purple-500/20 to-purple-500/5",
                                        iconColor: "text-purple-400",
                                        Icon: BarChart3,
                                    },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className={`rounded-xl bg-gradient-to-br ${s.color} border border-white/[0.06] p-4`}
                                    >
                                        <s.Icon
                                            className={`w-5 h-5 ${s.iconColor} mb-2`}
                                        />
                                        <p className="text-[11px] text-slate-500 mb-0.5">
                                            {s.label}
                                        </p>
                                        <p className="text-xl font-bold text-white">
                                            {s.val}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── stats ─── */}
            <section id="stats" className="py-20 px-6 border-t border-white/[0.04]">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "100%", label: "Type-Safe" },
                        { value: "RBAC", label: "Access Control" },
                        { value: "REST", label: "API Design" },
                        { value: "JWT", label: "Auth Tokens" },
                    ].map((s) => (
                        <div key={s.label}>
                            <AnimatedNumber value={s.value} />
                            <p className="mt-2 text-sm text-slate-500 font-medium">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── features ─── */}
            <section id="features" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
                            Features
                        </p>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            Everything you need to manage HR
                        </h2>
                        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
                            A comprehensive suite of tools designed to
                            streamline your human-resource workflows.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <FeatureCard
                            icon={Users}
                            title="User Management"
                            description="Full CRUD operations for employees with advanced filtering, pagination and role assignment."
                            gradient="bg-gradient-to-br from-blue-600/20 to-blue-600/5"
                        />
                        <FeatureCard
                            icon={Building2}
                            title="Company Registry"
                            description="Organize your multi-company structure with dedicated profiles, logos and contact info."
                            gradient="bg-gradient-to-br from-emerald-600/20 to-emerald-600/5"
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Role-Based Access"
                            description="Granular RBAC with fully customizable roles and permissions for every API endpoint."
                            gradient="bg-gradient-to-br from-amber-600/20 to-amber-600/5"
                        />
                        <FeatureCard
                            icon={Lock}
                            title="JWT Authentication"
                            description="Secure login with access & refresh tokens, password hashing and session management."
                            gradient="bg-gradient-to-br from-rose-600/20 to-rose-600/5"
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Admin Dashboard"
                            description="Real-time overview of your organization with beautiful analytics cards and quick actions."
                            gradient="bg-gradient-to-br from-purple-600/20 to-purple-600/5"
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Blazing Performance"
                            description="React 19 with compiler optimizations, TanStack Query caching and Vite's instant HMR."
                            gradient="bg-gradient-to-br from-cyan-600/20 to-cyan-600/5"
                        />
                    </div>
                </div>
            </section>

            {/* ─── tech stack ─── */}
            <section
                id="tech"
                className="py-24 px-6 border-t border-white/[0.04]"
            >
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">
                        Tech Stack
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-14">
                        Built with modern technology
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            { name: "Spring Boot", tag: "Backend" },
                            { name: "React 19", tag: "Frontend" },
                            { name: "TypeScript", tag: "Language" },
                            { name: "Tailwind v4", tag: "Styling" },
                            { name: "TanStack Query", tag: "Data" },
                            { name: "Zustand", tag: "State" },
                            { name: "Zod", tag: "Validation" },
                            { name: "Vite 7", tag: "Tooling" },
                        ].map((t) => (
                            <div
                                key={t.name}
                                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] p-5 transition-all duration-300"
                            >
                                <p className="text-white font-semibold">
                                    {t.name}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {t.tag}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-24 px-6">
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="absolute -inset-12 bg-gradient-to-r from-primary-600/10 via-cyan-500/5 to-primary-600/10 rounded-3xl blur-3xl pointer-events-none" />
                    <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-12 md:p-16">
                        <Globe className="w-10 h-10 text-primary-400 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-slate-400 max-w-md mx-auto mb-8">
                            Sign in to access the HR Admin Dashboard and start
                            managing your organization today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/login"
                                className="group flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold rounded-xl px-8 py-3.5 shadow-2xl shadow-primary-600/30 transition-all duration-300"
                            >
                                Sign in
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link
                                to="/register"
                                className="text-sm font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl px-8 py-3.5 transition-all duration-300"
                            >
                                Create account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── footer ─── */}
            <footer className="border-t border-white/[0.06] py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-[9px] font-bold text-white">
                            HR
                        </div>
                        <span>
                            &copy; {new Date().getFullYear()} Hỏi Dân IT. All
                            rights reserved.
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a
                            href="https://hoidanit.vn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            hoidanit.vn
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// For lazy loading in routes
export const Component = LandingPage;
