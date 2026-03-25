"use client"

import { motion } from "framer-motion"

export function GlobalAnimation() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 4 Moving BOCRA Dots System-Wide */}
            {[
                { color: "#0c7070", size: "w-6 h-6", top: "20%", left: "15%", duration: 18, delay: 0 },
                { color: "#156d00", size: "w-8 h-8", top: "70%", left: "80%", duration: 22, delay: 2 },
                { color: "#70000f", size: "w-5 h-5", top: "65%", left: "20%", duration: 15, delay: 1 },
                { color: "#fec901", size: "w-7 h-7", top: "30%", left: "75%", duration: 20, delay: 3 },
            ].map((dot, i) => (
                <motion.div
                    key={`global-dot-${i}`}
                    animate={{
                        y: [0, -100, 0, 100, 0],
                        x: [0, 80, 0, -80, 0],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: dot.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: dot.delay,
                    }}
                    className={`absolute ${dot.size} rounded-full`}
                    style={{
                        top: dot.top,
                        left: dot.left,
                        backgroundColor: dot.color,
                        boxShadow: `0 0 60px 15px ${dot.color}80`,
                    }}
                />
            ))}

            {/* Very faint ambient light to give depth */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] bg-[#0c7070]/5" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] bg-[#156d00]/5" />
        </div>
    )
}
