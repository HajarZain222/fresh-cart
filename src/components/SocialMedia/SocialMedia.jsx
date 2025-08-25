import React from "react";
import Style from "./SocialMedia.module.css";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function SocialMedia() {
    const icons = [
        { id: 1, icon: <Facebook size={25} />, link: "https://facebook.com" },
        { id: 2, icon: <Twitter size={25} />, link: "https://twitter.com" },
        { id: 3, icon: <Instagram size={25} />, link: "https://instagram.com" },
        { id: 4, icon: <Linkedin size={25} />, link: "https://linkedin.com" },
    ];

    return (
        <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">
            Follow us on
        </p>
        <div className="flex gap-6">
            {icons.map((item) => (
            <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-green-600 transition-colors duration-300"
            >
                {item.icon}
            </a>
            ))}
        </div>
        </div>
    );
}

export default SocialMedia;
