"use client";

import { useNavigate } from "@tanstack/react-router";
import { captureUtmParams, submitLead } from "@/lib/lead-capture";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeIndianRupee,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
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
import academyLogoUrl from "@/assets/digital-academy-360-logo.png";
import mentorPortraitUrl from "@/assets/mentor-portrait.jpg";
import creatorWorkshopHero from "@/assets/creator-workshop-hero-wide.jpg";
import curriculumPosition from "@/assets/curriculum-position.jpg";
import curriculumContent from "@/assets/curriculum-content.jpg";
import curriculumInfluence from "@/assets/curriculum-influence.jpg";
import curriculumIncome from "@/assets/curriculum-income.jpg";
import curriculumBrand from "@/assets/curriculum-brand.jpg";
import curriculumRoadmap from "@/assets/curriculum-roadmap.jpg";
import razorpaySecurePayment from "@/assets/razorpay-secure-payment.png";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
const academyLogo = { url: academyLogoUrl };
const mentorPortrait = { url: mentorPortraitUrl };
const testimonialVideo1 = { url: "/media/testimonial-1.mp4" };
const testimonialVideo2 = { url: "/media/testimonial-2.mp4" };
const testimonialVideo3 = { url: "/media/testimonial-3.mp4" };
const testimonialVideo4 = { url: "/media/testimonial-4.mp4" };
const testimonialVideo5 = { url: "/media/testimonial-5.mp4" };
import testimonialThumb1 from "@/assets/testimonial-thumb-1.jpg";
import testimonialThumb2 from "@/assets/testimonial-thumb-2.jpg";
import testimonialThumb3 from "@/assets/testimonial-thumb-3.jpg";
import testimonialThumb4 from "@/assets/testimonial-thumb-4.jpg";
import testimonialThumb5 from "@/assets/testimonial-thumb-5.jpg";
import tcsLogoUrl from "@/assets/attendees/tcs.svg";
import wiproLogoUrl from "@/assets/attendees/wipro.svg";
import cashfreeLogoUrl from "@/assets/attendees/cashfree.svg";
import presidencyLogoUrl from "@/assets/attendees/presidency.svg";
import mumbaiUniversityLogoUrl from "@/assets/attendees/mumbai-university.png";
import bnmitLogoUrl from "@/assets/attendees/bnmit.png";
import prarthanaLogoUrl from "@/assets/attendees/prarthana.png";

