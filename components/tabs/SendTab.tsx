"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Token data with balances
const tokens = [
    { symbol: "USDT", name: "Tether USD", balance: "2.0115", icon: "₮", color: "#26A17B", verified: true },
    { symbol: "USDC", name: "USD Coin", balance: "1.53548", icon: "$", color: "#2775CA", verified: true },
    { symbol: "SOL", name: "Solana", balance: "0.00498", icon: "◎", color: "#9945FF", verified: true },
    { symbol: "BTC", name: "Bitcoin", balance: "0", icon: "₿", color: "#F7931A", verified: true, tag: "Taproot" },
    { symbol: "MON", name: "Monad", balance: "0", icon: "◇", color: "#8B5CF6", verified: true },
    { symbol: "HYPE", name: "HYPE", balance: "0", icon: "🌊", color: "#06B6D4", verified: true },
];

// Recently used addresses
const recentAddresses = [
    { address: "Fsk1...piRx", lastUsed: "1mo ago" },
    { address: "ELLR...oQvG", lastUsed: "4mo ago" },
    { address: "Cw2V...FacL", lastUsed: "4mo ago" },
    { address: "CDKm...xQWS", lastUsed: "2mo ago" },
];

// Address book
const addressBook = [
    { name: "Account 2", address: "BTLY...LXHz" },
    { name: "kirat", address: "3fHQ...m5mj" },
    { name: "Account 4", address: "3WVf...5s8q" },
];

type Step = "token" | "recipient" | "amount" | "summary";

// Left side content - just descriptive text
export function SendTab() {
    return (
        <div className="space-y-4">
            <p className="text-zinc-300 text-3xl leading-relaxed font-light">
                send tokens
            </p>
            <p className="text-zinc-400 text-3xl leading-relaxed font-light">
                anywhere, anytime
            </p>
            <p className="text-zinc-500 text-xl mt-8">
                🚀 Fast, secure, and private transfers to any wallet. Your funds, your control.
            </p>
        </div>
    );
}

