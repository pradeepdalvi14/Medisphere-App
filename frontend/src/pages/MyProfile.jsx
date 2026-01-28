import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets_frontend/assets'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {


  const {userData, setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false); // Changed initial state to false (view mode)
  const[image,setImage] = useState(false)

  const updateUserProfileData = async () => {
      try {
        const formData = new FormData();
        formData.append('name',userData.name);
        formData.append('phone',userData.phone);
        formData.append('address',JSON.stringify(userData.address));
        formData.append('gender',userData.gender);
        formData.append('dob',userData.dob);
        
        image && formData.append('image',image)

        const {data} = await axios.post(`${backendUrl}/api/user/update-profile`,formData,{headers:{token}});
        if(data.success){
          toast.success(data.message);
          await loadUserProfileData();
          setIsEdit(false);
          setImage(false);
        }else{
          toast.error(data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
  }

  return userData &&  (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg my-8">

      {
        isEdit ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75"  src={image ? URL.createObjectURL(image):userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? '':assets.upload_icon} alt="" />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
          </div>
        </label>:
        <img
        src={userData.image}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-gray-300"
      />
      }
      

      <div className="text-center mb-4">
        {isEdit ? (
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full text-lg font-semibold text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
        )}
      </div>

      <hr className="border-t border-gray-200 my-4" />

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm uppercase font-bold text-gray-600 mb-2">
            Contact Information
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Email ID:</span> {userData.email}
            </p>
            <div>
              <p className="font-medium text-gray-700">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-700">{userData.phone}</p>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-700">Address:</p>
              {isEdit ? (
                <div className="flex flex-col gap-2">
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address.line1}
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Address Line 1"
                  />
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address.line2}
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Address Line 2"
                  />
                </div>
              ) : (
                <p className="text-gray-700">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase font-bold text-gray-600 mb-2">
            Basic Information
          </p>
          <div className="space-y-2">
            <div>
              <p className="font-medium text-gray-700">Gender:</p>
              {isEdit ? (
                <select
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  value={userData.gender}
                  className="border border-gray-300 rounded-md p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option> {/* Added 'Other' option */}
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-700">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob} // Use value for controlled component
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-blue-500 hover:bg-primary text-white font-bold py-2 px-4 rounded-md w-full transition duration-300 ease-in-out"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md w-full transition duration-300 ease-in-out"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;