import Link from "next/link";
import logo from "./assets/icons/logo.svg";
import Image from "next/image";
export default function Logo() {
  return (
    <Link href="/" className="flex gap-1 text-xl font-semibold items-center">
      <Image width="50" height="50" src={logo} alt="Logo" />
      <h1>Marquino</h1>
    </Link>
  );
}
