import Image from "next/image";
import Link from "next/link";
import { useCountries } from "@/app/lib/getCountries";
import { Heart } from "lucide-react";
import { AddToFavouritesButton, RemoveFromFavouritesButton } from "./SubmitButtons";
import { addToFavourite, removeFromFavourite } from "@/app/actions";

interface iAppProps {
    imagePath: string;
    description: string;
    location: string;
    price: number;
    userId: string | undefined;
    isInFavourties: boolean;
    favouriteId: string | undefined;
    homeId: string;
    pathName: string;
}



export default function ListingCard({description, imagePath, location, price, userId, favouriteId, isInFavourties, homeId, pathName}: iAppProps) {
    console.log(imagePath)
    
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(location);

    return (
        <div className=" flex flex-col">
            <div className=" relative h-72">
                <Image 
                    src={`https://drhohgddxztuznauxfuw.supabase.co/storage/v1/object/public/images/${imagePath}`} 
                    alt="Image of House" 
                    fill 
                    className=" rounded-lg h-full object-cover mb-3"
                />

                {userId && ( 
                    <div className=" z-10 absolute top-2 right-2">
                        {isInFavourties ? 
                        (
                            <form action={removeFromFavourite}>
                                <input type="hidden" name="favouriteId" value={favouriteId}/>
                                <input type="hidden" name="userId" value={userId}/>
                                <input type="hidden" name="pathName" value={pathName}/>
                                <RemoveFromFavouritesButton/>
                            </form>
                        )
                        :
                        (
                            <form action={addToFavourite}>
                                <input type="hidden" name="homeId" value={homeId}/>
                                <input type="hidden" name="userId" value={userId}/>
                                <input type="hidden" name="pathName" value={pathName}/>
                                <AddToFavouritesButton/>
                            </form>
                        )}
                    </div>
                )}
            </div>

            <Link href={`/home/${homeId}`}>
                <h3 className=" font-medium text-base">
                    {country?.flag} {country?.label} / {country?.region}
                </h3>
                <p className=" text-muted-foreground text-sm line-clamp-2">{description}</p>
                <p className=" pt-2 text-muted-foreground"><span className=" font-medium text-black">${price}</span> per night</p>
            </Link>
        </div>
    )
}
