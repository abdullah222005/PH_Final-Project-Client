import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {user} = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const [parcelType, setParcelType] = useState("document");

  const onSubmit = (data) => {
    const finalData = { ...data, parcelType };
    console.log("FORM RESULT: ", finalData);

    const isDocument = finalData.parcelType === 'document';
    const isSameDistrict = finalData.senderDistrict === finalData.receiverDistrict;
    const parcelWeight = parseFloat(finalData.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    finalData.parcelType = parcelType;
    finalData.cost = cost;
    console.log(cost);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you agree with our charge?",
        text: `Your cost is ${cost} TAKA!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I agree!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Confirmed Booking!",
            text: "Now, you will be redirected for transaction..",
            icon: "success",
          });
            //Save the parcel to the database
            axiosSecure.post('/parcels', finalData)
            .then(res=>{
                console.log('after saving the parcel', res.data);                
            })

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled Booking",
            text: "You denied to send your parcel.",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 my-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">Send A Parcel</h1>

      {/* Parcel Type */}
      <div className="mb-6">
        <p className="font-semibold text-lg pb-5">Enter your parcel details</p>

        <div className="flex gap-6 items-center border-t-2 border-gray-300 pt-5">
          <label className="label cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              className="radio radio-success"
              name="parcelType"
              checked={parcelType === "document"}
              onChange={() => setParcelType("document")}
            />
            <span className="label-text">Document</span>
          </label>

          <label className="label cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              className="radio radio-success"
              name="parcelType"
              checked={parcelType === "non-document"}
              onChange={() => setParcelType("non-document")}
            />
            <span className="label-text">Not-Document</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parcel Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Parcel Name</span>
            </label>
            <input
              {...register("parcelName", { required: true })}
              className="input input-bordered w-full"
              placeholder="Parcel Name"
            />
            {errors.parcelName && (
              <p className="text-red-500 text-xs mt-1">Required</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Parcel Weight (KG)</span>
            </label>
            <input
              type="number"
              step="0.1"
              {...register("parcelWeight", { required: true })}
              className="input input-bordered w-full"
              placeholder="Parcel Weight"
            />
            {errors.parcelWeight && (
              <p className="text-red-500 text-xs mt-1">Required</p>
            )}
          </div>
        </div>

        {/* Sender + Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sender Details</h2>

            <div className="space-y-4">
              {/* Sender Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Sender Name</span>
                </label>
                <input
                  {...register("senderName", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Sender Name"
                  defaultValue={user?.displayName} readOnly
                />
                {errors.senderName && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Sender Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Sender Email</span>
                </label>
                <input
                  {...register("senderEmail", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Sender Email"
                  defaultValue={user?.email} readOnly
                />
                {errors.senderEmail && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Sender Phone No
                  </span>
                </label>
                <input
                  {...register("senderPhone", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Phone Number"
                />
                {errors.senderPhone && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Sender Address</span>
                </label>
                <input
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Sender Region</span>
                </label>
                <select
                  {...register("senderRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Sender District
                  </span>
                </label>
                <select
                  {...register("senderDistrict", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your District</option>
                  {districtsByRegion(senderRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Pickup instruction */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Pickup Instruction
                  </span>
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>

            <div className="space-y-4">
              {/* Receiver Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Receiver Name</span>
                </label>
                <input
                  {...register("receiverName", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Name"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Receiver Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Receiver Email</span>
                </label>
                <input
                  {...register("receiverEmail", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Email"
                />
                {errors.senderEmail && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Receiver Contact No
                  </span>
                </label>
                <input
                  {...register("receiverPhone", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Contact No"
                />
                {errors.receiverPhone && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Receiver Address
                  </span>
                </label>
                <input
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Address"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Receiver Region
                  </span>
                </label>
                <select
                  {...register("receiverRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Receiver District
                  </span>
                </label>
                <select
                  {...register("receiverDistrict", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your District</option>
                  {districtsByRegion(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>

              {/* Delivery instruction */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Delivery Instruction
                  </span>
                </label>
                <textarea
                  {...register("deliveryInstruction")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Delivery Instruction"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600">* Pickup Time 4pm–7pm approx.</p>

        <button type="submit" className="btn bg-primary px-8">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
