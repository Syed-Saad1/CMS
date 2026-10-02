import React, { useState } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import { useUpdateRole } from "@/mutations/updateRole";
import { useParams } from "react-router-dom";
import { Check, Loader } from "lucide-react";

function UpdateRole({ userRole }) {
  const { id } = useParams();
  const [selectedRole, setSelectedRole] = useState(userRole);
  const { mutateAsync: updateRoleFc, isPending } = useUpdateRole(id);

  const rolePayload = {
    role: selectedRole,
  };
  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Full access to manage system, users, and content.",
      icon: "grommet-icons:user-admin",
    },
    {
      id: "user",
      title: "User",
      description: "Standard access to use the platform.",
      icon: "mdi:account-school-outline",
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Access to create and manage courses.",
      icon: "hugeicons:teacher",
    },
  ];

  return (
    <form>
      <Card className={"flex flex-col w-full h-62! gap-y-4 px-6 py-2 pb-4"}>
        <div>
          <CardTitle className={"text-lg"}>Update Role</CardTitle>

          <CardDescription className="mt-1 line-clamp-1 max-w-104">
            An administrator typically navigates to the identity management or
            access control settings panel, selects the specific role, and
            modifies its text fields{" "}
          </CardDescription>

          <hr className="mt-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 mt-5 w-120">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;

              return (
                <button
                  type="button"
                  key={role.title}
                  onClick={() => setSelectedRole(role.id)}
                  className="text-left"
                >
                  <Card
                    className={`
            relative min-h-26 w-38
            flex flex-col items-center justify-center
            gap-1.5 p-5
            rounded-xl
            transition-all duration-200
            cursor-pointer

            ${
              isSelected
                ? `
                  border-2 border-primary
                  bg-accent
                  shadow-sm
                `
                : `
                  border border-border
                  bg-accent
                 
                `
            }
          `}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary">
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </div>
                    )}

                    <div
                      className={`
              flex size-10 items-center justify-center rounded-full
              ${isSelected ? "bg-primary" : "bg-primary"}
            `}
                    >
                      <Icon
                        icon={role.icon}
                        className={`
                size-6
                ${isSelected ? "text-white" : "text-white"}
              `}
                      />
                    </div>

                    <CardTitle
                      className={`
              text-base font-semibold
              ${isSelected ? "text-muted-foreground" : "text-muted-foreground"}
            `}
                    >
                      {role.title}
                    </CardTitle>
                  </Card>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end items-end ">
            <Button
              onClick={() => updateRoleFc(rolePayload)}
              className={""}
              type="button"
              variant="button"
            >
              {isPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Updating..
                </>
              ) : (
                <>
                  <img
                    className="size-4 invert brightness-0"
                    src="/changeRole.png"
                    alt=""
                  />{" "}
                  Update Role{" "}
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}

export default UpdateRole;
