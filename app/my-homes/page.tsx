import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItems from "@/components/shared/NoItems";
import ListingCard from "@/components/shared/ListingCard";
import { unstable_noStore as noStore } from "next/cache";


async function getListingData(userId: string){
    noStore();
    const listingData = await prisma.home.findMany({
        where:{
            userId: userId,
            addedCategory: true,
            addedDescription: true,
            addedLocation: true
        },
        select:{
            id: true,
            country: true,
            photo: true,
            price: true,
            description: true,
            Favourite:{
                where:{
                    userId: userId
                }
            }
        },
        orderBy:{
            createdAT: "desc"
        }
    });

    return listingData;
}

export default async function MyHomesPage() {

    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user){
        return redirect("/");
    }
    const data = await getListingData(user.id);

    return (
        <section className=" container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

            { data.length === 0 ? (
                <NoItems title="No homes yet" description="add homes and see them here!"/>
            ) : (
                <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
                    {data.map((listing) => (
                        <ListingCard 
                            key={listing.id} 
                            homeId={listing.id} 
                            userId={user.id} 
                            pathName="/my-homes" 
                            description={listing.description as string}
                            location={listing.country as string}
                            price={listing.price as number}
                            favouriteId={listing.Favourite[0]?.id}
                            imagePath={listing.photo as string}
                            isInFavourties={ listing.Favourite.length > 0 ? true : false}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}