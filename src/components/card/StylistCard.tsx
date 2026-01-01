"use client";
import { PATHS } from "@/shared/path";
import { Rating, Typography, Card, CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  showRating?: boolean;
  stylist: Stylist;
};

const StylistCard = ({ showRating, stylist }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`${PATHS.stylists}/${stylist.id}`}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderRadius: 4,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          overflow: "hidden",
          boxShadow: isHovered ? "0 12px 40px rgba(240, 118, 139, 0.25)" : "0 4px 16px rgba(240, 118, 139, 0.1)",
          transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
          "&:hover": {
            "& .stylist-image": {
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <Image
            src={stylist.image}
            alt={stylist.name}
            fill
            className="object-cover stylist-image transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" fontSize={16} fontWeight={600} mb={1}>
            {stylist.name}
          </Typography>

          {stylist.description && (
            <Typography variant="body2" color="text.secondary" fontSize={13} mb={1.5} lineHeight={1.6}>
              {stylist.description}
            </Typography>
          )}

          {showRating && (
            <div className="flex items-center gap-1">
              <Rating name={`${stylist.name}-rating`} precision={0.5} readOnly value={stylist.rating} size="small" />
              <Typography variant="caption" color="text.secondary" fontSize={12}>
                ({stylist.rating})
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default StylistCard;
