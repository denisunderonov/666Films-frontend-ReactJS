import * as React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import './simplealert.css';

export default function SimpleAlert({ text , alertStatus}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert className={`alert ${visible ? "fade-in" : "fade-out"}`} severity={alertStatus}>
      {text}
    </Alert>
  );
}
