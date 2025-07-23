"use client";
import { Box, Container, Grid } from "@mui/material";
import RootCarousel from "./_components/RootCarousel";
import ServiceIcon from "./_components/ServiceIcon";
import ShowHairStylists from "./_components/ShowHairStylists";

const RootPage = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <RootCarousel />
      </Container>
      <Box sx={{ background: (t) => t.palette.background.default, py: 2, my: 1 }}>
        <Container maxWidth="lg">
          <Grid spacing={2} container sx={{ width: "100%" }}>
            {SERVICES.map((service) => (
              <Grid key={service.iconUrl} size={{ xs: 3, md: 2 }}>
                <ServiceIcon iconUrl={`/assets/icons/services/${service.iconUrl}`} link={service.link} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <ShowHairStylists />
      </Container>
    </div>
  );
};

export default RootPage;

const SERVICES = [
  {
    iconUrl: "haircut.svg",
    link: "/",
  },
  {
    iconUrl: "nailing.svg",
    link: "/",
  },
  {
    iconUrl: "mask.svg",
    link: "/",
  },
  {
    iconUrl: "lib.svg",
    link: "/",
  },
  {
    iconUrl: "hair-1.svg",
    link: "/",
  },
  // {
  //   iconUrl: "hair-2.svg",
  //   link: "/",
  // },
  {
    iconUrl: "eyebrow.svg",
    link: "/",
  },
];
