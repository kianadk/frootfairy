function About() {

    return <div className="flex flex-col gap-4 w-3/4 lg:w-1/2">
        <div>
            Froot Fairy is a project exploring Persian traditions of cuisine and hospitality.
        </div>
        <div className="flex flex-col gap-2">
            <p id='pricing' className='text-2xl'>Pricing</p>
            <div>
                Froot Fairy goods are priced on a sliding scale. I suggest a price range for each item based on the price of materials and my labor, and you <b>choose what you pay within the suggested range</b>.
            </div>
            <div>
                The purpose of this pricing model is to challenge the conventional, capitalist system for transacting as a business. My goal is not to extract profit from my customers. Rather, I want to share the creations that I&#39;m proud of with as many people as possible. It is a priority for me to keep Froot Fairy accessible while earning a living.
            </div>
            <div>
                If you need price accommodation outside of the suggested range, please contact me!
            </div>
            <div>
                Some (dope) businesses that have inspired my to price my goods this way:
            </div>
            <ul className="list-disc list-inside underline">
                <li><a href="https://www.yogashalawest.com/">Yoga Shala West</a></li>
                <li><a href="https://www.potstudiola.com/">POT</a></li>
                <li><a href="https://rep.club/">Reparations Club</a></li>
                <li><a href="https://www.instagram.com/queeroillb/">Queer Oil LB</a></li>
            </ul> 
        </div>
    </div>
}

export default About;
