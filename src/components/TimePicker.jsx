// import React, { useState } from "react";
// import { Clock3 } from "lucide-react";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";

// function TimeRangePicker() {
//   const [startTime, setStartTime] = useState("09:00");
//   const [endTime, setEndTime] = useState("17:00");

//   return (
//     <div className="flex flex-col">
//       <Label className={"mt-2"}>
//         Class Timing <span className="text-destructive"> *</span>
//       </Label>
//       <div className="grid grid-cols-2 gap-4 mt-2">
//         <div className="space-y-4">
//           <label className="text-xs font-normal">Start Time</label>

//           <div className="relative">
//             <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="h-10 w-full rounded-md border pl-10 pr-3"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-normal">End Time</label>

//           <div className="relative">
//             <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="h-10 w-full rounded-md border pl-10 pr-3"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TimeRangePicker;

// import React from "react";
// import { Clock3 } from "lucide-react";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";

// function TimeRangePicker({ values, handleChange, setFieldValue }) {
//   return (
//     <div className="flex flex-col">
//       <Label className="mt-2">
//         Class Timing <span className="text-destructive"> *</span>
//       </Label>

//       <div className="mt-2 grid grid-cols-2 gap-4">
//         {/* Start Time */}
//         <div className="space-y-2">
//           <label className="text-xs font-normal">Start Time</label>

//           <div className="relative">
//             <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               type="time"
//               value={values.courseTime?.startTime || ""}
//               onChange={(e) =>
//                 handleChange("courseTime.startTime", e.target.value)
//               }
//               className="h-10 w-full rounded-md border pl-10 pr-3"
//             />
//           </div>
//         </div>

//         {/* End Time */}
//         <div className="space-y-2">
//           <label className="text-xs font-normal">End Time</label>

//           <div className="relative">
//             <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               type="time"
//               value={values.courseTime?.endTime || ""}
//               onChange={(e) =>
//                 handleChange("courseTime.endTime", e.target.value)
//               }
//               className="h-10 w-full rounded-md border pl-10 pr-3"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TimeRangePicker;

import React from "react";
import { Clock3 } from "lucide-react";
import { Label } from "./ui/label";

function TimeRangePicker({ values, setFieldValue }) {
  return (
    <div className="flex flex-col">
      <Label className="mt-2">
        Class Timing <span className="text-destructive">*</span>
      </Label>

      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-normal">Start Time</label>

          <div className="relative">
            <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="time"
              value={values?.courseTime?.startTime || ""}
              onChange={(e) => {
                console.log("Start:", e.target.value);

                setFieldValue("courseTime.startTime", e.target.value);
              }}
              className="h-10 w-full rounded-md border pl-10 pr-3"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-normal">End Time</label>

          <div className="relative">
            <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="time"
              value={values?.courseTime?.endTime || ""}
              onChange={(e) => {
                console.log("End:", e.target.value);

                setFieldValue("courseTime.endTime", e.target.value);
              }}
              className="h-10 w-full rounded-md border pl-10 pr-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeRangePicker;
