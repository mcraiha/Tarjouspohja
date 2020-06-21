
enum Verkkokauppa {
    Tunnistamaton,

    Gigantti,
    Jimms,
    VerkkokauppaDOTcom,
}

interface KauppojenMaaritykset {
    kauppa: Verkkokauppa;
    nimi: string;
    urlit: ReadonlyArray<string>;
}

const kaupat: ReadonlyArray<KauppojenMaaritykset> = [
    { kauppa: Verkkokauppa.Gigantti, nimi: "Gigantti", urlit: ["www.gigantti.fi", "gigantti.fi"]},
    { kauppa: Verkkokauppa.Jimms, nimi: "Jimm's PC-Store", urlit: ["www.jimms.fi", "jimms.fi"]},
    { kauppa: Verkkokauppa.VerkkokauppaDOTcom, nimi: "Verkkokauppa.com", urlit: ["www.verkkokauppa.com", "verkkokauppa.com"]},
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
lisaaKuuntelijaRadioille('valuutta');

const tanaan: Date = new Date();
const huominen: Date = new Date();
huominen.setDate(tanaan.getDate() + 1);

asetaOletusPaiva('asti', huominen);
asetaOletusPaiva('alkupaiva', tanaan);
asetaOletusPaiva('loppupaiva', huominen);

lisaaKuuntelijaPaivalle('asti');
lisaaKuuntelijaPaivalle('alkupaiva');
lisaaKuuntelijaPaivalle('loppupaiva');

laitaRadiotPaalle('voimassa');
lisaaKuuntelijaRadioille('voimassa');

const kopioibbNappi: HTMLElement = document.getElementById('kopioibb')!;
if (kopioibbNappi) {
    const kopioibbInput = <HTMLInputElement>kopioibbNappi;
    kopioibbInput.onclick = kopioiBB;
}

// Alustus päättyy

export function tarkistaUrl(event: Event): void {
    if ((<HTMLInputElement>event.target).value) {
        console.log((<HTMLInputElement>event.target).value);
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

    const url = new URL(osoite);
    for (const kauppa of kaupat) {
        for (const urlTunniste of kauppa.urlit) {
            if (url.hostname === urlTunniste) {
                return kauppa.kauppa;
            }
        }
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

export function onkoTarjousOsoitteessaJotain(): boolean {
    const tarjousosoite: HTMLElement = document.getElementById('tarjousosoite')!;
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;

    if (tarjousosoiteInput.value === null || tarjousosoiteInput.value === "") {
        return false;
    }

    return true;
}

export function generoi(): void {

    // Tarjousosoitteessa on oltava teksti
    if (!onkoTarjousOsoitteessaJotain()) {
        return;
    }

    const tarjousosoite: HTMLElement = document.getElementById('tarjousosoite')!;
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;

    const kauppa: Verkkokauppa = tunnistaKauppa(tarjousosoiteInput.value);
    const kaupanNimi: string = etsiKaupanNimi(kauppa);

    const tarjoustuote: HTMLElement = document.getElementById('tarjoustuote')!;
    const tarjoustuoteInput = <HTMLInputElement>tarjoustuote;

    const tarjoushinta: HTMLElement = document.getElementById('tarjoushinta')!;
    const tarjoushintaInput = <HTMLInputElement>tarjoushinta;
    let hinta: string = "";
    if (tarjoushintaInput.value !== null && tarjoushintaInput.value !== "") {
        hinta = tarjoushintaInput.value;

        const valittuValuutta: string = etsiValittuValuutta();
        if (valittuValuutta === "euro") {
            hinta += " euroa";
        } else if (valittuValuutta === "dollari") {
            hinta += " dollaria";
        } else if (valittuValuutta === "muu") {
            hinta += " " + lueOmaValuutta();
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
        const splitted: string[] = jaaPaivaOsiin('asti');
        if (splitted.length === 3) {
            voimassa = `${splitted[2]}.${splitted[1]}.${splitted[0]} asti`;
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

    const bbKoodi: HTMLElement = document.getElementById('bbkoodi')!;
    const bbKoodiInput = <HTMLInputElement>bbKoodi;
    bbKoodiInput.value = generoiBBCode(tarjoustuoteInput.value, tarjousosoiteInput.value, kaupanNimi, voimassa, hinta, promokoodiInput.value);

    const kopioibbNappi: HTMLElement = document.getElementById('kopioibb')!;
    const kopioibbInput = <HTMLInputElement>kopioibbNappi;
    kopioibbInput.disabled = false;

    const visuaalinen: HTMLElement = document.getElementById('visuaalinen')!;
    visuaalinen.innerHTML = generoiVisuaalinen(tarjoustuoteInput.value, tarjousosoiteInput.value, kaupanNimi, voimassa, hinta, promokoodiInput.value);
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

export function lisaaKuuntelijaRadioille(name: string): void {
    const radiot: HTMLElement[] = Array.prototype.slice.call(document.getElementsByName(name));
    if (radiot !== null && radiot.length > 0) {
        for (const radio of radiot) {
            radio.addEventListener('input', paivitaJosUrlAnnettu);
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
    return omavaluuttaInput.value;
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