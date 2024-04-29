import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapFilterItems } from "@/components/shared/MapFilterItems";
import prisma from "./lib/db";
import ListingCard from "@/components/shared/ListingCard";
import { Suspense } from "react";
import SkeletonCard from "@/components/shared/SkeletonCard";
import NoItems from "@/components/shared/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getListingData({
  searchParams,
  userId
}: {
  userId: string | undefined;
  searchParams?:{
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  }
}){
  noStore();
  const listingData = await prisma.home.findMany({
    where:{
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guests ?? undefined,
      bathrooms: searchParams?.bathrooms ?? undefined,
      bedrooms: searchParams?.rooms ?? undefined,
    },
    select:{
      id: true,
      description: true,
      photo: true,
      price: true,
      country: true,
      Favourite: {
        where: {
          userId: userId ?? undefined
        }
      }
    }
  })
  return listingData;
}

export default function Home({
  searchParams
}: {
  searchParams?:{
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  }
}) {
  return (
    <div className=" container mx-auto px-5 lg:px:10x">
      <MapFilterItems/>

      <Suspense key={searchParams?.filter} fallback = {<SkeletonLoading/>}>
        <ShowItems searchParams={searchParams}/>
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams
}:{
  searchParams?:{
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  }
}) {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  const listingData = await getListingData({searchParams: searchParams, userId: user?.id});
  return(
    <>
    {listingData.length === 0 ? (
        <NoItems title="No listings for this category. Sorry!" description="create your own instead"/>
    )
    : (
        <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
            {listingData.map((listing) => (
              <ListingCard 
                key={listing.id} 
                description={listing.description as string} 
                imagePath={listing.photo as string}
                location={listing.country as string}
                price={listing.price as number}
                userId={user?.id}
                favouriteId={listing.Favourite[0]?.id}
                isInFavourties={listing.Favourite.length > 0}
                homeId={listing.id}
                pathName="/"
              />
            ))}
        </div>
    )}
    </>
  )
}

function SkeletonLoading(){
  return(
    <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
    </div>
  )
}
