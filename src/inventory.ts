export type Flavor = 'apricot' |
    'cherry' |
    'cherry jalapeño' |
    'strawberry' |
    'peach';

export type Inventory = {
    name: Flavor,
    available_count: number
}[]
