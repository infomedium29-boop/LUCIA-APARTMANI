# Apartmani Lucia — Premium Midnight Coast | Medium29

**Status:** gotovo dizajnersko **demo** izdanje. Statički HTML/CSS/JS, spremno za GitHub + Cloudflare Pages. Nije aktivan sustav online rezervacija.

## Objavi na GitHub + Cloudflare Pages
1. Raspakiraj ZIP i prenesi **sadržaj mape LUCIA-PREMIUM**, a ne samu mapu. Datoteka `index.html` mora biti u korijenu GitHub repozitorija.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → odaberi repo.
3. Production branch = `main`, Framework preset = **None**, Build command = **prazno**, Build output directory = `.` (jedna točka).
4. Klikni **Save and Deploy**. Pregledaj stranicu na `pages.dev` adresi.

## Dizajn / sve što je u ZIP-u
- Midnight Coast: duboka tamnoplava `#0E2835`, petrol `#18394A`, hladna svijetla podloga `#F6F8F8` i champagne detalji `#CBA478`.
- Tipografija Instrument Serif za naslove i Manrope za navigaciju i tekst. Oboje se učitava preko Google Fonts, uz sistemske fallbacke.
- Intro: cjeloviti kadar nadahnut Biogradom, ispis logotipa LUCIA, ručni Skip i ograničenje na jednom po sesiji (s opcijom reduced motion).
- Full-bleed hero: velika pozadinska fotografija, tekst i CTA **preko fotografije bez dodatnih kutija**.
- Floating glass navigacija; cijeli višestranični sajt i mobilni izbornik.
- 39 HTML stranica: hrvatski, engleski i njemački; detalji A-1 do A-4 na svim jezicima, cijene i dostupnost, galerija, okolica, kontakt, pravni nacrti.
- Sve slike su **lokalne AVIF**, s WebP zamjenom, bez vanjskih hotlink fotografija. Galerija ima lightbox, swipe i podršku za tipkovnicu.
- Pripremljen Web3Forms upit, WhatsApp i telefon. Kalendar omogućuje slanje upita s datumima, ali ne predstavlja potvrđenu slobodnu dostupnost.
- Demo je `noindex` i ne smije se automatski indeksirati na tražilicama.

## Važne stvari prije slanja vlasniku
- **SVE fotografije su ilustrativne i konceptualne, uključujući panoramu Biograda i prikaze interijera.** One nisu dokumentarne fotografije točnog grada ili konkretnog objekta. To je oznakom navedeno u galeriji, karticama i podnožju. Prije produkcije moraš zamijeniti svaku sliku autentičnom, s dozvolom vlasnika / fotografa. Popis je u `PHOTO-SOURCES-AND-APPROVAL.csv`.
- Prikazani tipografski logo LUCIA je radni, nije službeni klijentov logo. Zatražiti službeni logo i odobrenje.
- Cijene i stanje slobodnih termina nisu potvrđeni. Na webu se ne prikazuje lažna dostupnost niti izmišljene cijene.
- Podaci o objektu i svim pojedinim apartmanima moraju proći vlasnikovu provjeru.

## Aktivacija Web3Forms upita
Otvori `js/main.js` i na vrhu zamijeni `const WEB3FORMS_ACCESS_KEY = '';` s pravim ključem. Dok je prazan, obrazac **ne šalje e-mail** i jasno ispisuje obavijest, dok WhatsApp, telefon i e-mail poveznice ostaju upotrebljive. Nakon dodavanja ključa obavezno isprobati slanje te provjeriti odredišnu adresu i antispam zaštitu.

## Aktivacija produkcije (nakon potvrde)
- Zamijeniti fotografije originalima u `assets/img/` i pri zamjeni zadržati AVIF + WebP istih naziva, dimenzija / dobrih omjera kadra.
- Potvrditi službeni naziv, površine, kapacitet, balkone/terase, OIB, registracijske podatke, pravila i privatnost.
- Upisati stvarnu domenu u canonical, hreflang i `sitemap.xml` (trenutačno su `https://example.invalid/...` placeholders).
- Ukloniti `noindex` iz `meta robots`, `_headers` i `robots.txt` **isključivo** za odobrenu produkcijsku verziju.
- Testirati e-mail upit i pripremiti pravno ispravne stranice o zaštiti podataka i kolačićima.
- PageSpeed i pristupačnost treba mjeriti na stvarnoj domeni nakon zamjene izvornih fotografija.

## Bitno
Slike interijera namjerno **nisu predstavljene kao stvarni smještaj**, jer vlasnik još nije dostavio izvorne fotografije. To je dizajnerski prototip za odobrenje vizualnog smjera, a ne gotov oglas za turiste.


## Dopuna — stvarne fotografije prema postojećim oglasima (11.11.2026.)
- Izvor 1: https://www.apartmanija.hr/apartmani/biograd-na-moru/apartmani-vila-lucia/987
- Izvor 2 (jasno označene jedinice A-1, A-2 i A-4): https://www.smjestaj.com.hr/biograd/apartmani-lucija/
- Objekt: M. Marulića 3a, Biograd na Moru, kontakt telefon +385 91 240 4046.
- **A-1** je zasebna galerija `apartment_57972`, **A-2** `apartment_57978`, **A-4** `apartment_57980`. Tako izbjegavamo automatsko poistovjećivanje neimenovanih galerija na Apartmaniji (ID 2080, 2079 i 2082) s oznakama A-1/A-2/A-4.
- **A-3** u javnim oglasima nije prikazan kao zasebna dostupna smještajna jedinica s galerijom. Nije mu dodijeljena fotografija tuđeg interijera, već samo vanjski izgled objekta.
- **Važno**: slike s oglasa su **udaljeni URL-ovi (originalni JPEG ili izvorna slika kroz proxy)**, ne lokalni AVIF. U ovom okruženju nije bilo moguće preuzeti binarne izvorne datoteke; u konačnoj javnoj verziji nabavi fotografije od vlasnika, konvertiraj ih lokalno u AVIF/WebP i zamijeni URL-ove.
- Neki portali mogu blokirati prikaz slika na tuđim webovima ili promijeniti URL. Provjeri nakon Cloudflare deploya. Uzrok eventualnih nedostajućih fotografija nije Cloudflare build.
- **Nisu mijenjani hero i intro** koji ostaju ilustrativna panorama, kako bi sačuvali izgled odobrenog premium dizajna. Za stvarnu panoramu Biograda treba pribaviti licenciranu snimku.
- Prije javne uporabe potvrdi pravo na korištenje fotografija s vlasnikom i/ili fotografom. Te fotografije možda nisu slobodne za preuzimanje i daljnju objavu.
- Kompletan pregled linkova: `FOTOGRAFIJE-IZVORI.csv`.
- Za GitHub/Cloudflare: samo zamijeni sadržaj repozitorija, bez build naredbe, output `.`.

- Ako poslužitelj izvora blokira sliku, web pokazuje neutralni brendirani placeholder bez prikaza izmišljenog interijera.