type FormValues = { name: string; email: string; phone: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const journey = [
  { label: "Create", text: "Build content people want to see", icon: Lightbulb },
  { label: "Grow", text: "Build attention, Drive engagement and Gain audience trust", icon: BarChart3 },
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
  curriculumRoadmap,
];

const outcomes = [
  { label: "Content Creation ", text: "Create scroll-stopping and  trust-building content", icon: PlayCircle },
  { label: "Audience Creation", text: "Grow attention into a loyal community", icon: Users },
  { label: "Brand Collaboration", text: "Position yourself so brands understand your value", icon: Sparkles },
  { label: "Building Business", text: "Build income streams beyond sponsorships", icon: BriefcaseBusiness },
];

const attendeeOrganizations = [
  { logo: tcsLogoUrl, name: "Tata Consultancy Services", type: "Company" },
  { logo: wiproLogoUrl, name: "Wipro", type: "Company" },
  { logo: cashfreeLogoUrl, name: "Cashfree Payments", type: "Company" },
  { logo: presidencyLogoUrl, name: "Presidency University", type: "College" },
  { logo: mumbaiUniversityLogoUrl, name: "Mumbai University", type: "College" },
  { logo: bnmitLogoUrl, name: "BNM Institute of Technology", type: "College" },
  { logo: prarthanaLogoUrl, name: "Prarthana World School", type: "College" },
];

const testimonials = [
  {
    name: "Khushboo",
    handle: "\n",
    quote: "\n",
    photo: testimonial1,
    video: testimonialVideo1.url,
    thumb: testimonialThumb1,
    stats: ["", ""],
  },
  {
    name: "Prakash",
    handle: "\n",
    quote: "\n",
    photo: testimonial3,
    video: testimonialVideo3.url,
    thumb: testimonialThumb3,
    stats: ["", ""],
  },
  {
    name: "Roopali",
    handle: "\n",
    quote: "\n",
    photo: testimonial2,
    video: testimonialVideo2.url,
    thumb: testimonialThumb2,
    stats: ["", ""],
  },
  {
    name: "Binamin",
    handle: "\n",
    quote: "\n",
    photo: testimonial4,
    video: testimonialVideo4.url,
    thumb: testimonialThumb4,
    stats: ["", ""],
  },
  {
    name: "Pradeep",
    handle: "\n",
    quote: "\n",
    photo: testimonial5,
    video: testimonialVideo5.url,
    thumb: testimonialThumb5,
    stats: ["", ""],
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
  ["When and where is the workshop?", "The workshop runs for three hours, from 11:00 AM onwards on Saturday, 26th September 2026, at the Digital Academy 360 campus in JP Nagar, Bangalore. It is a fully in-person session — doors open 15 minutes early so you can settle in, meet fellow attendees, and grab a seat up front."],
  ["What exactly will I learn in 3 hours?", "You'll work through six hands-on modules: finding a creator position brands instantly understand, building content people want to see, growing attention and audience trust, turning attention into income, landing brand collaborations, and a simple pricing framework — finishing with a creator earning career roadmap you can follow after the workshop. Every module includes a live exercise, not just theory."],
  ["Who is this workshop for?", "It's built for anyone who wants to earn from content: students, working professionals, freelancers, small business owners, and aspiring full-time creators. If you can post on Instagram or YouTube, you have everything you need to start — no marketing background is required."],
  ["Do I need an existing audience or followers?", "No. Most attendees start from zero. The frameworks are designed to work whether you are beginning from scratch, stuck at a few hundred followers, or already creating consistently and want to monetise properly. Positioning and content strategy come before follower counts in this system."],
  ["How much does it cost, and what does the fee include?", "The seat costs ₹79 (reduced from the regular ₹1,999) because we want serious, action-takers in the room. The fee covers all three hours of live training, the worksheets and frameworks used in every exercise, the creator earning roadmap, and access to the attendee community after the workshop."],
  ["Will I get a recording if I miss the session?", "No. This is a live, in-person workshop designed around practical exercises, real-time questions, and personal feedback — a recording can't replace that. If something urgent comes up, message us on WhatsApp after registering and we'll help you move your seat to the next batch."],
  ["Is this an online workshop I can attend from anywhere?", "No — this is an offline, in-person experience in Bangalore. We deliberately keep it offline because the best results come from live exercises, face-to-face feedback, and the network you build in the room. If you're travelling from outside the city, plan for the full Saturday morning."],
  ["What should I bring with me?", "Bring your phone (fully charged), a notebook, and one creator idea or niche you want to explore. A laptop is optional — everything can be done on your phone. Come with an Instagram or YouTube account already set up so you can apply the frameworks live."],
  ["Will I actually start earning after this workshop?", "You'll leave with a clear positioning statement, a content plan, a pricing framework, and a step-by-step roadmap — the exact tools creators use to land their first brand deals. Earning depends on the execution you put in afterwards, but the workshop removes the guesswork about what to do first, second, and third."],
  ["Do I get a certificate or any follow-up support?", "Yes — every attendee receives a completion certificate from Digital Academy 360, and you'll be added to the attendee community where past participants share wins, brand-deal leads, and feedback. The mentor also stays reachable for questions after the session."],
  ["How many seats are available, and why so few?", "We keep the room small — only 15 seats — so every attendee gets individual attention, their positioning reviewed, and their questions answered live. Seats fill on a first-paid basis, so if the page shows seats left, that's the real remaining count."],
  ["What is the refund policy?", "Because seats are limited and materials are prepared in advance, the ₹79 fee is non-refundable once paid. However, if you cannot attend, your seat can be transferred to a friend or moved to a future batch — just message us on WhatsApp with your registered name."],
  ["Who is the mentor, and why learn from him?", "The workshop is led by Vignesh Shanmugasamy, a digital marketing trainer with 6+ years of experience across Google Ads, Meta Ads, SEO, social media, performance marketing, and creator and influencer marketing. He has trained hundreds of students with a practical, industry-oriented approach — you'll work on real briefs, not hypothetical examples."],
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

const RAZORPAY_URL = "https://rzp.io/rzp/social-content-creator";

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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    captureUtmParams();
  }, []);

  const workshopDate = useMemo(() => getNextSaturday(), []);
  const formattedDate = workshopDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (paying) return;
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address";
    if (!/^[6-9]\d{9}$/.test(values.phone)) next.phone = "Enter a valid 10-digit mobile number";
    setErrors(next);
    setSubmitError(null);
    if (Object.keys(next).length) return;

    setPaying(true);
    try {
      await submitLead({
        full_name: values.name.trim(),
        email: values.email.trim(),
        whatsapp: `+91${values.phone}`,
      });
      setSucceeded(true);
      try {
        window.sessionStorage.setItem("workshop_payment", JSON.stringify({ id: "", amount: "₹79" }));
      } catch {
        // storage unavailable — the thank-you page falls back to the default amount
      }
      window.open(RAZORPAY_URL, "_blank", "noopener,noreferrer");
      window.setTimeout(() => {
        setPaying(false);
        navigate({ to: "/thank-you" });
      }, 900);
    } catch (error) {
      console.error("Lead submission failed", error);
      setSubmitError("Something went wrong. Please try again.");
      setPaying(false);
    }
  }

  return (
    <>
      <div id="register" className="scroll-mt-24 rounded-xl border border-border bg-card p-5 shadow-glow sm:p-6">
        <div className="flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase text-primary sm:text-xs">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> In-person · JP Nagar, BLR</span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1.5 text-highlight"><Zap className="size-3.5" /> 15 SEATS LEFT</span>
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
              {paying ? "Processing…" : "Book Your Seat Now"} <ArrowRight />
            </Button>
            <Price />
          </div>
          {submitError && (
            <p role="alert" className="text-xs font-bold text-destructive">{submitError}</p>
          )}
          {succeeded && !submitError && (
            <div className="rounded-md border border-success/40 bg-success/10 p-3 text-xs font-bold text-success">
              You're almost there! Your details have been received.
            </div>
          )}
        </form>
        <div className="mt-5 flex justify-center border-t border-border pt-4">
          <img src={razorpaySecurePayment} alt="Razorpay, 100% secure. UPI, VISA, Mastercard and RuPay accepted." className="h-auto w-[193px] max-w-full object-contain" />
        </div>
      </div>

    </>
  );
}

