import plumJam from '../assets/plumJam.jpg';
import cherryJam from '../assets/cherryJam.png';
import strawberryJam from '../assets/strawberryJam.jpg';
import apricotJam from '../assets/apricotJam.jpg';
import cherryJalapenoJam from '../assets/cherryJalapenoJam.jpg'
import peachJam from '../assets/peachJam.jpg';
import { Flavor } from '@/inventory';

export const flavorPics: Record<Flavor, string> = {
    'apricot': apricotJam,
    'strawberry': strawberryJam,
    'cherry': cherryJam,
    'cherry jalapeño': cherryJalapenoJam,
    'peach': peachJam
};

export type PAGE_NAME = 'flavors' | 'quantities' | 'reception' | 'contact' | 'review' | 'confirmation';
export type ReceptionMethod = 'pickup' | 'shipping' | 'delivery' | '';
