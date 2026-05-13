import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { useState } from "react";
import { Button } from "./components/ui/button";
import { SelectContent, Select, SelectTrigger, SelectItem, SelectValue, SelectGroup } from "./components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import * as _ from "lodash";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

type Flavor = 'apricot' | 'strawberry';
const FLAVOR_STOCK: Record<Flavor, number> = {
    apricot: 3,
    strawberry: 14
} as const;
const FLAVOR_OPTIONS = Object.keys(FLAVOR_STOCK) as (Flavor)[];
type PAGE_NAMES = 'flavors' | 'quantities' | 'reception' | 'contact' | 'review';

function Order() {
    const [currentPage, setCurrentPage] = useState<PAGE_NAMES>('flavors')
    const [selectedFlavors, setSelectedFlavors] = useState<Record<Flavor, number>>(FLAVOR_OPTIONS.reduce((acc, option) => {
        return {
            ...acc,
            [option]: 0
        }
    }, {} as Record<Flavor, number>));
    const [receptionMethod, setReceptionMethod] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [preferredCommunication, setPreferredCommunication] = useState('');

    const numFlavors = FLAVOR_OPTIONS.reduce((acc, flavor) => {
        return acc + selectedFlavors[flavor]
    }, 0)
    const isContactFormComplete = !!name && !!phone && !!email && !!address && !!preferredCommunication;

    const prices = Object.entries(selectedFlavors)
        .filter(([_, quantity]) => !!quantity)
        .map(([flavor, quantity]) => {
            return [quantity * 9, quantity * 19];
         });
    const lowerJamCost = prices.reduce((acc: number, [lower, upper]) => { return acc + lower; }, 0);
    const upperJamCost = prices.reduce((acc: number, [lower, upper]) => { return acc + upper; }, 0)
    const receptionCost = receptionMethod === 'shipping' ? 10 : receptionMethod === 'delivery' ? 5 : 0;

    return <> 
        {currentPage === 'flavors' && <FieldSet>
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
        </FieldSet>}

        {currentPage === 'quantities' && <FieldSet>
            <FieldLegend variant="label">
                How many jars would you like?
            </FieldLegend>
            <FieldDescription>
                Each jar is 8oz and costs $9-19 sliding scale.
            </FieldDescription>
            <FieldGroup className="gap-6">
                {FLAVOR_OPTIONS.map((flavor) =>
                    selectedFlavors[flavor] ? <Field orientation="vertical" key={`${flavor}-select`}>
                        <FieldLabel
                            htmlFor={`${flavor}-checkbox`}
                        >
                            {flavor}
                        </FieldLabel>
                        <Select
                            name={`${flavor}-select`}
                            onValueChange={(newValue) => {
                                const newSelection = {
                                    ...selectedFlavors,
                                    [flavor]: newValue
                                }
                                setSelectedFlavors(newSelection);
                            }}
                            value={selectedFlavors[flavor].toString()}
                        >
                            <SelectContent className="">
                                <SelectGroup>
                                    {_.range(1, FLAVOR_STOCK[flavor] + 1).map((val) => 
                                    <SelectItem key={`select-${flavor}-${val}`} value={val.toString()}>
                                        {val}
                                    </SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                            <SelectTrigger className=""><SelectValue placeholder="Select a quantity"/></SelectTrigger>
                        </Select>
                    </Field> : null
                )}
            </FieldGroup>
            <div className="flex flex-row gap-2">
                <Button
                    className="grow-1"
                    onClick={() => setCurrentPage('flavors')}>Back</Button>
                <Button
                    className="grow-1"
                    onClick={() => setCurrentPage('reception')}>Next</Button>
            </div>   
        </FieldSet>}

        {
            currentPage === 'reception' && <FieldSet>
                <FieldLegend variant="label">
                    How would you like to receive your order?
                </FieldLegend>
                <RadioGroup className="gap-3" value={receptionMethod} onValueChange={setReceptionMethod}>
                    <div className="flex flex-row gap-3">
                        <RadioGroupItem value="pickup"/>
                        <FieldContent>
                            <Label>Pickup from Froot Fairy HQ in Palms</Label>
                            <FieldDescription>Always free :)</FieldDescription>
                        </FieldContent>
                        
                    </div>
                    <div className="flex flex-row gap-3">
                        <RadioGroupItem value="shipping"/>
                        <FieldContent>
                            <Label>Shipping (within CA)</Label>
                            <FieldDescription>+$10</FieldDescription>
                        </FieldContent>
                        
                    </div>
                    <div className="flex flex-row gap-3">
                        <RadioGroupItem value="delivery"/>
                        <FieldContent>
                            <Label>Local delivery</Label>
                            <FieldDescription>+$5</FieldDescription>
                        </FieldContent>
                        
                    </div>
                </RadioGroup>
                <div className="flex flex-row gap-2">
                    <Button onClick={() => setCurrentPage('quantities')}
                        className="grow-1"
                    >
                        Back</Button>
                    <Button
                        className="grow-1"
                        disabled={!receptionMethod} onClick={() => setCurrentPage('contact')}
                    >
                        Next
                    </Button>
                </div>  
            </FieldSet>
        }

        {
            currentPage === 'contact' && <FieldSet>
                 <Field>
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => {setName(e.target.value)}}/>
                 </Field>
                 <Field>
                    <Label>Phone number</Label>
                    <Input value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                 </Field>
                 <Field>
                    <Label>Email</Label>
                    <Input value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                 </Field>
                 <Field>
                    <Label>Address</Label>
                    <Textarea value={address} onChange={(e) => {setAddress(e.target.value)}}/>
                 </Field>
                 <FieldSet>
                    <FieldLegend variant="label">
                        What is your preferred contact method?
                    </FieldLegend>
                    <RadioGroup className="gap-3" value={preferredCommunication} onValueChange={setPreferredCommunication} required>
                        <div className="flex flex-row gap-3">
                            <RadioGroupItem value="email"/>
                            <Label>Email</Label>
                        </div>
                        <div className="flex flex-row gap-3">
                            <RadioGroupItem value="phone"/>
                            <Label>Phone</Label>
                        </div>
                    </RadioGroup>
                 </FieldSet>
                 <div className="flex flex-row gap-2">
                    <Button onClick={() => setCurrentPage('reception')}
                        className="grow-1"
                    >
                        Back</Button>
                    <Button disabled={!isContactFormComplete} onClick={() => setCurrentPage('review')}
                        className="grow-1"
                    >
                        Next
                    </Button>
                </div> 
            </FieldSet>
        }

        {
            currentPage === 'review' && <div className="flex flex-col gap-4">
            <div className="text-xl">Review your order</div>
            <div className="flex gap-16">
                <ul>
                    {Object.entries(selectedFlavors).filter(([_, quantity]) => !!quantity).map(([flavor, quantity]) => {
                        return <li>{`${quantity} ${flavor}`}</li>
                    })}
                </ul>
                <ul>
                    {prices.map(([lower, higher]) => {
                        return <li>{`$${lower}-${higher}`}</li>
                    })}
                </ul>
            </div>
            <div className="flex gap-16 justify-between">
                {receptionMethod}
                <div>
                    {receptionMethod === 'delivery' && '$5'}
                    {receptionMethod === 'shipping' && '$10'}
                    {receptionMethod === 'pickup' && '$0'}
                </div>
            </div>
            <hr />
            <div className="flex gap-16 justify-between">
                <div>Total</div>
                <div>
                    {`$${lowerJamCost + receptionCost}-${upperJamCost + receptionCost}`}
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <Button onClick={() => setCurrentPage('contact')} className="grow-1">Back</Button>
                <Button onClick={() => {}} className="grow-1">Place order</Button>
            </div>
            
            </div>
        }
    </>
}

export default Order;