import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";

type Flavor = 'apricot' | 'strawberry' | 'cherry' | 'cherry jalapeño';
const FLAVOR_STOCK: Record<Flavor, number> = {
    apricot: 6,
    strawberry: 6,
    cherry: 6,
    ['cherry jalapeño']: 6
} as const;
const FLAVOR_OPTIONS = Object.keys(FLAVOR_STOCK) as (Flavor)[];

type PAGE_NAME = 'flavors' | 'quantities' | 'reception' | 'contact' | 'review' | 'confirmation';

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
        <FieldLegend variant="label">
            What flavors would you like to order?
        </FieldLegend>
        <FieldDescription>
            Choose one or more
        </FieldDescription>
        <FieldGroup className="gap-3">
            {FLAVOR_OPTIONS.map((flavor) => {
                return <Field orientation="horizontal" key={`${flavor}-checkbox`}>
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
