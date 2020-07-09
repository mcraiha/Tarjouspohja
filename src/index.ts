// These will be overridden during CI/CD
const typescriptVersion: string = "{0}";
const gitShortHash: string = "{1}";
const buildDate: string = "{2}";

enum Verkkokauppa {
    Tunnistamaton,

    AmazonDOTde,
    CDON,
    DNA,
    DustinHomeDOTfi,
    Elisa,
    Gigantti,
    Jimms,
    Karkkainen,
    KomponenttikauppaDOTfi,
    Multitronic,
    Power,
    Proshop,
    Tehorauta,
    Telia,
    TietokonekauppaDOTfi,
    VeikonKone,
    VerkkokauppaDOTcom,
    XXL,
}

interface KauppojenMaaritykset {
    kauppa: Verkkokauppa;
    nimi: string;
    urlit: ReadonlyArray<string>;
    naytaVeroerolaskuri: boolean;
    hintamuokkaus: (hinta: string) => string;
}

const kaupat: ReadonlyArray<KauppojenMaaritykset> = [
    { kauppa: Verkkokauppa.AmazonDOTde, nimi: "Amazon.de", urlit: ["www.amazon.de", "amazon.de"], naytaVeroerolaskuri: true, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.CDON, nimi: "CDON", urlit: ["cdon.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.DNA, nimi: "DNA", urlit: ["kauppa4.dna.fi", "dna.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.DustinHomeDOTfi, nimi: "DustinHome.fi", urlit: ["www.dustinhome.fi", "dustinhome.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Elisa, nimi: "Elisa", urlit: ["elisa.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Gigantti, nimi: "Gigantti", urlit: ["www.gigantti.fi", "gigantti.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Jimms, nimi: "Jimm's PC-Store", urlit: ["www.jimms.fi", "jimms.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Karkkainen, nimi: "Kärkkäinen", urlit: ["www.karkkainen.com", "karkkainen.com"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.KomponenttikauppaDOTfi, nimi: "Komponenttikauppa.fi", urlit: ["komponenttikauppa.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Multitronic, nimi: "Multitronic", urlit: ["www.multitronic.fi", "multitronic.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Power, nimi: "Power", urlit: ["www.power.fi", "power.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Proshop, nimi: "Proshop", urlit: ["www.proshop.fi", "proshop.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Tehorauta, nimi: "Tehorauta", urlit: ["www.tehorauta.fi", "tehorauta.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.Telia, nimi: "Telia", urlit: ["kauppa.telia.fi", "telia.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.TietokonekauppaDOTfi, nimi: "Tietokonekauppa.fi", urlit: ["www.tietokonekauppa.fi", "tietokonekauppa.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.VeikonKone, nimi: "Veikon Kone", urlit: ["www.veikonkone.fi", "veikonkone.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.VerkkokauppaDOTcom, nimi: "Verkkokauppa.com", urlit: ["www.verkkokauppa.com", "verkkokauppa.com"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
    { kauppa: Verkkokauppa.XXL, nimi: "XXL", urlit: ["www.xxl.fi", "xxl.fi"], naytaVeroerolaskuri: false, hintamuokkaus: eiHintamuokkausta},
]

// Alustus
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

taydennaBuildiTiedot('builditiedot', buildDate, gitShortHash);

// Alustus päättyy

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
            veroerolaskuri(true);
            return;
        }
    }

    veroerolaskuri(false);
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

    const bbKoodi: HTMLElement = document.getElementById('bbkoodi')!;
    const bbKoodiInput = <HTMLInputElement>bbKoodi;
    bbKoodiInput.value = generoiBBCode(turvallinenTarjousTuote, turvallinenTarjousOsoite, kaupanNimi, voimassa, hinta, turvallinenPromokoodi);

    const kopioibbNappi: HTMLElement = document.getElementById('kopioibb')!;
    const kopioibbInput = <HTMLInputElement>kopioibbNappi;
    kopioibbInput.disabled = false;

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

export function veroerolaskuri(nakyviin: boolean): void {
    const veroerolaskurivanhempi: HTMLElement = document.getElementById('veroerolaskurivanhempi')!;
    veroerolaskurivanhempi.hidden = !nakyviin;
}

export function taydennaBuildiTiedot(elementinNimi: string, paiva: string, shortHash: string): void {
    const buildiElementti: HTMLElement = document.getElementById(elementinNimi)!;
    buildiElementti.innerHTML = `${paiva} <a href="https://github.com/mcraiha/Tarjouspohja/commit/${shortHash}">#${shortHash}</a>`;
}
