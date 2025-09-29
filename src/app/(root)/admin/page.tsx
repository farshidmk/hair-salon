"use client";
import React from "react";

import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const AdminRootPage = () => {
  const services = [
    {
      title: "آرایشگران",
      description: "لیست آرایشگران",
      image: "/images/haircut.jpg",
    },
    {
      title: "سرویس ها",
      description: "سرویس های و خدمات فعال",
      image: "/images/color.jpg",
    },
    {
      title: "Hair Styling",
      description: "Styling for events, parties, and weddings.",
      image: "/images/style.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {services.map((service, idx) => (
        <MenuCard key={idx} {...service} />
      ))}
    </div>
  );
};

export default AdminRootPage;

interface MenuCardProps {
  title: string;
  description: string;
  image: string;
}

function MenuCard({ title, description, image }: MenuCardProps) {
  return (
    <Card
      className="
        group 
        rounded-xl 
        overflow-hidden 
        shadow-lg 
        transition-all 
        duration-300 
        hover:shadow-2xl 
        hover:scale-105
      "
    >
      <CardActionArea>
        <div className="relative overflow-hidden">
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
            className="
              transition-transform 
              duration-300 
              group-hover:scale-110
            "
          />
        </div>
        <CardContent className="bg-white">
          <Typography
            gutterBottom
            variant="h6"
            className="text-pink-600 font-bold group-hover:text-pink-500 transition-colors duration-300"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
