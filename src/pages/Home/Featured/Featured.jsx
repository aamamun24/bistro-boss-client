import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <section className="my-16 bg-fixed featured-item  text-white">
            <div className="bg-black bg-opacity-50 py-14">
                <SectionTitle subHeading="Check it out" heading="Featured Item"></SectionTitle>
                <div className="flex flex-col md:flex-row gap-6 py-10 px-32 items-center justify-center">
                    <div className="flex-1">
                        <img src={featuredImg} alt="" />
                    </div>
                    <div className="flex-1">
                        <p>Nov 12, 2023</p>
                        <h2 className="uppercase">Where can I get some?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quis quae, pariatur atque aut harum recusandae possimus quia neque, minima impedit quam in nihil at quas? Ullam aperiam sapiente quam odit quibusdam sit, nemo corrupti, ipsum alias voluptates ratione, incidunt tempora libero reiciendis placeat architecto beatae quisquam consequuntur. Tempore, sit.</p>
                        <button className="btn btn-outline border-0 border-b-4 mt-4">Read More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;