import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'

const FORM_URL = ''

const curriculum = [
  { tag: 'البداية', title: 'مغارة الكنوز ومفتاح ميراث النبوة', desc: 'رحلة خيالية تفتح للطفل باب حب العلم، وتربط أحلامه الكبيرة بطلب العلم والاقتداء بالأنبياء.' },
  { tag: 'قيمة العلم', title: 'العلم وميراث النبوة', desc: 'يتعرّف الطفل قيمة العلم وفضل طلبه، ولماذا يكون العلم النافع أعظم من المال.' },
  { tag: 'الوقت والتخطيط', title: 'لصوص الوقت الستة', desc: 'يتعرّف على لصوص الوقت الستة، ويتدرّب على التخطيط ليومه وترتيب أولوياته.' },
  { tag: 'الأدب', title: 'أدب طالب العلم', desc: 'الأدب مع المعلم، وبرّ الوالدين، وحسن التعامل مع النفس؛ في مواقف عملية من حياة الطفل.' },
  { tag: 'إصلاح النفس', title: 'إصلاح النفس والتركيز', desc: 'معاني إصلاح النفس، ومجاهدة المشتتات، وحماية التركيز في رحلة طلب العلم.' },
  { tag: 'الهمة العالية', title: 'قدوات صنعت أثرًا', desc: 'نماذج من جابر بن عبدالله، وأبي أيوب الأنصاري، وابن عباس، وأبي هريرة، والإمام الشافعي، وأحمد بن حنبل، والبخاري، والنووي.' },
  { tag: 'التوازن والتتويج', title: 'التوازن الداخلي وختام الرحلة', desc: 'مراجعة ما اكتسبه الطفل، وتثبيت المعاني والعادات، وختام الرحلة بالتتويج.' },
]

const challenges = [
  { icon: '⏱️', title: 'أبطال الـ 25 دقيقة', duration: 'حسب الفئة العمرية', desc: 'تحدي مذاكرة بتركيز لمدة 25 دقيقة، بمهام مناسبة لكل فئة عمرية، مع نشاط يساعد الطفل على الاستمرار.' },
  { icon: '💛', title: 'وبالوالدين إحسانًا', duration: '5 أيام', desc: 'تطبيق عملي لمعاني برّ الوالدين مستلهم من قوله تعالى: ﴿وَبِالْوَالِدَيْنِ إِحْسَانًا﴾ [الإسراء: 23]، من خلال مواقف يومية.' },
  { icon: '🏅', title: 'أسبوع النجاح الذهبي', duration: '7 أيام', desc: 'سبعة أيام من المهام العملية التي تدرب الطفل على الترتيب والتركيز والتعاون والتخطيط والإتقان.' },
  { icon: '🌍', title: 'لو كنت عالمًا في 2040', duration: '6 أيام', desc: 'يتعرّف على عالم مسلم، ويتخيّل أثره في المستقبل، ويشارك فكرته عن العالم الذي يريد أن يكونه.' },
  { icon: '💪', title: 'التوازن الداخلي مع النفس', duration: '6 أيام', desc: 'برنامج يومي للتدرّب على ضبط النفس، وترتيب الأولويات، ومراجعة السلوك والاهتمام بما ينفع.' },
]

const tools = [
  { icon: '📜', title: 'تعهد طالب العلم', desc: 'وثيقة تربوية يوقّع عليها الطفل بنفسه، وفيها التزاماته مع الله ومعلمه ووالديه ونفسه.' },
  { icon: '🕌', title: 'صلاتي حياتي', desc: 'متابعة للصلاة لمدة 30 يومًا، مع أذكار الصباح والمساء والنوم.' },
  { icon: '📅', title: 'مخطط يومي سعيد', desc: 'مخطط يساعد الطفل على ترتيب مهامه ووقت الراحة والمكافأة خلال اليوم.' },
  { icon: '🌟', title: 'جدول التحدي الأسبوعي', desc: 'جدول متابعة أسبوعي من السبت إلى الجمعة، لتنظيم التحديات والمهام اليومية.' },
  { icon: '🎁', title: 'جوائز وهدايا', desc: 'شهادات وجوائز وهدايا تُرسل إلى المنزل للمشاركين الذين يُتمّون التحديات.' },
]

