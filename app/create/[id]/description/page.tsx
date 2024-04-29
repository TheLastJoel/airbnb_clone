import { Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/components/shared/Counter";
import CreationBottomBar from "@/components/shared/CreationBottomBar";
import { createDescriptionPage } from "@/app/actions";

export default function DescriptionPage({params}: {params: {id:string}}) {
  return (
    <>
    <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">Please describe your Home</h2>
    </div>

    <form action={createDescriptionPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className=" mx-auto w-3/5 flex flex-col gap-y-5 mb-36">
            <div className=" flex flex-col gap-y-2">
                <Label>Title</Label>
                <Input name="title" placeholder="short and simple" required></Input>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Description</Label>
                <Textarea name="description" placeholder="Please describe your home..." required></Textarea>
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Price</Label>
                <Input name="price" required type="number" placeholder="Price per night in USD" min={10}></Input>
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Image</Label>
                <Input name="image" required type="file"></Input>
            </div>

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


        </div>

        <CreationBottomBar/>
    </form>
    </>
  )
}
