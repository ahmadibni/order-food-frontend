import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFoodById } from "@/services/foodService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import z from "zod";
import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string("Please fill in your name"),
  price: z.number("Please fill in the price"),
  description: z.string(),
  isAvailable: z.boolean(),
  category: z.string(),
});

const categories = [
  { label: "Main Course", value: "Main Course" },
  { label: "Side Dish", value: "Side Dish" },
  { label: "Dessert", value: "Dessert" },
  { label: "Drink", value: "Drink" },
  { label: "Appetizer", value: "Appetizer" },
  { label: "Snack", value: "Snack" },
  { label: "Soup", value: "Soup" },
  { label: "Salad", value: "Salad" },
  { label: "Breakfast", value: "Breakfast" },
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Vegan", value: "Vegan" },
  { label: "Seafood", value: "Seafood" },
  { label: "Meat", value: "Meat" },
] as const;

const AdminProductEditPage = () => {
  const { productId } = useParams();

  const { data } = useQuery({
    queryKey: ["admin", "foods", productId],
    queryFn: () => {
      if (!productId) throw new Error("Product ID is required");
      return getFoodById(productId);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        price: data.price,
        description: data.description,
        isAvailable: data.isAvailable,
        category: data.category,
      });
    }
  }, [data, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-800 mb-8">
        Edit Product
      </h1>

      <div className="flex gap-8 items-start">
        <img src={data?.image} alt="" className="w-1/3 rounded-2xl" />

        <div className="w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-5 grid grid-cols-2 items-end"
            >
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your product description here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={clsx(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categories.find(
                                  (category) => category.value === field.value
                                )?.label
                              : "Select Category"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Category"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  value={category.label}
                                  key={category.value}
                                  onSelect={() => {
                                    form.setValue("category", category.value);
                                  }}
                                >
                                  {category.label}
                                  <Check
                                    className={clsx(
                                      "ml-auto",
                                      category.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2 shadow-sm">
                    <FormLabel>Is product available</FormLabel>
                    <FormDescription></FormDescription>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="col-start-1 flex justify-start gap-2 items-center">
                <Button
                  asChild
                  className="text-base flex-1 sm:grow-0 bg-white hover:bg-gray-100 border-[1px] border-orange-500 text-orange-500 py-4 rounded-xl transition-colors text-center"
                >
                  <Link to="/admin/products">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="text-base flex-1 sm:grow-0 bg-orange-500 hover:bg-orange-400 text-white py-4 rounded-xl transition-colors text-center"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductEditPage;
