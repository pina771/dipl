"use client";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Modal from "./modals/Modal";

type FormData = {
  name: string;
  desc: string;
  dateFrom: Date;
  dateUntil: Date;
};
function AddTripForm() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log("data", data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <input {...register("desc")} />
        <Controller
          control={control}
          name="dateFrom"
          render={({ field }) => (
            <DatePicker
              placeholderText="Date From"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="dateUntil"
          render={({ field }) => (
            <DatePicker
              placeholderText="Date Until"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
      </form>
    </div>
  );
}
export default AddTripForm;
