import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFoods } from "@/services/foodService";
import useFoodStore from "@/store/useFoodStore";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Ellipsis, Pencil, Trash2, XCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

const AdminProductsPage = () => {
  const { data } = useQuery({
    queryKey: ["admin", "foods"],
    queryFn: getFoods,
  });

  const foods = useFoodStore((state) => state.foods);
  const setFoods = useFoodStore((state) => state.setFoods);

  useEffect(() => {
    if (data) setFoods(data);
  }, [data, setFoods]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-800">Product List</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.map((food) => (
            <TableRow>
              <TableCell>
                <img src={food.image} alt="" className="w-10 rounded-md" />
              </TableCell>
              <TableCell>{food.name}</TableCell>
              <TableCell>
                {food.isAvailable ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Available
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <XCircle className="w-4 h-4" />
                    Not Available
                  </span>
                )}
              </TableCell>
              <TableCell>{food.category}</TableCell>
              <TableCell>IDR {food.price.toLocaleString("id-ID")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/products/${food._id}/edit`}>
                        <Pencil className="text-blue-600" />
                        <span className="text-blue-600">Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/">
                        <Trash2 className="text-red-600" />
                        <span className="text-red-600">Delete</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductsPage;
