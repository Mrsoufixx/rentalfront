import { GiCarKey, GiCityCar } from "react-icons/gi";
import {RiCustomerService2Line} from "react-icons/ri"
import SelectCar from "../../assets/plan/blob1.svg";
import Contact from "../../assets/plan/blob2.svg";
import Drive from "../../assets/plan/blob3.svg";
import "../styles/plan.css"

function PlanTrip() {
  return (
    <>
      <section className="plan-section flex justify-center ">
        <div className="container my-20">
          <div className="plan-container ">
            <div className="plan-container__title ">
              <h3 className="text-3xl mb-10 font-medium">Planifiez votre voyage dès maintenant</h3>
              <h2 className="text-6xl font-bold">Location de voiture simple et rapide</h2>
            </div>

            <div className="plan-container__boxes ">
              <div className="plan-container__boxes__box flex flex-col items-center ">
                <div className="relative">
                <img className="fill-white" src={SelectCar} alt="icon_img" />
                <GiCarKey size={60} className="absolute top-28 right-24 fill-[#222831]"/>
                </div>
                <h3 className="text-3xl mb-6 font-bold">Choisir Votre Vehicules</h3>
                <p className="text-xl font-normale leading-9">
                  Nous offrons une large gamme de véhicules pour tous vos besoins de conduite.
                  Nous avons la voiture idéale pour répondre à vos besoins
                </p>
              </div>

              <div className="plan-container__boxes__box flex flex-col items-center">
              <div className="relative">
                <img src={Contact} alt="icon_img" />
                <RiCustomerService2Line  size={60} className="absolute top-24 right-24 fill-[#222831]"/>
                </div>
                <h3 className="text-3xl mb-6 font-bold">Contacter l'opérateurr</h3>
                <p className="text-xl font-normale leading-9">
                Nos opérateurs compétents et amicaux sont toujours prêts à
                  à répondre à vos questions ou à vos préoccupations.
                </p>
              </div>

              <div className="plan-container__boxes__box flex flex-col items-center">
                  <div className="relative">

                <img src={Drive} alt="icon_img" />
                <GiCityCar size={60} className="absolute top-24 right-24 fill-[#222831]"/>
                  </div>
                <h3 className="text-3xl mb-6 font-bold">Conduisons</h3>
                <p className="text-xl font-normale leading-9">
                Que vous preniez la route ou non, nous avons ce qu'il vous faut
                  avec notre large gamme de voitures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;