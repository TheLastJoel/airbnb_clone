"use client"
 
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter} from "../ui/dialog";
import { useState } from "react";
import { Select, SelectGroup, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from "../ui/select";
import { useCountries } from "@/app/lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "../ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "../ui/card";
import { Counter } from "./Counter";


export default function SearchComponent(){

    const [step, setStep] = useState(1);


    const [locationValue, setLocationValue] = useState<string>("")
    const { getAllCountries } = useCountries();

    function SubmitButtonLocal(){
        if(step === 1){
            return (
            <Button onClick={() =>setStep(step + 1)} type= "button">
                Next
            </Button>
            )
        } else if (step === 2){
            return (
            <CreationSubmit/>
            )
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className=" rounded-full py-2 px-5 border flex items-center cursor-pointer">
                    <div className=" flex h-full divide-x font-medium">
                        <p className="px-4">Anywhere</p>
                        <p className="px-4">Any Week</p>
                        <p className="px-4">Add Guests</p>
                    </div>

                    <Search className=" bg-primary text-white h-8 w-8 rounded-full p-1.5"/>
                </div>
            </DialogTrigger>
            <DialogContent className=" sm:max-w-[425px]">
                <form className="gap-4 flex flex-col">
                    <input type="hidden" name="country" value={locationValue} />
                    { step === 1 ? (
                        <>
                        <DialogHeader>
                            <DialogTitle>Select a Country</DialogTitle>
                            <DialogDescription>Please Choose a Country</DialogDescription>
                        </DialogHeader>
                        <Select required onValueChange={(value) => setLocationValue(value)} value={locationValue}>
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
                        <HomeMap locationValue={locationValue}/>
                        </>
                    ) : ( 
                        <>
                            <DialogHeader>
                                <DialogTitle>Select info</DialogTitle>
                                <DialogDescription>Choose guests, bedrooms and bathrooms</DialogDescription>
                            </DialogHeader>
                            <Card>
                                <CardHeader className=" flex flex-col gap-y-5">
                                    <div className=" flex items-center justify-between">
                                        <div className=" flex flex-col">
                                            <h3 className=" underline font-medium">Guests</h3>
                                            <p className=" text-muted-foreground text-sm">How many guests can stay?</p>
                                        </div>
                                        <Counter name="guests"/>
                                    </div>
                                </CardHeader>
                                <CardHeader className=" flex flex-col gap-y-5">
                                    <div className=" flex items-center justify-between">
                                        <div className=" flex flex-col">
                                            <h3 className=" underline font-medium">Rooms</h3>
                                            <p className=" text-muted-foreground text-sm">How many rooms are there to stay in?</p>
                                        </div>
                                        <Counter name="rooms"/>
                                    </div>
                                </CardHeader>
                                <CardHeader className=" flex flex-col gap-y-5">
                                    <div className=" flex items-center justify-between">
                                        <div className=" flex flex-col">
                                            <h3 className=" underline font-medium">Baths</h3>
                                            <p className=" text-muted-foreground text-sm">How many bathrooms are there?</p>
                                        </div>
                                        <Counter name="bathrooms"/>
                                    </div>
                                </CardHeader>
                            </Card>
                        </>

                    )
                    }
                    <DialogFooter>
                        <SubmitButtonLocal/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}