const faqs = [
  { q: 'هل الدورة أونلاين بالكامل؟ وإزاي ابني بيحضر؟', a: 'أيوة، الدورة أونلاين بالكامل. اللقاءات تفاعلية مباشرة، والتسجيلات وملفات PDF وأوراق العمل بتنزل على جروبات المتابعة الخاصة بالدورة.' },
  { q: 'لو عندي طفلين بأعمار مختلفة، هل المحتوى مناسب ليهم؟', a: 'المحتوى مناسب للأعمار من 7 إلى 14 سنة، والأنشطة والتحديات والمجموعات الإشرافية بتتقسم لمستويين: من 7 إلى 10 سنوات، ومن 10 إلى 14 سنة.' },
  { q: 'إزاي بتتم متابعة الطفل؟', a: 'كل مجموعة بيكون ليها مشرف خاص للأولاد أو مشرفة خاصة للبنات، بيتابعوا يوميًا الجداول والتحديات ويشجعوا الأطفال.' },
  { q: 'إيه مدة الدورة؟', a: 'البرنامج يتكوّن من نحو 7 محاضرات تفاعلية، ومع كل محاضرة تحدٍ عملي وجداول يطبقها الطفل في البيت. تفاصيل الجدول الزمني بيشرحها فريق التواصل.' },
  { q: 'إزاي أعرف تفاصيل الاشتراك؟', a: 'سجّل بياناتك من خلال نموذج التسجيل، وفريق المبادرة هيتواصل معاك على الواتساب أو التليفون بكل التفاصيل.' },
]

