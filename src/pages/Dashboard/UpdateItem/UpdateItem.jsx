import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const { _id, name, price, recipe, category } = useLoaderData();
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        })
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                recipe: data.recipe,
                price: parseFloat(data.price),
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                // show alert
                toast.success('Item update successfully')
                // reset()
            }
        }
        // console.log('image url', res.data);
    }
    return (
        <div>
            <SectionTitle heading="update Item" subHeading="Want to update?"></SectionTitle>
            <div className="my-10 mx-16 bg-gray-200 p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="label">
                            <span className="label-text">Recipe Name *</span>
                        </label>
                        <input
                            {...register('name', { required: true })}
                            defaultValue={name}
                            type="text"
                            placeholder="Recipe Name"
                            className="input input-bordered w-full" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">

                        <div className="w-full">
                            <label className="label">
                                <span className="label-text">Category *</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Desserts</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="label">
                                <span className="label-text">Price *</span>
                            </label>
                            <input
                                {...register('price', { required: true })}
                                defaultValue={price}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Recipe Details *</span>
                        </label>
                        <textarea
                            {...register('recipe', { required: true })}
                            defaultValue={recipe}
                            placeholder="Recipe Details"
                            className="textarea textarea-bordered w-full" />
                    </div>
                    <div className="mb-4">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full" />
                    </div>

                    <div className="flex justify-center">
                        <button className="btn btn-info">
                            Update Recipe Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;