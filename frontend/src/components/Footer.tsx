import {assets} from  "../assets/assets"
import {motion} from "motion/react"
const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Browse Cars", "List Your Cars", "About Us", "FAQs"]
        },
        {
            title: "Need Help?",
            links: ["Help Center", "Terms of Service", "Privacy Policy", "Contact Us", "Insurance"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];
    return (
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.6}}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-15 text-sm text-gray-600 font-semibold bg-[#dfebfc]">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}}
                className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-borderColor text-gray-500">
                <div>
                    <motion.img initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.6,delay:0.3}} className="w-34 md:w-32" src={assets.logo} />
                    <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.6,delay:0.4}} className="max-w-80 mt-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?</motion.p>
                </div>
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5,delay:0.5}} className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright 2025 © <a href="/">CarRental</a> All Right Reserved.
            </p>
        </motion.div>
    )
}

export default Footer
