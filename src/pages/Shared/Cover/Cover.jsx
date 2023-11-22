import { Parallax } from 'react-parallax';

const Cover = ({ img, title, description }) => {
    return (

        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="h-[60vh] bg-black bg-opacity-40 flex items-center justify-center">
                <div className=" text-white bg-black bg-opacity-60 mt-10 py-12 px-36">
                    <h1 className="mb-4 text-5xl text-center font-bold uppercase">{title}</h1>
                    <p className="uppercase">{description}</p>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;