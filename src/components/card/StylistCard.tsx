import { PATHS } from "@/shared/path";
import { Rating, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  showRating?: boolean;
  stylist: Stylist;
};

const StylistCard = ({ showRating, stylist }: Props) => {
  return (
    <Link href={`${PATHS.stylists}/${stylist.id}`}>
      <div className="flex flex-col gap-2">
        <Image src={stylist.image} alt={stylist.name} width={130} height={130} className="rounded-2xl object-cover" />
        <Typography variant="h6" fontSize={14}>
          {stylist.name}
        </Typography>
        {showRating && (
          <Rating name={`${stylist.name}-rating`} precision={0.5} readOnly value={stylist.rating} size="small" />
        )}
      </div>
    </Link>
  );
};

export default StylistCard;
