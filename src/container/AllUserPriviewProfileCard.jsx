import React, { useId } from "react";

import {
  CalendarCheck,
  IdCardLanyard,
  Mail,
  TrendingUp,
  UserShield,
} from "lucide-react";
import { Camera, Loader } from "lucide-react";
import { useUploadAvatar } from "@/mutations/useUploadAvatar";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import AllUserPriviewSkeleton from "@/skeleton/AllUserPriviewSkeleton";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status";
function PriviewProfileCard({ user, isLoading }) {
  const { t } = useTranslation();
  const UserProfileData = user;

  const { mutateAsync: uploadAvatar, isPending: isUploading } = useUploadAvatar(
    UserProfileData?._id,
  );

  const firstName =
    UserProfileData?.firstName?.trim()?.charAt(0)?.toUpperCase() || "";

  const lastName =
    UserProfileData?.lastName?.trim()?.charAt(0)?.toUpperCase() || "";

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t("ui.selectImage"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("ui.imageSmall"));
      return;
    }

    try {
      await uploadAvatar(file);

      toast.success(t("ui.profileUpdated"));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile picture",
      );
    }

    event.target.value = "";
  };
  return (
    <div className="h-fit w-full min-w-0">
      {isLoading ? (
        <AllUserPriviewSkeleton />
      ) : (
        <Card className="border border-border h-fit min-h-126 flex flex-col items-center px-4 py-4">
          <div className="relative w-full">
            <div className="h-24 w-full bg-linear-to-b rounded-t-xl from-[#E8F2FE] to-white dark:from-[#1B304A] dark:via-[#20252D] dark:to-[#202020]" />

            <div className="absolute left-1/2 top-10 -translate-x-1/2">
              <div className="relative size-34!">
                <label
                  htmlFor="avatar-upload"
                  className="group relative block size-full cursor-pointer"
                >
                  {UserProfileData?.avatar ? (
                    <img
                      className="size-full rounded-full object-cover border-4 border-white dark:border-none"
                      src={UserProfileData.avatar}
                      alt="Profile"
                    />
                  ) : (
                    <h1 className="size-full rounded-full bg-muted flex flex-col justify-center items-center text-2xl border-4 border-white dark:border-transparent">
                      {firstName}
                      {lastName}
                    </h1>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    {isUploading ? (
                      <Loader className="size-6 text-white animate-spin" />
                    ) : (
                      <Camera className="size-6 text-white" />
                    )}
                  </div>
                </label>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>
          <CardTitle className="text-center text-lg mt-22 line-clamp-1 font-semibold">
            {UserProfileData?.firstName} {UserProfileData?.lastName}
          </CardTitle>

          <CardDescription className="text-center text-xs">
            {UserProfileData?.email}
          </CardDescription>

          <div className="border-b w-full mt-4  border-accent" />
          <div className="flex flex-col mt-4 w-full justify-start items-start">
            {" "}
            <Card className="flex px-2 py-2 gap-4 ">
              <div className="opacity-45 rounded-sm p-2 size-8">
                <TrendingUp className="size-5 text-accent-foreground " />
              </div>
              <div>
                <CardTitle className={"text-sm"}>Status</CardTitle>{" "}
                <StatusBadge status="active" />
              </div>
            </Card>
            <Card className="flex w-full min-w-0 px-2 py-2 gap-4">
              <div className="opacity-45 rounded-sm p-2 size-8">
                <UserShield className="size-5 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className={"text-sm"}>Curent Role</CardTitle>
                <CardDescription>
                  {UserProfileData?.role?.toUpperCase()}
                </CardDescription>
              </div>
            </Card>
            <Card className="flex w-full min-w-0 px-2 py-2 gap-4">
              <div className=" opacity-45 rounded-sm p-2 size-8">
                <Mail className="size-5 text-accent-foreground" />
              </div>
              <div className="min-w-0 break-all">
                <CardTitle className={"text-xs"}>Email</CardTitle>
                <CardDescription>{UserProfileData?.email}</CardDescription>
              </div>
            </Card>
            <Card className="flex w-full min-w-0 px-2 py-2 gap-4">
              <div className=" opacity-45 rounded-sm p-2 size-8">
                <IdCardLanyard className="size-5 text-accent-foreground" />
              </div>
              <div className="min-w-0">
                <CardTitle className={"text-xs"}>UserID</CardTitle>
                <CardDescription>
                  #USR {UserProfileData?._id?.slice(0, 8).toUpperCase()}
                </CardDescription>
              </div>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
}

export default PriviewProfileCard;
