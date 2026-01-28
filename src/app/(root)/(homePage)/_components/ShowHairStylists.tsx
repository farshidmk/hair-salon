import StylistCard from "@/components/card/StylistCard";
import { PATHS } from "@/shared/path";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const ShowHairStylists = () => {
  return (
    <Box>
      {/* <Typography variant="h6">آرایشگران ما 💇‍♀️</Typography> */}
      <div className="flex items-center gap-2">
        <Typography variant="h6" color="primary" fontWeight={600} fontSize={24}>
          آرایشگران ما 💅
        </Typography>

        <Link href={PATHS.stylists}>
          <Typography variant="caption" color="info" fontSize={12}>
            مشاهده همه
          </Typography>
        </Link>
      </div>

      <Grid container spacing={2}>
        <StylistCard
          stylist={{
            description: "description",
            id: "1",
            image: "/assets/images/beauty.jpg",
            name: "فرشته علی زاده",
            rating: 4,
          }}
          showRating
        />
      </Grid>
    </Box>
  );
};

export default ShowHairStylists;
