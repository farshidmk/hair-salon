"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { Sparkles, Calendar, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f0768b 0%, #957DAD 100%)",
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "#ffffff", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>

        {/* Floating circles with animation */}
        <circle cx="10%" cy="20%" r="120" fill="url(#grad1)" className="animate-float-slow" />
        <circle cx="90%" cy="80%" r="80" fill="url(#grad1)" className="animate-float-medium" />
        <circle cx="85%" cy="15%" r="60" fill="url(#grad1)" className="animate-float-fast" />
        <circle cx="15%" cy="85%" r="100" fill="url(#grad1)" className="animate-float-slow" />
      </svg>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <div className="text-center text-white">
          {/* Icon with animation */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-16 h-16 animate-pulse" strokeWidth={1.5} />
              <div className="absolute -top-2 -right-2">
                <Star className="w-6 h-6 text-yellow-300 animate-spin-slow" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Main heading with fade-in animation */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3.5rem" },
              mb: 2,
              animation: "fadeInUp 0.8s ease-out",
            }}
          >
            زیبایی شما، هنر ماست
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.5rem" },
              mb: 4,
              opacity: 0.95,
              animation: "fadeInUp 1s ease-out 0.2s both",
            }}
          >
            بهترین خدمات آرایشی و زیبایی با متخصصان حرفه‌ای
          </Typography>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center items-center flex-wrap" style={{ animation: "fadeInUp 1.2s ease-out 0.4s both" }}>
            <Link href="/booking">
              <Button
                variant="contained"
                size="large"
                startIcon={<Calendar className="w-5 h-5" />}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "white",
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
                  },
                }}
              >
                رزرو نوبت
              </Button>
            </Link>

            <Link href="/services">
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "50px",
                  borderWidth: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderWidth: 2,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                خدمات ما
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-15px, 15px);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(25px, 25px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;
