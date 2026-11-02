import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'

const FORM_URL = ''

const iconPaths: Record<string, ReactNode> = {
  timer: <><circle cx="12" cy="13" r="8.5" /><path d="M12 8v5l3 2M9 2h6M12 2v2M19 5l1.5-1.5" /></>,
  heart: <><path d="M20.8 8.8c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" /><path d="M8 12h2l1.2-2.2L13 15l1.2-3H16" /></>,
  medal: <><circle cx="12" cy="8" r="5.5" /><path d="m8.5 13-1 8 4.5-2.5 4.5 2.5-1-8" /><path d="m10 8 1.3 1.3L14 6.8" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  balance: <><path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7ZM8 21h8" /></>,
  scroll: <><path d="M8 4h11a2 2 0 0 1 2 2v13H8a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" /><path d="M5 7a2 2 0 0 1 2-2h1v14H7a2 2 0 0 1-2-2ZM11 9h7M11 13h7" /></>,
  landmark: <><path d="m3 9 9-6 9 6M4 10h16M5 10v9m4-9v9m6-9v9m4-9v9M3 21h18" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h2m4 0h2m-8 3h2" /></>,
  gift: <><rect x="3" y="9" width="18" height="12" rx="2" /><path d="M2 9h20v4H2zM12 9v12M12 9H8.5a2.5 2.5 0 1 1 2.5-2.5V9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5V9Z" /></>,
  book: <><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v17H5.5A2.5 2.5 0 0 0 3 22.5zM21 5.5A2.5 2.5 0 0 0 18.5 3H12v17h6.5a2.5 2.5 0 0 1 2.5 2.5z" /></>,
  books: <><path d="M4 4h5v16H4zM11 3h5v17h-5zM18 6h3v14h-3zM3 21h18" /></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <><path d="M5 12h14" /></>,
  arrow: <><path d="M19 12H5m7 7-7-7 7-7" /></>,
  sparkle: <><path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" /></>,
  quote: <><path d="M3 11h7v7H3zM14 11h7v7h-7z" /><path d="M10 11c0-4 1.5-6 4-7M21 11c0-4 1.5-6 3-7" /></>,
}

function Icon({ name, size = 22, className = '' }: { name: string; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name] ?? iconPaths.sparkle}</svg>
}


const openingMeeting = {
  title: 'مغارة الكنوز ومفتاح ميراث النبوة',
  desc: 'لقاء افتتاحي خيالي يقرّب للطفل معنى طلب العلم، ويربط أحلامه الكبيرة بميراث الأنبياء.',
}

const curriculum = [
  { tag: 'قيمة العلم', title: 'ليه العلم أغلى من الذهب؟', desc: 'خمس أفكار تخلّي الطفل يعرف قيمة العلم النافع وفضله، وإزاي العلم بيكون أعظم من المال.' },
  { tag: 'الوقت والتخطيط', title: 'رأس مالك الحقيقي ولصوص الوقت', desc: 'يكتشف لصوص الوقت الستة، ويتدرّب يرتّب أولوياته ويعمل خطة مناسبة ليومه.' },
  { tag: 'الأدب', title: 'ثلاثية الأدب لطالب العلم', desc: 'يتعلّم الأدب مع المعلم، وبرّ الوالدين، وحسن التعامل مع نفسه، ويحوّل المعاني دي لمواقف يومية.' },
  { tag: 'إصلاح النفس', title: 'إصلاح النفس وحماية التركيز', desc: 'يفهم إزاي إخلاص النية ومراقبة النفس وحفظ اللسان ومقاومة المشتتات يساعدوه يحافظ على تركيزه.' },
  { tag: 'الهمة العالية', title: 'الهمة العالية وقدوات العظماء', desc: 'يتعرّف على علامات الهمة العالية، ويقابل نماذج ملهمة من الصحابة والعلماء: جابر بن عبدالله، وأبو أيوب الأنصاري، وابن عباس، وأبو هريرة، والشافعي، وأحمد بن حنبل، والبخاري، والنووي.' },
  { tag: 'التوازن الداخلي', title: 'التوازن الداخلي مع النفس', desc: 'يراجع العادات اللي اكتسبها، ويتدرّب يضبط نفسه ويرتّب أولوياته ويهتم باللي ينفعه.' },
  { tag: 'ختام الرحلة', title: 'المراجعة وحفل التتويج', desc: 'يراجع إنجازه مع المشرفين، ويشارك في ختام الرحلة وتكريم الأبطال الملتزمين.' },
]

