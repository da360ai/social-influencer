import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Check, Clock3, IndianRupee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Registration Confirmed — Digital Academy 360" },
      {
        name: "description",
        content:
          "Your seat for the Earn From Your Influence workshop on 17th October, 11 AM onwards at Digital Academy 360, JP Nagar, Bengaluru is confirmed.",
      },
      { property: "og:title", content: "Registration Confirmed — Digital Academy 360" },
      {
        property: "og:description",
        content:
          "Your seat for the 17th October creator income workshop is confirmed. See you at Digital Academy 360, JP Nagar, Bengaluru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

type PaymentInfo = { id: string; amount: string };

function ThankYouPage() {
  const whatsappUrl = "https://api.whatsapp.com/send?text=Hi!%20I%20just%20registered%20for%20the%20Earn%20From%20Your%20Influence%20workshop.";
  const [payment, setPayment] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    // Razorpay payment pages can redirect back with ?razorpay_payment_id=...&amount=...
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get("razorpay_payment_id") ?? params.get("payment_id") ?? "";
    const urlAmount = params.get("amount") ?? "";
    const urlStatus = params.get("payment_status") ?? "";
    const hasConfirmedPayment = Boolean(
      urlId ||
        urlStatus === "paid" ||
        params.get("success") === "true" ||
        params.get("success") === "1",
    );

    let stored: Partial<PaymentInfo> & { status?: string } = {};
    try {
      stored = JSON.parse(window.sessionStorage.getItem("workshop_payment") ?? "{}") as Partial<PaymentInfo> & {
        status?: string;
      };
    } catch {
      stored = {};
    }

    const paymentStatus = stored.status ?? urlStatus ?? "";
    const confirmed = hasConfirmedPayment || paymentStatus === "paid" || Boolean(stored.id);

    setPayment(
      confirmed
        ? {
            id: urlId || stored.id || "",
            amount: urlAmount || stored.amount || "₹79",
          }
        : null,
    );
  }, []);

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:py-20">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-glow sm:p-12">
        <div className="grid size-16 place-items-center rounded-full bg-primary shadow-action">
          <Check className="size-8 text-primary-foreground" strokeWidth={3} />
        </div>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-widest text-primary">
          {payment ? "Payment received" : "Registration received"}
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold italic leading-tight text-foreground sm:text-4xl">
          {payment ? "Your registration has been confirmed." : "Your registration is in progress."}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          {payment
            ? "This is a reminder that you are scheduled to attend the Earn From Your Influence workshop on "
            : "Your details have been received. Please complete the payment in the Razorpay window to confirm your seat for the "}
          <span className="font-bold uppercase text-foreground">17th October</span> at{" "}
          <span className="font-bold text-foreground">11:00 AM</span> at Digital Academy 360, JP Nagar.
        </p>

        {!payment && (
          <div className="mt-6 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm font-medium text-amber-700 dark:text-amber-300">
            Payment is still pending. Finish the checkout in the Razorpay tab to confirm your seat.
          </div>
        )}

        <div className="mt-8 rounded-xl border border-border bg-secondary p-5 sm:p-6">
          <dl className="divide-y divide-border">
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4" /> Date
              </dt>
              <dd className="text-right text-sm font-bold text-foreground sm:text-base">Saturday, 17th October 2026</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" /> Time
              </dt>
              <dd className="text-right text-sm font-bold text-foreground sm:text-base">11:00 AM Onwards</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" /> Venue
              </dt>
              <dd className="text-right text-sm font-bold text-foreground sm:text-base">
                Digital Academy 360, J. P. Nagar, Bengaluru 560078
              </dd>
            </div>
            {payment && (
              <>
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <IndianRupee className="size-4" /> Amount paid
                  </dt>
                  <dd className="text-right text-sm font-bold text-primary sm:text-base">{payment.amount}</dd>
                </div>
              </>

            )}
          </dl>
          <p className="border-t border-border pt-4 text-sm font-bold text-foreground">
            Please arrive a few minutes before the scheduled start time.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-extrabold text-foreground">Please note the following before attending:</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
            <li>Bring your laptop, as the session includes live, hands-on activities.</li>
            <li>
              You will learn how to position your niche, create scroll-stopping content, and land your first brand
              deal.
            </li>
            <li>
              If you have any questions related to content, monetisation, or brand collaborations that you want
              addressed during the session, write them down and bring them with you.
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Button asChild className="h-12 bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Message us on WhatsApp
            </a>
          </Button>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
