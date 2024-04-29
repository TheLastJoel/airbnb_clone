"use client"

import CreationBottomBar from "@/components/shared/CreationBottomBar";
import { Select, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { SelectLabel } from "@/components/ui/select";
import { useCountries } from "@/app/lib/getCountries";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { createAddressPage } from "@/app/actions";

export default function AddressRoute({params}: {params: {id:string}}) {

    const { getAllCountries } = useCountries();

    const [locationValue, setLocationValue] = useState<string>("")

    const LazyMap = dynamic(() => import("@/components/shared/Map"), 
        {
            ssr: false,
            loading: () => <Skeleton className="h-[50vh] w-full"/>
        }, 
    );

    return (
    <>
    <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">Where is your Home?</h2>
    </div>
    <form action={createAddressPage}>
        <div className="w-3/5 mx-auto mb-36">
            <input type="hidden" name="homeId" value={params.id}/>
            <input type="hidden" name="country" value={locationValue}/>
            <div className="mb-5">
                <Select required onValueChange={
                    (value) => setLocationValue(value)}>
                    <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select a Country"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Countries</SelectLabel>
                            {getAllCountries().map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                    {country.flag} {country.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <LazyMap locationValue={locationValue}/>
        </div>


        <CreationBottomBar/>
    </form>
    </>
    )
}
