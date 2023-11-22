const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center mb-6 mx-auto md:w-3/12">
            <p className="text-yellow-500 italic mb-2">--- {subHeading} ---</p>
            <h2 className="text-2xl uppercase font-semibold border-y-[3px] py-4">{heading}</h2>
        </div>
    );
};

export default SectionTitle;