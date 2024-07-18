"use client";
import { createOnRampTransaction } from "@/app/lib/actions/createOnRampTransaction";
import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import Input from "@repo/ui/input";
import Select from "@repo/ui/select";
import { useState } from "react";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export default function AddMoney() {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);

  return (
    <Card title="Add Money" className="basis-1/2 h-full">
      <Input
        label="Amount"
        id="amount"
        type="number"
        placeholder="amount"
        onChange={(value)=>setValue(Number(value))}
      />
      <Select
        label="Bank"
        onSelect={(value) => {
          setRedirectUrl(
            SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
          );
          setProvider(
            SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
          );
        }}
        options={SUPPORTED_BANKS.map((x) => ({
          key: x.name,
          value: x.name,
        }))}
      />
      <div className="text-center pt-4">
        <Button
          onClick={async () => {
            await createOnRampTransaction(provider,value);
            window.location.href = redirectUrl || "";
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
}
