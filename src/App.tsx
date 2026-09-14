import React, { useState, useEffect } from 'react';
import {
  SLIDES,
  PILLARS,
  FACTS,
  SOLUTIONS,
  MARQUEE_ITEMS,
  SOCIALS,
  FOOTER_SOLUTIONS
} from './data/content';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openSolution, setOpenSolution] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [sentName, setSentName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: SOLUTIONS[0].title,
    message: ''
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    company?: string;
    message?: string;
  }>({});

  // Slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please tell us your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'We need an email to reply to.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      newErrors.email = "That doesn't look like a valid email.";
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Which company are you with?';
    }
    if (formData.message.trim().length < 20) {
      newErrors.message = 'A sentence or two helps us prepare — 20 characters minimum.';
    }
    return newErrors;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const targetEmail = 'cjkonsultants.nigeria@gmail.com';
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      interest: formData.interest,
      message: formData.message.trim(),
      _subject: `New automation enquiry: ${formData.interest} - ${formData.company.trim()} (${formData.name.trim()})`,
      _replyto: formData.email.trim(),
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const firstName = formData.name.trim().split(' ')[0] || 'Thanks';
        setSentName(firstName);
        setFormSent(true);
        setErrors({});
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      // Fallback to mailto so the user's message is directly addressed to cjkonsultants.nigeria@gmail.com
      const subject = encodeURIComponent(`Automation enquiry: ${formData.interest} - ${formData.company.trim()}`);
      const body = encodeURIComponent(
        `Full Name: ${formData.name.trim()}\nWork Email: ${formData.email.trim()}\nCompany: ${formData.company.trim()}\nArea of Interest: ${formData.interest}\n\nWhat to automate:\n${formData.message.trim()}`
      );
      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      const firstName = formData.name.trim().split(' ')[0] || 'Thanks';
      setSentName(firstName);
      setFormSent(true);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormSent(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      interest: SOLUTIONS[0].title,
      message: ''
    });
    setErrors({});
  };

  const ctaLabel = 'Get a demo';
  const heroKicker = 'AI automation — designed, built and maintained';

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Header */}
      <header
        id="top-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#1d2d3d',
          borderBottom: '1px solid color-mix(in srgb, #f2f2f3 16%, transparent)'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '13px clamp(18px, 4vw, 26px)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px 24px',
            flexWrap: 'wrap',
            color: '#f2f2f3'
          }}
        >
          <a
            href="#top"
            id="nav-logo"
            style={{ display: 'flex', alignItems: 'center', gap: '11px', textDecoration: 'none', color: 'inherit', flex: 'none' }}
          >
            <img
              src="assets/cjk-logo.png"
              alt="CJK Technologies"
              style={{ height: 'clamp(36px, 8vw, 52px)', width: 'auto', display: 'block', flex: 'none' }}
            />
          </a>

          <nav
            id="main-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'safe center',
              gap: 'clamp(16px, 2.2vw, 30px)',
              flexWrap: 'nowrap',
              flex: '1 1 200px',
              minWidth: 0,
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            <a
              href="#about"
              id="nav-link-about"
              style={{
                textDecoration: 'none',
                color: '#f2f2f3',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(16.5px, 1.5vw, 19px)',
                letterSpacing: '.02em',
                flex: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
            >
              About
            </a>
            <a
              href="#solutions"
              id="nav-link-solutions"
              style={{
                textDecoration: 'none',
                color: '#f2f2f3',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(16.5px, 1.5vw, 19px)',
                letterSpacing: '.02em',
                flex: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
            >
              Solutions
            </a>
            <a
              href="#contact"
              id="nav-link-contact"
              style={{
                textDecoration: 'none',
                color: '#f2f2f3',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(16.5px, 1.5vw, 19px)',
                letterSpacing: '.02em',
                flex: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
            >
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            id="nav-cta-btn"
            className="btn btn-primary"
            style={{
              textDecoration: 'none',
              flex: 'none',
              background: 'var(--color-accent-400)',
              color: '#10202e',
              borderColor: 'var(--color-accent-400)',
              fontWeight: 600
            }}
          >
            {ctaLabel}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="top"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#16242f',
          color: '#f2f2f3',
          minHeight: 'min(520px, 84vh)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {SLIDES.map((s, i) => {
          const isActive = i === currentSlide;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 1s ease',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(https://picsum.photos/id/${s.img}/1800/1000)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'grayscale(1) contrast(1.06)',
                  animation: 'cjkKb 14s ease-out both'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(85deg, #16242f 8%, color-mix(in srgb, #16242f 78%, transparent) 46%, color-mix(in srgb, #16242f 34%, transparent) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'repeating-linear-gradient(0deg, color-mix(in srgb, #f2f2f3 6%, transparent) 0 1px, transparent 1px 4px)'
                }}
              />
            </div>
          );
        })}

        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: 'clamp(40px, 6.5vw, 72px) clamp(18px, 4vw, 26px) clamp(40px, 6vw, 64px)',
              width: '100%'
            }}
          >
            <div style={{ maxWidth: '880px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '26px' }}>
                <span style={{ width: '28px', height: '1px', background: 'var(--color-accent-400)' }}></span>
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '11px',
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-300)'
                  }}
                >
                  {heroKicker}
                </span>
              </div>

              <div style={{ display: 'grid', alignItems: 'end' }}>
                {SLIDES.map((s, i) => {
                  const isActive = i === currentSlide;
                  return (
                    <div
                      key={i}
                      style={{
                        gridArea: '1 / 1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'none' : 'translateY(16px)',
                        transition: 'opacity .7s ease, transform .7s ease',
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <h1
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(38px, 5vw, 66px)',
                          lineHeight: 1,
                          letterSpacing: '-.02em',
                          margin: '0 0 20px',
                          textWrap: 'pretty'
                        }}
                      >
                        {s.title}
                      </h1>
                      <p
                        style={{
                          fontSize: 'clamp(15.5px, 3.4vw, 18px)',
                          lineHeight: 1.6,
                          margin: 0,
                          maxWidth: '54ch',
                          color: 'color-mix(in srgb, #f2f2f3 86%, transparent)'
                        }}
                      >
                        {s.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '26px' }}>
                <a
                  href="#contact"
                  id="hero-cta-btn"
                  className="btn btn-primary"
                  style={{
                    textDecoration: 'none',
                    padding: '12px 20px',
                    fontSize: '14.5px',
                    background: 'var(--color-accent-400)',
                    color: '#10202e',
                    borderColor: 'var(--color-accent-400)',
                    fontWeight: 600
                  }}
                >
                  {ctaLabel}
                </a>
                <a
                  href="#solutions"
                  id="hero-solutions-btn"
                  className="btn btn-secondary"
                  style={{
                    textDecoration: 'none',
                    padding: '12px 20px',
                    fontSize: '14.5px',
                    color: '#f2f2f3',
                    borderColor: 'color-mix(in srgb, #f2f2f3 40%, transparent)'
                  }}
                >
                  See our solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div
        style={{
          background: '#1d2d3d',
          color: '#f2f2f3',
          overflow: 'hidden',
          borderBottom: '1px solid color-mix(in srgb, #f2f2f3 14%, transparent)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            width: 'max-content',
            animation: 'cjkMarquee 34s linear infinite'
          }}
        >
          {MARQUEE_ITEMS.map((item, index) => (
            <span
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '13px clamp(16px, 4vw, 26px)',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, #f2f2f3 72%, transparent)',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ width: '5px', height: '5px', background: 'var(--color-accent-400)' }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) clamp(18px, 4vw, 26px)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
            marginBottom: 'clamp(40px, 6vw, 64px)'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10.5px',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)',
                marginBottom: '16px'
              }}
            >
              About us
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1.02,
                letterSpacing: '-.02em',
                margin: 0,
                maxWidth: '20ch',
                textWrap: 'pretty'
              }}
            >
              A pilot is easy. An automation that still works in month nine is the job.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '18px' }}>
            <p
              style={{
                fontSize: 'clamp(15.5px, 3.3vw, 17px)',
                lineHeight: 1.65,
                margin: 0,
                color: 'color-mix(in srgb, var(--color-text) 84%, transparent)'
              }}
            >
              CJK Technologies is an AI automation company. We design, develop, build, deploy and maintain agentic systems for
              companies that need work to happen reliably — across support, sales, marketing and back office.
            </p>
            <p
              style={{
                fontSize: 'clamp(15.5px, 3.3vw, 17px)',
                lineHeight: 1.65,
                margin: 0,
                color: 'color-mix(in srgb, var(--color-text) 84%, transparent)'
              }}
            >
              Every engagement starts with the process, not the model: what the work actually is, where it stalls, and what a good
              outcome looks like in your numbers. We build the smallest system that moves that number, instrument it, and stay on
              to operate it.
            </p>
          </div>
        </div>

        {/* 4 Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
            gap: '1px',
            background: 'var(--color-bg)',
            border: '1px solid var(--color-divider)'
          }}
        >
          {PILLARS.map(p => (
            <div
              key={p.n}
              style={{
                background: 'var(--color-bg)',
                padding: 'clamp(22px, 4vw, 28px) clamp(20px, 3.6vw, 24px) clamp(24px, 4vw, 30px)',
                boxShadow: '0 0 0 1px var(--color-divider)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '10.5px',
                    letterSpacing: '.14em',
                    color: 'var(--color-accent-700)'
                  }}
                >
                  {p.n}
                </span>
                <span style={{ width: '7px', height: '7px', background: 'var(--color-accent)' }} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(22px, 4.6vw, 25px)',
                  margin: '0 0 10px',
                  letterSpacing: '.01em'
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                  color: 'color-mix(in srgb, var(--color-text) 72%, transparent)'
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* How we operate & blueprint image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '28px',
            marginTop: '28px',
            alignItems: 'stretch'
          }}
        >
          <figure
            className="blueprint duotone"
            role="img"
            aria-label="Engineers reviewing an automation workflow"
            style={{
              margin: 0,
              minHeight: 'clamp(220px, 42vw, 340px)',
              backgroundImage: 'url(https://picsum.photos/id/180/1000/700)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />
          </figure>

          <div
            className="blueprint"
            style={{
              padding: 'clamp(22px, 4vw, 30px) clamp(20px, 3.5vw, 28px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              minWidth: 0
            }}
          >
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10.5px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)'
              }}
            >
              How we operate
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 148px), 1fr))',
                gap: '24px 20px'
              }}
            >
              {FACTS.map((f, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(25px, 3.4vw, 30px)',
                      lineHeight: 1.05,
                      letterSpacing: '-.01em',
                      color: 'var(--color-accent-700)',
                      marginBottom: '7px'
                    }}
                  >
                    {f.value}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.45,
                      color: 'color-mix(in srgb, var(--color-text) 70%, transparent)'
                    }}
                  >
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '14.5px',
                lineHeight: 1.6,
                color: 'color-mix(in srgb, var(--color-text) 78%, transparent)',
                borderTop: '1px solid var(--color-divider)',
                paddingTop: '18px'
              }}
            >
              No black boxes: you get the evaluation set, the guardrail policy and the reporting on day one — so you can see what
              the system decided, and why.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" style={{ borderTop: '1px solid var(--color-divider)', background: 'var(--color-surface)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(56px, 8vw, 96px) clamp(18px, 4vw, 26px)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px',
              alignItems: 'end',
              marginBottom: 'clamp(34px, 5vw, 52px)'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '10.5px',
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                  marginBottom: '16px'
                }}
              >
                Our solutions
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  lineHeight: 1.02,
                  letterSpacing: '-.02em',
                  margin: 0,
                  maxWidth: '22ch'
                }}
              >
                Six systems we design, build and operate.
              </h2>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(14.5px, 3.1vw, 15.5px)',
                lineHeight: 1.6,
                color: 'color-mix(in srgb, var(--color-text) 74%, transparent)',
                maxWidth: '44ch'
              }}
            >
              Each one stands alone. Deployed together, they become a single operating layer across the front office and the back
              office. Open a row to see what we deliver.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--color-divider)' }}>
            {SOLUTIONS.map((s, i) => {
              const isOpen = openSolution === i;
              const n = '0' + (i + 1);
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: '1px solid var(--color-divider)',
                    background: isOpen ? 'var(--color-bg)' : 'transparent',
                    transition: 'background .25s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSolution(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 0,
                      padding: 'clamp(20px, 4vw, 24px) 2px',
                      display: 'grid',
                      gridTemplateColumns: 'clamp(26px, 4vw, 62px) minmax(0, 1fr) clamp(30px, 5vw, 40px)',
                      gap: 'clamp(8px, 2vw, 14px)',
                      alignItems: 'center',
                      textAlign: 'left',
                      color: 'inherit',
                      font: 'inherit'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '11px',
                        letterSpacing: '.12em',
                        color: 'var(--color-accent-700)'
                      }}
                    >
                      {n}
                    </span>
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 26px', alignItems: 'baseline', minWidth: 0 }}>
                      <span
                        style={{
                          flex: '1 1 240px',
                          minWidth: 0,
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(21px, 2.1vw, 28px)',
                          lineHeight: 1.1,
                          letterSpacing: '.005em'
                        }}
                      >
                        {s.title}
                      </span>
                      <span
                        style={{
                          flex: '1 1 280px',
                          minWidth: 0,
                          fontSize: '14.5px',
                          lineHeight: 1.55,
                          color: 'color-mix(in srgb, var(--color-text) 70%, transparent)'
                        }}
                      >
                        {s.body}
                      </span>
                    </span>
                    <span
                      style={{
                        justifySelf: 'end',
                        width: 'clamp(30px, 5vw, 34px)',
                        height: 'clamp(30px, 5vw, 34px)',
                        display: 'grid',
                        placeItems: 'center',
                        border: '1px solid var(--color-divider)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '17px',
                        color: 'var(--color-accent-700)',
                        background: isOpen ? 'color-mix(in srgb, var(--color-accent) 16%, transparent)' : 'transparent'
                      }}
                    >
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 2px 30px',
                        display: 'grid',
                        gridTemplateColumns: 'clamp(26px, 4vw, 62px) minmax(0, 1fr)',
                        gap: 'clamp(8px, 2vw, 14px)',
                        animation: 'cjkUp .3s ease both'
                      }}
                    >
                      <span />
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                          gap: '26px'
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: 'ui-monospace, monospace',
                              fontSize: '10px',
                              letterSpacing: '.14em',
                              textTransform: 'uppercase',
                              color: 'color-mix(in srgb, var(--color-text) 58%, transparent)',
                              marginBottom: '14px'
                            }}
                          >
                            What we deliver
                          </div>
                          {s.details.map((d, dIdx) => (
                            <div
                              key={dIdx}
                              style={{ display: 'flex', gap: '11px', fontSize: '14.5px', lineHeight: 1.55, marginBottom: '10px' }}
                            >
                              <span style={{ color: 'var(--color-accent)', flex: 'none' }}>+</span>
                              <span style={{ color: 'color-mix(in srgb, var(--color-text) 82%, transparent)' }}>{d}</span>
                            </div>
                          ))}
                        </div>

                        <div className="blueprint" style={{ padding: 'clamp(18px, 4vw, 22px)', background: 'var(--color-bg)', alignSelf: 'start' }}>
                          <i className="corner tl" />
                          <i className="corner tr" />
                          <i className="corner bl" />
                          <i className="corner br" />
                          <div
                            style={{
                              fontFamily: 'ui-monospace, monospace',
                              fontSize: '10px',
                              letterSpacing: '.14em',
                              textTransform: 'uppercase',
                              color: 'color-mix(in srgb, var(--color-text) 58%, transparent)',
                              marginBottom: '12px'
                            }}
                          >
                            Typical stack
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                            {s.stack.map((tech, tIdx) => (
                              <span key={tIdx} className="tag tag-outline">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div
                            style={{
                              fontFamily: 'ui-monospace, monospace',
                              fontSize: '10px',
                              letterSpacing: '.14em',
                              textTransform: 'uppercase',
                              color: 'color-mix(in srgb, var(--color-text) 58%, transparent)',
                              marginBottom: '8px'
                            }}
                          >
                            Time to first value
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '24px',
                              color: 'var(--color-accent-700)',
                              marginBottom: '20px'
                            }}
                          >
                            {s.ttv}
                          </div>
                          <a href="#contact" className="btn btn-primary btn-block" style={{ textDecoration: 'none' }}>
                            Scope this system
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ borderTop: '1px solid var(--color-divider)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(56px, 8vw, 96px) clamp(18px, 4vw, 26px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(32px, 5vw, 48px)'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10.5px',
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)',
                marginBottom: '16px'
              }}
            >
              Contact us
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1.02,
                letterSpacing: '-.02em',
                margin: '0 0 18px',
                maxWidth: '16ch'
              }}
            >
              Tell us what should be automated.
            </h2>
            <p
              style={{
                fontSize: 'clamp(15px, 3.3vw, 16.5px)',
                lineHeight: 1.65,
                margin: '0 0 clamp(26px, 5vw, 34px)',
                maxWidth: '42ch',
                color: 'color-mix(in srgb, var(--color-text) 80%, transparent)'
              }}
            >
              Thirty minutes is enough to tell whether there is a system worth building. If there isn't, we'll say so.
            </p>

            <div
              style={{
                display: 'grid',
                gap: '1px',
                background: 'var(--color-divider)',
                border: '1px solid var(--color-divider)',
                marginBottom: '30px'
              }}
            >
              <a
                href="mailto:info@cjktechnologies.in"
                id="contact-email-link"
                style={{
                  background: 'var(--color-bg)',
                  padding: '17px clamp(15px, 3.6vw, 20px)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  overflowWrap: 'break-word'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--color-accent) 9%, var(--color-bg))')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-bg)')}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '10px',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: 'color-mix(in srgb, var(--color-text) 56%, transparent)',
                    marginBottom: '5px'
                  }}
                >
                  Email
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(17px, 3.8vw, 20px)',
                    overflowWrap: 'break-word'
                  }}
                >
                  info@cjktechnologies.in
                </span>
              </a>
            </div>

            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--color-text) 56%, transparent)',
                marginBottom: '12px'
              }}
            >
              Social
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="btn btn-secondary"
                  style={{ textDecoration: 'none', fontSize: '13px' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div
            className="blueprint"
            style={{
              padding: 'clamp(22px, 4vw, 34px)',
              alignSelf: 'start',
              minWidth: 0
            }}
          >
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />

            {formSent ? (
              <div style={{ padding: 'clamp(32px, 7vw, 44px) 0', textAlign: 'center', animation: 'cjkUp .35s ease both' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto 20px',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '23px'
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', margin: '0 0 10px' }}>Request received</h3>
                <p
                  style={{
                    margin: '0 auto 24px',
                    maxWidth: '34ch',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: 'color-mix(in srgb, var(--color-text) 74%, transparent)'
                  }}
                >
                  {sentName}, we'll reply within one business day with a proposed agenda for the call.
                </p>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Send another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                action="https://formsubmit.co/cjkonsultants.nigeria@gmail.com"
                method="POST"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_subject"
                  value={`New automation enquiry: ${formData.interest} - ${formData.company || 'Website'}`}
                />

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(23px, 4.8vw, 26px)', margin: '0 0 4px' }}>
                  {ctaLabel}
                </h3>
                <p style={{ margin: '0 0 26px', fontSize: '13.5px', color: 'color-mix(in srgb, var(--color-text) 62%, transparent)' }}>
                  Fields marked * are required. Submissions are delivered directly to our team.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: '16px',
                    marginBottom: '16px'
                  }}
                >
                  <div className="field">
                    <label htmlFor="cjk-name">Full name *</label>
                    <input
                      className="input"
                      id="cjk-name"
                      name="name"
                      type="text"
                      placeholder="Ada Obi"
                      value={formData.name}
                      onChange={e => handleFieldChange('name', e.target.value)}
                    />
                    <div style={{ fontSize: '11.5px', color: '#a13333', minHeight: '16px', marginTop: '4px' }}>
                      {errors.name}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="cjk-email">Work email *</label>
                    <input
                      className="input"
                      id="cjk-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={e => handleFieldChange('email', e.target.value)}
                    />
                    <div style={{ fontSize: '11.5px', color: '#a13333', minHeight: '16px', marginTop: '4px' }}>
                      {errors.email}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="cjk-company">Company *</label>
                    <input
                      className="input"
                      id="cjk-company"
                      name="company"
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={e => handleFieldChange('company', e.target.value)}
                    />
                    <div style={{ fontSize: '11.5px', color: '#a13333', minHeight: '16px', marginTop: '4px' }}>
                      {errors.company}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="cjk-interest">Area of interest</label>
                    <select
                      className="input"
                      id="cjk-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={e => handleFieldChange('interest', e.target.value)}
                    >
                      {SOLUTIONS.map(s => (
                        <option key={s.title} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    <div style={{ minHeight: '16px', marginTop: '4px' }} />
                  </div>
                </div>

                <div className="field" style={{ marginBottom: '8px' }}>
                  <label htmlFor="cjk-message">What would you like to automate? *</label>
                  <textarea
                    className="input"
                    id="cjk-message"
                    name="message"
                    rows={5}
                    placeholder="The process, the volume, and what a good outcome looks like."
                    value={formData.message}
                    onChange={e => handleFieldChange('message', e.target.value)}
                  />
                  <div style={{ fontSize: '11.5px', color: '#a13333', minHeight: '16px', marginTop: '4px' }}>
                    {errors.message}
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-request-btn"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                  style={{
                    padding: '13px',
                    fontSize: '15px',
                    opacity: isSubmitting ? 0.75 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Submitting request...' : ctaLabel}
                </button>
                <p
                  style={{
                    margin: '14px 0 0',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    color: 'color-mix(in srgb, var(--color-text) 56%, transparent)'
                  }}
                >
                  We use your details only to respond to this enquiry. No lists, no sharing.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#16242f', color: '#f2f2f3' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(48px, 7vw, 62px) clamp(18px, 4vw, 26px) 30px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '36px 32px'
          }}
        >
          <div>
            <div style={{ marginBottom: '16px' }}>
              <img
                src="assets/cjk-logo.png"
                alt="CJK Technologies"
                style={{ height: 'clamp(38px, 9vw, 48px)', width: 'auto', display: 'block', maxWidth: '100%' }}
              />
            </div>
            <p
              style={{
                margin: '0 0 22px',
                maxWidth: '36ch',
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: 'color-mix(in srgb, #f2f2f3 68%, transparent)'
              }}
            >
              Design, development, deployment and maintenance of AI automation systems for support, sales, marketing and operations.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    textDecoration: 'none',
                    color: '#f2f2f3',
                    fontSize: '12px',
                    letterSpacing: '.04em',
                    padding: '6px 11px',
                    border: '1px solid color-mix(in srgb, #f2f2f3 26%, transparent)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--color-accent-400)';
                    e.currentTarget.style.color = 'var(--color-accent-300)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'color-mix(in srgb, #f2f2f3 26%, transparent)';
                    e.currentTarget.style.color = '#f2f2f3';
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, #f2f2f3 55%, transparent)',
                marginBottom: '15px'
              }}
            >
              Solutions
            </div>
            <div style={{ display: 'grid', gap: '9px' }}>
              {FOOTER_SOLUTIONS.map(f => (
                <a
                  key={f}
                  href="#solutions"
                  style={{ textDecoration: 'none', color: '#f2f2f3', fontSize: '13.5px' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
                >
                  {f}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, #f2f2f3 55%, transparent)',
                marginBottom: '15px'
              }}
            >
              Company
            </div>
            <div style={{ display: 'grid', gap: '9px' }}>
              <a
                href="#about"
                style={{ textDecoration: 'none', color: '#f2f2f3', fontSize: '13.5px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
              >
                About us
              </a>
              <a
                href="#contact"
                style={{ textDecoration: 'none', color: '#f2f2f3', fontSize: '13.5px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
              >
                Contact us
              </a>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, #f2f2f3 55%, transparent)',
                marginBottom: '15px'
              }}
            >
              Legal
            </div>
            <div style={{ display: 'grid', gap: '9px' }}>
              <a
                href="#contact"
                style={{ textDecoration: 'none', color: '#f2f2f3', fontSize: '13.5px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
              >
                Privacy policy
              </a>
              <a
                href="#contact"
                style={{ textDecoration: 'none', color: '#f2f2f3', fontSize: '13.5px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
              >
                Terms of service
              </a>
              <a
                href="#contact"
                style={{ textDecoration: 'none', color: '#f2f2f3', fontSize: '13.5px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
              >
                Data processing
              </a>
              <a
                href="#contact"
                style={{ textDecoration: 'none', color: '#f2f2f3', fontSize: '13.5px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#f2f2f3')}
              >
                Security
              </a>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(18px, 4vw, 26px) 42px' }}>
          <div
            style={{
              borderTop: '1px solid color-mix(in srgb, #f2f2f3 18%, transparent)',
              paddingTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '22px',
              flexWrap: 'wrap',
              fontSize: '12.5px',
              color: 'color-mix(in srgb, #f2f2f3 62%, transparent)'
            }}
          >
            <span>© 2026 CJK Technologies. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
