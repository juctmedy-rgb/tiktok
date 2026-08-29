import { PDFDocument, rgb, StandardFonts, PDFName, PDFDict, PDFArray, PDFString } from 'pdf-lib';
import fs from 'fs';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();

  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const darkBg = rgb(11/255, 14/255, 20/255);
  const tiktokPink = rgb(254/255, 44/255, 85/255);
  const tiktokCyan = rgb(37/255, 244/255, 238/255);
  const textWhite = rgb(1, 1, 1);
  const textLight = rgb(226/255, 232/255, 240/255);
  const textMuted = rgb(148/255, 163/255, 184/255);
  const cardBg = rgb(19/255, 24/255, 36/255);
  const cardBorder = rgb(30/255, 41/255, 59/255);
  const emeraldGreen = rgb(16/255, 185/255, 129/255);
  const amberYellow = rgb(245/255, 158/255, 11/255);

  const targetUrl = 'https://juctmedy-rgb.github.io/tiktok/';

  // Helper function to create clickable link annotation in pdf-lib
  function addLinkAnnotation(page, x, y, width, height, url) {
    const context = pdfDoc.context;
    const linkAnnotation = context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      C: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    });

    const linkAnnotationRef = context.register(linkAnnotation);
    const existingAnnots = page.node.lookup(PDFName.of('Annots'), PDFArray);

    if (existingAnnots) {
      existingAnnots.push(linkAnnotationRef);
    } else {
      page.node.set(PDFName.of('Annots'), context.obj([linkAnnotationRef]));
    }
  }

  // ==========================================
  // PAGE 1: Master Guide & Follower Engine
  // ==========================================
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4 Size
  const { width: pWidth, height: pHeight } = page1.getSize();

  // Background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: pWidth,
    height: pHeight,
    color: darkBg,
  });

  // Top Glow Line
  page1.drawRectangle({
    x: 0,
    y: pHeight - 6,
    width: pWidth,
    height: 6,
    color: tiktokPink,
  });

  // Top Category Pill
  page1.drawRectangle({
    x: 40,
    y: pHeight - 48,
    width: 280,
    height: 24,
    color: rgb(30/255, 41/255, 59/255),
    borderColor: tiktokCyan,
    borderWidth: 1,
  });
  page1.drawText('[PRO 2026] OFFICIAL TIKTOK VIRAL GROWTH GUIDE', {
    x: 48,
    y: pHeight - 40,
    size: 8.5,
    font: helveticaBold,
    color: tiktokCyan,
  });

  // Main Title
  page1.drawText('TIKTOK FOLLOWER BOOSTER', {
    x: 40,
    y: pHeight - 82,
    size: 26,
    font: helveticaBold,
    color: textWhite,
  });
  page1.drawText('& ALGORITHM MASTERY BLUEPRINT', {
    x: 40,
    y: pHeight - 110,
    size: 20,
    font: helveticaBold,
    color: tiktokPink,
  });

  page1.drawText('High-Traffic Viral Strategies, 2-Second Hooks & Free Follower Delivery System', {
    x: 40,
    y: pHeight - 130,
    size: 10.5,
    font: helvetica,
    color: textMuted,
  });

  // Top CTA Box 1
  const cta1Y = pHeight - 210;
  page1.drawRectangle({
    x: 40,
    y: cta1Y,
    width: pWidth - 80,
    height: 65,
    color: cardBg,
    borderColor: tiktokPink,
    borderWidth: 1.5,
  });

  page1.drawText('>>> INSTANT FOLLOWER TOOL: GET UP TO 10,000 FREE FOLLOWERS', {
    x: 55,
    y: cta1Y + 42,
    size: 11,
    font: helveticaBold,
    color: textWhite,
  });
  page1.drawText('No password required * 100% Safe 2026 CDN Delivery * Live Engagement Booster', {
    x: 55,
    y: cta1Y + 26,
    size: 9,
    font: helvetica,
    color: textMuted,
  });

  // Clickable button inside CTA 1
  const btn1W = 160;
  const btn1H = 26;
  const btn1X = pWidth - 40 - btn1W - 15;
  const btn1Y = cta1Y + 18;
  page1.drawRectangle({
    x: btn1X,
    y: btn1Y,
    width: btn1W,
    height: btn1H,
    color: tiktokPink,
  });
  page1.drawText('ACCESS BOOSTER NOW >', {
    x: btn1X + 16,
    y: btn1Y + 8,
    size: 9.5,
    font: helveticaBold,
    color: textWhite,
  });
  addLinkAnnotation(page1, btn1X, btn1Y, btn1W, btn1H, targetUrl);
  addLinkAnnotation(page1, 40, cta1Y, pWidth - 80, 65, targetUrl);

  // Section: High-Volume Search Keywords Covered
  const kwY = pHeight - 330;
  page1.drawRectangle({
    x: 40,
    y: kwY,
    width: pWidth - 80,
    height: 105,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });

  page1.drawText('KEYWORD FOCUS & TOP SEARCH TERMS COVERED IN THIS BLUEPRINT', {
    x: 55,
    y: kwY + 86,
    size: 10,
    font: helveticaBold,
    color: tiktokCyan,
  });

  const keywordsList = [
    '* How to get 10k TikTok followers fast (Creator Rewards Program qualification)',
    '* Free TikTok Follower Generator 2026 (No Password, Organic CDN Routing)',
    '* TikTok FYP (For You Page) Algorithm Secrets & Watch-Through Completion Rate',
    '* High-Retention 2-Second Viral Hooks that stop viewer scrolling instantly',
    '* Trending Viral Hashtag sets with high search volume and low competition',
    '* Best global times to post on TikTok for maximum organic reach'
  ];

  keywordsList.forEach((kw, i) => {
    page1.drawText(kw, {
      x: 55,
      y: kwY + 68 - (i * 12),
      size: 8.5,
      font: helvetica,
      color: textLight,
    });
  });

  // Section: The 4 Pillars of Viral TikTok Explosions
  let curY = kwY - 25;
  page1.drawText('THE 4 PROVEN PILLARS OF RAPID TIKTOK ACCELERATION', {
    x: 40,
    y: curY,
    size: 12.5,
    font: helveticaBold,
    color: textWhite,
  });

  // Pillar 1 Card
  curY -= 65;
  page1.drawRectangle({
    x: 40,
    y: curY,
    width: pWidth - 80,
    height: 55,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page1.drawText('1. The 2-Second Hook Rule (Stop the Scroll)', {
    x: 55,
    y: curY + 38,
    size: 10,
    font: helveticaBold,
    color: amberYellow,
  });
  page1.drawText('TikTok grades your video in the first 2.5 seconds. If 60%+ of viewers scroll past, the FYP halts distribution. Open with controversial questions, pattern interrupts, or high-urgency statements.', {
    x: 55,
    y: curY + 16,
    size: 8,
    font: helvetica,
    color: textMuted,
  });

  // Pillar 2 Card
  curY -= 65;
  page1.drawRectangle({
    x: 40,
    y: curY,
    width: pWidth - 80,
    height: 55,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page1.drawText('2. Retention & Micro-Signals (Saves & Shares = Gold)', {
    x: 55,
    y: curY + 38,
    size: 10,
    font: helveticaBold,
    color: emeraldGreen,
  });
  page1.drawText('A Save (Bookmark) is worth 5x a regular Like in the 2026 ranking engine. Shares outside the app (WhatsApp, iMessage) signal super-virality, prompting the AI engine to push to international feeds.', {
    x: 55,
    y: curY + 16,
    size: 8,
    font: helvetica,
    color: textMuted,
  });

  // Pillar 3 Card
  curY -= 65;
  page1.drawRectangle({
    x: 40,
    y: curY,
    width: pWidth - 80,
    height: 55,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page1.drawText('3. Organic Follower Injection & Authority Seeding', {
    x: 55,
    y: curY + 38,
    size: 10,
    font: helveticaBold,
    color: tiktokCyan,
  });
  page1.drawText('Accounts under 1,000 followers face strict sandbox rate-limits. Utilizing the free 2026 Follower Booster breaks your profile out of the sandbox to unlock TikTok LIVE studio and monetization fast.', {
    x: 55,
    y: curY + 16,
    size: 8,
    font: helvetica,
    color: textMuted,
  });

  // Pillar 4 Card
  curY -= 65;
  page1.drawRectangle({
    x: 40,
    y: curY,
    width: pWidth - 80,
    height: 55,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page1.drawText('4. High-Velocity SEO Tag Stacking', {
    x: 55,
    y: curY + 38,
    size: 10,
    font: helveticaBold,
    color: tiktokPink,
  });
  page1.drawText('Never use 20 random hashtags. Use the 3+2 formula: 3 broad niche authority tags (#fyp, #viral, #niche) + 2 high-intent search tags matching what users type into the TikTok search bar.', {
    x: 55,
    y: curY + 16,
    size: 8,
    font: helvetica,
    color: textMuted,
  });

  // Bottom Big Clickable Banner
  const botBoxY = 40;
  page1.drawRectangle({
    x: 40,
    y: botBoxY,
    width: pWidth - 80,
    height: 75,
    color: rgb(254/255, 44/255, 85/255),
  });

  page1.drawText('>>> CLICK HERE TO OPEN THE FREE ONLINE TOOL <<<', {
    x: pWidth / 2 - 155,
    y: botBoxY + 45,
    size: 12,
    font: helveticaBold,
    color: textWhite,
  });
  page1.drawText('https://juctmedy-rgb.github.io/tiktok/', {
    x: pWidth / 2 - 105,
    y: botBoxY + 25,
    size: 10,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });
  page1.drawText('Tap anywhere on this box to access Follower Booster, Hashtag Generator & Calculator', {
    x: pWidth / 2 - 180,
    y: botBoxY + 10,
    size: 8,
    font: helvetica,
    color: textLight,
  });

  addLinkAnnotation(page1, 40, botBoxY, pWidth - 80, 75, targetUrl);

  // ==========================================
  // PAGE 2: Actionable Templates & Cheat Sheet
  // ==========================================
  const page2 = pdfDoc.addPage([595.28, 841.89]);

  // Background
  page2.drawRectangle({
    x: 0,
    y: 0,
    width: pWidth,
    height: pHeight,
    color: darkBg,
  });

  // Top Glow Line
  page2.drawRectangle({
    x: 0,
    y: pHeight - 6,
    width: pWidth,
    height: 6,
    color: tiktokCyan,
  });

  // Header
  page2.drawText('ACTIONABLE VIRAL HOOK FORMULAS & PEAK SCHEDULES', {
    x: 40,
    y: pHeight - 50,
    size: 14,
    font: helveticaBold,
    color: textWhite,
  });
  page2.drawText('Copy, customize, and deploy these high-converting scripts onto your TikTok videos', {
    x: 40,
    y: pHeight - 68,
    size: 9.5,
    font: helvetica,
    color: textMuted,
  });

  // Section 1: 5 Copy-Paste Viral Hook Formulas
  let p2Y = pHeight - 95;
  page2.drawText('TOP 5 PSYCHOLOGICAL HOOKS PROVEN TO BOOST WATCH TIME', {
    x: 40,
    y: p2Y,
    size: 11,
    font: helveticaBold,
    color: tiktokCyan,
  });

  const hooks = [
    {
      title: 'Hook 1: The Urgent Stop Trigger',
      script: '"If you are posting on TikTok in 2026, STOP doing this one mistake before you get shadowbanned!"',
      why: 'Triggers loss aversion and immediate curiosity.'
    },
    {
      title: 'Hook 2: The Privileged Insider Secret',
      script: '"The hidden algorithm hack that accounts with 1M+ followers never share publicly..."',
      why: 'Promises exclusive advantage, boosting 100% completion rates.'
    },
    {
      title: 'Hook 3: The Rapid Proof Blueprint',
      script: '"How I gained 25,000 real followers in 14 days without spending a single dollar on ads!"',
      why: 'Concrete timeframe + big reward = viral shareability.'
    },
    {
      title: 'Hook 4: The 95% Failure Challenge',
      script: '"95% of creators are setting up their hashtags completely backwards. Check if you do this!"',
      why: 'Challenges the viewers ego and drives comment section debates.'
    },
    {
      title: 'Hook 5: The High-Value Bookmark Call',
      script: '"Save this video immediately, because when you post tonight you will need step #3!"',
      why: 'Instantly drives high-value Save signals to the TikTok AI.'
    },
  ];

  p2Y -= 15;
  hooks.forEach((h) => {
    p2Y -= 52;
    page2.drawRectangle({
      x: 40,
      y: p2Y,
      width: pWidth - 80,
      height: 46,
      color: cardBg,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page2.drawText(h.title, {
      x: 50,
      y: p2Y + 32,
      size: 9,
      font: helveticaBold,
      color: amberYellow,
    });
    page2.drawText(h.script, {
      x: 50,
      y: p2Y + 18,
      size: 8,
      font: helveticaBold,
      color: textWhite,
    });
    page2.drawText(`Why it works: ${h.why}`, {
      x: 50,
      y: p2Y + 6,
      size: 7.5,
      font: helveticaOblique,
      color: textMuted,
    });
  });

  // Section 2: Best Times To Post (Global Windows)
  p2Y -= 30;
  page2.drawText('OPTIMAL GLOBAL POSTING WINDOWS (EST / GMT CONVERTIBLE)', {
    x: 40,
    y: p2Y,
    size: 11,
    font: helveticaBold,
    color: tiktokPink,
  });

  p2Y -= 15;
  const timeCards = [
    { title: 'Morning Commute', time: '7:00 AM - 9:30 AM', desc: 'Best for motivation, quick tips & news' },
    { title: 'Mid-Day Lunch', time: '12:30 PM - 2:30 PM', desc: 'High views for recipes, humor & fashion' },
    { title: 'Prime Evening', time: '6:30 PM - 10:00 PM', desc: 'Longest watch times for story vlogs & gaming' },
  ];

  const tCardW = (pWidth - 80 - 20) / 3;
  timeCards.forEach((tc, idx) => {
    const cx = 40 + idx * (tCardW + 10);
    page2.drawRectangle({
      x: cx,
      y: p2Y - 60,
      width: tCardW,
      height: 55,
      color: cardBg,
      borderColor: cardBorder,
      borderWidth: 1,
    });
    page2.drawText(tc.title, {
      x: cx + 10,
      y: p2Y - 20,
      size: 9,
      font: helveticaBold,
      color: tiktokCyan,
    });
    page2.drawText(tc.time, {
      x: cx + 10,
      y: p2Y - 35,
      size: 10,
      font: helveticaBold,
      color: textWhite,
    });
    page2.drawText(tc.desc, {
      x: cx + 10,
      y: p2Y - 50,
      size: 7.5,
      font: helvetica,
      color: textMuted,
    });
  });

  p2Y -= 80;

  // Section 3: Final Launchpad CTA Box
  const finalCtaY = 40;
  page2.drawRectangle({
    x: 40,
    y: finalCtaY,
    width: pWidth - 80,
    height: 115,
    color: cardBg,
    borderColor: tiktokCyan,
    borderWidth: 2,
  });

  page2.drawText('READY TO BOOST YOUR TIKTOK ACCOUNT TODAY?', {
    x: pWidth / 2 - 150,
    y: finalCtaY + 92,
    size: 12,
    font: helveticaBold,
    color: textWhite,
  });
  page2.drawText('Unlock up to 10,000 real followers, test your profile engagement score,', {
    x: pWidth / 2 - 165,
    y: finalCtaY + 75,
    size: 9,
    font: helvetica,
    color: textLight,
  });
  page2.drawText('and copy 50+ viral hashtag presets directly from our web growth application.', {
    x: pWidth / 2 - 175,
    y: finalCtaY + 62,
    size: 9,
    font: helvetica,
    color: textLight,
  });

  // Big Button
  const fBtnW = 280;
  const fBtnH = 34;
  const fBtnX = pWidth / 2 - fBtnW / 2;
  const fBtnY = finalCtaY + 16;
  page2.drawRectangle({
    x: fBtnX,
    y: fBtnY,
    width: fBtnW,
    height: fBtnH,
    color: tiktokPink,
  });
  page2.drawText('CLICK HERE TO OPEN TIKTOK BOOSTER PRO', {
    x: fBtnX + 18,
    y: fBtnY + 11,
    size: 10,
    font: helveticaBold,
    color: textWhite,
  });

  addLinkAnnotation(page2, fBtnX, fBtnY, fBtnW, fBtnH, targetUrl);
  addLinkAnnotation(page2, 40, finalCtaY, pWidth - 80, 115, targetUrl);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('klmjgnyes.pdf', pdfBytes);

  // Also write to public folder for direct browser download/access
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }
  fs.writeFileSync('public/klmjgnyes.pdf', pdfBytes);

  console.log('PDF generated successfully: klmjgnyes.pdf (Size: ' + pdfBytes.length + ' bytes)');
}

createPdf().catch(console.error);
