"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  iconUrl: string;
  title?: string;
  link: string;
};

const ServiceIcon = ({ iconUrl, title, link }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={link}>
      <div
        className="flex flex-col items-center justify-center gap-1 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`
            relative w-16 h-16 p-2 bg-gradient-to-br from-pink-100 to-purple-100
            rounded-full flex items-center justify-center
            transition-all duration-500 ease-out
            ${
              isHovered
                ? "shadow-lg shadow-primary/50 scale-110 rotate-6"
                : "shadow-sm hover:shadow-md hover:shadow-primary/30"
            }
          `}
          style={{
            transform: isHovered ? "translateY(-8px) scale(1.1) rotate(6deg)" : "translateY(0) scale(1) rotate(0deg)",
          }}
        >
          {/* Animated ring effect */}
          <div
            className={`
              absolute inset-0 rounded-full border-2 border-primary/30
              transition-all duration-500
              ${isHovered ? "scale-125 opacity-0" : "scale-100 opacity-100"}
            `}
          />

          {/* Pulse effect */}
          {isHovered && (
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "1s" }} />
          )}

          <Image
            src={iconUrl}
            alt={title ?? "service icon"}
            width={36}
            height={36}
            className={`relative z-10 transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        </div>
        <p
          className={`
            text-xs text-center font-medium transition-all duration-300
            ${isHovered ? "text-primary scale-105 font-semibold" : "text-gray-700"}
          `}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

export default ServiceIcon;
