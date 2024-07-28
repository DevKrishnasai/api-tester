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
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface OptionalParam {
  key: string;
  value: string;
}

export const FullPanel = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [requestType, setRequestType] = useState("GET");
  const [routePath, setRoutePath] = useState("");
  const [optionalParams, setOptionalParams] = useState<OptionalParam[]>([
    { key: "", value: "" },
  ]);
  const [requestBody, setRequestBody] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [customHeaders, setCustomHeaders] = useState<OptionalParam[]>([
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

  const handleAddHeader = () => {
    setCustomHeaders([...customHeaders, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaders = customHeaders.filter((_, i) => i !== index);
    setCustomHeaders(newHeaders);
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

  const handleHeaderChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newHeaders = [...customHeaders];
    newHeaders[index][field] = value;
    setCustomHeaders(newHeaders);
  };

  const handleSend = async () => {
    try {
      toast.loading("Sending request...", {
        id: "loading",
      });
      const queryParams = new URLSearchParams(
        optionalParams
          .filter((param) => param.key && param.value)
          .map((param) => [param.key, param.value])
      ).toString();
      const url = `${baseUrl}${routePath}${
        queryParams ? `?${queryParams}` : ""
      }`;
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (bearerToken) {
        headers["Authorization"] = `Bearer ${bearerToken}`;
      }

      customHeaders.forEach((header) => {
        if (header.key && header.value) {
          headers[header.key] = header.value;
        }
      });

      const options: RequestInit = {
        method: requestType,
        headers,
      };

      if (requestType !== "GET" && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(url, options);
      const data = await res.json();
      toast.success("Request successful", {
        id: "loading",
      });
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      toast.error("Request failed", {
        id: "loading",
      });
      console.error(error);
      // @ts-ignore
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto p-2 min-h-full">
        <h1 className="text-2xl font-bold mb-4">API Tester</h1>
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel className="min-h-fit">
            <Card className="h-full">
              <CardContent className="p-4 space-y-4">
                <Input
                  placeholder="Base URL (e.g. https://jsonplaceholder.typicode.com) (remove trailing slash)"
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
                  placeholder="Route Path (e.g. /posts or /users/1  or /posts/1/comments)"
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
                {(requestType === "POST" || requestType === "PUT") && (
                  <Textarea
                    placeholder={`(optional) Request body in JSON format
{
  'title': 'foo',
  'body': 'bar',
  'userId': 1
}
                    `}
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="h-32"
                  />
                )}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Bearer Token</h3>
                  <Input
                    placeholder="Bearer Token"
                    value={bearerToken}
                    onChange={(e) => setBearerToken(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Custom Headers</h3>
                  {customHeaders.map((header, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Header Key"
                        value={header.key}
                        onChange={(e) =>
                          handleHeaderChange(index, "key", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Header Value"
                        value={header.value}
                        onChange={(e) =>
                          handleHeaderChange(index, "value", e.target.value)
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveHeader(index)}
                        disabled={customHeaders.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleAddHeader}>
                    <Plus className="h-4 w-4 mr-2" /> Add Header
                  </Button>
                </div>
                <Button onClick={handleSend} className="w-full">
                  Send
                </Button>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="min-h-fit">
            <Card className="h-full">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Response</h2>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
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
