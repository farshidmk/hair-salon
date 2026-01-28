"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import RootCarousel from "./_components/RootCarousel";
import ServiceIcon from "./_components/ServiceIcon";
import ShowHairStylists from "./_components/ShowHairStylists";
import HeroSection from "./_components/HeroSection";
import StatsSection from "./_components/StatsSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import CTASection from "./_components/CTASection";

const RootPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Carousel Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <RootCarousel />
      </Container>

      {/* Services Section */}
      <Box sx={{ background: (t) => t.palette.background.default, py: 6, my: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={700}
            color="primary"
            mb={5}
            sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }}
          >
            خدمات ما
          </Typography>
          <Grid spacing={3} container sx={{ width: "100%" }} justifyContent="center">
            {SERVICES.map((service) => (
              <Grid key={service.iconUrl} size={{ xs: 4, sm: 3, md: 2 }}>
                <ServiceIcon
                  iconUrl={`/assets/icons/services/${service.iconUrl}`}
                  title={service.title}
                  link={service.link}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <StatsSection />

      {/* Stylists Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <ShowHairStylists />
      </Container>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
};

export default RootPage;

const SERVICES = [
  {
    iconUrl: "haircut.svg",
    title: "کوتاهی مو",
    link: "/services/haircut",
  },
  {
    iconUrl: "nailing.svg",
    title: "ناخن",
    link: "/services/nailing",
  },
  {
    iconUrl: "mask.svg",
    title: "ماسک صورت",
    link: "/services/mask",
  },
  {
    iconUrl: "lib.svg",
    title: "لب",
    link: "/services/lip",
  },
  {
    iconUrl: "hair-1.svg",
    title: "رنگ مو",
    link: "/services/hair-color",
  },
  {
    iconUrl: "eyebrow.svg",
    title: "ابرو",
    link: "/services/eyebrow",
  },
];
