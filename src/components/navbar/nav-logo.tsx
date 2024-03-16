import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <div className="nav-logo px-6">
      <Link href={"/"}>
        <Image src="/fdfp-logo.png" alt="FDFP logo" width={400} height={400} />
      </Link>
    </div>
  );
}
