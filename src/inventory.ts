export type Flavor = 'apricot' |
    'cherry' |
    'cherry jalapeño' |
    'strawberry' |
    'peach' |
    'peach jalapeño';

export type Inventory = {
    name: Flavor,
    available_count: number
}[]
