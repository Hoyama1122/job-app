import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { FaSave } from "react-icons/fa";

export const action = async ({request})=>{
 const formData = await request.formData();
 const file = formData.get('avatar')

 if(file && file.size > 500000){
  toast.error('Image size too large')
  return null
 }
 try {
  await customFetch.patch('/user/update-user', formData);
  toast.success('Profile updated successfully')
 } catch (error) {
  toast.error(error?.response?.data?.msg)

 }
 return null;
}

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div className="rounded-md w-full bg-[#3F3F3F] p-12 shadow-lg">
        <Form
        encType="multipart/form-data"
          method="post"
          className="m-0 rounded-none shadow-none p-0 max-w-full w-full"
        >
          <h4 className="text-3xl mb-4 font-semibold text-gray-800 dark:text-white tracking-[1px]">
            Profile
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-0">
              <label
                htmlFor="avatar"
                className="block text-md mb-3 capitalize tracking-wide leading-6"
              >
                Select an image file (max 0.5 MB)
              </label>
              <input
              accept="image/*"
                type="file"
                name="avatar"
                id="avatar"
                className="w-full py-1 px-3 rounded bg-grey-50 text-grey-900 border-gray-300 border "
              />
            </div>
            <FormRow type="text" name="name" defaultValue={name} />
            <FormRow
              type="text"
              name="lastName"
              labelText="last name"
              defaultValue={lastName}
            />
            <FormRow type="text" name="email" defaultValue={email} />{" "}
            {/* Corrected 'emal' */}
            <FormRow type="text" name="location" defaultValue={location} />
          </div>
          <button
          type="submit"
          disabled={isSubmitting}
          className="text-white text-lg bg-primary-500 hover:bg-primary-700 flex  items-center justify-center rounded-md py-2 px-4 transition-all duration-300 ease-in-out shadow-md w-40"
        >
          <FaSave className="mr-2" size={20} />
          {isSubmitting ? "Submitting..." : "Add Job"}
        </button>
        </Form>
      </div>
    </>
  );
};

export default Profile;
