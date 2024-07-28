"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface OptionalParam {
  key: string;
  value: string;
}

export const FullPanel = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [requestType, setRequestType] = useState("GET");
  const [routePath, setRoutePath] = useState("");
  //add optional params for query string here (add key value pairs to the array @sahith)
  const [optionalParams, setOptionalParams] = useState<OptionalParam[]>([
    { key: "", value: "" },
  ]);
  const [response, setResponse] = useState("");

  const handleAddParam = () => {
    setOptionalParams([...optionalParams, { key: "", value: "" }]);
  };

  const handleRemoveParam = (index: number) => {
    const newParams = optionalParams.filter((_, i) => i !== index);
    setOptionalParams(newParams);
  };

  const handleParamChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newParams = [...optionalParams];
    newParams[index][field] = value;
    setOptionalParams(newParams);
  };

  const handleSend = async () => {
    try {
      const queryParams = new URLSearchParams(
        optionalParams
          .filter((param) => param.key && param.value)
          .map((param) => [param.key, param.value])
      ).toString();

      const url = `${baseUrl}${routePath}${
        queryParams ? `?${queryParams}` : ""
      }`;
      const res = await fetch(url, { method: requestType });
      const data = await res.json();
      console.log(data);
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      // @ts-ignore
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto p-2 min-h-full ">
        <h1 className="text-2xl font-bold mb-4">API Tester</h1>
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full  h-full  "
        >
          <ResizablePanel className="min-h-fit">
            <Card className="h-full">
              <CardContent className="p-4 space-y-4">
                <Input
                  placeholder="Base URL (e.g. https://jsonplaceholder.typicode.com)"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
                <Select value={requestType} onValueChange={setRequestType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Route Path (e.g. /posts or /users/1 )"
                  value={routePath}
                  onChange={(e) => setRoutePath(e.target.value)}
                />
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Optional Parameters</h3>
                  {optionalParams.map((param, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Key"
                        value={param.key}
                        onChange={(e) =>
                          handleParamChange(index, "key", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Value"
                        value={param.value}
                        onChange={(e) =>
                          handleParamChange(index, "value", e.target.value)
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveParam(index)}
                        disabled={optionalParams.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleAddParam}>
                    <Plus className="h-4 w-4 mr-2" /> Add Parameter
                  </Button>
                </div>
                <Button onClick={handleSend} className="w-full">
                  Send
                </Button>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="min-h-fit">
            <Card className="h-full ">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Response</h2>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto ">
                  {response || "No response yet"}
                </pre>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};
