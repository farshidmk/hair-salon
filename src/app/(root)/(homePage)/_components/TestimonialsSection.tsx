"use client";
import { Box, Card, CardContent, Container, Grid, Rating, Typography, Avatar } from "@mui/material";
import { Quote } from "lucide-react";
import React from "react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "سارا احمدی",
    avatar: "/assets/images/beauty.jpg",
    rating: 5,
    comment: "واقعا عالی بود! از کار آرایشگر بسیار راضی هستم. مهارت و دقت در کار فوق‌العاده بود.",
    service: "رنگ مو",
  },
  {
    id: 2,
    name: "مریم رضایی",
    avatar: "/assets/images/beauty2.jpg",
    rating: 5,
    comment: "بهترین سالن زیبایی که تا حالا رفتم. کادر حرفه‌ای و محیط بسیار تمیز و دلنشین.",
    service: "آرایش عروس",
  },
  {
    id: 3,
    name: "فاطمه کریمی",
    avatar: "/assets/images/beauty.jpg",
    rating: 5,
    comment: "خدمات عالی با قیمت مناسب. حتما دوباره مراجعه می‌کنم و به دوستانم هم معرفی کردم.",
    service: "کوتاهی مو",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        sx={{
          height: "100%",
          borderRadius: 4,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "visible",
          boxShadow: "0 4px 20px rgba(240, 118, 139, 0.15)",
          "&:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: "0 12px 40px rgba(240, 118, 139, 0.25)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #f0768b 0%, #957DAD 100%)",
            borderRadius: "16px 16px 0 0",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Quote icon */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              opacity: 0.1,
            }}
          >
            <Quote className="w-16 h-16 text-primary" fill="currentColor" />
          </Box>

          {/* Avatar and info */}
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.name}
              sx={{
                width: 56,
                height: 56,
                border: "3px solid",
                borderColor: "primary.main",
              }}
            />
            <div>
              <Typography variant="h6" fontWeight={600}>
                {testimonial.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {testimonial.service}
              </Typography>
            </div>
          </div>

          {/* Rating */}
          <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2 }} />

          {/* Comment */}
          <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
            {testimonial.comment}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const TestimonialsSection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <div className="text-center mb-8">
          <Typography
            variant="h3"
            fontWeight={700}
            color="primary"
            mb={2}
            sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }}
          >
            نظرات مشتریان
          </Typography>
          <Typography variant="body1" color="text.secondary" fontSize={18}>
            تجربه مشتریان ما از خدمات آرایشگاه
          </Typography>
        </div>

        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
