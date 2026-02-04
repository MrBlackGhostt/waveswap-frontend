"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiArrowRight, FiStar } from "react-icons/fi";

// Token data with balances
const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "12.45", color: "#8B74D0" },
    { symbol: "USDC", name: "USD Coin", balance: "5,432.00", color: "#2775CA" },
    { symbol: "USDT", name: "Tether", balance: "1,234.50", color: "#26A17B" },
    { symbol: "SOL", name: "Solana", balance: "0.00498", color: "#9945FF" },
];

type Step = 1 | 2 | 3 | 4;

// Left side content - descriptive text (legacy, not used with new design)
export function SendTab() {
    return null;
}

// Right side panel - the actual send interface with neo-brutalist styling
export function SendPanel() {
    const [step, setStep] = useState<Step>(1);
    const [selectedToken, setSelectedToken] = useState<typeof tokens[0] | null>(null);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const selectToken = (token: typeof tokens[0]) => {
        setSelectedToken(token);
        setStep(2);
    };

    const canContinue = selectedToken !== null;

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
                            <FiStar className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-sm text-foreground uppercase tracking-wide">
                            Transfer Funds
                        </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-rubik font-medium text-xs tracking-wide uppercase bg-primary/10 border border-primary/30 text-primary">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        Live Network
                    </span>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3, 4].map((s, index) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${step >= s
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-400"
                                    }`}
                            >
                                {s}
                            </div>
                            {index < 3 && (
                                <div className="w-8 h-0.5 rounded bg-gray-200" />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <p className="text-sm text-muted-foreground font-rubik">Select a token to send</p>

                            {/* Token List */}
                            <div className="space-y-2">
                                {tokens.map((token, index) => (
                                    <motion.button
                                        key={token.symbol}
                                        onClick={() => selectToken(token)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${selectedToken?.symbol === token.symbol
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-muted-foreground"
                                            }`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                                style={{ background: `linear-gradient(135deg, ${token.color}, ${token.color}dd)` }}
                                            >
                                                {token.symbol.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-outfit font-semibold text-foreground">{token.name}</p>
                                                <p className="text-xs text-muted-foreground">{token.symbol}</p>
                                            </div>
                                        </div>
                                        <p className="font-rubik font-medium text-muted-foreground">{token.balance}</p>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Continue Button */}
                            <button
                                onClick={() => selectedToken && setStep(2)}
                                disabled={!canContinue}
                                className={`relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm ${canContinue
                                    ? "btn-coral-gradient"
                                    : "opacity-50 cursor-not-allowed btn-disabled-gradient"
                                    }`}
                            >
                                <FiArrowRight className="w-4 h-4" />
                                <span>Continue</span>
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground font-rubik">Enter recipient address</p>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    ← Back
                                </button>
                            </div>

                            <div className="p-4 border-2 border-border rounded-xl">
                                <span className="text-xs text-muted-foreground font-rubik">To</span>
                                <input
                                    type="text"
                                    placeholder="Wallet address or ENS name"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    className="w-full bg-transparent outline-none font-outfit font-semibold text-foreground placeholder:text-muted-foreground mt-1"
                                />
                            </div>

                            <button
                                onClick={() => recipient && setStep(3)}
                                disabled={!recipient}
                                className={`relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm btn-coral-gradient ${!recipient ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <FiArrowRight className="w-4 h-4" />
                                <span>Continue</span>
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground font-rubik">Enter amount</p>
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    ← Back
                                </button>
                            </div>

                            <div className="p-6 border-2 border-border rounded-xl text-center">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-transparent outline-none font-outfit font-bold text-4xl text-foreground text-center placeholder:text-muted"
                                />
                                <p className="text-sm text-muted-foreground font-rubik mt-2">
                                    {selectedToken?.symbol} • Balance: {selectedToken?.balance}
                                </p>
                            </div>

                            <button
                                onClick={() => amount && parseFloat(amount) > 0 && setStep(4)}
                                disabled={!amount || parseFloat(amount) <= 0}
                                className={`relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm btn-coral-gradient ${!amount || parseFloat(amount) <= 0 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <FiArrowRight className="w-4 h-4" />
                                <span>Review</span>
                            </button>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground font-rubik">Review transaction</p>
                                <button
                                    onClick={() => setStep(3)}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    ← Back
                                </button>
                            </div>

                            <div className="p-4 border-2 border-border rounded-xl space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground font-rubik text-sm">Sending</span>
                                    <span className="font-outfit font-bold text-foreground">{amount} {selectedToken?.symbol}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground font-rubik text-sm">To</span>
                                    <span className="font-rubik text-foreground text-sm">{recipient.slice(0, 8)}...{recipient.slice(-6)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground font-rubik text-sm">Network Fee</span>
                                    <span className="font-rubik text-foreground text-sm">~$0.12</span>
                                </div>
                            </div>

                            <button
                                className="relative flex items-center justify-center gap-2.5 rounded-2xl font-outfit font-bold transition-all overflow-hidden w-full mt-4 px-6 py-3 text-sm btn-coral-gradient"
                            >
                                <span>Confirm & Send</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
