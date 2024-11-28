import { DataTable } from "./data-table";
import { columns } from "./columns";

type Payment = {
  id: string;
  name: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  organization: string;
  email: string;
};

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      name: "melody mallowood",
      amount: 100,
      status: "pending",
      email: "melody@example.com",
      organization: "Foo Logistics LTD",
    },
    {
      id: "9xEed52e",
      name: "fisher jamesons",
      amount: 200,
      status: "processing",
      email: "fisher@example.com",
      organization: "Rover Furniture Co.",
    },
    {
      id: "1xFxe829",
      name: "rammy roosewell",
      amount: 300,
      status: "success",
      email: "rammy@example.com",
      organization: "William Mills Au.",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
