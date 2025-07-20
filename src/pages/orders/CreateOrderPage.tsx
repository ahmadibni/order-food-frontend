import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCartStore from "@/store/useCartStore";
import { MdShoppingCart } from "react-icons/md";

const formSchema = z.object({
  name: z.string("Please fill in your name"),
  phone: z
    .string("Please fill in your phone number")
    .min(10, "Phone number must be at least 10 characters"),
  address: z.string("Please fill in your address"),
});

const CreateOrderPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const tax = useCartStore((state) => state.tax);

  const taxAmount = totalPrice * tax;
  const grandTotal = totalPrice + taxAmount;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const orderData = {
      ...values,
      items: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
      })),
    };
    console.log(orderData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:mt-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl">
      {/* Order Summary */}
      <div>
        <h1 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h1>
        <div className="bg-gray-50 rounded-xl">
          <ul className="space-y-2 text-sm">
            {cartItems.length !== 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.foodId}
                  className="flex items-center space-x-3 p-3 rounded-lg  transition-colors"
                >
                  <div className="row-span-2 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex-col justify-between">
                    <div className="mb-4">
                      <p className="font-medium md:text-sm lg:text-base text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        Rp. {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-center md:text-sm lg:text-base font-medium">
                        Qty: {item.quantity}
                      </p>
                      <h3 className="text-xs md:text-base font-semibold text-red-500">
                        Rp. {item.subtotal.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 text-sm gap-2 py-12 flex-grow">
                <MdShoppingCart className="w-10 h-10" />
                <p>Keranjang masih kosong</p>
              </div>
            )}
          </ul>

          {cartItems.length > 0 && (
            <div className="p-4">
              <div className="border-y border-gray-300 py-4">
                <div className="flex justify-between">
                  <p className="text-base font-normal text-gray-700">
                    Subtotal
                  </p>
                  <span className="text-base font-normal text-red-500">
                    Rp.{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-base font-normal text-gray-700">
                    Delivery fee
                  </p>
                  <span className="text-base font-normal text-red-500">
                    Free
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-base font-normal text-gray-700">
                    Tax <span>({(tax * 100).toFixed(0)}%)</span>
                  </p>
                  <span className="text-base font-normal text-red-500">
                    Rp. {taxAmount.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="text-lg font-semibold text-gray-700">Total</p>
                <span className="text-lg font-semibold text-red-500">
                  Rp. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div>
        <h1 className="text-lg md:text-xl font-semibold mb-4">Order Details</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Daeng Uki" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="6281xxxxxxxxx"
                      {...field}
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Pettarani St." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-400 text-white font-semibold mt-2 py-2 rounded-xl transition-colors text-center"
            >
              Submit Order
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateOrderPage;