const challenges = [
  { icon: 'timer', title: 'أبطال الـ 25 دقيقة', duration: 'حسب الفئة العمرية', desc: 'السن من 7 لـ 10: يذاكر درس بيحبه 25 دقيقة، وبعدها يرسم شخصية تشجعه. والسن من 10 لـ 14: يختار مادة صعبة، ويركز فيها 25 دقيقة، ويكتب جملة تحفيزية ويرسم بطل الإرادة.' },
  { icon: 'heart', title: 'وبالوالدين إحسانًا', duration: '5 أيام', desc: 'خمسة أيام من التطبيق العملي: ترك التأفف، وخفض الصوت، والكلام الطيب، والمبادرة بخدمة في البيت، والدعاء للوالدين.' },
  { icon: 'medal', title: 'أسبوع النجاح الذهبي', duration: '7 أيام', desc: 'سبع مهام يومية تجمع بين ترتيب المكتب، والتركيز، وتلخيص درس، والتعاون، والتخطيط، والإصرار، والإتقان؛ وفي النهاية لقب «سفير الإتقان والإحسان».' },
  { icon: 'globe', title: 'لو كنت عالمًا في 2040', duration: '6 أيام', desc: 'يبحث عن عالم مسلم من تاريخنا، ويتخيّل التخصص اللي نفسه يبدع فيه سنة 2040، ويسجل فيديو قصير يحكي فيه عن العالم اللي اختاره.' },
  { icon: 'balance', title: 'التوازن الداخلي مع النفس', duration: '6 أيام', desc: 'ستة أيام من التدريب على ضبط النفس وقت الغضب والمشتتات، وترتيب أهم 3 أولويات، وإنجاز مهمة مؤجلة، وكتابة ميثاق شخصي في نهاية البرنامج.' },
]

const tools = [
  { icon: 'scroll', title: 'تعهد طالب العلم', desc: 'وثيقة تربوية بيمضي عليها الطفل بنفسه، وفيها 12 التزامًا مع الله ومعلمه ووالديه ونفسه.' },
  { icon: 'landmark', title: 'صلاتي حياتي', desc: 'جدول متابعة لمدة 30 يومًا للصلوات الخمس وأذكار الصباح والمساء والنوم، مع خانة لاسم المشرف/ة والدرجة النهائية.' },
  { icon: 'calendar', title: 'مخطط يومي سعيد', desc: 'مفكرة يومية لترتيب المهام والوجبات، وكتابة اقتباس محفّز، وتحديد مكافأة بعد الإنجاز.' },
  { icon: 'calendar', title: 'جدول التحدي الأسبوعي', desc: 'جدول من السبت للجمعة لمتابعة أذكار الصباح والمساء، والصلاة، والمذاكرة، ومهمة اليوم البحثية.' },
]

const faqGroups = [
]

function RegisterLink({ children, className = 'button button-orange' }: { children: ReactNode; className?: string }) {
  return <a className={className} href={FORM_URL || '#register'}>{children}<Icon name="arrow" size={16} /></a>
}