// Right side panel - the actual send interface with multi-step flow
export function SendPanel() {
    const [step, setStep] = useState<Step>("token");
    const [selectedToken, setSelectedToken] = useState<typeof tokens[0] | null>(null);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTokens = tokens.filter(
        token =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const usdValue = selectedToken
        ? (parseFloat(amount || "0") * 100).toFixed(2) // Mock USD conversion
        : "0.00";

    const goBack = () => {
        switch (step) {
            case "recipient": setStep("token"); break;
            case "amount": setStep("recipient"); break;
            case "summary": setStep("amount"); break;
        }
    };

    const goNext = () => {
        switch (step) {
            case "token": setStep("recipient"); break;
            case "recipient": setStep("amount"); break;
            case "amount": setStep("summary"); break;
        }
    };

    const selectToken = (token: typeof tokens[0]) => {
        setSelectedToken(token);
        setStep("recipient");
    };

    const selectRecipient = (address: string) => {
        setRecipient(address);
        setStep("amount");
    };

    return (
        <div className="w-full max-w-md mx-auto h-full flex flex-col">
            <AnimatePresence mode="wait">
                {/* Step 1: Select Token */}
                {step === "token" && (
                    <motion.div
                        key="token"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-xl font-semibold text-white">Select Token</h3>
                        </div>

                        {/* Search */}
                        <div className="relative mb-4">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 outline-none focus:border-zinc-600 transition-colors"
                            />
                        </div>

                        {/* Token List */}
                        <div className="flex-1 space-y-2 overflow-y-auto">
                            {filteredTokens.map((token) => (
                                <motion.button
                                    key={token.symbol}
                                    onClick={() => selectToken(token)}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                                        style={{ backgroundColor: token.color }}
                                    >
                                        {token.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-semibold">{token.name}</span>
                                            {token.verified && (
                                                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {token.tag && (
                                                <span className="px-2 py-0.5 text-xs bg-zinc-700 rounded-full text-zinc-300">{token.tag}</span>
                                            )}
                                        </div>
                                        <span className="text-zinc-400 text-sm">{token.balance} {token.symbol}</span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Select Recipient */}
                {step === "recipient" && (
                    <motion.div
                        key="recipient"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <button onClick={goBack} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h3 className="text-xl font-semibold text-white">{selectedToken?.symbol}</h3>
                            </div>
                            <button
                                onClick={goNext}
                                disabled={!recipient}
                                className="text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>

                        {/* Address Input */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-zinc-400">To:</span>
                            <input
                                type="text"
                                placeholder="username or address"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                className="flex-1 bg-transparent text-white outline-none placeholder-zinc-600"
                            />
                            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </button>
                        </div>

                        <div className="border-t border-zinc-800 mb-4"></div>

                        {/* Recently Used */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3 text-zinc-400 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Recently Used</span>
                            </div>
                            <div className="space-y-2">
                                {recentAddresses.map((addr, i) => (
                                    <button
                                        key={i}
                                        onClick={() => selectRecipient(addr.address)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-white font-medium">{addr.address}</p>
                                            <p className="text-zinc-500 text-sm">Used {addr.lastUsed}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Address Book */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-zinc-400 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span>Address Book</span>
                            </div>
                            <div className="space-y-2">
                                {addressBook.map((contact, i) => (
                                    <button
                                        key={i}
                                        onClick={() => selectRecipient(contact.address)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold text-sm">
                                            {contact.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-white font-medium">{contact.name}</p>
                                            <p className="text-zinc-500 text-sm">{contact.address}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Next Button */}
                        <div className="mt-auto pt-4">
                            <button
                                onClick={goNext}
                                disabled={!recipient}
                                className="w-full py-4 rounded-2xl bg-purple-600/30 text-zinc-400 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600/50 hover:text-white transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Enter Amount */}
                {step === "amount" && (
                    <motion.div
                        key="amount"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <button onClick={goBack} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h3 className="text-xl font-semibold text-white">Enter Amount</h3>
                            </div>
                            <button
                                onClick={goNext}
                                disabled={!amount || parseFloat(amount) <= 0}
                                className="text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>

                        {/* To Address */}
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800">
                            <span className="text-zinc-400">To:</span>
                            <span className="text-white">{recipient}</span>
                            <button className="ml-auto p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        {/* Amount Input - Centered */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                                    placeholder="0"
                                    className="text-5xl font-light text-white bg-transparent outline-none text-center w-48"
                                />
                                <span className="text-5xl font-light text-zinc-400">{selectedToken?.symbol}</span>
                                <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                                    <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-zinc-500 text-lg mt-2">~${usdValue}</p>
                        </div>

                        {/* Available Balance + Max */}
                        <div className="flex items-center justify-between py-4 border-t border-zinc-800">
                            <div>
                                <p className="text-zinc-500 text-sm">Available To Send</p>
                                <p className="text-white font-semibold">{selectedToken?.balance} {selectedToken?.symbol}</p>
                            </div>
                            <button
                                onClick={() => setAmount(selectedToken?.balance || "0")}
                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white font-medium transition-colors"
                            >
                                Max
                            </button>
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goNext}
                            disabled={!amount || parseFloat(amount) <= 0}
                            className="w-full py-4 rounded-2xl bg-purple-600/30 text-zinc-400 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600/50 hover:text-white transition-all"
                        >
                            Next
                        </button>
                    </motion.div>
                )}

                {/* Step 4: Summary */}
                {step === "summary" && (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <button onClick={goBack} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h3 className="text-xl font-semibold text-white">Summary</h3>
                        </div>

                        {/* Send Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="text-center mb-8">
                            <p className="text-4xl font-bold text-white">{amount} {selectedToken?.symbol}</p>
                            <p className="text-zinc-500 mt-1">~${usdValue}</p>
                        </div>

                        {/* Details Card */}
                        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden mb-auto">
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                                <span className="text-zinc-400">To</span>
                                <span className="text-white font-medium">{recipient}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                                <span className="text-zinc-400">Network</span>
                                <span className="text-white font-medium">Solana</span>
                            </div>
                            <div className="flex items-center justify-between p-4">
                                <span className="text-zinc-400">Network fee</span>
                                <span className="text-white font-medium">$0.0081</span>
                            </div>
                        </div>

                        {/* Send Button */}
                        <button
                            className="w-full py-4 rounded-2xl bg-purple-600/50 text-white font-semibold hover:bg-purple-600/70 transition-all mt-6"
                        >
                            Send
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
