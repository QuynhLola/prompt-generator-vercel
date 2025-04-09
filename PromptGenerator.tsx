
// Ứng dụng React: Giao diện nhập liệu và sinh prompt theo mẫu
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const promptTemplates = {
  "R-T-F": (role, task, format) => `Bạn là ${role}. Hãy ${task} dưới dạng ${format}.`,
  "T-A-G": (task, audience, goal) => `Viết ${task} cho ${audience} với mục tiêu là ${goal}.`,
  "C-I-S-C-O": (context, issue, solution, consequence, outcome) =>
    `Trình bày: Bối cảnh: ${context}; Vấn đề: ${issue}; Giải pháp: ${solution}; Hệ quả nếu không xử lý: ${consequence}; Kết quả đạt được: ${outcome}.`,
  "P-A-S": (problem, agitation, solution) =>
    `Vấn đề: ${problem}. Hệ quả nghiêm trọng: ${agitation}. Giải pháp đề xuất: ${solution}.`,
  "A-I-D-A": (attention, interest, desire, action) =>
    `${attention} ${interest} ${desire} ${action}`
};

export default function PromptGenerator() {
  const [template, setTemplate] = useState("R-T-F");
  const [fields, setFields] = useState({});
  const [output, setOutput] = useState("");

  const handleChange = (field) => (e) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const generatePrompt = () => {
    const fn = promptTemplates[template];
    const values = Object.values(fields);
    const result = fn(...values);
    setOutput(result);
  };

  const fieldLabels = {
    "R-T-F": ["Vai trò", "Nhiệm vụ", "Định dạng"],
    "T-A-G": ["Tác vụ", "Đối tượng", "Mục tiêu"],
    "C-I-S-C-O": ["Bối cảnh", "Vấn đề", "Giải pháp", "Hệ quả", "Kết quả"],
    "P-A-S": ["Vấn đề", "Hệ quả", "Giải pháp"],
    "A-I-D-A": ["Chú ý", "Hứng thú", "Khao khát", "Hành động"]
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">🧠 Tạo Prompt Theo Mẫu</h2>

          <Select value={template} onValueChange={setTemplate}>
            {Object.keys(promptTemplates).map((key) => (
              <SelectItem key={key} value={key}>{key}</SelectItem>
            ))}
          </Select>

          {fieldLabels[template].map((label, idx) => (
            <Input
              key={idx}
              placeholder={label}
              onChange={handleChange(label)}
            />
          ))}

          <Button onClick={generatePrompt}>Tạo Prompt</Button>

          {output && (
            <Textarea value={output} rows={4} readOnly className="mt-4" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
