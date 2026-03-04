"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";

export interface SocialProofBarProps { }

const SocialProofBar: React.FC<SocialProofBarProps> = () => {
    return (
        <section className="bg-gray-950 border-y border-gray-800 py-6 overflow-hidden relative z-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

                    {/* Rating and Projects */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 shrink-0"
                    >
                        <div className="flex bg-gray-900 border border-gray-800 rounded-full py-2 px-4 shadow-lg item-center gap-2">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-white font-semibold text-sm">
                                +20 proyectos entregados
                            </span>
                        </div>
                    </motion.div>

                    {/* Tech Logos Marquee (Horizontal scroll on mobile, flex row on desktop) */}
                    <div className="w-full md:w-auto overflow-hidden flex-1 relative flex items-center justify-center">
                        {/* Fade edges */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-950 to-transparent z-10 md:hidden" />
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-950 to-transparent z-10 md:hidden" />

                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="flex whitespace-nowrap gap-10 md:gap-12 md:!transform-none md:!animate-none items-center justify-center"
                        >
                            {/* Techs block - repeated twice for seamless loop on mobile */}
                            {[...Array(2)].map((_, loopIndex) => (
                                <div key={loopIndex} className={`flex items-center gap-10 md:gap-12 ${loopIndex === 1 ? 'md:hidden' : ''}`}>
                            {/* Next.js */}
                            <span className="text-gray-400 font-bold text-lg flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
                                <i className="devicon-nextjs-plain text-2xl"></i> Next.js
                            </span>
                            {/* React */}
                            <span className="text-gray-400 font-bold text-lg flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
                                <i className="devicon-react-original text-2xl text-[#61DAFB]"></i> React
                            </span>
                            {/* WordPress */}
                            <span className="text-gray-400 font-bold text-lg flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
                                <i className="devicon-wordpress-plain text-2xl text-[#21759b]"></i> WordPress
                            </span>
                            {/* Laravel */}
                            <span className="text-gray-400 font-bold text-lg flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
                                <i className="devicon-laravel-plain text-2xl text-[#FF2D20]"></i> Laravel
                            </span>
                    </div>
                ))}
                </motion.div>
            </div>

            {/* Locations */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 shrink-0 bg-blue-900/20 text-blue-400 border border-blue-800/50 rounded-full py-2 px-4 shadow-lg text-sm font-medium"
            >
                <MapPin size={16} />
                Sevilla · Madrid · Latinoamérica
            </motion.div>

        </div>
      </div >
    </section >
  );
};

export default SocialProofBar;
