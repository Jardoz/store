"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/ui/button";
import useCart from "@/hooks/useCart";


const formSchema = object({
  name: string().required("This field is required").min(3, "Name shoud be at least 3 letters length"),
  phone: string()
    .required("Phone number is required")
    .min(10, "Number should consist of min 10 digits"),
  messenger: string(),
  message: string(),
});

type OrderTypeValues = InferType<typeof formSchema>;

const CheckoutPage = () => {
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const form = useForm({
      resolver: yupResolver(formSchema),
      defaultValues: {
            message: "",
            messenger: ""
          },
    });
    const router = useRouter()
    const [isMounted, setIsmounted] = useState(false);

    useEffect(() => {
      setIsmounted(true);
    }, []);


    if (!isMounted) {
      return null;
    }

    const onSubmit = async (data: OrderTypeValues) => {
        console.log('form data: ', data);
        const { name, message, messenger, phone } = data

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
          {
            productIds: items.map((item) => item.id),
            name,
            phone,
            messenger,
            message,
          }
        );

        if (response.data.url === "cart?success=1") {
          toast.success("Payment completed.");
          removeAll();
          router.refresh();
          router.push("/");
        }

        if (response.data.url === "cart?cancelled=1") {
          toast.error("Something went wrong.");
        }
        
    };

  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-2 py-8 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold leadi lg:text-4xl">
            We're looking forward!
          </h2>
          <div className="dark:text-gray-400">
            Send us your phone number or messenger and we will contact you to
            proceed with your order to deliver it in a fastest way!
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dfunrkyrn/image/upload/v1690015792/cow_l8rmao.jpg"
          alt=""
          className="object-cover object-center"
        />
      </div>
      <form
        {...form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="text-sm">
            Full name
          </label>
          <input
            id="name"
            type="text"
            placeholder=""
            {...form.register("name")}
            required
            className="w-full p-3 rounded dark:bg-gray-800 border"
          />
          <p className="text-red-400">{form.formState.errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="phone" className="text-sm">
            Phone number
          </label>
          <input
            id="phone"
            type="phone"
            required
            {...form.register("phone")}
            className="w-full p-3 rounded dark:bg-gray-800 border"
          />
          <p className="text-red-400">{form.formState.errors.phone?.message}</p>
        </div>
        <div>
          <label htmlFor="messenger" className="text-sm">
            Messenger nikname
          </label>
          <input
            id="messenger"
            type="text"
            {...form.register("messenger")}
            className="w-full p-3 rounded dark:bg-gray-800 border"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm">
            Message(optional)
          </label>
          <textarea
            id="message"
            {...form.register("message")}
            rows={3}
            className="w-full p-3 rounded dark:bg-gray-800 border"
          ></textarea>
        </div>
        <Button type="submit" className="w-full mt-6">
          Send the Order
        </Button>
      </form>
    </div>
  );
}

export default CheckoutPage

