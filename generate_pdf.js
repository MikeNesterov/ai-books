const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Polish texts for chapters 3 and 4 (generated inline)
const polishTexts = {
  'Глава 03': {
    'Страница 01': `Joana miała wiele pytań.

Kim jest Tobiasz? Skąd pochodzi jej moc?

Przypomniała sobie starą bibliotekę niedaleko domu.

Może tam znajdzie odpowiedzi?`,

    'Страница 02': `W bibliotece Joana wzięła dużo starych ksiąg.

Bibliotekarka zapytała: — Projekt szkolny?

Joana tylko się uśmiechnęła.`,

    'Страница 03': `W domu Joana zobaczyła dziwną księgę.

Nie brała jej z biblioteki. Skąd się wzięła?

Była stara, w skórzanej okładce, ze złotymi literami.

Palce same wyciągnęły się ku niej.`,

    'Страница 04': `Joana otworzyła księgę.

Nad stronami pojawił się Tobiasz — z niebieskiego światła. Unosił się w powietrzu i powoli się obracał.

Księga pokazywała prawdę.`,

    'Страница 05': `Joana przewróciła stronę. Tobiasz zniknął.

Na jego miejscu pojawiły się złote nicie światła.

To była jej moc! Mogła poruszać rzeczami siłą myśli.

Księga wiedziała o niej wszystko.`,

    'Страница 06': `Joana znalazła najważniejszą stronę.

Pokazywała słabe miejsce Tobiasza — czerwony punkt w centrum jego piersi.

Tam trzeba trafić, żeby go pokonać!`,

    'Страница 07': `Ostatnie strony pokazały trzy kryształy.

Złoty, niebieski i zielony.

Jeden jest już w Łuku Joany. Ale gdzieś na świecie są jeszcze dwa.

Joana zamknęła księgę. Wiedziała, co robić dalej.`
  },
  'Глава 04': {
    'Страница 01': `Joana chciała ćwiczyć swoją moc.

Poszła do zniszczonego parku. Pnącza Tobiasza były tam — słabe, ale żywe.

— Dość czytania — powiedziała. — Czas działać.`,

    'Страница 02': `Park był zniszczony. Ławki wywrócone, asfalt popękany.

Z pęknięć wystawały suche pnącza.

Joana dotknęła jednego. Zadrżało.

Moc Tobiasza wciąż tu była!`,

    'Страница 03': `Joana wywołała Łuk i wystrzeliła w pnącze.

Strzała przeleciała przez nie — jakby pnącza tam nie było.

Joana opuściła Łuk. Dlaczego to nie działa?`,

    'Страница 04': `Joana usiadła na ławce i pomyślała.

Przypomniała sobie słowa z Księgi: "Szukaj korzenia."

Spojrzała na pnącza. Wszystkie rosły z jednego miejsca!

— Nie w gałęzie. W korzeń! — szepnęła.`,

    'Страница 05': `Joana znalazła centrum — węzeł wszystkich korzeni.

Cofnęła się dziesięć kroków. Wycelowała.

Wydech. Strzał!

Strzała wbiła się w środek węzła. Złoty blask popłynął po wszystkich pnączach.

Udało się!`,

    'Страница 06': `Joana uniosła rękę.

Pnącza uniosły się razem z nią!

Opuściła rękę — opadły posłusznie na ziemię.

— Działa! — śmiała się Joana. Teraz rządziła pnączami Tobiasza!`,

    'Страница 07': `Nagle wiatr się zmienił. Zimny i ostry.

Joana podniosła głowę. Nad lasem widać było ciemną postać.

Wysoką. Ciemną. Nieruchomą.

Tobiasz. On poczuł. On idzie.`
  }
};

// Save Polish text files
Object.entries(polishTexts).forEach(([chapter, pages]) => {
  Object.entries(pages).forEach(([page, text]) => {
    const filePath = path.join(__dirname, 'Главы', chapter, page, 'сценарий_pl.md');
    const content = `# ${page.replace('Страница', 'Strona')} — tekst po polsku\n\n${text}\n`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Saved: ' + chapter + '/' + page);
  });
});

console.log('\nAll Polish texts saved. Generating PDF...\n');

// PDF Generation
const doc = new PDFDocument({
  layout: 'landscape',
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  autoFirstPage: false
});

