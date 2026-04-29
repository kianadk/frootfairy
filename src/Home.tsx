import strawbs from './assets/strawbs.jpg';
import { Link } from 'react-router-dom';
import peachJam from './assets/peachJam.jpg';
import lemons from './assets/lemons.jpg';
import linzerCookies from './assets/linzerCookies.jpg';
import quince from './assets/quince.jpg';
import plumJam from './assets/plumJam.jpg';
import orangeJamToast from './assets/orangeJamToast.jpg';
import plums from './assets/plums.jpg';

function Home () {
    return <div className='flex flex-col gap-6 items-center'>
        <div className='px-6 flex flex-col gap-2 text-center'>
                <p className='text-2xl'>Seasonal jams by Kiana Joon</p>
                <p className='text-sm'>Fruit preserves made as a meditation on Persian culinary tradition, the cultural melting pot of Los Angeles, and the seasons of Tovaangar</p>
        </div>
        <Link
                to='https://docs.google.com/forms/d/e/1FAIpQLSc1UxkOCuoO4MHePwFzuCwhVdT1V5Szq5xPR1Xr6-swkGyAuA/viewform'
                className='text-2xl mx-6 p-2 w-3/4 border-2 border-foreground rounded-lg shadow-md/20 shadow-foreground text-center'
            >
                Order jams
            </Link>
       
            <img
                src={strawbs}
                alt='strawberries'
                className='w-full h-40 max-w-md object-cover scale-110 my-4 rounded-lg' 
            />
        
         <div className='px-6 relative flex flex-row gap-4'>
            <div
                className='text-lg text-bold text-center'
            >
                Currently available flavors (May 2026)
                <ul className='text-lg my-4'>
                    <li>✨new✨ strawberry</li>
                    <li>apricot</li>
                    <li>strawberry prosecco</li>
                    <li>valencia orange</li>
                </ul>
            </div>
        </div>
        <div className='grid grid-cols-2 gap-2 mx-6 mb-10 md:mb-16 max-w-xl'>
            <img alt='Plum jam' src={plumJam} className='object-cover rounded-lg row-span-2'/>
            <img alt='Sliced quince' src={quince} className=' object-cover object-top-right rounded-l row-span-2'/>
            <img alt='Orange jam on toast' src={orangeJamToast} className='object-cover rounded-lg row-span-2' />
            <img alt='Peach jam' src={peachJam} className='object-cover object-top-right rounded-lg row-span-1 '/>
            <img alt='Plums' src={plums} className='object-cover object-top-right rounded-lg row-span-2 '/>
            <img alt='Linzer cookies' src={linzerCookies} className=' object-cover object-top-right rounded-lg row-span-1'/>
        </div>
    </div>
};

export default Home;