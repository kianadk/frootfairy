import plumJam from '../assets/plumJam.jpg';
import cherryJam from '../assets/cherryJam.png';
import strawberryJam from '../assets/strawberryJam.jpg';
import apricotJam from '../assets/apricotJam.jpg';
import cherryJalapenoJam from '../assets/cherryJalapenoJam.jpg'
import { Flavor } from '@/inventory';

const flavorPics: Record<Flavor, string> = {
    'apricot': apricotJam,
    'strawberry': strawberryJam,
    'cherry': cherryJam,
    'cherry jalapeño': cherryJalapenoJam
};

export default flavorPics;
