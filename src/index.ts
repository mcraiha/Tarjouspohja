// These will be overridden during CI/CD
const typescriptVersion: string = "{0}";
const gitShortHash: string = "{1}";
const buildDate: string = "{2}";

enum Verkkokauppa {
    Tunnistamaton,

    AmazonDOTde,
    CDON,
    ClasOhlson,
    DNA,
    DustinHomeDOTfi,
    Elisa,
    Gigantti,
    Jimms,
    Karkkainen,
    KomponenttikauppaDOTfi,
    MaxGaming,
    Multitronic,
    Power,
    Proshop,
    Rajala,
    ScandinavianPhoto,
    Tehorauta,
    Telia,
    TietokonekauppaDOTfi,
    VeikonKone,
    VerkkokauppaDOTcom,
    XXL,
}

enum Maa {
    Tunnistamaton,

    Suomi,
    Saksa
}

enum ValittuUlostulo {
    EiValintaa,

    BBCode,
    Markdown
}

interface MaaMaaritykset {
    maa: Maa;
    emojiLippu: string;
    genetiivi: string;
}

const maat: ReadonlyArray<MaaMaaritykset> = [
    { maa: Maa.Suomi, emojiLippu: "🇫🇮", genetiivi: "Suomen" },
    { maa: Maa.Saksa, emojiLippu: "🇩🇪", genetiivi: "Saksan" },

    { maa: Maa.Tunnistamaton, emojiLippu: "🏳️", genetiivi: "Tuntemattoman" }
]

interface UlostuloMaaritykset {
    valinta: ValittuUlostulo;
    elementinVanhempiId: string;
    elementinTekstiId: string;
    elementinKopioNappiId: string;
    luoUlostulo: (tuote: string, osoite: string, kauppa: string, voimassa: string, hinta: string, promokoodi: string) => string;
}

const ulostulot: ReadonlyArray<UlostuloMaaritykset> = [
    { valinta: ValittuUlostulo.BBCode, elementinVanhempiId: "bbcodevanhempi", elementinTekstiId: "bbkoodi", elementinKopioNappiId: "kopioibb", luoUlostulo: generoiBBCode },
    { valinta: ValittuUlostulo.Markdown, elementinVanhempiId: "markdownvanhempi", elementinTekstiId: "markdownkoodi", elementinKopioNappiId: "kopioimarkdown", luoUlostulo: generoiMarkdown },
]

interface KauppojenMaaritykset {
    kauppa: Verkkokauppa;
    nimi: string;
    urlit: ReadonlyArray<string>;
    maa: Maa; // Maa ALV:in laskemista varten
    naytaVeroerolaskuri: boolean;
    hintamuokkaus: (hinta: string) => string;
    refTarkistus: (url: string) => boolean;
}

