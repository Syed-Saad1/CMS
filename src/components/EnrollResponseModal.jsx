import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  BookOpenCheck,
  PhoneCall,
  Clock,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

export default function EnrollResponseModal() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle2 className="size-12 text-green-600" />
      </div>

      <div className="text-center">
        <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600">
          Enrollment Successful
        </span>

        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          You're Enrolled Successfully!
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          Congratulations! Your course enrollment request has been received
          successfully.
        </p>
      </div>

      {/* <div className="mt-8 space-y-5 rounded-xl bg-muted/50 p-5">
          <div className="flex items-start gap-4">
            <BookOpenCheck className="mt-1 size-6 shrink-0 text-primary" />

            <div>
              <h2 className="font-semibold">
                Your learning journey starts here
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Our team will contact you as soon as possible with further
                details about your enrollment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneCall className="mt-1 size-6 shrink-0 text-primary" />

            <div>
              <h2 className="font-semibold">What's next?</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Keep your phone available. Our team will reach out to guide you
                through the next steps.
              </p>
            </div>
          </div>
        </div> */}

      {/* <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          We'll be in touch as soon as possible.
        </div> */}

      <button
        onClick={() => navigate("/user/dashboard")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <LayoutDashboard className="size-5" />
        Go to My Dashboard
        <ArrowRight className="size-4" />
      </button>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Thank you for choosing our institute!
      </p>
    </div>
  );
}
