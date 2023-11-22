import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, img, title }) => {
    return (
        <div className="my-16">
            {title && <Cover img={img} title={title} description="Would you like to try a dish?"></Cover>}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link className="flex justify-center mt-4" to={`/order/${title}`}>
                <button className="btn btn-outline border-0 border-b-4">Order Your Favorite Food</button>
            </Link>
        </div>
    );
};

export default MenuCategory;