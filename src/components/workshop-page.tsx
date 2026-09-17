"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeIndianRupee,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Gift,
  Lightbulb,
  MapPin,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  SquareParking,
  Star,
  Target,
  TrainFront,
  Users,
  Zap,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import academyLogo from "@/assets/digital-academy-360-logo.png.asset.json";
import mentorPortrait from "@/assets/mentor-portrait.jpg.asset.json";
import creatorWorkshopHero from "@/assets/creator-workshop-hero-phone-camera.jpg";
import curriculumPosition from "@/assets/curriculum-position.jpg";
import curriculumContent from "@/assets/curriculum-content.jpg";
import curriculumInfluence from "@/assets/curriculum-influence.jpg";
import curriculumIncome from "@/assets/curriculum-income.jpg";
import curriculumBrand from "@/assets/curriculum-brand.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonialVideo1 from "@/assets/testimonial-video-1.mp4.asset.json";
import testimonialVideo2 from "@/assets/testimonial-video-2.mp4.asset.json";
import testimonialVideo3 from "@/assets/testimonial-video-3.mp4.asset.json";
import testimonialVideo4 from "@/assets/testimonial-video-4.mp4.asset.json";
import testimonialVideo5 from "@/assets/testimonial-video-5.mp4.asset.json";
import testimonialThumb1 from "@/assets/testimonial-thumb-1.jpg";
import testimonialThumb2 from "@/assets/testimonial-thumb-2.jpg";
import testimonialThumb3 from "@/assets/testimonial-thumb-3.jpg";
import testimonialThumb4 from "@/assets/testimonial-thumb-4.jpg";
import testimonialThumb5 from "@/assets/testimonial-thumb-5.jpg";

