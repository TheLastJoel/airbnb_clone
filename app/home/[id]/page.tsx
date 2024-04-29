import { createReservation } from "@/app/actions";
import prisma from "@/app/lib/db"
import { useCountries } from "@/app/lib/getCountries";
import { CategoryShowcase } from "@/components/shared/CategoryShowcase";
import { HomeMap } from "@/components/shared/HomeMap";
import SelectCalendar from "@/components/shared/SelectCalendar";
import { ReservationSubmitButton } from "@/components/shared/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";


async function getListingData(homeId: string){
    const listingData = await prisma.home.findUnique({
        where:{
            id: homeId
        },
        select:{
            title: true,
            description: true,
            photo: true,
            price: true,
            country: true,
            guests: true,
            bathrooms: true,
            bedrooms: true,
            categoryName: true,
            Reservation: {
                where:{
                    homeId: homeId
                }
            },
            User:{
                select:{
                    firstName: true,
                    profileImage: true,
                    // email: true,
                }
            }
        }
    })

    return listingData;
}


export default async function HomeListingPage({params}: {params: {id: string}}) {

    const data = await getListingData(params.id);
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(data?.country as string);

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <div className=" w-[75%] mx-auto mt-10 mb-36">
            <h1 className=" font-medium text-2xl mb-5">{data?.title}</h1>
            <div className=" relative h-[550px]">
                <Image 
                    src={`https://drhohgddxztuznauxfuw.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
                    alt="Image of listing"
                    fill
                    className=" rounded-lg h-full object-cover w-full"
                />
            
            </div>

            <div className=" flex justify-between gap-x-24 mt-8">
                <div className=" w-2/3">
                    <h3 className=" text-xl font-medium">{country?.flag} {country?.label}</h3>
                    <div className=" flex gap-x-2">
                        <p>{data?.guests} guests</p>
                        *
                        <p>{data?.bedrooms} bedrooms</p>
                        *
                        <p>{data?.bathrooms} bathrooms</p>
                    </div>
                    <div className=" flex items-center mt-6">

                        <img 
                            src={data?.User?.profileImage ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} 
                            alt="User Profile Image"
                            className="w-11 h-11 rounded-full"
                        />

                        <div className="flex flex-col ml-3 items-baseline">
                            <p className=" text-muted-foreground text-sm">Hosted by <span className="text-black font-medium">{data?.User?.firstName}</span> </p>
                            <p className="text-xs text-muted-foreground">Host since 2015</p>
                        </div>
                    </div>

                    <Separator className="my-7"/>

                    <CategoryShowcase categoryName={data?.categoryName as string}/>

                    <Separator className="my-7"/>

                    <p className=" text-muted-foreground">{data?.description}</p>

                    <Separator className="my-7"/>

                    <HomeMap locationValue={country?.value as string}/>


                </div>
                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={params.id}/>
                    <input type="hidden" name="userId" value={user?.id}/>
                    <SelectCalendar reservations={data?.Reservation}/>

                    {
                        user?.id ? (
                            <ReservationSubmitButton/>
                        ) : (
                            <Button className=" bg-primary text-white w-full py-3 rounded-lg mt-8">
                                <Link href="/api/auth/login">
                                    Login to book
                                </Link>
                            </Button>
                        )
                    }
                </form>

            </div>

        </div>
    )
}