function SectionHeading({ eyebrow, title, copy, eyebrowClassName = "text-xs", titleClassName = "text-foreground" }: { eyebrow: string; title: React.ReactNode; copy?: string; eyebrowClassName?: string; titleClassName?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className={`${eyebrowClassName} font-extrabold uppercase text-primary`}>{eyebrow}</span>
      <h2 className={`mt-3 font-display text-3xl font-extrabold sm:text-4xl ${titleClassName}`}>{title}</h2>
      {copy && <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{copy}</p>}
    </div>
  );
}

function PreviousAttendees() {
  const attendeeRows = [
    { type: "Company", repeats: 4, duration: "26s" },
    { type: "College", repeats: 3, duration: "32s" },
  ];

  return (
    <section aria-labelledby="previous-attendees-heading" className="border-b border-border bg-card py-8 sm:py-10">
      <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        <div>
          <span className="text-xs font-extrabold uppercase text-primary">From leading institutions</span>
          <h2 id="previous-attendees-heading" className="mt-2 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
            Previous Attendees
          </h2>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          {attendeeRows.map(({ type, repeats, duration }, rowIndex) => (
            <div key={type} className="attendee-marquee" aria-label={`${type} logos of previous attendees`}>
              <div
                className={`attendee-marquee-track${rowIndex === 1 ? " attendee-marquee-track--reverse" : ""}`}
                style={{ animationDuration: duration }}
              >
                {[0, 1].map((groupIndex) => (
                  <div key={groupIndex} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14" aria-hidden={groupIndex === 1}>
                    {Array.from({ length: repeats }).flatMap((_, repeatIndex) =>
                      attendeeOrganizations
                        .filter(({ type: orgType }) => orgType === type)
                        .map(({ logo, name }) => (
                        <img
                          key={`${groupIndex}-${repeatIndex}-${name}`}
                          src={logo}
                          alt={groupIndex === 0 && repeatIndex === 0 ? `${name} logo` : ""}
                          title={name}
                          className="h-7 w-auto max-w-[130px] shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100 sm:h-9 sm:max-w-[160px]"
                          loading="eager"
                          decoding="sync"

                        />
                        )),
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkshopPage() {
  const venueAddress = "Digital Academy 360, 46/A, 1st Main Rd, opposite Mini Forest, Sarakki Industrial Layout, 3rd Phase, J. P. Nagar, Bangalore, Karnataka 560078";
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(venueAddress)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;
  const footerRef = useRef<HTMLElement | null>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<(typeof testimonials)[number] | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry?.isIntersecting ?? false));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-background pb-20 text-foreground sm:pb-0">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:h-[90px] sm:px-6">
          <Brand />
          <div className="ml-auto hidden items-center gap-3 sm:flex sm:pr-8 lg:pr-24"></div>
          <Button asChild className="ml-auto h-11 bg-primary px-4 font-extrabold text-primary-foreground shadow-action hover:bg-primary/90 sm:ml-0 sm:px-6">
            <a href={RAZORPAY_URL} target="_blank" rel="noreferrer">Book for ₹79 <ArrowRight /></a>
          </Button>
        </div>
      </header>

       <section className="relative overflow-hidden border-b border-border bg-background">
         <div className="hero-glow pointer-events-none absolute inset-0" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-4 py-9 sm:px-6 lg:min-h-[min(calc(100vh-4rem),720px)] lg:grid-cols-12 lg:items-stretch lg:gap-0 lg:py-10">
             <div className="relative z-10 max-w-3xl lg:col-span-5 lg:pr-3">
               <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-[10px] font-extrabold uppercase text-primary sm:text-xs"><MapPin className="size-3.5" /> OFFLINE CREATOR  WORKSHOP</div>
               <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-[3.8rem]">
                Get ready to <span className="text-primary">Earn From Your Content.</span>
            </h1>
             <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Understand exactly how creators turn attention into income and build your first monetisation roadmap. <strong className="text-foreground">Real strategies. Real examples. Real opportunities.</strong>
            </p>
              <div className="mt-7 grid grid-cols-2 border-y border-border sm:grid-cols-4">
              <MetaPill><Clock3 className="size-3.5 text-highlight" /> 3 hours</MetaPill>
              <MetaPill><CalendarDays className="size-3.5 text-highlight" /> 26TH SEPTEMBER&nbsp;</MetaPill>
              <MetaPill><Clock3 className="size-3.5 text-highlight" /> 11AM&nbsp; ONWARDS</MetaPill>
              <MetaPill><MapPin className="size-3.5 text-highlight" /> Offline workshop</MetaPill>
            </div>
             <div className="mt-6 flex flex-wrap items-center gap-5">
              <Button asChild size="lg" className="h-12 bg-primary px-6 font-extrabold text-primary-foreground shadow-action hover:bg-primary/90"><a href={RAZORPAY_URL} target="_blank" rel="noreferrer">Claim your spot <ArrowRight /></a></Button>
              <Price />
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground"><span className="tracking-normal text-highlight">★★★★★</span> Rated 4.8/5 by 3,730+ learners</p>
              <a href="#journey" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground transition-colors hover:text-primary">See what you’ll master <ArrowDown className="size-4" /></a>
          </div>
             <div className="relative lg:col-span-7 lg:flex lg:min-h-0 lg:items-center lg:justify-end lg:p-5">
               <figure className="absolute inset-0 hidden overflow-hidden rounded-[20px] bg-secondary lg:block">
                 <img src={creatorWorkshopHero} alt="Creator filming content with her phone beside a camera and laptop" width={1280} height={1024} className="h-full w-full object-cover object-left" />
                 <div className="absolute left-9 top-16 z-10 max-w-40 rotate-[-5deg] font-display text-lg font-bold leading-tight text-foreground [text-shadow:0_1px_8px_rgba(255,255,255,0.55)]">{"\n"}</div>
               </figure>
               <div className="relative z-10 w-full lg:w-4/7">
                 <BookingForm />
               </div>
             </div>
        </div>
      </section>

       <PreviousAttendees />

      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="inline-flex rounded-full border border-primary/25 bg-secondary px-3 py-1.5 text-[10px] font-extrabold uppercase text-primary">
              Watch intro
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
              See what you&apos;ll learn in <span className="text-primary">3 hours</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              A quick walkthrough from your mentor on what this workshop covers and who it&apos;s for.
            </p>
          </div>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[20px] border border-border bg-foreground shadow-glow">
            <video
              src="/media/watch-intro.mp4"
              poster="/media/watch-intro-poster.jpg"
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
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
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">{"\n"}</p>
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
                  <div className={`flex min-w-0 flex-col p-4 sm:p-5 ${imageFirst ? "order-2" : "order-1"} ${index === 5 ? "bg-success" : ""}`}>
                    <span className={`text-xs font-extrabold sm:text-sm ${index === 5 ? "text-white" : "text-primary"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className={`mt-3 font-display text-base font-extrabold leading-tight sm:text-lg ${index === 5 ? "text-white" : "text-foreground"}`}>{title}</h3>
                    <p className={`mt-3 text-xs leading-5 ${index === 5 ? "text-white/85" : "text-muted-foreground"}`}>{text}</p>
                    <span className={`mt-auto inline-flex items-center gap-1 pt-4 text-[10px] font-extrabold uppercase ${index === 5 ? "text-white" : "text-primary"}`}>{"\n"}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Workshop outcomes" title="Walk out with clarity across four pillars" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
             {outcomes.map(({ label, text, icon: Icon }) => <article key={label} className="rounded-lg border border-border bg-card p-5 shadow-sm"><span className="grid size-11 place-items-center rounded-full bg-secondary"><Icon className="size-5 text-primary" /></span><h3 className="mt-7 font-display text-lg font-extrabold">{label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border py-20 sm:py-24">
        <div className="testimonial-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Testimonials"
            eyebrowClassName="text-base"
            title="
"
            copy="Real people from past batches, building real income with what they learned in the room."
          />
          <div className="flex snap-x snap-mandatory items-end justify-center gap-0 overflow-x-auto px-6 pb-10 pt-10 sm:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((testimonial, index) => {
              const { name, handle, quote, video, thumb, stats } = testimonial;
              const offsets = [-12, -6, 0, 6, 12];
              const lifts = [16, 8, 0, 8, 16];
              return (
                <article
                  key={video}
                  className={`w-48 shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card shadow-glow transition-transform duration-300 hover:z-20 hover:-translate-y-2 sm:w-56 lg:w-60 ${
                    index > 0 ? "-ml-7 sm:-ml-9" : ""
                  }`}
                  style={{
                    transform: `rotate(${offsets[index]}deg) translateY(${lifts[index]}px)`,
                    zIndex: index + 1,
                  }}
                >
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground">{name.charAt(0)}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-extrabold text-foreground">{name}</span>
                      <span className="block truncate text-[10px] font-bold text-primary">{handle}</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTestimonial(testimonial)}
                    aria-label={`Play ${name}'s testimonial video`}
                    className="group relative block aspect-[3/4] w-full cursor-pointer overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  >
                    <img src={thumb} alt="" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    <span className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" />
                    <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card/95 text-primary shadow-glow transition-transform group-hover:scale-110">
                      <PlayCircle className="size-7" aria-hidden="true" />
                    </span>
                  </button>
                  <p className="px-3 pt-3 text-[11px] leading-5 text-muted-foreground">“{quote}”</p>
                  <div className="mt-3 flex items-center justify-center gap-2 bg-primary px-3 py-2.5">
                    {stats.map((stat, statIndex) => (
                      <span key={`${video}-${statIndex}`} className="rounded-full border border-primary-foreground/50 px-2.5 py-1 text-[9px] font-extrabold text-primary-foreground sm:text-[10px]">
                        {stat}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <Dialog
            open={selectedTestimonial !== null}
            onOpenChange={(open) => {
              if (!open) setSelectedTestimonial(null);
            }}
          >
            <DialogContent className="w-[calc(100%-2rem)] max-w-sm origin-center gap-3 border-primary/30 bg-card p-3 shadow-glow data-[state=open]:duration-300 data-[state=open]:zoom-in-75 data-[state=closed]:duration-200 data-[state=closed]:zoom-out-75 sm:max-w-md">
              {selectedTestimonial && (
                <>
                  <DialogHeader className="pr-10 text-left">
                    <DialogTitle className="font-display text-xl font-extrabold text-foreground">
                      {selectedTestimonial.name}
                    </DialogTitle>
                    <DialogDescription>Testimonial</DialogDescription>
                  </DialogHeader>
                  <video
                    key={selectedTestimonial.video}
                    src={selectedTestimonial.video}
                    poster={selectedTestimonial.thumb}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    onCanPlay={(event) => {
                      void event.currentTarget.play().catch(() => undefined);
                    }}
                    className="max-h-[72vh] w-full animate-scale-in rounded-md bg-foreground object-contain"
                  />
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Included with your seat" title={<><span className="text-primary">Two bonuses</span> <span className="text-foreground">built for immediate action</span></>} titleClassName="text-primary" />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["Bonus 1", "30 AI Skills & Prompts for Creators", "Tools, prompts, and workflows you can use immediately."],
              ["Bonus 2", "Creator Earning Career Roadmap", "A clear path from content to income that you can follow after the workshop."],
             ].map(([badge, title, text]) => <article key={badge} className="rounded-xl border border-primary/20 bg-card p-7 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-md bg-secondary px-3 py-1 text-xs font-extrabold uppercase text-primary">{badge}</span><Gift className="size-8 text-primary" /></div><h3 className="mt-8 max-w-md font-display text-2xl font-extrabold text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
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
                alt="Vignesh Shanmugasamy, Digital Marketing Trainer and workshop mentor"
                className="aspect-[3/4] h-full w-full rounded-lg object-cover object-top"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase text-primary">Your mentor</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">VIGNESH SHANMUGASAMY</h3>
              <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">Digital Marketing Trainer</span>
              <div className="mt-7 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>
                  Digital marketing and training professional with around <strong className="text-foreground">6+ years</strong> of experience across e-commerce, healthcare, sporting goods, and legal. As a trainer, I focus on practical, industry-oriented learning  helping students understand how digital marketing actually works in the real world through projects, communities, webinars, and hands-on opportunities that make them job-ready.
                </p>
                <p>
                   My core expertise lies in <strong className="text-foreground">Google Ads</strong>, <strong className="text-foreground">Meta Ads</strong>, <strong className="text-foreground">SEO</strong>, <strong className="text-foreground">Social Media Marketing</strong>, and <strong className="text-foreground">Performance Marketing</strong>  with a particular interest in <strong className="text-foreground">CREATOR AND INFLUENCER MARKETING</strong>, from identifying the right creators to planning campaigns and measuring their real impact.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-2">
                <h4 className="font-display text-xl font-extrabold text-foreground">Success in Figures</h4>
                <p className="text-xs font-bold text-primary">Numbers Tell My Story</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["6+", "Years Experience"],
                  ["4+", "Industries"],
                  ["8+", "Core Skills"],
                  ["100s", "Students Trained"],
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{takeaways.map((item, index) => <div key={item} className="flex items-center gap-4 rounded-md border border-border bg-card px-5 py-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">{index + 1}</span><p className="font-display font-bold">{item}</p></div>)}</div>
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
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6"><span className="text-xs font-extrabold uppercase text-primary">ONLY 15 SEATS LEFT</span><h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Your influence can become an income skill.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">{"\n"}</p><div className="mt-8 flex flex-wrap items-center justify-center gap-5"><Button asChild size="lg" className="h-12 bg-primary px-7 font-extrabold text-primary-foreground shadow-action hover:bg-primary/90"><a href={RAZORPAY_URL} target="_blank" rel="noreferrer">Book your seat for ₹79 <ArrowRight /></a></Button><Price /></div></div>
      </section>

      <footer ref={footerRef} className="border-t border-border bg-card py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <Brand />
          <p className="text-xs text-muted-foreground">© 2026 Sisinty Pvt. Ltd. All rights reserved</p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="https://www.digitalacademy360.com/da360-privacy-policy" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="https://www.digitalacademy360.com/terms-conditions" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Terms and Conditions</a>
          </div>
        </div>
      </footer>

      {!footerVisible && <header className="sticky bottom-0 z-40 hidden border-t border-border bg-card/95 shadow-sm backdrop-blur-xl sm:block">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-6">
          <Brand />
          <p className="hidden border-l border-border pl-4 text-xs font-bold text-foreground lg:block">Turn Your Influence Into Income.</p>
          <div className="ml-auto hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-2 text-[11px] leading-tight"><CalendarDays className="size-5 text-primary" /><span><span className="block font-bold text-foreground">26th September</span><span className="block text-muted-foreground">11 AM Onwards</span></span></span>
            <span className="flex items-center gap-2 text-[11px] leading-tight"><MapPin className="size-5 text-primary" /><span><span className="block font-bold text-foreground">JP Nagar,</span><span className="block text-muted-foreground">Bangalore</span></span></span>
            <span className="flex items-center gap-2 text-[11px] leading-tight"><Users className="size-5 text-primary" /><span><span className="block font-bold text-foreground">Limited Seats</span><span className="block text-muted-foreground">Only 5 spots</span></span></span>
          </div>
          <Button asChild size="sm" className="ml-auto h-10 rounded-full bg-primary px-5 font-extrabold text-primary-foreground hover:bg-primary/90 md:ml-0"><a href={RAZORPAY_URL} target="_blank" rel="noreferrer">Book for ₹79 <ArrowRight /></a></Button>
        </div>
      </header>}

<div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl sm:hidden"><div><p className="text-[10px] font-bold uppercase text-muted-foreground">3-hour workshop</p><Price /></div><Button asChild className="bg-primary font-extrabold text-primary-foreground hover:bg-primary/90"><a href={RAZORPAY_URL} target="_blank" rel="noreferrer">Book now <ArrowRight /></a></Button></div>
    </main>
  );
}
