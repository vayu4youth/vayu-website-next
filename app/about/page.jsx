"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Target, Sparkles } from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Community",
        description: "Building a supportive network where youth can connect, share, and grow together in their spiritual journey."
    },
    {
        icon: Lightbulb,
        title: "Wisdom",
        description: "Making ancient Vedic teachings accessible and relevant to modern life, bridging tradition with contemporary understanding."
    },
    {
        icon: Target,
        title: "Purpose",
        description: "Helping young people discover their dharma and live with intention, guided by timeless principles."
    },
    {
        icon: Users,
        title: "Youth-Led",
        description: "Created by youth, for youth. We believe in peer-to-peer learning and authentic shared experiences."
    },
    {
        icon: Sparkles,
        title: "Growth",
        description: "Fostering personal transformation through meditation, self-reflection, and practical spiritual practices."
    }
];

export default function About() {
    return (
        <div className="min-h-screen bg-white px-6 py-12">
            <div className="max-w-6xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#790016] font-['Playfair_Display']">
                        About VAYU
                    </h1>
                    <p className="text-xl max-w-3xl italic mx-auto leading-relaxed text-[#C42727] font-['Source_Sans_3']">
                        An APSA initiative reconnecting Hindu youth with their cultural and spiritual heritage
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="bg-linear-to-br from-[#EFA92A] to-orange-50 rounded-3xl p-8 md:p-12 border border-orange-200 shadow-lg mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#D7572A] font-['Playfair_Display']">
                        A Note from the Founder
                    </h2>
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed text-[#790016] font-['Source_Sans_3']">
                        <p>Dear Friends,</p>
                        <p>
                            <i>VAYU</i>, short for Vedic Association for Youth Unity, is not merely an organization. It is a vision.
                            VAYU was founded with the intention of empowering youth to help shape a world guided by sustainability,
                            strong morals, and Vedic values. To bring about meaningful change, there is no better place to begin than
                            with the youth themselves.
                        </p>
                        <p>
                            The purpose of VAYU is simple and deeply rooted in the timeless principle of Dharma (Righteousness).
                            We envision a world where individuals recognize the importance of ethics, live in harmony with nature,
                            and strive for greatness. This greatness is reflected in thought and action, in integrity and honesty, and
                            in the courage to always choose the path of virtue.
                        </p>
                        <p>
                            Our goal is for VAYU to grow not only as an organization, but also as a community of like minded individuals
                            working collectively for the greater good of the world. If the youth understand the need for change today,
                            the day is not far when the world as a whole will walk this noble path.
                        </p>
                        <p className="pt-4 text-[#D7572A] font-['Source_Sans_3']">
                            With gratitude,<br/>
                            <span className="font-bold text-2xl font-['Playfair_Display']">Karanveer Arora</span>
                        </p>
                    </div>
                </motion.div>

                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#790016] font-['Playfair_Display']"
                    >
                        Our Core Values
                    </motion.h2>

                    <div className="flex flex-wrap justify-center gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                                className="bg-linear-to-br from-[#EFA92A] to-orange-50 rounded-2xl p-8 border border-orange-200 shadow-lg hover:shadow-2xl hover:border-[#D7572A] transition-all duration-300 w-full max-w-[350px]"
                            >
                                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#F09304] to-orange-600 flex items-center justify-center mb-6 mx-auto shadow-lg">
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-center text-[#C42727] font-['Playfair_Display']">
                                    {value.title}
                                </h3>
                                <p className="text-center leading-relaxed text-[#790016] font-nunito">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}