const kaupat: ReadonlyArray<KauppojenMaaritykset> = [
    { kauppa: Verkkokauppa.AmazonDOTde, nimi: "Amazon.de", urlit: ["www.amazon.de", "amazon.de"], maa: Maa.Saksa, naytaVeroerolaskuri: true, hintamuokkaus: eiHintamuokkausta, refTarkistus: etsiRefTagia},
    { kauppa: Verkkokauppa.CDON, nimi: "CDON", urlit: ["cdon.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.ClasOhlson, nimi: "Clas Ohlson", urlit: ["www.clasohlson.com", "clasohlson.com"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.DNA, nimi: "DNA", urlit: ["kauppa4.dna.fi", "dna.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.DustinHomeDOTfi, nimi: "DustinHome.fi", urlit: ["www.dustinhome.fi", "dustinhome.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Elisa, nimi: "Elisa", urlit: ["elisa.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Gigantti, nimi: "Gigantti", urlit: ["www.gigantti.fi", "gigantti.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Jimms, nimi: "Jimm's PC-Store", urlit: ["www.jimms.fi", "jimms.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Karkkainen, nimi: "Kärkkäinen", urlit: ["www.karkkainen.com", "karkkainen.com"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.KomponenttikauppaDOTfi, nimi: "Komponenttikauppa.fi", urlit: ["komponenttikauppa.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.MaxGaming, nimi: "MaxGaming", urlit: ["maxgaming.fi", "www.maxgaming.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Multitronic, nimi: "Multitronic", urlit: ["www.multitronic.fi", "multitronic.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Power, nimi: "Power", urlit: ["www.power.fi", "power.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Proshop, nimi: "Proshop", urlit: ["www.proshop.fi", "proshop.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Rajala, nimi: "Rajala", urlit: ["www.rajalacamera.fi", "rajalacamera.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.ScandinavianPhoto, nimi: "Scandinavian Photo", urlit: ["www.scandinavianphoto.fi", "scandinavianphoto.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Tehorauta, nimi: "Tehorauta", urlit: ["www.tehorauta.fi", "tehorauta.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.Telia, nimi: "Telia", urlit: ["kauppa.telia.fi", "telia.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.TietokonekauppaDOTfi, nimi: "Tietokonekauppa.fi", urlit: ["www.tietokonekauppa.fi", "tietokonekauppa.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.VeikonKone, nimi: "Veikon Kone", urlit: ["www.veikonkone.fi", "veikonkone.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.VerkkokauppaDOTcom, nimi: "Verkkokauppa.com", urlit: ["www.verkkokauppa.com", "verkkokauppa.com"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
    { kauppa: Verkkokauppa.XXL, nimi: "XXL", urlit: ["www.xxl.fi", "xxl.fi"], maa: Maa.Suomi, naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta, refTarkistus: eiRefTarkistusta},
]

/** 
 * Alustus alkaa
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

const tarjousosoite: HTMLElement = document.getElementById('tarjousosoite')!;
if (tarjousosoite) {
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;
    tarjousosoiteInput.disabled = false;
    tarjousosoite.addEventListener('input', tarkistaUrl);
}

const tarjoustuote: HTMLElement = document.getElementById('tarjoustuote')!;
if (tarjoustuote) {
    const tarjoustuoteInput = <HTMLInputElement>tarjoustuote;
    tarjoustuoteInput.disabled = false;
    tarjoustuote.addEventListener('input', paivitaJosUrlAnnettu);
}

const tarjoushinta: HTMLElement = document.getElementById('tarjoushinta')!;
if (tarjoushinta) {
    const tarjoushintaInput = <HTMLInputElement>tarjoushinta;
    tarjoushintaInput.disabled = false;
    tarjoushinta.addEventListener('input', paivitaJosUrlAnnettu);
}

const promokoodi: HTMLElement = document.getElementById('promokoodi')!;
if (promokoodi) {
    const promokoodiInput = <HTMLInputElement>promokoodi;
    promokoodiInput.disabled = false;
    promokoodi.addEventListener('input', paivitaJosUrlAnnettu);
}

laitaRadiotPaalle('valuutta');
lisaaKuuntelijaRadioille('valuutta', 'input', paivitaJosUrlAnnettu);
lisaaKuuntelijaRadioille('valuutta', 'change', omaValuuttaPaalleTarvittaessa);
const omavaluutta: HTMLElement = document.getElementById('omavaluutta')!;
if (omavaluutta) {
    const omavaluuttaInput = <HTMLInputElement>omavaluutta;
    omavaluuttaInput.addEventListener('input', paivitaJosUrlAnnettu);
}

const tanaan: Date = new Date();
const huominen: Date = new Date();
huominen.setDate(tanaan.getDate() + 1);

asetaOletusPaiva('alkupaiva', tanaan);
asetaOletusPaiva('loppupaiva', huominen);

lisaaKuuntelijaPaivalle('alkupaiva');
lisaaKuuntelijaPaivalle('loppupaiva');

laitaRadiotPaalle('voimassa');
lisaaKuuntelijaRadioille('voimassa', 'input', paivitaJosUrlAnnettu);
lisaaKuuntelijaRadioille('voimassa', 'change', halututPaivienSyototPaalleTarvittaessa);

const kopioibbNappi: HTMLElement = document.getElementById('kopioibb')!;
if (kopioibbNappi) {
    const kopioibbInput = <HTMLInputElement>kopioibbNappi;
    kopioibbInput.onclick = kopioiBB;
}

const kopioimarkdownNappi: HTMLElement = document.getElementById('kopioimarkdown')!;
if (kopioimarkdownNappi) {
    const kopioimarkdownNappiInput = <HTMLInputElement>kopioimarkdownNappi;
    kopioimarkdownNappiInput.onclick = kopioiMarkdown;
}

const httpsNappi: HTMLElement = document.getElementById('lisaahttps')!;
if (httpsNappi) {
    const httpsNappiInput = <HTMLInputElement>httpsNappi;
    httpsNappiInput.onclick = lisaaHTTPSOsoitteeseen;
}

const httpNappi: HTMLElement = document.getElementById('lisaahttp')!;
if (httpNappi) {
    const httpNappiInput = <HTMLInputElement>httpNappi;
    httpNappiInput.onclick = lisaaHTTPOsoitteeseen;
}

const kohdemaanalv: HTMLElement = document.getElementById('kohdemaanalv')!;
if (kohdemaanalv) {
    const kohdemaanalvInput = <HTMLInputElement>kohdemaanalv;
    kohdemaanalvInput.addEventListener('input', paivitaJosUrlAnnettu);
}

const suomenalv: HTMLElement = document.getElementById('suomenalv')!;
if (suomenalv) {
    const suomenalvInput = <HTMLInputElement>suomenalv;
    suomenalvInput.addEventListener('input', paivitaJosUrlAnnettu);
}

const bbCodeLinkki: HTMLElement = document.getElementById('bbcodelinkki')!;
if (bbCodeLinkki) {
    const bbCodeLinkkiInput = <HTMLInputElement>bbCodeLinkki;
    bbCodeLinkkiInput.addEventListener('click', () => naytaValittuUlostuloOsio("bbcodevanhempi"));
}

const markdownLinkki: HTMLElement = document.getElementById('markdownlinkki')!;
if (markdownLinkki) {
    const markdownLinkkiInput = <HTMLInputElement>markdownLinkki;
    markdownLinkkiInput.addEventListener('click', () => naytaValittuUlostuloOsio("markdownvanhempi"));
}

const refLinkki: HTMLElement = document.getElementById('reflinkki')!;

const osoiteParametrit: string = window.location.search;
const parametrit: URLSearchParams = new URLSearchParams(osoiteParametrit);

if (parametrit.has('url')) {
    const urlOsa: string = parametrit.get('url')!;
    lueUrlParametriJaAsetaOsoite(teeTurvallinenTeksti(urlOsa));
    generoi();
}

taydennaBuildiTiedot('builditiedot', buildDate, gitShortHash);

/** 
 * Alustus päättyy
 */

export function tarkistaUrl(event: Event): void {
    const annettuOsoite: string = (<HTMLInputElement>event.target).value;
    if (annettuOsoite) {
        if (annettuOsoite.length > 4 && annettuOsoite.indexOf("http") !== 0) {
            httpLisaykset(true);
        } 
        else {
            httpLisaykset(false);
        }

        generoi();
    }
       
}

export function paivitaJosUrlAnnettu(event: Event): void {
    if (onkoTarjousOsoitteessaJotain()) {
        generoi();
    }
}

export function kopioiBB(): void {
    const bbKoodi: HTMLElement = document.getElementById('bbkoodi')!;
    const bbKoodiInput = <HTMLInputElement>bbKoodi;
    bbKoodiInput.select();
    document.execCommand("copy");
}

export function kopioiMarkdown(): void {
    const markdownKoodi: HTMLElement = document.getElementById('markdownkoodi')!;
    const markdownKoodiInput = <HTMLInputElement>markdownKoodi;
    markdownKoodiInput.select();
    document.execCommand("copy");
}

export function tunnistaKauppa(osoite: string): Verkkokauppa {

    try {
        const url = new URL(osoite);
        for (const kauppa of kaupat) {
            for (const urlTunniste of kauppa.urlit) {
                if (url.hostname === urlTunniste) {
                    return kauppa.kauppa;
                }
            }
        }
    } 
    catch (error) {

    }

    return Verkkokauppa.Tunnistamaton;
}

export function etsiKaupanNimi(verkkokauppa: Verkkokauppa): string {
    for (const kauppa of kaupat) {
        if (kauppa.kauppa === verkkokauppa) {
            return kauppa.nimi;
        }
    }

    return "";
}

export function muokkaaHintaaTarvittaessa(verkkokauppa: Verkkokauppa, hinta: string): string {
    for (const kauppa of kaupat) {
        if (kauppa.kauppa === verkkokauppa) {
            return kauppa.hintamuokkaus(hinta);
        }
    }

    return hinta;
}

export function naytaVeroerolaskuriTarvittaessa(verkkokauppa: Verkkokauppa): void {
    for (const kauppa of kaupat) {
        if (kauppa.kauppa === verkkokauppa && kauppa.naytaVeroerolaskuri) {
            veroerolaskuri(true, kauppa.maa);
            return;
        }
    }

    veroerolaskuri(false, Maa.Tunnistamaton);
}

export function onkoVeroerolaskuriKaytossa(): boolean {
    const htmlElementti: HTMLElement = document.getElementById('veroerolaskurivanhempi')!;
    return !htmlElementti.hidden;
}

export function onkoTarjousOsoitteessaJotain(): boolean {
    const tarjousosoite: HTMLElement = document.getElementById('tarjousosoite')!;
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;

    if (tarjousosoiteInput.value === null || tarjousosoiteInput.value === "") {
        return false;
    }

    return true;
}

export function muokkaaTarjousOsoitetta(lisaysAlkuun: string): void {
    const tarjousosoite: HTMLElement = document.getElementById('tarjousosoite')!;
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;
    tarjousosoiteInput.value = lisaysAlkuun + tarjousosoiteInput.value;
}

export function lisaaHTTPSOsoitteeseen(): void {
    muokkaaTarjousOsoitetta("https://");
    httpLisaykset(false);
    generoi();
}

export function lisaaHTTPOsoitteeseen(): void {
    muokkaaTarjousOsoitetta("http://");
    httpLisaykset(false);
    generoi();
}

export function IlmoitaRefereristaTarvittaessa(verkkokauppa: Verkkokauppa, url: string): void {
    for (const kauppa of kaupat) {
        if (kauppa.kauppa === verkkokauppa) {
            const naytaVaroitus: boolean = kauppa.refTarkistus(url);
            naytaRefLinkkiVaroitusTarvittaessa(naytaVaroitus);
        }
    }
}

export function generoi(): void {

    // Tarjousosoitteessa on oltava teksti
    if (!onkoTarjousOsoitteessaJotain()) {
        return;
    }

    const tarjousosoite: HTMLElement = document.getElementById('tarjousosoite')!;
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;
    const turvallinenTarjousOsoite: string = teeTurvallinenTeksti(tarjousosoiteInput.value);

    const kauppa: Verkkokauppa = tunnistaKauppa(tarjousosoiteInput.value);
    const kaupanNimi: string = etsiKaupanNimi(kauppa);

    naytaVeroerolaskuriTarvittaessa(kauppa);

    IlmoitaRefereristaTarvittaessa(kauppa, tarjousosoiteInput.value);

    const tarjoustuote: HTMLElement = document.getElementById('tarjoustuote')!;
    const tarjoustuoteInput = <HTMLInputElement>tarjoustuote;
    const turvallinenTarjousTuote: string = teeTurvallinenTeksti(tarjoustuoteInput.value);

    const tarjoushinta: HTMLElement = document.getElementById('tarjoushinta')!;
    const tarjoushintaInput = <HTMLInputElement>tarjoushinta;
    const tarjoushintaArvo = tarjoushintaInput.value;
    let hinta: string = "";

    const valittuValuutta: string = etsiValittuValuutta();

    if (tarjoushintaArvo !== null && tarjoushintaArvo !== "") {
        if (onkoVeroerolaskuriKaytossa())
        {
            const luettuHinta: number = parseInt(tarjoushintaInput.value);
            if (luettuHinta !== NaN) {
                const kohdemaanAlv: HTMLElement = document.getElementById('kohdemaanalv')!;
                const kohdemaanAlvInput = <HTMLInputElement>kohdemaanAlv;
                const kohdemaanAlvAvattuna: number = 1 + (parseInt(kohdemaanAlvInput.value) / 100);

                const suomenAlv: HTMLElement = document.getElementById('suomenalv')!;
                const suomenAlvInput = <HTMLInputElement>suomenAlv;
                const suomenAlvAvattuna: number = 1 + (parseInt(suomenAlvInput.value) / 100);

                const laskettuHinta: number = parseFloat(tarjoushintaArvo) * suomenAlvAvattuna / kohdemaanAlvAvattuna;
                hinta = pistePilkuksiTarvittaessa(laskettuHinta.toFixed(2).toString());

                const lopullinenhinta: HTMLElement = document.getElementById('lopullinenhinta')!;
                const lopullinenhintaInput = <HTMLInputElement>lopullinenhinta;
                lopullinenhintaInput.value = hinta;

                hinta = lisaaValuuttaHintaan(hinta, valittuValuutta) + " (veroero huomioitu)";
            }
        }
        else
        {
            hinta = pistePilkuksiTarvittaessa(teeTurvallinenTeksti(tarjoushintaInput.value));
            
            hinta = lisaaValuuttaHintaan(hinta, valittuValuutta);

            // Hintaan tarvittaessa muutoksia
            hinta = muokkaaHintaaTarvittaessa(kauppa, hinta);
        }
    }

    let voimassa: string = "";
    const valittuVoimassa: string = etsiValittuVoimassa();

    if (valittuVoimassa === "tanaan") {
        voimassa = "Tänään";
    } else if (valittuVoimassa === "huomiseen") {
        voimassa = "Huomiseen";
    } else if (valittuVoimassa === "eitietoa") {
        voimassa = "Ei tietoa";
    } else if (valittuVoimassa === "asti") {
        const splitted: string[] = jaaPaivaOsiin('loppupaiva');
        if (splitted.length === 3) {
            voimassa = `${splitted[2]}.${splitted[1]}.${splitted[0]} saakka`;
        }
    } else if (valittuVoimassa === "muu") {
        const splittedAlku: string[] = jaaPaivaOsiin('alkupaiva');
        const splittedLoppu: string[] = jaaPaivaOsiin('loppupaiva');
        if (splittedAlku.length === 3 && splittedLoppu.length === 3) {
            voimassa = `${splittedAlku[2]}.${splittedAlku[1]}.${splittedAlku[0]} - ${splittedLoppu[2]}.${splittedLoppu[1]}.${splittedLoppu[0]}`;
        }
    }

    const promokoodi: HTMLElement = document.getElementById('promokoodi')!;
    const promokoodiInput = <HTMLInputElement>promokoodi;
    const turvallinenPromokoodi: string = teeTurvallinenTeksti(promokoodiInput.value);

    const valittuUlosTulo = etsiValittuUlostulo();
    kirjoitaValittuUlostulo(valittuUlosTulo, turvallinenTarjousTuote, turvallinenTarjousOsoite, kaupanNimi, voimassa, hinta, turvallinenPromokoodi);

    laitaUlostulonKopionappiPaalle(valittuUlosTulo);

    const visuaalinen: HTMLElement = document.getElementById('visuaalinen')!;
    visuaalinen.innerHTML = generoiVisuaalinen(turvallinenTarjousTuote, turvallinenTarjousOsoite, kaupanNimi, voimassa, hinta, turvallinenPromokoodi);
}

export function generoiBBCode(tuote: string, osoite: string, kauppa: string, voimassa: string, hinta: string, promokoodi: string): string {

    const osatArray = new Array(`[b]Tuote:[/b] ${tuote}`, `[b]Hinta:[/b] ${hinta}`, `[b]Kauppa:[/b] ${kauppa}`, `[b]Voimassa:[/b] ${voimassa}`, `[b]Linkki:[/b] ${osoite}`);

    if (promokoodi !== null && promokoodi.length > 0) {
        osatArray.push(`[b]Promokoodi:[/b] ${promokoodi}`);
    }

    return osatArray.join("\r\n");
}

export function generoiMarkdown(tuote: string, osoite: string, kauppa: string, voimassa: string, hinta: string, promokoodi: string): string {
    const osatArray = new Array(`**Tuote:** ${tuote}`, `**Hinta:** ${hinta}`, `**Kauppa:** ${kauppa}`, `**Voimassa:** ${voimassa}`, `**Linkki:** ${osoite}`);

    if (promokoodi !== null && promokoodi.length > 0) {
        osatArray.push(`**Promokoodi:** ${promokoodi}`);
    }

    return osatArray.join("\r\n");
}

export function generoiVisuaalinen(tuote: string, osoite: string, kauppa: string, voimassa: string, hinta: string, promokoodi: string): string {

    const osatArray = new Array(`<b>Tuote:</b> ${tuote}`, `<b>Hinta:</b> ${hinta}`, `<b>Kauppa:</b> ${kauppa}`, `<b>Voimassa:</b> ${voimassa}`, `<b>Linkki:</b> <a href="${osoite}">${osoite}</a>`);

    if (promokoodi !== null && promokoodi.length > 0) {
        osatArray.push(`<b>Promokoodi:</b> ${promokoodi}`);
    }

    return osatArray.join("<br>");
}

export function laitaRadiotPaalle(name: string): void {
    const radiot: HTMLElement[] = Array.prototype.slice.call(document.getElementsByName(name));
    if (radiot !== null && radiot.length > 0) {
        for (const radio of radiot) {
            const radioInput = <HTMLInputElement>radio;
            radioInput.disabled = false;
        }
    }
}

export function lisaaKuuntelijaRadioille(nimi: string, kuuntele: string, kuuntelija: (this: HTMLElement, ev: Event) => any): void {
    const radiot: HTMLElement[] = Array.prototype.slice.call(document.getElementsByName(nimi));
    if (radiot !== null && radiot.length > 0) {
        for (const radio of radiot) {
            radio.addEventListener(kuuntele, kuuntelija);
        }
    }
}

export function lisaaKuuntelijaPaivalle(name: string): void {
    const paivaElementti: HTMLElement = document.getElementById(name)!;
    const paivaInput = <HTMLInputElement>paivaElementti;
    paivaInput.addEventListener('input', paivitaJosUrlAnnettu);
}

export function etsiValittuValuutta(): string {
    const radiot: HTMLElement[] = Array.prototype.slice.call(document.getElementsByName('valuutta'));
    
    if (radiot !== null && radiot.length > 0) {
        for (const radio of radiot) {
            const radioInput = <HTMLInputElement>radio;
            if (radioInput.checked) {
                return radioInput.value;
            }
        }
    }

    return "";
}

export function etsiValittuVoimassa(): string {
    const radiot: HTMLElement[] = Array.prototype.slice.call(document.getElementsByName('voimassa'));
    
    if (radiot !== null && radiot.length > 0) {
        for (const radio of radiot) {
            const radioInput = <HTMLInputElement>radio;
            if (radioInput.checked) {
                return radioInput.value;
            }
        }
    }

    return "";
}

export function lueOmaValuutta(): string {
    const omavaluutta: HTMLElement = document.getElementById('omavaluutta')!;
    const omavaluuttaInput = <HTMLInputElement>omavaluutta;
    return teeTurvallinenTeksti(omavaluuttaInput.value);
}

export function omaValuuttaPaalleTarvittaessa(): void {
    const valittuValuutta: string = etsiValittuValuutta();
    const voiSyottaa: boolean = (valittuValuutta === "muu");
    salliOmaValuutta(voiSyottaa);
}

export function salliOmaValuutta(sallittu: boolean) {
    const omavaluutta: HTMLElement = document.getElementById('omavaluutta')!;
    const omavaluuttaInput = <HTMLInputElement>omavaluutta;
    omavaluuttaInput.disabled = !sallittu;
}

export function jaaPaivaOsiin(elementinNimi: string): string[] {
    const paiva: HTMLElement = document.getElementById(elementinNimi)!;
    const paivaInput = <HTMLInputElement>paiva;
    const splitted: string[] = paivaInput.value.split("-");
    return splitted;
}

export function asetaOletusPaiva(elementinNimi: string, paiva: Date): void {
    const paivaElementti: HTMLElement = document.getElementById(elementinNimi)!;
    const paivaInput = <HTMLInputElement>paivaElementti;
    paivaInput.valueAsDate = paiva;
}

export function halututPaivienSyototPaalleTarvittaessa(): void {
    const alkupaivaElementti: HTMLElement = document.getElementById('alkupaiva')!;
    const alkupaivaInput = <HTMLInputElement>alkupaivaElementti;

    const loppupaivaElementti: HTMLElement = document.getElementById('loppupaiva')!;
    const loppupaivaInput = <HTMLInputElement>loppupaivaElementti;

    const valittuVoimassa: string = etsiValittuVoimassa();
    if (valittuVoimassa === "asti") {
        alkupaivaInput.disabled = true;
        loppupaivaInput.disabled = false;
    }
    else if (valittuVoimassa === "muu") {
        alkupaivaInput.disabled = false;
        loppupaivaInput.disabled = false;
    }
    else {
        alkupaivaInput.disabled = true;
        loppupaivaInput.disabled = true;
    }
}

export function eiHintamuokkausta(hinta: string): string {
    return hinta;
}

export function plusVeroero(hinta: string): string {
    return `${hinta} + veroero`;
}

export function lisaaValuuttaHintaan(hinta: string, valuutta: string): string {
    if (valuutta === "euro") {
        hinta += " euroa";
    } else if (valuutta === "dollari") {
        hinta += " dollaria";
    } else if (valuutta === "muu") {
        hinta += " " + lueOmaValuutta();
    }

    return hinta;
}

export function teeTurvallinenTeksti(syote: string): string {
    const poistoon: string[] = ["\\<", "\\>", "\\[", "\\]", '\\"'];
    let muokattava: string = syote;
    
    for (const poisto of poistoon) {
        const poistoRegExp: RegExp = new RegExp(poisto, 'g');
        muokattava = muokattava.replace(poistoRegExp, "");
    }

    return muokattava;
}

export function pistePilkuksiTarvittaessa(syote: string) : string {
    return syote.replace(".", ",");
}

export function httpLisaykset(nakyviin: boolean): void {
    const httpsNappi: HTMLElement = document.getElementById('lisaahttps')!;
    const httpNappi: HTMLElement = document.getElementById('lisaahttp')!;

    httpsNappi.hidden = !nakyviin;
    httpNappi.hidden = !nakyviin;
}

export function veroerolaskuri(nakyviin: boolean, maa: Maa): void {
    const veroerolaskurivanhempi: HTMLElement = document.getElementById('veroerolaskurivanhempi')!;
    veroerolaskurivanhempi.hidden = !nakyviin;

    if (nakyviin) {
        const kohdemaanalvteksti: HTMLElement = document.getElementById('kohdemaanalvteksti')!;
        const maaMaaritys: MaaMaaritykset = etsiMaaMaaritys(maa);
        kohdemaanalvteksti.innerText = `${maaMaaritys.genetiivi} ALV %`;
    }
}

export function etsiMaaMaaritys(maa: Maa): MaaMaaritykset {
    for (const maaMaaritys of maat) {
        if (maaMaaritys.maa === maa) {
            return maaMaaritys;
        }
    }

    return maat[maat.length - 1];
}

export function lueUrlParametriJaAsetaOsoite(urlOsa: string): void {
    const varsinainenUrl: string = decodeURIComponent(urlOsa);
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;
    tarjousosoiteInput.value = varsinainenUrl;
}

export function etsiValittuUlostulo(): ValittuUlostulo {
    for (const ulostulo of ulostulot) {
        const htmlElementti : HTMLElement = document.getElementById(ulostulo.elementinVanhempiId)!;
        if (!htmlElementti.hidden) {
            return ulostulo.valinta;
        }
    }

    return ValittuUlostulo.EiValintaa;
}

export function kirjoitaValittuUlostulo(valittuUlostulo: ValittuUlostulo, tuote: string, osoite: string, kauppa: string, voimassa: string, hinta: string, promokoodi: string): void {
    for (const ulostulo of ulostulot) {
        if (ulostulo.valinta === valittuUlostulo) {
            const valittuUlostuloElementti: HTMLElement = document.getElementById(ulostulo.elementinTekstiId)!;
            const ulostuloInput = <HTMLInputElement>valittuUlostuloElementti;
            ulostuloInput.value = ulostulo.luoUlostulo(tuote, osoite, kauppa, voimassa, hinta, promokoodi);
            return;
        }
    }
}

export function naytaValittuUlostuloOsio(ulostulonVanhempi: string): void {
    for (const ulostulo of ulostulot) {
        if (ulostulo.elementinVanhempiId === ulostulonVanhempi) {
            const nakyviin: HTMLElement = document.getElementById(ulostulo.elementinVanhempiId)!;
            nakyviin.hidden = false;
        }
        else {
            const piiloon: HTMLElement = document.getElementById(ulostulo.elementinVanhempiId)!;
            piiloon.hidden = true;
        }
    }

    generoi();
}

export function laitaUlostulonKopionappiPaalle(valittuUlostulo: ValittuUlostulo): void {
    for (const ulostulo of ulostulot) {
        if (ulostulo.valinta === valittuUlostulo) {
            const kopioiNappi: HTMLElement = document.getElementById(ulostulo.elementinKopioNappiId)!;
            const kopioiInput = <HTMLInputElement>kopioiNappi;
            kopioiInput.disabled = false;
            return;
        }
    }
}

export function etsiRefTagia(url: string): boolean {
    try
    {
        const urlToCheck = new URL(url);
        const params = new URLSearchParams(urlToCheck.search);
        return params.has('tag');
    }
    catch
    {

    }

    return false;
}

export function eiRefTarkistusta(url: string): boolean {
    return false;
}

export function naytaRefLinkkiVaroitusTarvittaessa(paalla: boolean): void {
    refLinkki.hidden = !paalla;
}

export function taydennaBuildiTiedot(elementinNimi: string, paiva: string, shortHash: string): void {
    const buildiElementti: HTMLElement = document.getElementById(elementinNimi)!;
    buildiElementti.innerHTML = `${paiva} <a href="https://github.com/mcraiha/Tarjouspohja/commit/${shortHash}">#${shortHash}</a>`;
}
