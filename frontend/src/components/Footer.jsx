import { assets } from "../assets/assets_frontend/assets"

const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            
            {/* left */}
            <div className="">
                <img className="mb-5 w-44 cursor-pointer" src={assets.logo} alt="" />
                <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

            </div>

            {/* middle */}
            <div>
                <p className="font-medium text-xl mb-5">Company</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>

            {/* right */}
            <div>
                <p className="font-medium text-xl mb-5">Get in touch</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>9322781210</li>
{/*                     <li>omkarworkspace29@gmail.com</li> */}
                </ul>
            </div>

        </div>
        {/* copyright */}

        <div>
                <hr />
                <p className=" py-5 text-center">© 2025 Doctor. All rights reserved.</p>
            </div>
        </div>
    )
}  
export default Footer 
