import { Box } from "@mui/material";

const YearPicker = ({
  currentYear,
  startYear,
  onSelect,
  onPrev,
  onNext,
}: {
  currentYear: number;
  startYear: number;
  onSelect: (year: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <>
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Box sx={{ cursor: "pointer" }} onClick={onPrev}>
        ◀
      </Box>
      <Box>
        {startYear} - {startYear + 11}
      </Box>
      <Box sx={{ cursor: "pointer" }} onClick={onNext}>
        ▶
      </Box>
    </Box>

    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      {Array.from({ length: 12 }, (_, i) => startYear + i).map((year) => (
        <Box
          key={year}
          onClick={() => onSelect(year)}
          sx={{
            p: 2,
            textAlign: "center",
            borderRadius: 2,
            cursor: "pointer",
            bgcolor: year === currentYear ? "primary.main" : "action.hover",
            color: year === currentYear ? "primary.contrastText" : "text.primary",
          }}
        >
          {year}
        </Box>
      ))}
    </Box>
  </>
);

export default YearPicker;
