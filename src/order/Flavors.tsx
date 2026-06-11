import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { flavorPics, PAGE_NAME } from "./consts";
import { Flavor, FLAVOR_OPTIONS, FLAVOR_STOCK } from "@/inventory";

type FlavorsProps = {
    selectedFlavors: Record<Flavor, number>;
    setSelectedFlavors: (s: Record<Flavor, number>) => void;
    setCurrentPage: (p: PAGE_NAME) => void;
}

function Flavors({
    selectedFlavors,
    setSelectedFlavors,
    setCurrentPage
}: FlavorsProps) {
    const numFlavors = FLAVOR_OPTIONS.reduce((acc, flavor) => {
        return acc + selectedFlavors[flavor]
    }, 0)

    return <FieldSet>
        <FieldLegend variant="legend">
            What flavors would you like to order?
        </FieldLegend>
        <FieldDescription>
            Choose one or more
        </FieldDescription>
        <FieldGroup className="gap-3 w-full flex-wrap flex-row justify-between">
            {(Object.entries(FLAVOR_STOCK) as [Flavor, Number][]).filter(([_, quantity]) => {
                return !!quantity
            }).map(([flavor]) => {
                return <Field className="w-[47%] md:w-[30%]" orientation="vertical" key={`${flavor}-checkbox`}>
                    <div>
                        <img
                            alt={`${flavor} jam`}
                            src={flavorPics[flavor]}
                            className='object-cover rounded-lg'
                        />
                        <div className="flex flex-row gap-2 items-center my-1 cursor-pointer">
                           <Checkbox
                                id={`${flavor}-checkbox`}
                                name={`${flavor}-checkbox`}
                                checked={!!selectedFlavors[flavor]}
                                onCheckedChange={(checked) => {
                                    const newSelection = {
                                        ...selectedFlavors,
                                        [flavor]: checked ? 1 : 0
                                    }
                                    setSelectedFlavors(newSelection);
                                }}
                            />
                            <FieldLabel
                                htmlFor={`${flavor}-checkbox`}
                                className="font-normal"
                            >
                                {flavor}
                            </FieldLabel> 
                        </div>  
                    </div>
            </Field>
            })}
        </FieldGroup>
        <Button
            disabled={!numFlavors}
            onClick={() => setCurrentPage('quantities')}
        >
            Next
        </Button>
        </FieldSet>
}

export default Flavors;
