"use client"

import { categoryItems } from "@/app/lib/categoryItems"
import { Card, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import { iAppProps } from "@/app/lib/categoryItems"

export function SelectCategory(){

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    function isSelected(item: iAppProps) {return (item.name === selectedCategory)}

    return(
        <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto cursor-pointer mb-36">

            <input type="hidden" name="categoryName" value={selectedCategory as string}/>
            {categoryItems.map((item) => (
                <div key={item.id}>
                    <Card 
                        className={ isSelected(item) ? "border-primary" : ""}
                        onClick={() => setSelectedCategory(item.name)}
                    >
                        <CardHeader>
                            <Image 
                                src={item.imageUrl}
                                alt={item.name}
                                height={32}
                                width={32}
                                className="w-8 h-8"
                            />

                            <h3 className=" font-medium">{item.title}</h3>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    )
}