import React from 'react'
import landingImage from '@/assets/images/landing-image-1.png'

interface SectionHeadingProps {
    children: React.ReactNode;
    className?: string;
}

const plans = [
    {
        title: "3 Month Plan",
        price: "1800/-",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing labore magni ullam",
        features: [
            "Lorem ipsum dolor.",
            "Lorem  dolor sit amet .",
            "Lorem ipsum  consectetur."
        ]
    },
    {
        title: "6 Month Plan",
        price: "3200/-",
        isPopular: true,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing labore magni ullam",
        features: [
            "Lorem ipsum dolor.",
            "Lorem  dolor sit amet .",
            "Lorem ipsum  consectetur."
        ]
    },
    {
        title: "12 Month Plan",
        price: "6000/-",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing labore magni ullam",
        features: [
            "Lorem ipsum dolor.",
            "Lorem  dolor sit amet .",
            "Lorem ipsum  consectetur."
        ]
    },
    {
        title: "1 Month Plan",
        price: "700/-",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing labore magni ullam",
        features: [
            "Lorem ipsum dolor.",
            "Lorem  dolor sit amet .",
            "Lorem ipsum  consectetur."
        ]
    }
]

export const SectionHeading = ({children, className}: SectionHeadingProps) => {
 return   <h2 className={`text-center z-10 relative text-gray-600 uppercase text-shadow-sm text-3xl mb-10 font-medium ${className ? className : ''}`}>{children}</h2>
} 

const PlanCard = ({plan})=>{
    return(
        <div className={`relative group py-7 px-5 rounded-lg ${plan.isPopular ? 'text-gray-700' :'text-white'}  backdrop-blur-lg border-1 border-slate-200 shadow-lg hover:bg-white ${plan.isPopular ? 'bg-white' :'bg-white/20'} hover:text-gray-700 hover:shadow-xl transition-all duration-300 ease-in-out `}>
            {plan.isPopular && <span className={`absolute top-[-16px] right-3 rounded-4xl text-[14px] text-white bg-orange-500 py-1 px-3`} >&#9733; Popular</span>}
            <h2 className='mb-1 text-lg'>{plan.title}</h2>
            <p className={`p-3 mb-3 group-hover:text-white group-hover:bg-orange-400 ${plan.isPopular ? "bg-orange-400 text-white" : "bg-indigo-500 "}  w-fit py-1 rounded-2xl text-[12px] transition-all text-white duration-300 ease-in-out`}>Membership</p>
            <p className='text-3xl font-bold'>{plan.price}</p>
            <p className='mt-3'>{plan.description}</p>
            <hr  className='my-5'/>
            <ul className="list-disc pl-5">
                {plan.features.map((feature, index) => (
                    <li className='text-sm mb-2' key={`plan-feature-${index}`}>
                        {feature}
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

const Plans = () => {
  return (
    <section style={{ backgroundImage: `url(${landingImage.src})` }} className='max-w-[1140px] mx-auto my-[7rem] bg-indigo-200 backdrop-blur-lg py-[3.5rem] px-9 rounded-lg'>
        <SectionHeading className='text-white'>Our Gym Plans</SectionHeading>

    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-9 md:gap-4 mx-auto'>
        {plans.map((plan, index) => (<PlanCard plan={plan} key={`plan-cards-${index}`} />))}
        
    </div>
    </section>
  )
}

export default Plans