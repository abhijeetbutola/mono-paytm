"use client";
import { Card } from "@repo/ui/card";
// import {useBalance} from "@repo/store/useBalance"
import { useAppSelector } from "@repo/store/hooks";

export default function BalanceComponent() {
  const balance = useAppSelector((state) => state.balance.value);

  return (
    <div>
      <Card title="What is">Hello</Card>
      <p>Your balance is: {balance}</p>
    </div>
  );
}
