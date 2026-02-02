"use client";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Collapse, Divider } from "@mui/material";
import { useState } from "react";
import ServiceForm from "./_components/ServiceForm";
import ListOfServices from "./_components/ListOfServices";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ServicesPage = () => {
  const [showCreateService, setShowCreateService] = useState<boolean>(true);

  return (
    <div className="p-2 h-full flex flex-col gap-1 ">
      <div className="w-full ">
        <Button
          variant={showCreateService ? "outlined" : "contained"}
          onClick={() => setShowCreateService((p) => !p)}
          color={showCreateService ? "warning" : "success"}
          endIcon={showCreateService ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
        >
          ایجاد سرویس جدید
        </Button>
      </div>

      <Collapse in={showCreateService}>
        <ServiceForm />
      </Collapse>
      <Divider />
      <ListOfServices />
    </div>
  );
};

export default ServicesPage;
