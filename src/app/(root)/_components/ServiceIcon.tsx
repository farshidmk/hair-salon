import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  iconUrl: string;
  title?: string;
  link: string;
};

const ServiceIcon = ({ iconUrl, title, link }: Props) => {
  return (
    <Link href={link}>
      <div className="flex flex-col items-center justify-center gap-1 group ">
        <div className="w-10 h-10 p-1 bg-pink-100 rounded-full flex items-center justify-center group-hover:shadow-md group-hover:shadow-primary transition-all duration-300">
          <Image src={iconUrl} alt={title ?? "service icon"} width={30} height={30} />
        </div>
        <p className="text-xs text-center group-hover:text-primary transition-all duration-300">{title}</p>
      </div>
    </Link>
  );
};

export default ServiceIcon;
