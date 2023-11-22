const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className="flex gap-5">
            <img style={{ borderRadius: "0 200px 200px 200px" }} className="w-28 h-24 object-cover" src={image} alt="" />
            <div>
                <h3>{name} ----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;