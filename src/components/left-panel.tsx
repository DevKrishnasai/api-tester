"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ParameterInput from "./parameter-input";

export default function LeftPanel() {
  const [resource, setResource] = useState("accounts");
  const [method, setMethod] = useState("update");
  const [parameters, setParameters] = useState({});

  const handleSubmit = () => {
    // Implement request submission logic here
    console.log({ resource, method, parameters });
  };

  return (
    <div className="w-1/2 p-4 space-y-4">
      <Select onValueChange={setResource}>
        <SelectTrigger>
          <SelectValue placeholder="Select Resource" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="accounts">Accounts</SelectItem>
          <SelectItem value="customers">Customers</SelectItem>
          <SelectItem value="charges">Charges</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setMethod}>
        <SelectTrigger>
          <SelectValue placeholder="Select Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="create">Create</SelectItem>
          <SelectItem value="read">Read</SelectItem>
          <SelectItem value="update">Update</SelectItem>
          <SelectItem value="delete">Delete</SelectItem>
        </SelectContent>
      </Select>

      <ParameterInput parameters={parameters} onChange={setParameters} />

      <Button onClick={handleSubmit}>Run request</Button>
    </div>
  );
}
