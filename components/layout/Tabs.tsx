"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { FiSend, FiArrowDown, FiLink, FiLock, FiClock } from "react-icons/fi";

import { SendTab, SendPanel } from "@/components/tabs/SendTab";
import { SwapTab, SwapTabContent } from "@/components/tabs/SwapTab";
import { BridgeTab } from "@/components/tabs/BridgeTab";
import { StakeTab } from "@/components/tabs/StakeTab";
import { HistoryTab } from "@/components/tabs/HistoryTab";

type TabId = "send" | "swap" | "bridge" | "stake" | "history";

interface Tab {
    id: TabId;
    label: string;
    title: string;
    icon: ReactNode;
    component: ReactNode;
}

interface HeroContent {
    line1: string;
    line2: string;
    line3: string;
    description: string;
    tags: string[];
    stats: { value: string; label: string }[];
}

const heroContent: Record<TabId, HeroContent> = {
    send: {
        line1: "SEND",
        line2: "TOKENS",
        line3: "ANYWHERE.",
        description: "Transfer tokens to any wallet address instantly. Low fees, maximum security, powered by institutional-grade infrastructure.",
        tags: ["⚡ Instant Delivery", "🛡️ Secure", "🌐 Multi-Chain"],
        stats: [
            { value: "$2.4B+", label: "Total Sent" },
            { value: "1.2M+", label: "Transactions" },
            { value: "~12s", label: "Avg. Time" },
        ],
    },
    swap: {
        line1: "SWAP",
        line2: "ASSETS",
        line3: "INSTANTLY.",
        description: "Exchange tokens at the best rates. Aggregated liquidity from multiple DEXs ensures optimal pricing.",
        tags: ["⚡ Best Rates", "🌐 Multi-DEX", "🛡️ MEV Protected"],
        stats: [
            { value: "$8.2B+", label: "Total Volume" },
            { value: "4.5M+", label: "Swaps" },
            { value: "$12M+", label: "Savings" },
        ],
    },
    bridge: {
        line1: "BRIDGE",
        line2: "CHAINS",
        line3: "SEAMLESSLY.",
        description: "Move assets across blockchains with ease. Support for all major networks with fast finality.",
        tags: ["🌐 10+ Chains", "⚡ Fast Finality", "🛡️ Audited"],
        stats: [
            { value: "$1.8B+", label: "Bridged Volume" },
            { value: "890K+", label: "Bridges" },
            { value: "~2min", label: "Avg. Time" },
        ],
    },
    stake: {
        line1: "STAKE &",
        line2: "EARN",
        line3: "REWARDS.",
        description: "Put your assets to work. Stake tokens and earn competitive yields with flexible lock periods.",
        tags: ["✨ Auto-Compound", "🛡️ Non-Custodial", "⚡ Flexible"],
        stats: [
            { value: "$420M+", label: "Total Staked" },
            { value: "52K+", label: "Stakers" },
            { value: "8.2%", label: "Avg. APR" },
        ],
    },
    history: {
        line1: "TRACK",
        line2: "EVERY",
        line3: "TRANSACTION.",
        description: "Complete visibility into your activity. Review past transactions, pending actions, and account history.",
        tags: ["🌐 All Networks", "📊 Exportable", "⚡ Real-time"],
        stats: [
            { value: "24", label: "This Month" },
            { value: "342", label: "All Time" },
            { value: "$12.4K", label: "Volume" },
        ],
    },
};

const tabs: Tab[] = [
    { id: "send", label: "Send", title: "Send", icon: <FiSend className="w-4 h-4" />, component: <SendTab /> },
    { id: "swap", label: "Swap", title: "Swap", icon: <FiArrowDown className="w-4 h-4" />, component: <SwapTabContent /> },
    { id: "bridge", label: "Bridge", title: "Bridge", icon: <FiLink className="w-4 h-4" />, component: <BridgeTab /> },
    { id: "stake", label: "Stake", title: "Stake", icon: <FiLock className="w-4 h-4" />, component: <StakeTab /> },
    { id: "history", label: "History", title: "History", icon: <FiClock className="w-4 h-4" />, component: <HistoryTab /> },
];