type FormValues = { name: string; email: string; phone: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const journey = [
  { label: "Create", text: "Build content people want to consume", icon: Lightbulb },
  { label: "Grow", text: "Build attention, engagement and audience trust", icon: BarChart3 },
  { label: "POSITIONING", text: "Become valuable in a specific niche", icon: Target },
  { label: "Monetise", text: "Turn attention and trust into income", icon: BadgeIndianRupee },
];

const modules = [
  ["Find Your Creator Position", "Choose a niche, audience, and point of view brands can instantly understand."],
  ["Content That Creates Influence", "Build useful, memorable content that moves people from watching to trusting."],
  ["6 Ways to Make Money as a Creator", "Explore brand deals, UGC, services, affiliates, products, and communities."],
  ["How to Get Your First Brand Deal", "Find the right brands, create a sharp pitch, and follow up professionally."],
  ["How to Price Your Content", "Use deliverables, usage rights, effort, and value to quote with confidence."],
  ["Your First ₹10K Creator Roadmap", "Leave with a focused 30-day action plan built around your strengths."],
];

const curriculumImages = [
  curriculumPosition,
  curriculumContent,
  curriculumInfluence,
  curriculumIncome,
  curriculumBrand,
];

const outcomes = [
  { label: "Content Creation ", text: "Create scroll-stopping, trust-building content", icon: PlayCircle },
  { label: "Audience Creation", text: "Grow attention into a loyal community", icon: Users },
  { label: "Brand collaboration", text: "Position yourself so brands understand your value", icon: Sparkles },
  { label: "Building Business", text: "Build income streams beyond sponsorships", icon: BriefcaseBusiness },
  { label: "Roadmap", text: "Turn the next 30 days into clear action", icon: Target },
];

const testimonials = [
  {
    name: "Ananya Iyer",
    handle: "@ananya.creates",
    quote: "I walked in confused about monetisation and left with a 30-day plan. My first UGC deal came three weeks later.",
    photo: testimonial1,
    video: testimonialVideo1.url,
    thumb: testimonialThumb1,
    stats: ["18K followers", "First ₹10K"],
  },
  {
    name: "Rohan Mehta",
    handle: "@rohanframes",
    quote: "The pricing framework alone was worth ten times the ticket. I stopped underquoting the same week.",
    photo: testimonial2,
    video: testimonialVideo2.url,
    thumb: testimonialThumb2,
    stats: ["9K followers", "2 brand deals"],
  },
  {
    name: "Divya Rao",
    handle: "@divyamakes",
    quote: "Finally understood how to position my niche so brands actually reply to my pitches.",
    photo: testimonial3,
    video: testimonialVideo3.url,
    thumb: testimonialThumb3,
    stats: ["24K followers", "3 collabs"],
  },
  {
    name: "Arjun Nair",
    handle: "@arjunshoots",
    quote: "Went from posting randomly to a clear content system. My reach doubled in a month.",
    photo: testimonial4,
    video: testimonialVideo4.url,
    thumb: testimonialThumb4,
    stats: ["12K followers", "₹8K per reel"],
  },
  {
    name: "Sneha Kulkarni",
    handle: "@sneha.bytes",
    quote: "The brand pitch template got me a reply in two days. This workshop pays for itself fast.",
    photo: testimonial5,
    video: testimonialVideo5.url,
    thumb: testimonialThumb5,
    stats: ["31K followers", "5 deals"],
  },
];

const takeaways = [
  "A clear creator positioning statement",
  "Your 3 strongest content pillars",
  "10 ready-to-create content ideas",
  "A first brand pitch template",
  "A simple pricing framework",
  "Your creator earning career roadmap",
];


const faqs = [
  ["When is the workshop?", "It runs for three hours, from 10:00 AM to 1:00 PM on the upcoming Saturday."],
  ["Will I get a recording?", "No. This is a live, in-person workshop designed around practical exercises, questions, and feedback."],
  ["Where is the venue?", "The workshop is at the Digital Academy 360 campus in JP Nagar, Bangalore. Full directions are included with your ticket confirmation."],
  ["Do I need an existing audience?", "No. The frameworks work whether you are beginning from zero or already creating consistently."],
  ["What should I bring?", "Bring your phone, a notebook, and one creator idea or niche you want to explore. A laptop is optional."],
];

function getNextSaturday() {
  const now = new Date();
  const days = (6 - now.getDay() + 7) % 7 || 7;
  const result = new Date(now);
  result.setDate(now.getDate() + days);
  result.setHours(10, 0, 0, 0);
  return result;
}

function Countdown() {
  const [time, setTime] = useState("--d --h --m --s");
  useEffect(() => {
    const target = getNextSaturday().getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime(`${d}d ${h}h ${m}m ${s}s`);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="font-mono text-xs font-bold tabular-nums text-foreground sm:text-sm">{time}</span>;
}

function Brand() {
  return (
    <a href="#top" aria-label="Digital Academy 360 home" className="inline-flex items-center">
      <img src={academyLogo.url} alt="Digital Academy 360" className="h-9 w-auto object-contain sm:h-10" />
    </a>
  );
}

function scrollToForm() {
  document.querySelector("#register")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex min-h-14 items-center gap-2 border-r border-border px-4 py-2 text-[10px] font-extrabold uppercase text-foreground first:pl-0 last:border-r-0 sm:text-[11px]">{children}</span>;
}

function Price() {
  return (
    <span className="inline-flex items-center gap-2 font-display">
      <s className="text-sm text-muted-foreground">₹1999</s>
      <strong className="text-base text-highlight">₹79 Only</strong>
    </span>
  );
}

function BookingForm() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [paying, setPaying] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const workshopDate = useMemo(() => getNextSaturday(), [confirmed]);
  const formattedDate = workshopDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address";
    if (!/^[6-9]\d{9}$/.test(values.phone)) next.phone = "Enter a valid 10-digit mobile number";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPaying(true);
    window.setTimeout(() => {
      setPaying(false);
      setConfirmed(true);
    }, 900);
  }

  function downloadInvite() {
    const end = new Date(workshopDate.getTime() + 3 * 60 * 60 * 1000);
    const format = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Digital Academy 360//Workshop//EN", "BEGIN:VEVENT",
      `UID:${Date.now()}@digitalacademy360.com`, `DTSTAMP:${format(new Date())}`, `DTSTART:${format(workshopDate)}`,
      `DTEND:${format(end)}`, "SUMMARY:Earn From Your Influence Workshop",
      "DESCRIPTION:3-Hour Offline Influencer Income Mastery Workshop. Ticket: ₹79.",
      "LOCATION:Digital Academy 360, JP Nagar, Bangalore", "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "earn-from-your-influence-workshop.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div id="register" className="scroll-mt-24 rounded-xl border border-border bg-card p-5 shadow-glow sm:p-6 lg:col-span-4 lg:ml-3">
        <div className="flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase text-primary sm:text-xs">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> In-person · JP Nagar, BLR</span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1.5 text-highlight"><Zap className="size-3.5" /> 5 seats left</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-extrabold leading-none text-foreground">Join the Workshop</h2>
        <div className="my-5 grid grid-cols-3 gap-2 text-[9px] font-bold text-muted-foreground sm:text-[10px]">
          {["Fill details", "Pay via Razorpay", "WhatsApp confirm"].map((step, index) => (
             <div key={step} className="flex items-center gap-2 border-t border-border pt-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">{index + 1}</span><span className="line-clamp-2">{step}</span></div>
          ))}
        </div>
        <form onSubmit={submit} noValidate className="space-y-3.5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-extrabold uppercase">Full name</Label>
            <Input id="name" autoComplete="name" placeholder="e.g. Priya Sharma" value={values.name} onChange={(e) => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} className="h-12 bg-background px-4" />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-extrabold uppercase">Email address</Label>
            <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} className="h-12 bg-background px-4" />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-extrabold uppercase">WhatsApp number</Label>
            <div className="flex rounded-md border border-input bg-background focus-within:ring-1 focus-within:ring-ring">
              <span className="grid h-12 place-items-center border-r border-border px-4 text-sm text-muted-foreground">+91</span>
              <Input id="phone" inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="98765 43210" value={values.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))} aria-invalid={Boolean(errors.phone)} className="h-12 border-0 px-4 shadow-none focus-visible:ring-0" />
            </div>
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <Button type="submit" disabled={paying} className="h-12 flex-1 bg-primary px-5 font-bold text-primary-foreground shadow-action hover:bg-primary/90">
              {paying ? "Opening secure checkout…" : "Book Your Seat Now"} <ArrowRight />
            </Button>
            <Price />
          </div>
        </form>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-border pt-4 text-[10px] text-muted-foreground sm:text-xs">
          <span className="rounded-full bg-foreground px-3 py-1 font-bold text-background">Razorpay</span>
          <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5 text-success" /> 100% Secure</span>
          <span>UPI · VISA · Mastercard · RuPay</span>
        </div>
      </div>

      <Dialog open={confirmed} onOpenChange={setConfirmed}>
        <DialogContent className="max-w-md border-primary/30 bg-card p-0 text-card-foreground shadow-glow">
          <div className="border-b border-border bg-success/10 p-6 text-center">
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <DialogHeader className="mt-3 text-center sm:text-center">
              <DialogTitle className="font-display text-2xl">Your seat is confirmed!</DialogTitle>
              <DialogDescription>We’ll send the ticket and venue directions to your email and WhatsApp.</DialogDescription>
            </DialogHeader>
          </div>
          <div className="space-y-4 p-6 pt-2">
            <div className="rounded-md border border-border bg-background/40 p-4 text-sm">
              <p className="font-display text-lg font-extrabold text-foreground">Earn From Your Influence</p>
              <p className="mt-3 text-muted-foreground">{values.name}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-muted-foreground"><CalendarDays className="size-4 text-primary" /> {formattedDate}, 10 AM–1 PM</p>
              <p className="mt-2 inline-flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-primary" /> JP Nagar, Bangalore</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3"><span>Ticket amount</span><strong className="text-highlight">₹79 paid</strong></div>
            </div>
            <Button onClick={downloadInvite} className="h-11 w-full"><Download /> Add to calendar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="text-xs font-extrabold uppercase text-primary">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h2>
      {copy && <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{copy}</p>}
    </div>
  );
}

