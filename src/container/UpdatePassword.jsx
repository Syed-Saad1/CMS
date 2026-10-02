import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import React from "react";

function UpdatePassword() {
  return (
    <Card className={"p-4 flex flex-col"}>
      <CardTitle className={"text-xl font-bold"}>Update Password</CardTitle>

      <div className="grid grid-cols-2 mt-4 gap-4">
        <Field>
          {" "}
          <Label>Email :</Label>
          <Input placeholder="Enter Your Account Email" />
        </Field>
        <Field>
          {" "}
          <Label>Old Password :</Label>
          <Input placeholder="Enter Your Old Password" />
        </Field>
        <Field>
          {" "}
          <Label>New Password :</Label>
          <Input placeholder="Enter Your Old Password" />
        </Field>
        <Field>
          {" "}
          <Label>Confirm Password :</Label>
          <Input placeholder="Enter Your Old Password" />
        </Field>
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="button">
          {/* {isPending ? ( */}
          {/* <>
              <Loader className="animate-spin" /> "Updating"
            </>
          ) : ( */}
          "Update Password"
          {/* )} */}
        </Button>
      </div>
    </Card>
  );
}

export default UpdatePassword;
