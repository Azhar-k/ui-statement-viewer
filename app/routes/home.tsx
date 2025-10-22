import type { Route } from "./+types/home";
import { BankStatementViewer } from "../components/BankStatementViewer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bank Statement Viewer" },
    { name: "description", content: "Upload and view bank statement transactions" },
  ];
}

export default function Home() {
  return <BankStatementViewer />;
}
