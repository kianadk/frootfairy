export type Flavor = 'apricot' |
    'cherry' |
    'cherry jalapeño' |
    'strawberry' |
    'peach' |
    'peach jalapeño' |
    'plum';

export type Inventory = {
    name: Flavor,
    available_count: number
}[]
