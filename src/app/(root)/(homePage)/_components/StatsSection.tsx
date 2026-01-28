"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Users, Award, Heart, Star } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

const StatItem = ({ icon, value, label, suffix = "" }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <Grid size={{ xs: 6, md: 3 }}>
      <Box
        ref={ref}
        sx={{
          textAlign: "center",
          p: 3,
          borderRadius: 3,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 8px 24px rgba(240, 118, 139, 0.2)",
          },
        }}
      >
        <div className="flex justify-center mb-3">
          <div className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 1,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          {count.toLocaleString("fa-IR")}
          {suffix}
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
      </Box>
    </Grid>
  );
};

const StatsSection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={700}
          color="primary"
          mb={6}
          sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }}
        >
          چرا ما را انتخاب کنید؟
        </Typography>

        <Grid container spacing={4}>
          <StatItem icon={<Users className="w-8 h-8 text-primary" />} value={5000} label="مشتری راضی" suffix="+" />
          <StatItem icon={<Award className="w-8 h-8 text-primary" />} value={15} label="سال تجربه" suffix="+" />
          <StatItem icon={<Heart className="w-8 h-8 text-primary" />} value={10000} label="خدمات انجام شده" suffix="+" />
          <StatItem icon={<Star className="w-8 h-8 text-primary" />} value={98} label="رضایت مشتریان" suffix="%" />
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
