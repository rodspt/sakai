"use client";
import Bread from "@/components/Bread/Bread";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default async function HomePage() {
  const route = useRouter();
  const { data: session } = useSession();

  const handleRedirect = (url: string) => {
    route.push(url);
  };

  const breadcrumbItems = [{ label: "Home", url: "/home" }];
  const menuPra = [
    
  ];
  const menuViveiro = [
  
  ];

  return (
    <>
      <Bread model={breadcrumbItems} />
      <div className="mt-3 layout-main">
        <div className="flex flex-wrap md:flex-nowrap gap-4 max-w-4xl w-full">
          
            OK OK 

        </div>
      </div>
    </>
  );
}
