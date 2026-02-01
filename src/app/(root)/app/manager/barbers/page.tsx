"use client";
import React, { useState } from "react";
import BarberForm from "./_components/BarberForm";
import { Button, Collapse, Divider } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ListOfBarbers from "./_components/ListOfBarbers";

const BarbersPage = () => {
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
          ایجاد آرایشگر جدید
        </Button>
      </div>

      <Collapse in={showCreateService}>
        <BarberForm />
      </Collapse>
      <Divider />
      <ListOfBarbers />
    </div>
  );
};

export default BarbersPage;
