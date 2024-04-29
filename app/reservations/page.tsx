import ListingCard from "@/components/shared/ListingCard";
import NoItems from "@/components/shared/NoItems";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getListingData(userId: string) {
    noStore();
    const listingData = await prisma.reservation.findMany({
        where: {
            userId: userId,
        },
        select: {
            Home: {
                select: {
                    id: true,
                    description: true,
                    photo: true,
                    price: true,
                    country: true,
                    Favourite: {
                        where: {
                            userId: userId
                        }
                    }
                }
            
            }
        }
    })
    return listingData;
}

export default async function ReservationsPage() {

    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user) return redirect("/")

    const listingData = await getListingData(user?.id as string);

    return(
        <section className=" container mx-auto px-5 lg:px-10 mt-10">
            <h2 className=" text-3xl font-semibold tracking-tight">Your Reservations</h2>

            { listingData.length === 0 ? (
                <NoItems title="No Reservations" description="You have not made any reservations yet."/>
            )
            :
            (
                <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
                {
                    listingData.map((listing) => (
                        <ListingCard 
                            key={listing.Home?.id} 
                            homeId={listing.Home?.id as string} 
                            userId={user.id}
                            pathName="/favourites"
                            description={listing.Home?.description as string} 
                            imagePath={listing.Home?.photo as string} 
                            price={listing.Home?.price as number} 
                            location={listing.Home?.country as string} 
                            favouriteId={listing.Home?.Favourite[0]?.id as string}
                            isInFavourties = { listing.Home?.Favourite.length as number > 0 ? true : false}
                        />
                    ))
                }
                </div>
            )
            }
        </section>
    )
}