export function Tabs() {
    const [activeTab, setActiveTab] = useState<TabId>("send");

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)]">
            {/* Left Side - Dynamic Hero Section */}
            <div className="flex-1 pt-4 lg:pt-8 mt-[100px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, filter: "blur(8px)", y: 40 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, filter: "blur(8px)", y: -40 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* Hero Title */}
                        <h1
                            className="font-outfit text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.0] tracking-tighter mb-6"
                            style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.08)" }}
                        >
                            <motion.span
                                className="block text-foreground"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                {heroContent[activeTab].line1}
                            </motion.span>
                            <motion.span
                                className="block text-primary italic font-extrabold text-shadow-primary"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                {heroContent[activeTab].line2}
                            </motion.span>
                            <motion.span
                                className="block text-foreground"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                {heroContent[activeTab].line3}
                            </motion.span>
                        </h1>

                        {/* Description */}
                        <motion.p
                            className="text-base lg:text-lg text-foreground/80 max-w-lg font-rubik leading-relaxed font-semibold mb-8"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            {heroContent[activeTab].description}
                        </motion.p>

                        {/* Features Section - Desktop Only */}
                        <div className="hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="space-y-6"
                            >
                                {/* Feature Tags */}
                                <motion.div
                                    className="flex flex-wrap gap-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                >
                                    {heroContent[activeTab].tags.map((tag, index) => (
                                        <motion.span
                                            key={tag}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-sm font-rubik text-foreground shadow-sm"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    className="flex gap-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                >
                                    {heroContent[activeTab].stats.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                                        >
                                            <p className="font-outfit font-bold text-xl text-foreground">{stat.value}</p>
                                            <p className="text-xs text-muted-foreground font-rubik">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Right Side - Tab Navigation + Action Panel */}
            <div className="w-full lg:w-[480px] flex flex-col gap-4">
                {/* Tab Navigation */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: -15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div
                        className="inline-flex items-center gap-1.5 rounded-full p-2 neo-border"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative flex items-center gap-2 px-5 py-3 text-sm font-outfit font-bold transition-all rounded-full",
                                    activeTab === tab.id
                                        ? "text-foreground"
                                        : "text-foreground hover:bg-muted"
                                )}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabBg"
                                        className="absolute inset-0 rounded-full neo-border-sm "
                                        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                                    />
                                )}
                                <span className="relative z-10 hidden sm:block">{tab.icon}</span>
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Action Panel */}
                <motion.div
                    className="flex-1 pt-2"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, filter: "blur(4px)", x: 30, scale: 0.96 }}
                            animate={{ opacity: 1, filter: "blur(0px)", x: 0, scale: 1 }}
                            exit={{ opacity: 0, filter: "blur(4px)", x: -30, scale: 0.96 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            {activeTab === "send" && <SendPanel />}
                            {activeTab === "swap" && <SwapPanel />}
                            {activeTab === "bridge" && <BridgePanel />}
                            {activeTab === "stake" && <StakePanel />}
                            {activeTab === "history" && <HistoryPanel />}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Mobile Features Section */}
                <div className="lg:hidden mt-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
                            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                            exit={{ opacity: 0, filter: "blur(4px)", x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-wrap gap-2">
                                {heroContent[activeTab].tags.map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-sm font-rubik text-foreground shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-6">
                                {heroContent[activeTab].stats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="font-outfit font-bold text-xl text-foreground">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground font-rubik">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// Swap Panel
function SwapPanel() {
    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg bg-theme-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                            <FiArrowDown className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-foreground uppercase tracking-wide">
                            Swap Tokens
                        </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-rubik font-medium text-xs tracking-wide uppercase bg-primary/10 border border-primary/30 text-primary">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        Live
                    </span>
                </div>
                <SwapTab />
            </div>
        </motion.div>
    );
}

// Bridge Panel
function BridgePanel() {
    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg bg-theme-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                            <FiLink className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-foreground uppercase tracking-wide">
                            Cross-Chain Bridge
                        </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-rubik font-medium text-xs tracking-wide uppercase bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-[#22C55E]">
                        Active •
                    </span>
                </div>

                {/* FROM Chain */}
                <div className="mb-4">
                    <span className="text-xs text-muted-foreground font-rubik uppercase mb-2 block">From</span>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-border hover:border-muted-foreground transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-white font-bold text-sm">E</div>
                            <span className="font-outfit font-semibold text-foreground">Ethereum</span>
                        </div>
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>

                {/* Arrow */}
                <div className="flex justify-center my-2">
                    <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center bg-card">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                </div>

                {/* TO Chain */}
                <div className="mb-4">
                    <span className="text-xs text-muted-foreground font-rubik uppercase mb-2 block">To</span>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-border hover:border-muted-foreground transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-sm">A</div>
                            <span className="font-outfit font-semibold text-foreground">Arbitrum</span>
                        </div>
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>

                {/* Asset */}
                <div className="mb-4">
                    <span className="text-xs text-muted-foreground font-rubik uppercase mb-2 block">Asset</span>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-border hover:border-muted-foreground transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-white font-bold text-sm">E</div>
                            <span className="font-outfit font-semibold text-foreground">Ethereum</span>
                        </div>
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>

                {/* Amount */}
                <div className="mb-6">
                    <span className="text-xs text-muted-foreground font-rubik uppercase mb-2 block">Amount</span>
                    <input
                        type="text"
                        placeholder="0.00"
                        className="w-full p-4 rounded-xl border-2 border-border font-rubik text-2xl text-foreground placeholder:text-muted-foreground outline-none focus:border-ring transition-all bg-transparent"
                    />
                </div>

                {/* Button */}
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-outfit font-bold text-sm btn-coral-gradient">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    Bridge Assets
                </button>
            </div>
        </motion.div>
    );
}

// Stake Panel
function StakePanel() {
    const stakingPools = [
        { symbol: "E", name: "ETH Pool", type: "Flexible", tvl: "$180M", apr: "4.5%", color: "#8B74D0" },
        { symbol: "U", name: "USDC Pool", type: "30 Days", tvl: "$120M", apr: "8.2%", color: "#2775CA" },
        { symbol: "W", name: "WAVE Pool", type: "90 Days", tvl: "$80M", apr: "12.5%", color: "#FF6B4A" },
    ];

    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg bg-theme-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                            <FiLock className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-foreground uppercase tracking-wide">
                            Staking Pools
                        </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-rubik font-medium text-xs tracking-wide uppercase bg-primary/10 border border-primary/30 text-primary">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Rewards Active
                    </span>
                </div>

                {/* Pool List */}
                <div className="space-y-3 mb-6">
                    {stakingPools.map((pool, index) => (
                        <motion.button
                            key={pool.name}
                            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-border hover:border-muted-foreground transition-all"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ background: `linear-gradient(135deg, ${pool.color}, ${pool.color}dd)` }}
                                >
                                    {pool.symbol}
                                </div>
                                <div className="text-left">
                                    <p className="font-outfit font-semibold text-foreground">{pool.name}</p>
                                    <p className="text-xs text-muted-foreground">{pool.type} • TVL: {pool.tvl}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-outfit font-bold text-[#22C55E]">{pool.apr}</p>
                                <p className="text-xs text-muted-foreground">APR</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Button */}
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-outfit font-bold text-sm btn-coral-gradient">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    Select a Pool
                </button>
            </div>
        </motion.div>
    );
}

// History Panel
function HistoryPanel() {
    const transactions = [
        { type: "Swap", from: "ETH", to: "USDC", amount: "0.5 ETH", time: "2 mins ago", icon: "↕", color: "#8B74D0" },
        { type: "Send", from: "", to: "0x1234...5678", amount: "500 USDC", time: "1 hour ago", icon: "↗", color: "#FF6B4A" },
        { type: "Bridge", from: "Ethereum", to: "Arbitrum", amount: "1.2 ETH", time: "3 hours ago", icon: "∞", color: "#2775CA" },
        { type: "Swap", from: "USDT", to: "ETH", amount: "1,000 USDT", time: "Yesterday", icon: "↕", color: "#8B74D0" },
    ];

    return (
        <motion.div
            className="rounded-3xl w-full overflow-hidden neo-border-lg bg-theme-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                            <FiClock className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-foreground uppercase tracking-wide">
                            Recent Activity
                        </span>
                    </div>
                    <button className="text-accent font-rubik font-medium text-sm hover:underline">
                        View All
                    </button>
                </div>

                {/* Transaction List */}
                <div className="space-y-3">
                    {transactions.map((tx, index) => (
                        <motion.div
                            key={index}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-muted hover:bg-muted/80 transition-all"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                    style={{ background: `linear-gradient(135deg, ${tx.color}40, ${tx.color}20)`, color: tx.color }}
                                >
                                    {tx.icon}
                                </div>
                                <div className="text-left">
                                    <p className="font-outfit font-semibold text-foreground">{tx.type}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {tx.type === "Send" ? `To ${tx.to}` : `${tx.from} → ${tx.to}`}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-outfit font-semibold text-foreground">{tx.amount}</p>
                                <p className="text-xs text-[#22C55E]">✓ {tx.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More */}
                <button className="w-full mt-4 py-3 text-muted-foreground font-rubik font-medium text-sm hover:text-foreground transition-colors">
                    Load More Transactions
                </button>
            </div>
        </motion.div>
    );
}
