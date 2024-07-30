import Image from "next/image";
import Link from "next/link";

type TLogo = {
  width: number;
  height: number;
};

export default function NavLogo() {
  return (
    // <div className="nav-logo px-6">
    <div className="nav-logo ml-[1rem]">
      <Link href={"/"}>
        <Image src="/fdfp-logo.png" alt="FDFP logo" width={400} height={400} />
      </Link>
    </div>
  );
}
