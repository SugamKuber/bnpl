import Link from "next/link"

const Footer = () => {
  return (

    <div className="bg-[#0F0F0F]">
      <div className="bg-[#0F0F0F] text-white md:flex md:justify-evenly">
        <div className="img flex space-x-3 p-4 md:my-auto">
          <img
            src="/FinalLogo.jpg"
            alt="Logo"
            className="w-9 rounded-full ml-2 md:w-12 md:h-12  "
          />
          <h1 className="font-semibold tracking-widest text-3xl">solpay</h1>
        </div>
        <div className="flex flex-col text-center">
          <Link legacyBehavior href="/" smooth={true} offset={50} duration={500} className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Home
          </Link>
          <Link legacyBehavior href="#!" smooth={true} offset={50} duration={500} className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Documentation
          </Link>
          <Link legacyBehavior href="/checkout" smooth={true} offset={50} duration={500} className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Checkout
          </Link>
          <Link legacyBehavior href="/repayment" smooth={true} offset={50} duration={500} className="transition duration-300 cursor-pointer px-3 py-2 text-md scroll-smooth tracking-widest text-xl">
            Repayment
          </Link>
        </div>
        <div className="social md:my-auto">

          {/* <Link
            legacyBehavior
            href="https://www.instagram.com/vill_arrica/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row"
          >
            <button className=" mx-auto m-2 flex justify-center cursor-pointer hover:scale-x-110 duration-300 border-solid rounded-lg border-4 border-[#E1425E] text-base font-medium  px-3 py-2  md:text-2xl transition hover:border-amber-400">
              Instagram
              <img
                src="insta.png"
                alt="instagram-logo"

                className="h-6 mx-2  mt-1"
              />
            </button>

          </Link> */}
        </div>
      </div>

    </div >

  )
}

export default Footer