export function WorkshopPage() {
  const venueAddress = "Digital Academy 360, 46/A, 1st Main Rd, opposite Mini Forest, Sarakki Industrial Layout, 3rd Phase, J. P. Nagar, Bangalore, Karnataka 560078";
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(venueAddress)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-background pb-20 text-foreground sm:pb-0">
       <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Brand />
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex"><Clock3 className="size-4 text-primary" /> Workshop starts in <Countdown /></div>
          <Button onClick={scrollToForm} size="sm" className="h-9 bg-primary font-extrabold text-primary-foreground hover:bg-primary/90">Book for ₹79 <ArrowRight /></Button>
        </div>
      </header>

       <section className="relative overflow-hidden border-b border-border bg-background">
         <div className="hero-glow pointer-events-none absolute inset-0" />
           <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-4 py-9 sm:px-6 lg:min-h-[min(calc(100vh-4rem),720px)] lg:grid-cols-12 lg:gap-0 lg:py-10">
             <div className="relative z-10 max-w-3xl lg:col-span-5 lg:pr-3">
               <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-[10px] font-extrabold uppercase text-primary sm:text-xs"><MapPin className="size-3.5" /> OFFLINE CREATOR  WORKSHOP</div>
               <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-[3.8rem]">
                Get ready to <span className="text-primary">Earn From Your Influence.</span>
            </h1>
             <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Understand exactly how creators turn attention into income and build your first monetisation roadmap. <strong className="text-foreground">Real strategies. Real examples. Real opportunities.</strong>
            </p>
              <div className="mt-7 grid grid-cols-2 border-y border-border sm:grid-cols-4">
              <MetaPill><Clock3 className="size-3.5 text-highlight" /> 3 hours</MetaPill>
              <MetaPill><CalendarDays className="size-3.5 text-highlight" /> Upcoming Saturday</MetaPill>
              <MetaPill><Clock3 className="size-3.5 text-highlight" /> 10AM to 1PM</MetaPill>
              <MetaPill><MapPin className="size-3.5 text-highlight" /> Offline workshop</MetaPill>
            </div>
             <div className="mt-6 flex flex-wrap items-center gap-5">
              <Button onClick={scrollToForm} size="lg" className="h-12 bg-primary px-6 font-extrabold text-primary-foreground shadow-action hover:bg-primary/90">Claim your spot <ArrowRight /></Button>
              <Price />
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground"><span className="tracking-normal text-highlight">★★★★★</span> Rated 4.8/5 by 3,730+ learners</p>
              <a href="#journey" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-primary">See what you’ll master <ArrowDown className="size-4" /></a>
          </div>
            <figure className="relative hidden self-stretch lg:col-span-3 lg:block">
              <div className="absolute inset-x-0 bottom-[18px] top-[18px] overflow-hidden rounded-t-full bg-secondary">
                <img src={creatorWorkshopHero} alt="Creator filming content with her phone beside a camera and laptop" width={1280} height={900} className="h-full w-full object-cover object-center" />
                <div className="absolute left-9 top-16 z-10 max-w-40 rotate-[-5deg] font-display text-lg font-bold leading-tight text-foreground [text-shadow:0_1px_8px_rgba(255,255,255,0.55)]">Real skills.<br />Real strategies.<br /><span className="text-primary">Real income.</span></div>
              </div>
           </figure>
          <BookingForm />
        </div>
      </section>

      <section id="journey" className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="The creator journey" title="Four moves. One earning engine." copy="The workshop connects every stage, so your content becomes more than a posting habit." />
           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map(({ label, text, icon: Icon }, index) => (
               <article key={label} className={`relative rounded-lg border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 ${index % 2 ? "lg:mt-8" : ""}`}>
                <div className="flex items-center justify-between"><span className="text-xs font-extrabold text-primary">0{index + 1}</span><Icon className="size-6 text-highlight" /></div>
                <h3 className="mt-10 font-display text-2xl font-extrabold uppercase">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="text-xs font-extrabold uppercase text-primary">6-module curriculum</span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold text-foreground sm:text-4xl">A complete creator income playbook</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Tap any module to see what you’ll unpack in the room.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modules.map(([title, text], index) => {
              const image = curriculumImages[index % curriculumImages.length];
              const imageFirst = index % 2 === 0;
              return (
                <article
                  key={title}
                  className="grid min-h-52 grid-cols-2 overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <img
                    src={image}
                    alt=""
                    width={1024}
                    height={768}
                    loading="lazy"
                    className={`h-full min-h-52 w-full object-cover md:min-h-64 ${imageFirst ? "order-1" : "order-2"}`}
                  />
                  <div className={`flex min-w-0 flex-col p-4 sm:p-5 ${imageFirst ? "order-2" : "order-1"}`}>
                    <span className="text-xs font-extrabold text-primary sm:text-sm">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-display text-base font-extrabold leading-tight text-foreground sm:text-lg">{title}</h3>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">{text}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[10px] font-extrabold uppercase text-primary">What you’ll learn <ArrowRight className="size-3" /></span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Workshop outcomes" title="Walk out with clarity across five pillars" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
             {outcomes.map(({ label, text, icon: Icon }) => <article key={label} className="rounded-lg border border-border bg-card p-5 shadow-sm"><span className="grid size-11 place-items-center rounded-full bg-secondary"><Icon className="size-5 text-primary" /></span><h3 className="mt-7 font-display text-lg font-extrabold">{label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border py-20 sm:py-24">
        <div className="testimonial-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Testimonials"
            title="\n"
            copy="Real people from past batches, building real income with what they learned in the room."
          />
          <div className="flex snap-x snap-mandatory items-end justify-center gap-0 overflow-x-auto px-6 pb-10 pt-10 sm:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map(({ name, handle, quote, video, thumb, stats }, index) => {
              const offsets = [-12, -6, 0, 6, 12];
              const lifts = [16, 8, 0, 8, 16];
              return (
                <article
                  key={handle}
                  className={`w-48 shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card shadow-glow transition-transform duration-300 hover:z-20 hover:-translate-y-2 sm:w-56 lg:w-60 ${
                    index > 0 ? "-ml-7 sm:-ml-9" : ""
                  }`}
                  style={{
                    transform: `rotate(${offsets[index]}deg) translateY(${lifts[index]}px)`,
                    zIndex: index === 2 ? 3 : index === 0 || index === 4 ? 1 : 2,
                  }}
                >
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground">{name.charAt(0)}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-extrabold text-foreground">{name}</span>
                      <span className="block truncate text-[10px] font-bold text-primary">{handle}</span>
                    </span>
                  </div>
                  <video
                    src={video}
                    poster={thumb}
                    controls
                    playsInline
                    preload="none"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <p className="px-3 pt-3 text-[11px] leading-5 text-muted-foreground">“{quote}”</p>
                  <div className="mt-3 flex items-center justify-center gap-2 bg-primary px-3 py-2.5">
                    {stats.map((stat) => (
                      <span key={stat} className="rounded-full border border-primary-foreground/50 px-2.5 py-1 text-[9px] font-extrabold text-primary-foreground sm:text-[10px]">
                        {stat}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Included with your seat" title="Two bonuses built for immediate action" />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["Bonus 1", "30 AI Skills & Prompts for Creators", "Tools, prompts, and workflows you can use immediately."],
              ["Bonus 2", "Creator Earning Career Roadmap", "A clear path from content to income that you can follow after the workshop."],
             ].map(([badge, title, text], index) => <article key={badge} className={`rounded-xl border border-primary/20 p-7 shadow-sm ${index === 0 ? "bg-primary text-primary-foreground md:translate-y-5" : "bg-card"}`}><div className="flex items-center justify-between"><span className={`rounded-md px-3 py-1 text-xs font-extrabold uppercase ${index === 0 ? "bg-card text-primary" : "bg-secondary text-primary"}`}>{badge}</span><Gift className={`size-8 ${index === 0 ? "text-primary-foreground" : "text-primary"}`} /></div><h3 className="mt-8 max-w-md font-display text-2xl font-extrabold">{title}</h3><p className={`mt-3 text-sm leading-6 ${index === 0 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">Meet your Mentor</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
             <div className="relative overflow-hidden rounded-xl border border-border bg-secondary p-3 shadow-glow lg:-rotate-2">
              <img
                src={mentorPortrait.url}
                alt="Sathiyaseelan S, Performance Marketer and workshop mentor"
                className="aspect-[3/4] h-full w-full rounded-lg object-cover object-top"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-primary">Your mentor</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">SATHIYASEELAN S</h3>
              <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">Performance Marketer</span>
              <div className="mt-7 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>
                  Performance Marketing Specialist with proven expertise in driving sales, app installs, and lead generation across multiple industries. Over the past <strong className="text-foreground">three years</strong>, I&apos;ve managed and optimized campaigns with monthly ad spends exceeding <strong className="text-foreground">₹5 crore</strong>, consistently maximizing ROAS.
                </p>
                <p>
                  My core strength lies in <strong className="text-foreground">Google Ads</strong> and <strong className="text-foreground">Meta Ads</strong>, where I develop data-driven strategies, execute high-impact campaigns, and scale winning campaigns for sustainable growth.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-2">
                <h4 className="font-display text-xl font-extrabold text-foreground">Success in Figures</h4>
                <p className="text-xs font-bold text-primary">Numbers Tell My Story</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["5Cr+", "Budget Spent"],
                  ["80+", "Campaigns"],
                  ["15,000+", "Leads Generated"],
                  ["25+", "Platforms Leveraged"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md border border-border bg-card px-3 py-5 text-center">
                    <strong className="font-display text-xl font-extrabold text-primary sm:text-2xl">{value}</strong>
                    <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Tangible takeaways" title="Six assets you’ll leave with" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{takeaways.map((item, index) => <div key={item} className="flex min-h-28 items-start gap-4 rounded-md border border-border bg-card p-5"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">{index + 1}</span><p className="pt-1 font-display font-bold">{item}</p></div>)}</div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase text-primary">Where we meet</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">Meet us at <span className="text-primary">JP Nagar,</span> Bangalore</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="min-h-80 overflow-hidden rounded-lg border border-border bg-card sm:min-h-96">
              <iframe
                title="Digital Academy 360 Head Centre location on Google Maps"
                src={mapEmbedUrl}
                className="h-full min-h-80 w-full border-0 sm:min-h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col rounded-lg border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-2xl font-extrabold text-foreground">Digital Academy 360 Head Centre</h3>
              <div className="mt-7 space-y-5 text-sm leading-6 text-muted-foreground sm:text-base">
                <p className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-primary" /><span>Digital Academy 360, 46/A, 1st Main Rd, opposite Mini Forest, Sarakki Industrial Layout, 3rd Phase, J. P. Nagar, Bangalore, Karnataka 560078</span></p>
                <p className="flex gap-3"><TrainFront className="mt-1 size-4 shrink-0 text-primary" /><span>Nearest Metro: Jayadeva Hospital (Yellow Line)</span></p>
                <p className="flex gap-3"><SquareParking className="mt-1 size-4 shrink-0 text-primary" /><span>Free parking available in the basement</span></p>
              </div>
              <div className="mt-8">
                <Button asChild variant="outline" className="h-12 border-primary bg-transparent px-6 font-bold text-primary hover:bg-primary hover:text-primary-foreground">
                  <a href={directionsUrl} target="_blank" rel="noreferrer">Get Directions <ArrowRight /></a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6"><SectionHeading eyebrow="Frequently asked" title="Everything you need to know" /><Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-5 sm:px-7">{faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`} className="border-border"><AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline">{question}</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div>
      </section>

      <section className="relative grid-bg py-20 text-center sm:py-28">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6"><span className="text-xs font-extrabold uppercase text-primary">Only 5 seats left</span><h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Your influence can become an income skill.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">Spend one Saturday building the clarity, offers, and roadmap to begin.</p><div className="mt-8 flex flex-wrap items-center justify-center gap-5"><Button onClick={scrollToForm} size="lg" className="h-12 bg-primary px-7 font-extrabold text-primary-foreground shadow-action hover:bg-primary/90">Book your seat for ₹79 <ArrowRight /></Button><Price /></div></div>
      </section>

       <footer className="border-t border-border bg-card py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:flex-row sm:px-6 sm:text-left"><Brand /><p className="text-xs text-muted-foreground">© 2026 Digital Academy 360. Learn · Create · Grow.</p></div></footer>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl sm:hidden"><div><p className="text-[10px] font-bold uppercase text-muted-foreground">3-hour workshop</p><Price /></div><Button onClick={scrollToForm} className="bg-primary font-extrabold text-primary-foreground hover:bg-primary/90">Book now <ArrowRight /></Button></div>
    </main>
  );
}
