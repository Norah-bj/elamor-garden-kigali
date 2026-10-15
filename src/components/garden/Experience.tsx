import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Instagram, MapPin, Menu, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collection, gallery, images, messageLink, whatsapp, worlds } from '@/data/garden';

const BotanicalDepth = lazy(() => import('./BotanicalDepth'));
const nav = [{ label: 'Garden', id: 'garden' }, { label: 'Plants', id: 'plants' }, { label: 'Greens', id: 'greens' }, { label: 'Services', id: 'services' }, { label: 'Gifts', id: 'gifts' }];
const directions = 'https://www.google.com/maps/search/?api=1&query=KN+8+Ave+125%2C+Kacyiru%2C+Kigali%2C+Rwanda';

function Action({ href, children, light = false, className = '' }: { href: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return <Button variant={light ? 'gardenLight' : 'garden'} asChild className={className}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}<ArrowUpRight aria-hidden="true" /></a></Button>;
}
function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <a className={`text-link ${light ? 'text-link-light' : ''}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}<ArrowUpRight size={15} aria-hidden="true" /></a>;
}
function Eyebrow({ number, children }: { number: string; children: React.ReactNode }) { return <div className="eyebrow"><span>{number}</span><span>{children}</span></div>; }
function Image({ src, alt, className = '', width = 1400, height = 1000 }: { src: string; alt: string; className?: string; width?: number; height?: number }) { return <img src={src} alt={alt} className={className} width={width} height={height} loading="lazy" />; }

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('garden');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['garden', 'plants', 'greens', 'services', 'gifts'];
      const scrollPos = window.scrollY + 160;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <>
    <nav className={`floating-nav ${scrolled ? 'is-scrolled' : 'at-top'}`} aria-label="Primary navigation">
      <a className="nav-brand" href="#top" aria-label="El Amor Garden, back to top">
        <span className="nav-brand-diamond" aria-hidden="true">◆</span>
        <span>EL AMOR</span>
        <span className="brand-dot">.</span>
      </a>
      <span className="nav-rule" aria-hidden="true" />
      <div className="nav-links">
        {nav.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? 'is-active' : ''}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
      <Button variant="navWhatsApp" asChild className="nav-contact">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <MessageCircle size={14} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </Button>
      <Button
        variant="navIcon"
        size="icon"
        className="mobile-nav-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </Button>
    </nav>
    {open && (
      <div className={`mobile-menu ${scrolled ? 'is-scrolled' : 'at-top'}`}>
        {nav.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => {
              setActiveId(item.id);
              setOpen(false);
            }}
          >
            {item.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
        <a href="#visit" onClick={() => setOpen(false)}>
          Visit the garden
          <ArrowUpRight size={16} />
        </a>
      </div>
    )}
  </>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      el.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - .5) * 13}px`);
      el.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height - .5) * 13}px`);
    };
    const reset = () => { el.style.setProperty('--pointer-x', '0px'); el.style.setProperty('--pointer-y', '0px'); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', reset);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); };
  }, []);
  return <section ref={ref} className="hero" id="top" aria-labelledby="hero-heading">
    <img src={images.hero} className="hero-image" alt="Lush planted courtyard overlooking the hills of Kigali" width={1920} height={1280} fetchPriority="high" />
    <div className="hero-shade" />
    <div className="hero-topline"><span>BOTANICAL LIVING · KIGALI</span><span>EST. IN THE EVERYDAY</span></div>
    <div className="hero-content"><p className="hero-kicker">EL AMOR GARDEN KIGALI</p><h1 id="hero-heading">Greenery is an <em>Art,</em><br /> Life and <em>Love.</em></h1><div className="hero-bottom"><p>Plants, gardens, edible greens and handmade pieces, grown and created in Kigali.</p><div className="hero-actions"><Action href="#garden" light>Explore the Garden</Action><TextLink href={whatsapp} light>Chat on WhatsApp</TextLink></div></div></div>
    <a href="#garden" className="hero-scroll" aria-label="Scroll to discover the garden"><span>SCROLL TO DISCOVER</span><ArrowDown size={15} /></a>
    <span className="hero-index">01 / 06</span>
  </section>;
}

function GardenIntro() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => { if (entries[0]?.isIntersecting) { setInView(true); observer.disconnect(); } }, { rootMargin: '100px' });
    observer.observe(node); return () => observer.disconnect();
  }, []);
  return <section id="garden" className="intro section-shell" aria-labelledby="intro-heading">
    <Eyebrow number="01 / THE GARDEN">AN INVITATION TO GROW</Eyebrow>
    <div className="intro-layout"><div className="intro-copy"><span className="asterisk">✳</span><h2 id="intro-heading">More than<br /><em>plants.</em></h2><p>El Amor Garden brings together greenery, design, cultivation, food, craftsmanship and everyday living.</p><TextLink href="#worlds">Discover our worlds</TextLink></div><div ref={ref} className="intro-visual"><Image src={images.leaf} alt="A close study of richly veined botanical foliage" width={1024} height={1408} />{inView && <div className="webgl-layer" aria-hidden="true"><Suspense fallback={null}><BotanicalDepth /></Suspense></div>}<span className="image-label">A CLOSER LOOK / 01</span></div></div>
  </section>;
}

function ProductWorlds() {
  const [active, setActive] = useState(0);
  return <section id="worlds" className="worlds section-shell" aria-labelledby="worlds-heading">
    <Eyebrow number="02 / DISCOVER">FOUR WAYS INTO EL AMOR</Eyebrow>
    <div className="section-title-row"><h2 id="worlds-heading">Find your way <em>in.</em></h2><p>Move through the things we grow, make and imagine.</p></div>
    <div className="worlds-layout"><div className="world-list">{worlds.map((world, index) => <a key={world.number} href={`#${world.anchor}`} className={`world-row ${active === index ? 'is-active' : ''}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onTouchStart={() => setActive(index)}><span className="world-number">{world.number}</span><span className="world-text"><strong>{world.name}</strong><small>{world.line}</small></span><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>)}</div><div className="world-visual" aria-live="polite">{worlds.map((world, index) => <Image key={world.number} src={world.image} alt={world.name} className={active === index ? 'is-active' : ''} />)}<span className="world-visual-label">EL AMOR / {worlds[active]?.number ?? '01'}</span></div></div>
  </section>;
}

