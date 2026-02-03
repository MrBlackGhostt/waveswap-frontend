"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Token data
const tokens = [
    { symbol: "USDC", name: "USD Coin", icon: "💵", color: "#2775CA" },
    { symbol: "SOL", name: "Solana", icon: "◎", color: "#9945FF" },
    { symbol: "ETH", name: "Ethereum", icon: "⟠", color: "#627EEA" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "#F7931A" },
];

interface TokenInputProps {
    label: string;
    token: typeof tokens[0];
    amount: string;
    usdValue: string;
    onAmountChange?: (value: string) => void;
    isOutput?: boolean;
}

function TokenInput({ label, token, amount, usdValue, onAmountChange, isOutput }: TokenInputProps) {
    return (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4">
            <div className="text-zinc-400 text-sm mb-3">{label}</div>
            <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-full px-3 py-2">
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: token.color }}
                    >
                        {token.icon}
                    </div>
                    <span className="font-semibold text-white">{token.symbol}</span>
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="text-right">
                    {isOutput ? (
                        <div className="text-3xl font-light text-white">{amount}</div>
                    ) : (
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => onAmountChange?.(e.target.value)}
                            placeholder="0.00"
                            className="text-3xl font-light text-white bg-transparent text-right w-32 outline-none placeholder-zinc-600"
                        />
                    )}
                    <div className="text-zinc-500 text-sm">${usdValue}</div>
                </div>
            </div>
        </div>
    );
}

// Left side content - just descriptive text
export function SwapTabContent() {
    return (
        <div className="space-y-4">
            <p className="text-zinc-300 text-3xl leading-relaxed font-light">
                swap your bags
            </p>
            <p className="text-zinc-400 text-3xl leading-relaxed font-light">
                like a degen
            </p>
            <p className="text-zinc-500 text-xl mt-8">
                🔄 Turn your shitcoins into slightly different shitcoins. Financial freedom has never felt this chaotic.
            </p>
        </div>
    );
}

// Right side panel - the actual swap interface
export function SwapTab() {
    const [sellToken, setSellToken] = useState(tokens[0]); // USDC
    const [buyToken, setBuyToken] = useState(tokens[1]);   // SOL
    const [sellAmount, setSellAmount] = useState("0.00");
    const [isSwapping, setIsSwapping] = useState(false);
    const [swapKey, setSwapKey] = useState(0);

    const handleSwapTokens = () => {
        setIsSwapping(true);

        // Delay the actual swap to let animation play
        setTimeout(() => {
            setSellToken(buyToken);
            setBuyToken(sellToken);
            setSwapKey(prev => prev + 1);
            setIsSwapping(false);
        }, 300);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Order Type Tabs */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex bg-zinc-900/50 rounded-full p-1">
                    <button className="px-4 py-2 rounded-full bg-lime-400 text-black font-medium text-sm">
                        Market
                    </button>
                    <button className="px-4 py-2 rounded-full text-zinc-400 hover:text-white transition-colors text-sm">
                        Limit
                    </button>
                    <button className="px-4 py-2 rounded-full text-zinc-400 hover:text-white transition-colors text-sm">
                        Recurring
                    </button>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:border-zinc-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Paste CA
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-700 text-sm bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white hover:from-purple-500/30 hover:to-blue-500/30 transition-all">
                        ✨ Ultra
                    </button>
                </div>
            </div>

            {/* Swap Container */}
            <div className="relative">
                {/* Token Inputs with Animation */}
                <div className="space-y-2">
                    <motion.div
                        key={`sell-${swapKey}`}
                        initial={swapKey > 0 ? { y: 80, opacity: 0, rotateX: -90 } : false}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.4
                        }}
                    >
                        <TokenInput
                            label="Sell"
                            token={sellToken}
                            amount={sellAmount}
                            usdValue="0"
                            onAmountChange={setSellAmount}
                        />
                    </motion.div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-3 relative z-10">
                        <motion.button
                            onClick={handleSwapTokens}
                            className="w-10 h-10 rounded-full bg-zinc-800 border-4 border-zinc-950 flex items-center justify-center hover:bg-zinc-700 transition-colors group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={isSwapping ? { rotate: 180 } : { rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.svg
                                className="w-5 h-5 text-lime-400 group-hover:text-lime-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </motion.svg>
                        </motion.button>
                    </div>

                    <motion.div
                        key={`buy-${swapKey}`}
                        initial={swapKey > 0 ? { y: -80, opacity: 0, rotateX: 90 } : false}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.4
                        }}
                    >
                        <TokenInput
                            label="Buy"
                            token={buyToken}
                            amount="0.00"
                            usdValue="0"
                            isOutput
                        />
                    </motion.div>
                </div>
            </div>

            {/* Connect Button */}
            <motion.button
                className="w-full mt-6 py-4 rounded-2xl bg-lime-400 text-black font-semibold text-lg hover:bg-lime-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                Connect
            </motion.button>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Show Chart
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Show History
                </button>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div
                    className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4"
                    whileHover={{ scale: 1.02, borderColor: "rgb(161 161 170)" }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#2775CA] flex items-center justify-center text-sm">
                            💵
                        </div>
                        <div>
                            <div className="text-white font-medium">USDC</div>
                            <div className="text-zinc-500 text-xs">EPjF...Dt1v</div>
                        </div>
                        <div className="ml-auto text-right">
                            <div className="text-white">$0.99969</div>
                            <div className="text-emerald-400 text-xs">0%</div>
                        </div>
                    </div>
                    <div className="h-12 flex items-end gap-0.5">
                        {[40, 35, 45, 30, 50, 55, 45, 60, 50, 45].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-rose-500/60 rounded-sm"
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                    <a href="#" className="text-zinc-500 text-sm mt-2 inline-flex items-center gap-1 hover:text-zinc-300 transition-colors">
                        Open Page ↗
                    </a>
                </motion.div>

                <motion.div
                    className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4"
                    whileHover={{ scale: 1.02, borderColor: "rgb(161 161 170)" }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#9945FF] flex items-center justify-center text-sm">
                            ◎
                        </div>
                        <div>
                            <div className="text-white font-medium">SOL</div>
                            <div className="text-zinc-500 text-xs">So11...1112</div>
                        </div>
                        <div className="ml-auto text-right">
                            <div className="text-white">$102.38</div>
                            <div className="text-rose-400 text-xs">-0.69%</div>
                        </div>
                    </div>
                    <div className="h-12 flex items-end gap-0.5">
                        {[60, 55, 50, 45, 40, 35, 38, 32, 30, 28].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-rose-500/60 rounded-sm"
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                    <a href="#" className="text-zinc-500 text-sm mt-2 inline-flex items-center gap-1 hover:text-zinc-300 transition-colors">
                        Open Page ↗
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
