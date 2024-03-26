import Image from "next/image";

export default function NoReport() {
  return (
    <>
      <Image alt="No report" src={"/no-report.svg"} width={100} height={100} />
      <p className="text-[2rem]">Aucun rapport chargé</p>
    </>
  );
}