function PlantCollection() {
  const [filter, setFilter] = useState<'All' | 'Indoor' | 'Home & office'>('All');
  const visible = collection.filter(item => filter === 'All' || (filter === 'Indoor' ? item.kind === 'Indoor plants' : item.kind === 'Home & office plants'));
  const rail = useRef<HTMLDivElement>(null);
  return <section id="plants" className="collection section-shell" aria-labelledby="plants-heading"><Eyebrow number="03 / PLANTS">LIVING FORMS</Eyebrow><div className="collection-head"><div><h2 id="plants-heading">The plant <em>collection.</em></h2><p>For rooms, desks, corners and places in between.</p></div><div className="rail-controls"><Button variant="iconLine" size="icon" aria-label="Scroll collection left" onClick={() => rail.current?.scrollBy({ left: -350, behavior: 'smooth' })}><ArrowLeft /></Button><Button variant="iconLine" size="icon" aria-label="Scroll collection right" onClick={() => rail.current?.scrollBy({ left: 350, behavior: 'smooth' })}><ArrowRight /></Button></div></div><div className="filters" aria-label="Filter plants">{(['All', 'Indoor', 'Home & office'] as const).map(option => <Button key={option} variant={filter === option ? 'filterActive' : 'filter'} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</Button>)}</div><div className="collection-rail" ref={rail}>{visible.map((item, index) => <article className="plant-item" key={item.name}><div className="plant-photo"><Image src={item.image} alt={`${item.name} in a planted interior`} width={index === 2 ? 1024 : 912} height={index === 2 ? 1440 : 1200} /><span className="plant-photo-number">0{index + 1}</span></div><div className="plant-meta"><div><span>{item.kind}</span><h3>{item.name}</h3><p>{item.description}</p></div><a href={messageLink(`Hello El Amor Garden, I'm interested in ${item.name}. Could you tell me more about it?`)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${item.name} on WhatsApp`}><ArrowUpRight size={19} /></a></div></article>)}</div><p className="collection-note">Plant availability varies. Ask us what is growing now.</p></section>;
}

function Greens() { return <section id="greens" className="greens-scene" aria-labelledby="greens-heading"><Image src={images.greens} alt="Fresh microgreens, herbs and edible flowers growing together" width={1600} height={1008} /><div className="greens-overlay" /><div className="greens-content"><Eyebrow number="04 / EDIBLE GREENS">FROM GARDEN TO TABLE</Eyebrow><h2 id="greens-heading">Grown for<br /><em>the table.</em></h2><p>Microgreens, herbs and edible flowers for chefs, restaurants and curious home cooks.</p><Action light href={messageLink("Hello El Amor Garden, I'd like to talk about edible greens supply.")}>Talk to us about supply</Action></div><span className="scene-side-note">FRESH / PRECISE / ALIVE</span></section>; }

function Services() { return <section id="services" className="services section-shell" aria-labelledby="services-heading"><Eyebrow number="05 / GARDEN SERVICES">SPACES WITH CHARACTER</Eyebrow><div className="services-layout"><div className="services-main"><div className="services-image"><Image src={images.landscape} alt="Illustrative garden design with layered planting and a stone path" width={1600} height={1104} /><span>THE SPACE, REIMAGINED</span></div></div><div className="services-copy"><h2 id="services-heading">A garden is<br /> never <em>finished.</em></h2><p>It grows into a place of its own.</p><div className="service-steps"><div><span>01</span>Landscaping & garden design</div><div><span>02</span>Plant care consultations</div><div><span>03</span>Garden maintenance</div></div><TextLink href={messageLink("Hello El Amor Garden, I'd like to discuss a garden/landscaping project.")}>Start a Garden Project</TextLink></div></div></section>; }

function TheWork() { return <section className="work section-shell" aria-labelledby="work-heading"><Eyebrow number="06 / THE WORK">A WAY OF SEEING</Eyebrow><div className="section-title-row"><h2 id="work-heading">The <em>Work.</em></h2><p>Spaces and details in conversation with nature.</p></div><div className="work-grid"><figure><div className="work-photo"><Image src={images.work} alt="Illustrative courtyard with plants and sunlit stone steps" width={1408} height={1008} /></div><figcaption><span>01 / THE SPACE</span><span>Where the garden begins</span></figcaption></figure><figure><div className="work-photo"><Image src={images.craft} alt="Handmade baskets and pots in a garden setting" width={1408} height={1104} /></div><figcaption><span>02 / THE DETAILS</span><span>Objects with a story</span></figcaption></figure></div></section>; }

function Gallery() { const rail = useRef<HTMLDivElement>(null); return <section className="gallery-section" aria-labelledby="gallery-heading"><div className="section-shell gallery-heading"><Eyebrow number="07 / FIELD NOTES">SCENES FROM OUR WORLD</Eyebrow><div className="section-title-row"><h2 id="gallery-heading">Look <em>closer.</em></h2><div className="rail-controls"><Button variant="iconLine" size="icon" aria-label="Scroll gallery left" onClick={() => rail.current?.scrollBy({ left: -400, behavior: 'smooth' })}><ArrowLeft /></Button><Button variant="iconLine" size="icon" aria-label="Scroll gallery right" onClick={() => rail.current?.scrollBy({ left: 400, behavior: 'smooth' })}><ArrowRight /></Button></div></div></div><div className="gallery-rail" ref={rail}>{gallery.map((item, index) => <figure key={item.name} className={`gallery-item gallery-item-${index % 3}`}><Image src={item.image} alt={`${item.name} visual story`} /><figcaption><span>0{index + 1} / 06</span>{item.name}</figcaption></figure>)}</div></section>; }

function Gifts() { return <section id="gifts" className="gifts section-shell" aria-labelledby="gifts-heading"><Eyebrow number="08 / MADE IN RWANDA">OBJECTS TO KEEP</Eyebrow><div className="gifts-layout"><div className="gifts-main-image"><Image src={images.craftDetail} alt="Handcrafted pots and woven baskets arranged on stone shelves" width={912} height={1200} /></div><div className="gifts-copy"><span className="gifts-mark">✳</span><h2 id="gifts-heading">Made by hand.<br /><em>Made in Rwanda.</em></h2><p>Baskets, pots, home decoration and gifts with a little more meaning.</p><TextLink href={messageLink("Hello El Amor Garden, I'd like to learn more about your handmade decor and gifts.")}>Ask about gifts</TextLink><div className="gifts-small-image"><Image src={images.craft} alt="Handmade baskets and planters surrounded by greenery" width={1408} height={1104} /></div></div></div></section>; }

function Visit() { return <section id="visit" className="visit section-shell" aria-labelledby="visit-heading"><Eyebrow number="09 / VISIT THE GARDEN">KACYIRU, KIGALI</Eyebrow><div className="visit-layout"><div className="visit-copy"><MapPin size={19} strokeWidth={1.5} aria-hidden="true" /><h2 id="visit-heading">Come see it<br /><em>for yourself.</em></h2><address><strong>El Amor Garden Kigali</strong><br />KN 8 Ave 125<br />Kacyiru, Kigali, Rwanda<br /><a href="tel:+250785211604">+250 785 211 604</a><br /><a href="mailto:elamorgardenrwanda@gmail.com">elamorgardenrwanda@gmail.com</a></address><div className="visit-actions"><Action href={directions}>Get Directions</Action><TextLink href={whatsapp}>Chat on WhatsApp</TextLink></div></div><div className="visit-image"><Image src={images.hero} alt="Illustrative botanical garden courtyard in Kigali" width={1920} height={1280} /><div className="visit-image-label">FIND US IN KACYIRU <ArrowUpRight size={14} /></div></div></div></section>; }

function Closing() { return <><section className="closing" aria-labelledby="closing-heading"><Image src={images.final} alt="Dark sculptural tropical leaves with warm highlights" width={1600} height={1008} /><div className="closing-shade" /><div className="closing-content"><Eyebrow number="10 / STAY A WHILE">THE STORY CONTINUES</Eyebrow><h2 id="closing-heading">Bring a little more<br /><em>green into your world.</em></h2><div className="closing-actions"><Action light href={whatsapp}>Chat on WhatsApp</Action><TextLink light href="https://www.instagram.com/elamorgarden/">Explore Instagram</TextLink></div></div></section><footer className="footer"><div className="footer-top"><div><span className="footer-label">EL AMOR GARDEN KIGALI</span><p>Greenery is an Art,<br /> Life and Love.</p></div><div className="footer-links">{nav.map(item => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}<a href="#visit">Contact</a></div><div className="footer-links"><a href="https://www.instagram.com/elamorgarden/" target="_blank" rel="noopener noreferrer">Instagram <Instagram size={13} /></a><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <MessageCircle size={13} /></a><a href="mailto:elamorgardenrwanda@gmail.com">Email <ArrowUpRight size={13} /></a><span>Kacyiru, Kigali</span></div></div><div className="footer-signature" aria-hidden="true">EL AMOR</div><div className="footer-bottom"><span>© EL AMOR GARDEN KIGALI</span><span>Imagery is illustrative.</span><a href="#top">BACK TO TOP ↑</a></div></footer></>; }

export function Experience() { return <main><Navigation /><Hero /><GardenIntro /><ProductWorlds /><PlantCollection /><Greens /><Services /><TheWork /><Gallery /><Gifts /><Visit /><Closing /></main>; }