function BrandMark({ light = false }: { light?: boolean }) {
  const logo = light
    ? '/data/Official%20Logo%20Nash2%20PNG-02%20(1).png'
    : '/data/Official%20Logo%20Nash2%20PNG-01.png'

  return <a className={light ? 'brand brand-light' : 'brand'} href="#top" aria-label="نشء لنحيا بنور">
    <img className="brand-logo" src={logo} alt="نشء – لنحيا بنور" />
  </a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const targets = document.querySelectorAll(
      '.section-heading, .problem-card, .insight-card, .about-visual, .about-copy, .journey-card, .challenge-card, .toolkit-copy, .tool-item, .mentor-card, .testimonial-card, .cta-content'
    )

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    targets.forEach((target) => target.classList.add('reveal'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="top">
      <header className="site-header">
        <div className="container nav-wrap">
          <BrandMark />
          <button className={menuOpen ? 'menu-toggle is-open' : 'menu-toggle'} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} aria-controls="primary-navigation"><Icon name={menuOpen ? 'close' : 'menu'} size={23} /></button>
          <nav id="primary-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
            <a href="#about" onClick={closeMenu}>عن الدورة</a>
            <a href="#journey" onClick={closeMenu}>رحلة التعلّم</a>
            <a href="#challenges" onClick={closeMenu}>التحديات</a>
            <a href="#impact" onClick={closeMenu}>تجارب المشاركين</a>
            <RegisterLink className="button button-small">قدّم لبطلك</RegisterLink>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> مبادرة نشء • الدفعة الثالثة</div>
            <h1>نزرع اليوم…<br /><span>همةَ عالِم</span> الغد</h1>
            <p className="hero-lead">رحلة تربوية وعملية تساعد ابنك يحب العلم، وينظّم وقته، ويعتز بدينه وأخلاقه.</p>
            <div className="hero-tags"><span>للأولاد والبنات</span><span>من 7 إلى 14 سنة</span><span>أونلاين بالكامل</span></div>
            <div className="hero-actions"><RegisterLink>سجّل بيانات بطلك</RegisterLink><a className="text-link" href="#about">اكتشف تفاصيل الرحلة <span>↓</span></a></div>
            <div className="hero-trust"><span className="trust-stars"><Icon name="sparkle" size={15} /></span><span>بإشراف م. علاء حامد</span><i /> <span>تقديم م. عبدالله صبري عبدالمولى</span></div>
          </div>
          <div className="hero-art" aria-label="رسم تعليمي لكتاب ومصباح وأدوات تعلم" role="img">
            <div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" />
            <div className="art-star star-a"><Icon name="sparkle" /></div><div className="art-star star-b"><Icon name="sparkle" size={15} /></div><div className="art-star star-c"><Icon name="sparkle" size={12} /></div>
            <div className="art-note note-top">العلم نور</div>
            <div className="book-scene">
              <div className="book-page page-left"><span /><span /><span /><b>اقرأ</b></div>
              <div className="book-page page-right"><span /><span /><span /><em><Icon name="sparkle" size={17} /></em></div>
              <div className="book-spine" />
            </div>
            <div className="lamp"><div className="lamp-glow" /><div className="lamp-cap" /><div className="lamp-stem" /><div className="lamp-base" /></div>
            <div className="pencil pencil-one" /><div className="pencil pencil-two" />
            <div className="art-note note-bottom">خطوة صغيرة كل يوم</div>
            <div className="art-cloud cloud-a" /><div className="art-cloud cloud-b" />
          </div>
        </div>
        <div className="hero-bottom-pattern" aria-hidden="true"><span>نَشْء　•　نَشْء　•　نَشْء　•　نَشْء　•　نَشْء</span></div>
      </section>

      <section className="section problem-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">عارفين المشهد ده؟</span>
            <h2>كلنا نفسنا نشوف ولادنا <span className="highlight-word">للأفضل</span></h2>
            <p>بس ساعات النصيحة لوحدها مش كفاية… وبتتحول لحوار يومي مرهق.</p>
          </div>
          <div className="problem-grid">
            <article className="problem-card"><span className="problem-icon"><Icon name="books" size={25} /></span><h3>المذاكرة معركة</h3><p>تأجيل وملل وسرحان، وكل مرة نبدأ من أول وجديد.</p></article>
            <article className="problem-card"><span className="problem-icon"><Icon name="phone" size={25} /></span><h3>الوقت بيتسرّب</h3><p>شاشات وألعاب ومشتتات بتاخد مساحة كبيرة من اليوم.</p></article>
            <article className="problem-card"><span className="problem-icon"><Icon name="home" size={25} /></span><h3>التعامل محتاج هدوء</h3><p>تأفف وعصبية وقت الطلبات، ومحتاجين نزرع الأدب بالممارسة.</p></article>
            <article className="problem-card"><span className="problem-icon"><Icon name="landmark" size={25} /></span><h3>الصلاة محتاجة متابعة</h3><p>نفسنا الطفل يتعلّق بصلاته ويهتم بيها من قلبه.</p></article>
          </div>
          <div className="insight-card"><span className="insight-icon"><Icon name="sparkle" /></span><p>الطفل مش محتاج أوامر أكتر… محتاج <strong>يفهم، ويقتنع، ويجرّب بنفسه.</strong></p></div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="visual-card">
              <div className="visual-sun"><Icon name="sparkle" size={27} /></div><div className="visual-path" />
              <div className="visual-book"><Icon name="book" size={52} /></div><div className="visual-plant"><Icon name="sparkle" size={25} /></div>
              <div className="visual-caption"><strong>رحلة بناء</strong><span>علم • أدب • همة</span></div>
            </div>
            <div className="floating-chip chip-one">قلب يعرف قيمة العلم</div>
            <div className="floating-chip chip-two">عقل يعرف ينظّم وقته</div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">عن دورة عالِم</span>
            <h2>نبدأ من <span className="highlight-word">الجذور</span>… ونحوّل المعاني لتطبيق</h2>
            <p>دورة «عالِم» برنامج تربوي وتدريبي أونلاين تابع لمبادرة «نشء لنحيا بنور». اتقدمت قبل كده مرتين، وبتفتح دلوقتي باب الانضمام للدفعة الثالثة.</p>
            <p>من خلال لقاءات تفاعلية وتحديات مكتوبة، الطفل بيتعلّم عن العلم والوقت والأدب والهمة، وبعدها يطبّق اللي اتعلمه في حياته اليومية.</p>
            <div className="age-levels">
              <div><span className="level-number">01</span><div><strong>من 7 إلى 10 سنوات</strong><small>خيال، رسم، وتشجيع مباشر</small></div></div>
              <div><span className="level-number">02</span><div><strong>من 10 إلى 14 سنة</strong><small>تخطيط ذاتي، تركيز، وضبط النفس</small></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">رحلة التعلّم</span>
            <h2>محطات بتبني <span className="highlight-word">عالِمًا صغيرًا</span></h2>
            <p>بنبدأ بلقاء افتتاحي، وبعده 7 محاضرات تفاعلية بتاخد الطفل خطوة بخطوة.</p>
          </div>
          <article className="opening-meeting-card"><span className="journey-tag">اللقاء الافتتاحي</span><h3>{openingMeeting.title}</h3><p>{openingMeeting.desc}</p></article>
          <div className="journey-grid">
            {curriculum.map((item, index) => <article className="journey-card" key={item.title}>
              <div className="journey-top"><span className="journey-index">{String(index + 1).padStart(2, '0')}</span><span className="journey-tag">{item.tag}</span></div>
              <h3>{item.title}</h3><p>{item.desc}</p>
              <span className="journey-arrow">↙</span>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section challenge-section" id="challenges">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">من الكلام للفعل</span>
            <h2>5 تحديات… <span className="highlight-word">وأثر جوه البيت</span></h2>
            <p>كل تحدٍ بيحوّل فكرة اتعلمها الطفل لخطوات يقدر يعيشها ويشوف أثرها.</p>
          </div>
          <div className="challenge-grid">
            {challenges.map((item, index) => <article className="challenge-card" key={item.title}>
              <div className="challenge-card-top"><span className="challenge-icon"><Icon name={item.icon} size={25} /></span><div className="challenge-meta"><span className="challenge-number">0{index + 1}</span><span className="challenge-duration">{item.duration}</span></div></div>
              <h3>{item.title}</h3><p>{item.desc}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section toolkit-section">
        <div className="container toolkit-grid">
          <div className="toolkit-copy">
            <span className="eyebrow eyebrow-light">4 مطبوعات + متابعة وجوائز</span>
            <h2>مش هيسمع وبس…<br /><span>هيكتب ويتابع وينجز</span></h2>
            <p>أربع مطبوعات تساعد الطفل يتابع تقدّمه بنفسه، ومعاها متابعة يومية من مشرف للأولاد أو مشرفة للبنات.</p>
            <div className="supervision-note"><span><Icon name="sparkle" size={18} /></span><div><strong>متابعة خاصة لكل مجموعة</strong><small>مشرف للأولاد ومشرفة للبنات لمتابعة الجداول والتحديات.</small></div></div>
          </div>
          <div className="toolkit-list">
            {tools.map((item, index) => <article className="tool-item" key={item.title}><span className="tool-icon"><Icon name={item.icon} size={22} /></span><div><h3>{item.title}</h3><p>{item.desc}</p></div><span className="tool-index">0{index + 1}</span></article>)}
          </div>
        </div>
      </section>

      <section className="section mentors-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">صحبة وتوجيه</span><h2>مين هيكون مع <span className="highlight-word">الأبطال</span>؟</h2>
          </div>
          <div className="mentor-grid">
            <article className="mentor-card"><div className="mentor-avatar mentor-avatar-blue">ع</div><div><span className="mentor-role">الإشراف العام</span><h3>م. علاء حامد</h3><p>المشرف العام على مبادرة «نشء لنحيا بنور» وبرامج البناء التربوي والإيماني للنشء.</p></div></article>
            <article className="mentor-card"><div className="mentor-avatar mentor-avatar-orange">ع</div><div><span className="mentor-role">التقديم والمصاحبة التربوية</span><h3>م. عبدالله صبري عبدالمولى</h3><p>مهندس كهرباء باور – جامعة الأزهر، ويقدّم المعاني الإيمانية بأسلوب قصصي وتحديات قريبة من عالم الأطفال.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section testimonials-section" id="impact">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">أثر التجربة</span>
            <h2>مش بس بنحكي عن الأثر… <span className="highlight-word">دي تجاربهم</span></h2>
            <p>كلمات من أطفال وأولياء أمور شاركونا رحلتهم في دورة «عالِم».</p>
          </div>
          <div className="testimonial-grid">
            <article className="testimonial-card testimonial-featured">
              <span className="testimonial-kicker">من أحد الأبطال</span>
              <Icon name="quote" size={25} />
              <p>«الحمد لله بقيت أصلي في وقت الصلاة، واهتميت بالمذاكرة وعرفت قيمة الوقت وأهمية العلم. ولما عرفت إنّي باخد حسنات وأنا بذاكر، بقيت أحب وقت المذاكرة وأهتم بيه.»</p>
              <span className="testimonial-source">مشاركة من أحد الطلاب</span>
            </article>
            <article className="testimonial-card">
              <span className="testimonial-kicker">من ولي أمر</span>
              <Icon name="quote" size={25} />
              <p>«ابني استفاد كتير من الدورة، وحتى أنا كمان استفدت. كان بيستنى وقت المحاضرة، مع إنه مش بيحب يلتزم بحاجة، وزعل جدًا لما الدورة خلصت. وبدأ يهتم بدروسه والمذاكرة ويكون عنده هدف.»</p>
              <span className="testimonial-source">ولي أمر أحد المشاركين</span>
            </article>
            <article className="testimonial-card">
              <span className="testimonial-kicker">رسالة من ولي أمر</span>
              <Icon name="quote" size={25} />
              <p>«كان نفسي الدورة دي تفضل طول السنة مع الأولاد».</p>
              <span className="testimonial-source">ولي أمر أحد المشاركين</span>
            </article>
          </div>
        </div>
      </section>

      <section className="final-cta" id="register">
        <div className="cta-pattern" />
        <div className="container cta-content">
          <span className="eyebrow eyebrow-light">الدفعة الثالثة • دورة عالِم</span>
          <h2>خلّي بداية الحكاية<br /><span>خطوة منك النهارده.</span></h2>
          <p>سجّل بيانات بطلك، وفريق «نشء» هيتواصل معاك بكل تفاصيل الانضمام.</p>
          <RegisterLink>قدّم لبطلك الآن</RegisterLink>
          <small>للأولاد والبنات من 7 إلى 14 سنة • أونلاين بالكامل</small>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main"><BrandMark light /><p>نزرع قيمة… ونبني همة… ونحيا بنور.</p><a href="https://www.instagram.com/lenahyabnor/" target="_blank" rel="noreferrer">@lenahyabnor <Icon name="arrow" size={13} /></a></div>
        <div className="container footer-bottom"><span>© نشء – لنحيا بنور</span><a href="#top">العودة للأعلى <Icon name="arrow" size={13} /></a></div>
      </footer>
    </main>
  )
}

export default App