function RegisterLink({ children, className = 'button button-orange' }: { children: ReactNode; className?: string }) {
  return <a className={className} href={FORM_URL || '#register'}>{children}<span aria-hidden="true">←</span></a>
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
  const [activeFaq, setActiveFaq] = useState<number | null>(0)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const targets = document.querySelectorAll(
      '.section-heading, .problem-card, .insight-card, .about-visual, .about-copy, .journey-card, .challenge-card, .toolkit-copy, .tool-item, .transform-table, .mentor-card, .faq-item, .cta-content'
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
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة" aria-expanded={menuOpen}>☰</button>
          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
            <a href="#about" onClick={closeMenu}>عن الدورة</a>
            <a href="#journey" onClick={closeMenu}>رحلة التعلّم</a>
            <a href="#challenges" onClick={closeMenu}>التحديات</a>
            <a href="#faq" onClick={closeMenu}>الأسئلة الشائعة</a>
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
            <div className="hero-trust"><span className="trust-stars">✦ ✦ ✦</span><span>بإشراف م. علاء حامد</span><i /> <span>تقديم م. عبدالله صبري</span></div>
          </div>
          <div className="hero-art" aria-label="رسم تعليمي لكتاب ومصباح وأدوات تعلم" role="img">
            <div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" />
            <div className="art-star star-a">✦</div><div className="art-star star-b">✧</div><div className="art-star star-c">✦</div>
            <div className="art-note note-top">العلم نور</div>
            <div className="book-scene">
              <div className="book-page page-left"><span /><span /><span /><b>اقرأ</b></div>
              <div className="book-page page-right"><span /><span /><span /><em>✦</em></div>
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

      <section className="intro-strip">
        <div className="container intro-inner">
          <span className="intro-mark">✦</span>
          <p>مش مجرد محاضرات بتتسمع… <strong>دي رحلة بتتحوّل لعادات ومواقف حقيقية جوه البيت.</strong></p>
          <span className="intro-mark">✦</span>
        </div>
      </section>

      <section className="section problem-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">عارفين المشهد ده؟</span>
            <h2>كلنا نفسنا نشوف ولادنا <span className="highlight-word">أحسن</span></h2>
            <p>بس ساعات النصيحة لوحدها مش كفاية… وبتتحول لحوار يومي مرهق.</p>
          </div>
          <div className="problem-grid">
            <article className="problem-card"><span className="problem-icon">📚</span><h3>المذاكرة معركة</h3><p>تأجيل وملل وسرحان، وكل مرة نبدأ من أول وجديد.</p></article>
            <article className="problem-card"><span className="problem-icon">📱</span><h3>الوقت بيتسرّب</h3><p>شاشات وألعاب ومشتتات بتاخد مساحة كبيرة من اليوم.</p></article>
            <article className="problem-card"><span className="problem-icon">🏠</span><h3>التعامل محتاج هدوء</h3><p>تأفف وعصبية وقت الطلبات، ومحتاجين نزرع الأدب بالممارسة.</p></article>
            <article className="problem-card"><span className="problem-icon">🕌</span><h3>الصلاة محتاجة متابعة</h3><p>نفسنا الطفل يتعلّق بصلاته ويهتم بيها من قلبه.</p></article>
          </div>
          <div className="insight-card"><span className="insight-icon">✧</span><p>الطفل مش محتاج أوامر أكتر… محتاج <strong>يفهم، ويقتنع، ويجرّب بنفسه.</strong></p></div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="visual-card">
              <div className="visual-sun">✦</div><div className="visual-path" />
              <div className="visual-book">📖</div><div className="visual-plant">✿</div>
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
            <div className="about-stats">
              <div><strong>7</strong><span>محاضرات تفاعلية</span></div>
              <div><strong>5</strong><span>تحديات عملية</span></div>
              <div><strong>2</strong><span>مستويان عمريان</span></div>
            </div>
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
            <p>كل محطة بتضيف معنى، وكل معنى ليه أثر عملي في يوم الطفل.</p>
          </div>
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
              <div className="challenge-card-top"><span className="challenge-icon">{item.icon}</span><span className="challenge-duration">{item.duration}</span></div>
              <span className="challenge-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.desc}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section toolkit-section">
        <div className="container toolkit-grid">
          <div className="toolkit-copy">
            <span className="eyebrow eyebrow-light">أدوات تساعده يكمل</span>
            <h2>مش هيسمع وبس…<br /><span>هيكتب ويتابع وينجز</span></h2>
            <p>حزمة مطبوعات مبهجة تساعد الطفل يشوف تقدّمه بنفسه، ومعاها متابعة يومية من مشرف أو مشرفة.</p>
            <div className="supervision-note"><span>✦</span><div><strong>متابعة خاصة لكل مجموعة</strong><small>مشرف للأولاد ومشرفة للبنات لمتابعة الجداول والتحديات.</small></div></div>
          </div>
          <div className="toolkit-list">
            {tools.map((item, index) => <article className="tool-item" key={item.title}><span className="tool-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.desc}</p></div><span className="tool-index">0{index + 1}</span></article>)}
          </div>
        </div>
      </section>

      <section className="section transformation-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">الهدف من الرحلة</span>
            <h2>خطوات صغيرة… <span className="highlight-word">وفروق يلاحظها البيت</span></h2>
          </div>
          <div className="transform-table">
            <div className="transform-head"><span>بدل ما يكون…</span><span>نساعده يبقى…</span></div>
            <div className="transform-row"><p>بيأجل المذاكرة وبيزهق بسرعة.</p><p><b>●</b> يبدأ بنفسه جلسة تركيز ويجرب تحدي الـ 25 دقيقة.</p></div>
            <div className="transform-row"><p>يومه بيتقسم بين المشتتات من غير خطة.</p><p><b>●</b> يعرف قيمة وقته ويستخدم مخططه اليومي.</p></div>
            <div className="transform-row"><p>محتاج تذكير مستمر بالأدب والمساعدة.</p><p><b>●</b> يتدرّب على الكلمة الطيبة والمبادرة في البيت.</p></div>
            <div className="transform-row"><p>بينسى يتابع صلاته وأذكاره.</p><p><b>●</b> يستخدم جدول متابعة يساعده يثبت على عاداته.</p></div>
            <div className="transform-row"><p>مش عارف يختار قدوة أو هدف يلهمه.</p><p><b>●</b> يتعرف على نماذج من تاريخنا ويبني طموحه.</p></div>
          </div>
          <p className="transform-footnote">النتائج بتختلف من طفل للتاني، والبرنامج بيقدّم أدوات وتدريب ومتابعة تساعد الأسرة والطفل في رحلة البناء.</p>
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

      <section className="section faq-section" id="faq">
        <div className="container faq-layout">
          <div className="faq-intro"><span className="eyebrow">قبل ما تقدّم</span><h2>عندك سؤال؟<br /><span className="highlight-word">إحنا نوضّحلك.</span></h2><p>جمعنالك إجابات الأسئلة اللي ممكن تيجي في بالك عن تجربة «عالِم».</p><RegisterLink className="button button-blue">اسأل فريقنا وسجّل</RegisterLink></div>
          <div className="faq-list">{faqs.map((item, index) => <article className={activeFaq === index ? 'faq-item active' : 'faq-item'} key={item.q}>
            <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index}><span>{item.q}</span><i>{activeFaq === index ? '−' : '+'}</i></button>
            {activeFaq === index && <p>{item.a}</p>}
          </article>)}</div>
        </div>
      </section>

      <section className="final-cta" id="register">
        <div className="cta-pattern" />
        <div className="container cta-content">
          <span className="eyebrow eyebrow-light">الدفعة الثالثة • دورة عالِم</span>
          <h2>خلّي بداية الحكاية<br /><span>خطوة منك النهارده.</span></h2>
          <p>سجّل بيانات بطلك، وفريق «نشء» هيتواصل معاك بكل تفاصيل الانضمام.</p>
          <RegisterLink>قدّم لبطلك الآن <span>✦</span></RegisterLink>
          <small>للأولاد والبنات من 7 إلى 14 سنة • أونلاين بالكامل</small>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main"><BrandMark light /><p>نزرع قيمة… ونبني همة… ونحيا بنور.</p><a href="https://www.instagram.com/lenahyabnor/" target="_blank" rel="noreferrer">@lenahyabnor ↗</a></div>
        <div className="container footer-bottom"><span>© نشء – لنحيا بنور</span><a href="#top">العودة للأعلى ↑</a></div>
      </footer>
    </main>
  )
}

export default App
