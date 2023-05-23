
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import bannermotos1 from "../../assets/bannermotos1.webp"
import banner2 from "../../assets/banner2.png"
import banner3 from "../../assets/banner3.png"
import banner4 from "../../assets/banner4.png"

    
    

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // adaptiveHeight:true,
    autoplay:true,
    cssEase: "linear"
  };
  return (
      <section className="banner my-60 p-0" id="banner">
      <div>
        
        <Slider {...settings}>
          <div>
            <div className='relative'>
              <div className='flex flex-col items-center justify-center'>
              <h2 className='text-center text-5xl font-semibold text-lgray'>Économisez beaucoup grâce à notre service  <br/>de location de vehicules</h2>
              <h6 className='text-center mt-4 text-lg'>Louez la voiture de vos rêves. Prix imbattables, kilométrage illimité,<br/> options de prise en charge flexibles et bien plus encore.</h6>
              </div>

              <div className='flex justify-center'>
                <img src={banner3} alt="" />
              </div>
              <div className='flex gap-4 justify-center my-8'>
                <button className='px-6 py-2 rounded shadow bg-slate-50 text-xl'>Voir detail</button>
                <button className='px-6 py-2 rounded shadow bg-[#393E46] text-xl'>Louée Maintenant</button>
              </div>
              </div>
          </div>
          <div>
            <div className='relative'>
              <div className='absolute  right-0 top-32 flex flex-col items-center justify-center mr-[10%]'>
              <h2 className='text-end  text-5xl font-semibold text-lgray'>Nouveaux Vehicules est <br/>à votre disposition</h2>
              <h6 className='text-center mt-4 text-lg'> </h6>
              </div>

              <div className='ml-32'>
                <img src={banner4} alt="" />
              </div>
              <div className='absolute  right-0 top-60 flex gap-4 justify-center my-8 mr-[10%]'>
                <button className='px-6 py-2 rounded shadow bg-slate-50 text-xl'>Voir detail</button>
                <button className='px-6 py-2 rounded shadow bg-[#393E46] text-xl'>Louée Maintenant</button>
              </div>
              </div>
          </div>
          <div>
            <div className='relative'>
              <div className='flex flex-col items-center justify-center'>
              <h2 className='text-center text-5xl font-semibold text-lgray'>Bienvenue sur ton Agence de location <br/>de vehicules</h2>
              <h6 className='text-center mt-4 text-lg'>Choisir votre vehicule preferé </h6>
              </div>

              <div className='flex justify-center'>
                <img src={bannermotos1} alt="" />
              </div>
              <div className='flex gap-4 justify-center my-8'>
                <button className='px-6 py-2 rounded shadow bg-slate-50 text-xl'>Voir detail</button>
                <button className='px-6 py-2 rounded shadow bg-[#393E46] text-xl'>Louée Maintenant</button>
              </div>
              </div>
          </div>
         
          
        </Slider>
      </div>
    </section>
  )
}

export default Banner