export type Flavor = 'apricot' |
    'cherry' |
    'cherry jalapeño' |
    'strawberry'

export const FLAVOR_STOCK: Record<Flavor, number> = {
    apricot: 6,
    strawberry: 6,
    cherry: 4,
    ['cherry jalapeño']: 6
} as const;
export const FLAVOR_OPTIONS = Object.keys(FLAVOR_STOCK) as (Flavor)[];