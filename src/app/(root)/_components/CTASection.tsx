"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { Calendar, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const CTASection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #957DAD 0%, #f0768b 100%)",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="white" opacity="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <div className="text-center text-white">
          <Typography
            variant="h3"
            component="h2"
            fontWeight={700}
            mb={3}
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              animation: "fadeInScale 0.8s ease-out",
            }}
          >
            آماده برای تغییر هستید؟
          </Typography>

          <Typography
            variant="h6"
            mb={5}
            sx={{
              opacity: 0.95,
              fontSize: { xs: "1rem", md: "1.3rem" },
              animation: "fadeInScale 1s ease-out 0.2s both",
            }}
          >
            همین حالا نوبت خود را رزرو کنید و تجربه زیبایی متفاوت را حس کنید
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8" style={{ animation: "fadeInScale 1.2s ease-out 0.4s both" }}>
            <Link href="/booking">
              <Button
                variant="contained"
                size="large"
                startIcon={<Calendar className="w-5 h-5" />}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  px: 5,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "white",
                    transform: "translateY(-6px) scale(1.05)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  },
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                رزرو آنلاین
              </Button>
            </Link>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Phone className="w-5 h-5" />}
              sx={{
                borderColor: "white",
                color: "white",
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "50px",
                borderWidth: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderWidth: 2,
                  transform: "translateY(-6px) scale(1.05)",
                },
              }}
            >
              تماس با ما
            </Button>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap gap-6 justify-center items-center text-white/90" style={{ animation: "fadeInScale 1.4s ease-out 0.6s both" }}>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <Typography variant="body1">021-12345678</Typography>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <Typography variant="body1">تهران، خیابان ولیعصر</Typography>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
    </Box>
  );
};

export default CTASection;