const outputPath = path.join(__dirname, 'Joana_Ksiazka_PL.pdf');
const output = fs.createWriteStream(outputPath);
doc.pipe(output);

const pageW = 841.89;
const pageH = 595.28;
const halfW = pageW / 2;
const textPad = 40;

const fontPath = 'C:\\Windows\\Fonts\\arial.ttf';
const fontBoldPath = 'C:\\Windows\\Fonts\\arialbd.ttf';

const chapterInfo = [
  { dir: 'Глава 01', title: 'Rozdział 1: Przebudzenie Mocy', color: '#2D5A27' },
  { dir: 'Глава 02', title: 'Rozdział 2: Pierwsza Walka', color: '#5A2D2D' },
  { dir: 'Глава 03', title: 'Rozdział 3: Tajemnicza Księga', color: '#2D3A5A' },
  { dir: 'Глава 04', title: 'Rozdział 4: Trening', color: '#5A4A2D' },
];

chapterInfo.forEach(ch => {
  const chDir = path.join(__dirname, 'Главы', ch.dir);
  if (!fs.existsSync(chDir)) return;

  const pages = fs.readdirSync(chDir)
    .filter(p => p.startsWith('Страница'))
    .sort();

  // Chapter title page
  doc.addPage({ layout: 'landscape', size: 'A4' });

  doc.rect(0, 0, pageW, pageH).fill(ch.color);
  doc.font(fontBoldPath)
     .fontSize(42)
     .fillColor('#FFFFFF')
     .text(ch.title, 0, pageH / 2 - 40, { width: pageW, align: 'center' });
  doc.font(fontPath)
     .fontSize(18)
     .fillColor('rgba(255,255,255,0.7)')
     .text('Joana i Duch Lasu', 0, pageH / 2 + 20, { width: pageW, align: 'center' });

  pages.forEach((pg, pgIdx) => {
    const plFile = path.join(chDir, pg, 'сценарий_pl.md');
    const imgFile = path.join(chDir, pg, 'render.png');

    if (!fs.existsSync(plFile) || !fs.existsSync(imgFile)) {
      console.log('Skipping (missing files): ' + ch.dir + '/' + pg);
      return;
    }

    const rawText = fs.readFileSync(plFile, 'utf8');
    const cleanText = rawText
      .split('\n')
      .filter(l => !l.startsWith('#'))
      .join('\n')
      .trim();

    const pageNum = pgIdx + 1;

    doc.addPage({ layout: 'landscape', size: 'A4' });

    // Left half - white background
    doc.rect(0, 0, halfW, pageH).fill('#FAFAF7');

    // Chapter label top
    doc.font(fontPath)
       .fontSize(9)
       .fillColor(ch.color)
       .text(ch.title.toUpperCase() + '  •  STRONA ' + pageNum,
             textPad, 18, { width: halfW - textPad * 2 });

    // Decorative line
    doc.save()
       .moveTo(textPad, 32)
       .lineTo(halfW - textPad, 32)
       .lineWidth(1.5)
       .strokeColor(ch.color)
       .stroke()
       .restore();

    // Main text
    doc.font(fontPath)
       .fontSize(19)
       .fillColor('#1A1A1A')
       .text(cleanText, textPad, 50, {
         width: halfW - textPad * 2,
         lineGap: 7,
         align: 'left'
       });

    // Page number bottom
    doc.font(fontPath)
       .fontSize(10)
       .fillColor('#AAAAAA')
       .text(String(pageNum), textPad, pageH - 25, { width: halfW - textPad * 2, align: 'center' });

    // Right half - image full bleed
    try {
      doc.image(imgFile, halfW, 0, {
        width: halfW,
        height: pageH,
        cover: [halfW, pageH],
        align: 'center',
        valign: 'center'
      });
    } catch (e) {
      console.log('Image error: ' + imgFile + ' — ' + e.message);
      doc.rect(halfW, 0, halfW, pageH).fill('#CCCCCC');
    }

    // Subtle vertical divider
    doc.save()
       .moveTo(halfW, 0)
       .lineTo(halfW, pageH)
       .lineWidth(2)
       .strokeColor('#FFFFFF')
       .stroke()
       .restore();

    console.log('Page done: ' + ch.dir + '/' + pg);
  });
});

doc.end();

output.on('finish', () => {
  console.log('\n✅ PDF saved to: ' + outputPath);
});

output.on('error', (err) => {
  console.error('Error writing PDF:', err);
});
