"use client";

import axios from "axios";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface TestComponentProps {}

export default function TestComponent({}: TestComponentProps) {
  const onClick = async () => {
    try {
      await axios.post("/api/move");
      toast.success("done");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant={"infoOutline"} onClick={onClick}>Send Request</Button>
    </div>
  );
}
