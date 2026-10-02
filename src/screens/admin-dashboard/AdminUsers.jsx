import { Card, CardTitle } from "@/components/ui/card";
import { ListSortAscending } from "lucide-react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status";
import { useGetUser } from "@/query/useGetUser";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { RoleBadge } from "@/components/RoleBadge";
import { getUserById } from "@/query/getUserById";
import { Input } from "@/components/ui/input";

export const UserDashboard = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://courses-system-three.vercel.app/api/auth/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.error(error));
  }, []);
  const { data, isLoading } = useGetUser();
  const userData = data?.data || [];
  const UserId = Cookies.get("userId");
  const { data: UserById } = getUserById(UserId);
  const ProfileData = UserById?.UserById;
  const filteredUsers = userData.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user?.firstName?.toLowerCase().includes(searchValue) ||
      user?.lastName?.toLowerCase().includes(searchValue) ||
      user?.email?.toLowerCase().includes(searchValue)
    );
  });
  return (
    <div className="h-full w-full mt-6 mx-6">
      <div className="flex justify-between items-end  ">
        <div>
          {" "}
          <h1 className="text-dashboard-foreground text-2xl font-extrabold">
            Our Users
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage user roles and access permissions across the platform.{" "}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant={"button"} className="text-[13px]  py-4">
            {" "}
            <ListSortAscending /> Filter
          </Button>
        </div>
      </div>
      <Card className="block! w-full rounded-xl mt-2 p-6">
        {" "}
        <div className="w-full flex justify-between items-center">
          {" "}
          <div className="relative w-88">
            <Icon
              className="absolute left-3 top-1/2 text-gray-400 -translate-y-2 cursor-pointer"
              icon="bx:search"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or username..."
              className={"pt-0 pl-8"}
            />
          </div>
        </div>
        <hr className="mt-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Socail Profile</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell>
                    <div className="h-4 w-24 bg-muted/80 rounded" />
                  </TableCell>

                  <TableCell>
                    <div className="h-4 w-40 bg-muted/50 rounded" />
                  </TableCell>

                  <TableCell>
                    <div className="h-4 w-32 bg-muted/50 rounded" />
                  </TableCell>

                  <TableCell>
                    <div className="h-6 w-16 bg-muted/60 rounded-full" />
                  </TableCell>

                  <TableCell>
                    <div className="h-4 w-10 bg-muted/40 rounded" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {filteredUsers.length ? (
                filteredUsers?.map((item) => {
                  const IntialFirst = item?.firstName
                    ?.trim()
                    .charAt(0)
                    .toUpperCase();
                  const LastFirst = item?.lastName
                    ?.trim()
                    .charAt(0)
                    .toUpperCase();

                  return (
                    <TableRow key={item?._id}>
                      <TableCell className="pl-2">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 justify-center items-center ">
                            {item?.avatar ? (
                              <img
                                className="size-full rounded-full object-cover "
                                src={item?.avatar}
                              />
                            ) : (
                              <h1 className="size-full text-xs flex flex-col justify-center items-center bg-muted! rounded-full ">
                                {IntialFirst}
                                {LastFirst}
                              </h1>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <TableCell className={"py-0 pl-0"}>
                                    {item?.firstName}
                                    {item?.lastName}
                                  </TableCell>
                                }
                              />
                              <TooltipContent className="flex flex-col">
                                <CardTitle>Course Enrollments</CardTitle>

                                {item?.enrolledCourses?.map((course, index) => (
                                  <p className="max-w-30" key={index}>
                                    {course}
                                  </p>
                                ))}
                              </TooltipContent>
                            </Tooltip>
                            <span className="text-xs text-muted-foreground">
                              {item?.email || "---"}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <RoleBadge role={item?.role} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status="active" />
                      </TableCell>
                      <TableCell>4.6</TableCell>
                      <TableCell className="cursor-pointer align-middle">
                        <div className="flex items-center gap-3">
                          <Icon icon="logos:twitter" />
                          <Icon icon="logos:facebook" />
                          <img className="size-4" src="/instagram.png" alt="" />
                        </div>
                      </TableCell>

                      <TableCell>21-Sep-2026</TableCell>
                      <TableCell>
                        <Link
                          className="hover:border-b-primary hover:border-b-2 text-xs text-accent-foreground"
                          to={`/admin/users/${item?._id}`}
                        >
                          {" "}
                          View Profile{" "}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div className="text-red-700 font-bold text-2xl w-full mt-4">
                  User Data Not Found
                </div>
              )}
            </TableBody>
          )}
        </Table>
      </Card>
    </div>
  );
};

export default UserDashboard;
