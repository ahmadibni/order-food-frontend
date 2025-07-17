import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const CreateOrderPage = () => {
  const form = useForm();
  return (
    <div className="mt-4 md:mt-6 min-h-0 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl  ">
      <h1 className="text-lg md:text-xl font-semibold mb-4">Create Order</h1>
      <Form {...form}>
        <FormField
          control={form.control}
          name="..."
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>{/* Your form field */}</FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default CreateOrderPage;
