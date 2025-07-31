import { getFoodById } from "@/services/foodService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import z from "zod";

const formSchema = z.object({
  name: z.string("Please fill in your name"),
  phone: z
    .string("Please fill in your phone number")
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),
  address: z.string("Please fill in your address"),
});

const AdminProductEditPage = () => {
  const { productId } = useParams();

  const { data } = useQuery({
    queryKey: ["admin", "foods", productId],
    queryFn: () => {
      if (!productId) throw new Error("Product ID is required");
      return getFoodById(productId);
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-800 mb-8">Edit Product</h1>

      <div className="grid grid-cols-3">
        <img src={data?.image} alt="" className="rounded-2xl"/>

      </div>
    </div>
  );
};

export default AdminProductEditPage;
