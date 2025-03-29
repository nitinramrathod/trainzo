import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid items-center justify-center h-screen">
      <div className="flex gap-9">

      <Link href="/dashboard">Go to Dashboard</Link>
      <Link href="/login">Go to Login</Link>
      </div>
    </div>
  );
}
