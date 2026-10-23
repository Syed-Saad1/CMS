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
import { useTranslation } from "react-i18next";
import PaginationControls from "@/container/Pagination";

export const UserDashboard = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://courses-system-three.vercel.app/api/auth/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch(() => {});
  }, []);
  const { data, isLoading } = useGetUser();
  const [currentPage, setCurrentPage] = useState(1);
  const userData = data?.data || [];
  const UserId = Cookies.get("userId");
  const { data: UserById } = getUserById(UserId);
  const ProfileData = UserById?.UserById;
  const user = Array.from({ length: 47 }, (_, index) => ({
    id: index + 1,
    firstName: `Name ${index + 1}`,
    email: "email",
    role: "admmin" + index * 10,
  }));
  const itemsPerPage = 10;

  const filteredUsers = userData.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user?.firstName?.toLowerCase().includes(searchValue) ||
      user?.lastName?.toLowerCase().includes(searchValue) ||
      user?.email?.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentUser = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className=" h-full min-h-full w-full min-w-0 overflow-y-auto overflow-hidden scrollbar-thin p-3 pb-20 sm:p-6 sm:pb-20 lg:pb-6 md:mb-4 mb-10">
      {" "}
      <div className="flex flex-wrap justify-between items-end gap-3">
        <div>
          {" "}
          <h1 className="text-dashboard-foreground text-2xl font-extrabold">
            {t("ui.ourUsers")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("ui.userManage")}{" "}
          </p>
        </div>
        <div className="flex gap-3">
          {/* <Button variant={"button"} className="text-[13px]  py-4">
            <ListSortAscending /> {t("ui.filter")}
          </Button> */}
        </div>
      </div>
      <Card className="mt-2 flex w-full flex-1 flex-col  rounded-xl p-6 ">
        {" "}
        <div className="w-full flex justify-between items-center">
          {" "}
          <div className="relative w-full max-w-88">
            <Icon
              className="absolute left-3 top-1/2 text-gray-400 -translate-y-2 cursor-pointer"
              icon="bx:search"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("ui.searchUsers")}
              className={"pt-0 pl-8"}
            />
          </div>
        </div>
        <hr className="mt-4" />
        <Table className="min-w-190">
          <TableHeader>
            <TableRow>
              <TableHead>{t("ui.user")}</TableHead>
              <TableHead>{t("ui.role")}</TableHead>
              <TableHead>{t("ui.status")}</TableHead>
              <TableHead>{t("ui.rating")}</TableHead>
              <TableHead>{t("ui.socialProfile")}</TableHead>
              <TableHead>{t("ui.createdAt")}</TableHead>
              <TableHead>{t("ui.action")}</TableHead>
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
              {currentUser.length ? (
                currentUser?.map((item) => {
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
                                <CardTitle>
                                  {t("ui.courseEnrollments")}
                                </CardTitle>

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
                      <TableCell>
                        {item?.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "----"}
                      </TableCell>{" "}
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
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground font-bold text-lg"
                  >
                    User Data Not Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
        <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 border-t pt-4">
          <p className="shrink-0  text-sm text-muted-foreground">
            Showing {filteredUsers.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          <div className="shrink-0">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;
