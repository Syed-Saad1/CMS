import React, { useState } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CircleCheckBig, Loader, Trash } from "lucide-react";
import { DeletePoints } from "@/container/AdminDashboardCard";
import Cookies from "js-cookie";
import { deleteUser } from "@/mutations/deleteUser";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
function DeleteUserAccount({ item }) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("ID", id);
  const [selectItem, setselectItem] = useState(null);
  const { mutateAsync, isPending } = deleteUser();

  // const userId = Cookies.get("userId");

  const handleDelete = async () => {
    try {
      await mutateAsync(id);

      toast.success("User Delete Successfully");
    } catch (error) {
    } finally {
      navigate("/admin/users");
    }
  };
  return (
    <Card className={"h-auto flex flex-col w-full p-4"}>
      <div className="flex gap-4 ">
        <Button
          onClick={() => setselectItem(item)}
          variant="destructive"
          className={"size-12 rounded-full p-2"}
        >
          {" "}
          <Trash className="size-6" />
        </Button>
        <div>
          <CardTitle className={"text-lg"}>Delete Account</CardTitle>
          <CardDescription className={""}>
            Permanently delete your account and all associated data this action
            cannot be undone
          </CardDescription>
        </div>
      </div>
      <div className="grid grid-cols-2 p-4 gap-4">
        {DeletePoints?.map((item) => (
          <div className="flex items-start gap-4" key={item.id}>
            <CircleCheckBig size={18} className="text-red-400" />
            <CardDescription>{item?.title}</CardDescription>
          </div>
        ))}
      </div>
      <div className="flex justify-end pr-4">
        {" "}
        <Button
          onClick={handleDelete}
          className={"h-10 text-sm w-60"}
          variant="destructive"
        >
          {isPending ? (
            <>
              {" "}
              <Loader className="animate-spin" />
              Deleting Account
            </>
          ) : (
            <>
              {" "}
              <Trash />
              Delete Account Permanently
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

export default DeleteUserAccount;
