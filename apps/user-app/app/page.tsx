import { Card } from "@repo/ui/card";
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export default function Page() {
  return (
    <div>
      <Card title="Hello">Card in User-App</Card>
    </div>
  );
}
