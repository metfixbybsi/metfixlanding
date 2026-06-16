/*
 * BecomeAnAffiliate.tsx
 * MetFix v3 - "Earned Authority" Design System
 * Philosophy: Editorial confidence. Warm intelligence.
 * Colors: #0A0A0A bg, #C9A96E gold accent, #EFEFEF text
 * Fonts: Playfair Display (display), DM Sans (body), DM Mono (labels)
 * Interactions: Gold reveals on hover, translateY lifts, arrow slides
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight, Check, Award, Dumbbell, Globe, MapPin, Users, BookOpen } from "lucide-react";
import { Link } from "wouter";

const AFFILIATE_APPLICATION_URL = "https://metfix.fillout.com/affiliate-application";

function useIsDesktop(breakpoint = 900) {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isDesktop;
}

function AffiliateApplicationForm() {
  return (
    <section id="affiliate-form" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div className="rule"><span className="label-mono">Affiliate Application</span></div>
          <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "0.75rem" }}>
            Ready to{" "}
            <span className="display-serif-italic text-gold">apply?</span>
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(239,239,239,0.45)", maxWidth: "560px", fontWeight: 300 }}>
            Applications are reviewed by the MetFix team within 5 business days.
          </p>
        </div>

        <a href={AFFILIATE_APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Application <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

// ─── Hero image (reuse from homepage)
const AFFILIATE_HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663584830808/YwiuoEuxWg23nCV8GiFWnu/mfv3-community-Pq4JjmJNpqXxFJcxmJVrVW.webp";

// ─── Reveal component
function Reveal({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const cls = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={cls} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Benefit card
function BenefitCard({ icon, title, desc, delay }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="course-card" style={{ height: "100%" }}>
        <div style={{ color: "#C9A96E", marginBottom: "1.25rem" }}>{icon}</div>
        <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "1rem", color: "#fdf6f6", marginBottom: "0.5rem" }}>{title}</div>
        <div style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(239,239,239,0.5)", fontWeight: 300 }}>{desc}</div>
      </div>
    </Reveal>
  );
}

// ─── Step row
function StepRow({ num, title, desc, delay }: {
  num: string;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div style={{
        display: "flex",
        gap: "2rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        alignItems: "flex-start",
      }}>
        <div style={{
          fontFamily: "'DM Mono'",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: "#C9A96E",
          minWidth: "2.5rem",
          paddingTop: "0.2rem",
          flexShrink: 0,
        }}>{num}</div>
        <div>
          <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: "1.05rem", color: "#fdf6f6", marginBottom: "0.4rem" }}>{title}</div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(239,239,239,0.45)", fontWeight: 300 }}>{desc}</div>
        </div>
      </div>
    </Reveal>
  );
}

export default function BecomeAnAffiliate() {
  const isDesktop = useIsDesktop(900);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: "#0A0A0A", color: "#fdf6f6", minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw" }}>

      {/* ═══ NAVIGATION ═══════════════════════════════════════════ */}

      {/* ═══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={AFFILIATE_HERO_IMG} alt="MetFix Affiliate Community" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.88) 50%, rgba(10,10,10,0.4) 100%)" }} />
        </div>
        <div className="container affiliate-hero-content" style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingBottom: "4rem" }}>
          <div style={{ maxWidth: "700px" }}>
            <Reveal>
              <div className="rule">
                <span className="label-mono">MetFix Affiliate Program</span>
              </div>
              <h1 className="display-serif" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", marginBottom: "1.75rem" }}>
                Become a{" "}
                <span className="display-serif-italic text-gold">MetFix Affiliate.</span>
              </h1>
              <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", lineHeight: 1.8, color: "rgba(239,239,239,0.65)", maxWidth: "560px", marginBottom: "3rem", fontWeight: 300 }}>
                Join a global network of gyms and coaches who have committed to fighting chronic disease in their communities. MetFix affiliates are the highest-trained metabolic health coaches in the world.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href={AFFILIATE_APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Apply Now <ArrowRight size={15} /></a>
                <a href="#what-you-get" className="btn-outline">See the Benefits</a>
              </div>
            </Reveal>
            <div style={{ marginTop: "4rem", display: "flex", gap: "3rem", flexWrap: "wrap" }}>
              {[
                { num: "Global", label: "Network" },
                { num: "Expert", label: "Education" },
                { num: "Proven", label: "Programming" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "1.4rem", color: "#fdf6f6" }}>{s.num}</div>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.35)", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IT MEANS ══════════════════════════════════════════ */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container section-pad">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "5rem", alignItems: "start" }}>
            <Reveal direction="left">
              <div>
                <div className="rule">
                  <span className="label-mono">What It Means</span>
                </div>
                <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.5rem" }}>
                  Not just a gym.{" "}
                  <span className="display-serif-italic text-gold">A movement.</span>
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(239,239,239,0.6)", marginBottom: "1.5rem", fontWeight: 300 }}>
                  A MetFix Affiliate is a gym, box, or training facility that has been accepted into the MetFix program and committed to implementing MetFix programming in their community. It is not a badge you earn automatically. It is a standard you apply for and uphold.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(239,239,239,0.45)", fontWeight: 300 }}>
                  MetFix affiliates are the front line of a global effort to reverse chronic disease. They are the coaches their communities trust with their health, and they have the education to back it up.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <div style={{ marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "2.5rem", color: "#C9A96E", lineHeight: 1 }}>$167</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <span style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.5)", textTransform: "uppercase" }}>per month</span>
                      <span style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.3)", textTransform: "uppercase" }}>annual commitment</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(239,239,239,0.4)", fontWeight: 300 }}>
                    This is your full affiliate membership fee. It covers your brand license, access to all courses and the complete Resource Library, MetFix app tools, affiliate dashboard, and gym finder listing. There are no additional licensing or access fees.
                  </p>
                </div>
                <div style={{ fontFamily: "'DM Mono'", fontSize: "0.58rem", letterSpacing: "0.12em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.25rem" }}>What Affiliate Membership Includes</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    "Access to all MetFix online courses at no cost",
                    "Complete Resource Library: live streams, journal clubs, articles, whiteboards, book reports",
                    "All live streams and recordings",
                    "Journal clubs, lectures, and events",
                    "Research Notes on all content",
                    "Comments and community access",
                    "MetFix brand license: market as a MetFix location",
                    "Affiliate dashboard and back-end tools",
                    "Special meal planning features and client tracking on the MetFix app",
                    "Revenue sharing when clients purchase courses through your gym",
                    "Affiliate listing on the MetFix gym finder map",
                    "Priority registration for Foundations Seminars",
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      padding: "1rem 1.5rem",
                      background: i % 2 === 0 ? "#111111" : "#0D0D0D",
                      borderLeft: "2px solid #C9A96E",
                    }}>
                      <div style={{ color: "#C9A96E", flexShrink: 0, marginTop: "0.1rem" }}>
                        <Check size={13} />
                      </div>
                      <span style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: "rgba(239,239,239,0.8)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS ═══════════════════════════════════════════════ */}
      <section id="what-you-get" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container section-pad">
          <Reveal>
            <div className="rule">
              <span className="label-mono">Affiliate Benefits</span>
            </div>
            <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1rem", maxWidth: "700px" }}>
              What you get when you{" "}
              <span className="display-serif-italic text-gold">join the network.</span>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(239,239,239,0.5)", maxWidth: "560px", marginBottom: "3.5rem", fontWeight: 300 }}>
              Affiliate status is ongoing access to the tools, community, and education that make MetFix gyms the most effective metabolic health facilities in the world.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            <BenefitCard
              icon={<BookOpen size={22} />}
              title="Exclusive Programming Library"
              desc="Full access to MetFix programming, including a direct link on your website with The Daily Fix: Brain, Body and Belly. Workouts, nutrition protocols, and metabolic health curricula designed for affiliate gyms and medical facilities."
              delay={0}
            />
            <BenefitCard
              icon={<Users size={22} />}
              title="Global Affiliate Community"
              desc="A private network of MetFix affiliate owners, coaches and medical professionals. Share cases, ask questions, and collaborate with the best metabolic health experts in the world."
              delay={80}
            />
            <BenefitCard
              icon={<Award size={22} />}
              title="Affiliate Listing & Referrals"
              desc="Your gym or health center listed on the MetFix affiliate map, the first place people look when searching for a MetFix gym in their area. Organic referrals from the MetFix platform, media and medical referrals."
              delay={160}
            />
            <BenefitCard
              icon={<Dumbbell size={22} />}
              title="Ongoing Education Access"
              desc="Affiliates receive continued access to MetFix classes and specialty tracks. Keeping you up-to-date on the latest research and tools."
              delay={240}
            />
            <BenefitCard
              icon={<Globe size={22} />}
              title="Foundations Seminar Priority"
              desc="Affiliates receive priority registration for MetFix's 2-day, in-person Foundations Seminars and a $500 discount to extend to your coaches. You also have the opportunity to host a seminar at your facility."
              delay={320}
            />
            <BenefitCard
              icon={<MapPin size={22} />}
              title="MetFix Branding Rights"
              desc="Licensed use of MetFix affiliate branding for your gym, website, and marketing materials. Signal to your community that you operate at the highest standard."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* ═══ REQUIREMENTS ═══════════════════════════════════════════ */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container section-pad">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "5rem", alignItems: "start" }}>
            <Reveal direction="left">
              <div>
                <div className="rule">
                  <span className="label-mono">Who Qualifies</span>
                </div>
                <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.5rem" }}>
                  The standard is{" "}
                  <span className="display-serif-italic text-gold">intentionally high.</span>
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(239,239,239,0.6)", marginBottom: "1.5rem", fontWeight: 300 }}>
                  MetFix affiliates represent the MetFix brand in their communities. We take that seriously. The requirements exist to protect the people who walk through your doors and the integrity of the network.
                </p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(239,239,239,0.4)", fontWeight: 300 }}>
                  To apply, you must have completed MetFix Essentials. Start with the free "What Is MetFix?" class if you are new to the curriculum, then enroll in Essentials to qualify.
                </p>
                <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="https://brokenscience.org/our-courses/" target="_blank" rel="noopener noreferrer" className="btn-gold">
                    Enroll in MetFix Essentials <ArrowRight size={13} />
                  </a>
                  <a href="https://whatis.metfix.org/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.75rem" }}>
                    Take the Free Class First
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {[
                    {
                      title: "Operating Gym or Facility",
                      desc: "You must own or operate a gym, box, or medical practice or have permission to open an affiliate inside an existing facility with active members.",
                    },
                    {
                      title: "MetFix Essentials Required",
                      desc: "You must complete MetFix Essentials before applying. It is the foundational curriculum that qualifies you to implement MetFix programming. The Foundations Seminar is strongly recommended for coaches and owners and can be completed after affiliation. Because Foundations offers tactical and practical applications of the material it is helpful to plan to complete this in-person course within a year of affiliation.",
                    },
                    {
                      title: "Commitment to MetFix Programming",
                      desc: "You agree to implement MetFix programming standards and metabolic health education within your facility.",
                    },
                    {
                      title: "Application & Approval",
                      desc: "Affiliate status is granted through a review process. Not all applicants are accepted. We review your facility, your team, and your commitment to the mission.",
                    },
                    {
                      title: "Annual Affiliate Agreement",
                      desc: "Affiliate membership is $167/month with an annual commitment ($2,000/year). Affiliate status is renewed annually. Affiliates who do not maintain programming standards may have their status reviewed.",
                    },
                  ].map((req, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: "1.5rem",
                      padding: "1.75rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      alignItems: "flex-start",
                    }}>
                      <div style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "50%",
                        background: "rgba(201,169,110,0.12)",
                        border: "1px solid rgba(201,169,110,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "0.1rem",
                      }}>
                        <Check size={10} style={{ color: "#C9A96E" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: "0.95rem", color: "#fdf6f6", marginBottom: "0.35rem" }}>{req.title}</div>
                        <div style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(239,239,239,0.45)", fontWeight: 300 }}>{req.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container section-pad">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "5rem", alignItems: "start" }}>
            <Reveal>
              <div>
                <div className="rule">
                  <span className="label-mono">The Process</span>
                </div>
                <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>
                  How to{" "}
                  <span className="display-serif-italic text-gold">become an affiliate.</span>
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(239,239,239,0.5)", fontWeight: 300 }}>
                  The path to affiliate status is straightforward. Most applicants complete the process within a week of submitting their application.
                </p>
              </div>
            </Reveal>
            <div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <StepRow num="01" title="Complete MetFix Essentials" desc="MetFix Essentials is required to apply. Start with the free 'What Is MetFix?' class if you are new, then complete Essentials to qualify. Foundations Seminar is strongly recommended for coaches and owners and can be completed after affiliation." delay={0} />
                <StepRow num="02" title="Submit Your Application" desc="Fill out the affiliate application form. Tell us about your facility, your team, and why you want to bring MetFix to your community." delay={80} />
                <StepRow num="03" title="Application Review" desc="Our team reviews every application. We will review your coaching background, and your commitment to the MetFix mission. This typically takes 5–10 business days." delay={160} />
                <StepRow num="04" title="Affiliate Agreement" desc="Accepted applicants sign the MetFix Affiliate Agreement, which outlines programming standards, branding guidelines, and renewal terms." delay={240} />
                <StepRow num="05" title="Welcome to the Network" desc="You are listed on the MetFix affiliate map, added to the private affiliate community, and given access to the full programming library, ongoing education and tools." delay={320} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ════════════════════════════════════════════ */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container section-pad">
          <Reveal>
            <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "2rem" }}>From the Network</div>
              <blockquote className="testimonial-quote" style={{ marginBottom: "2rem" }}>
                "Before MetFix, I was a good coach. After MetFix, I became the person in my community who could actually explain why people were getting sick and what to do about it. That changed everything about how my gym operates."
              </blockquote>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.3)", textTransform: "uppercase" }}>
                MetFix Affiliate, CrossFit Gym Owner
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ APPLY CTA ══════════════════════════════════════════════ */}
      {/* ═══ APPLICATION FORM ═════════════════════════════════════ */}
      <AffiliateApplicationForm />



         <style>{`
        @media (max-width: 767px) {
          .affiliate-hero-content { padding-top: 5rem !important; padding-bottom: 2rem !important; }
          .affiliate-footer-row { flex-direction: column !important; gap: 1.5rem !important; }
        }
      `}</style>

      {/* ═══ FOOTER ═══════════════════════════════════════════ */}
      <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "3rem", paddingBottom: "2.5rem" }} className="footer-mobile-pad">
        <div className="container">
          <div className="affiliate-footer-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontWeight: 800, fontSize: "1rem", letterSpacing: "0.15em", color: "#fdf6f6", textTransform: "uppercase" }}>MetFix</div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.5rem", letterSpacing: "0.18em", color: "#C9A96E", textTransform: "uppercase" }}>The Metabolic Fix</div>
            </div>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <Link href="/" style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.4)", textDecoration: "none" }}>← Back to Home</Link>
              <a href="https://brokenscience.org/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.4)", textDecoration: "none" }}>Broken Science Initiative</a>
            </div>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.2)", textTransform: "uppercase" }}>
              © 2026 MetFix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <div style={{
        display: isDesktop ? "none" : "flex",
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
        background: "rgba(10,10,10,0.97)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "0.875rem 1.5rem",
        paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))",
        gap: "0.75rem", alignItems: "center",
      }}>
        <a href={AFFILIATE_APPLICATION_URL} target="_blank" rel="noopener noreferrer"
          className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}>
          Apply Now <ArrowRight size={14} />
        </a>
        <Link href="/"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.625rem 1rem", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(239,239,239,0.7)", textDecoration: "none", fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Home
        </Link>
      </div>

    </div>
  );
}
