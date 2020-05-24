
enum Verkkokauppa {
    Tunnistamaton,
    Gigantti,
    VerkkokauppaDOTcom
}

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
}

const tarjoushinta: HTMLElement = document.getElementById('tarjoushinta')!;
if (tarjoushinta) {
    const tarjoushintaInput = <HTMLInputElement>tarjoushinta;
    tarjoushintaInput.disabled = false;
}

laitaRadiotPaalle('valuutta');

laitaRadiotPaalle('voimassa');


// Alustus päättyy

export function tarkistaUrl(event: Event): void {
    if ((<HTMLInputElement>event.target).value) {
        console.log((<HTMLInputElement>event.target).value);
        generoi();
    }
       
}

export function tunnistaKauppa(osoite: string): Verkkokauppa {

    const url = new URL(osoite);
    if (url.hostname === "www.gigantti.fi" || url.hostname === "gigantti.fi") {
        return Verkkokauppa.Gigantti;
    } else if (url.hostname === "www.verkkokauppa.com" || url.hostname === "verkkokauppa.com") {
        return Verkkokauppa.VerkkokauppaDOTcom;
    }

    return Verkkokauppa.Tunnistamaton;
}

export function generoi(): void {
    const tarjousosoite: HTMLElement = document.getElementById('tarjousosoite')!;
    const tarjousosoiteInput = <HTMLInputElement>tarjousosoite;

    if (tarjousosoiteInput.value === null) {
        return;
    }

    const kauppa: Verkkokauppa = tunnistaKauppa(tarjousosoiteInput.value);

    const tarjoustuote: HTMLElement = document.getElementById('tarjoustuote')!;
    const tarjoustuoteInput = <HTMLInputElement>tarjoustuote;

    const bbKoodi: HTMLElement = document.getElementById('bbkoodi')!;
    const bbKoodiInput = <HTMLInputElement>bbKoodi;
    bbKoodiInput.value = generoiBBCode(tarjoustuoteInput.value, tarjousosoiteInput.value, Verkkokauppa[kauppa], '', '' );

    const visuaalinen: HTMLElement = document.getElementById('visuaalinen')!;
    visuaalinen.innerHTML = generoiVisuaalinen(tarjoustuoteInput.value, tarjousosoiteInput.value, Verkkokauppa[kauppa], '', '' );
}

export function generoiBBCode(tuote: string, osoite: string, kauppa: string, voimassa: string, hinta: string): string {
    return `[b]Tuote:[/b] ${tuote}
    [b]Hinta:[/b] ${hinta}
    [b]Kauppa:[/b] ${kauppa}
    [b]Voimassa:[/b] ${voimassa}
    [b]Linkki:[/b] ${osoite}
    `;
}

export function generoiVisuaalinen(tuote: string, osoite: string, kauppa: string, voimassa: string, hinta: string): string {
    return `<b>Tuote:</b> ${tuote} <br>
    <b>Hinta:</b> ${hinta} <br>
    <b>Kauppa:</b> ${kauppa} <br>
    <b>Voimassa:</b> ${voimassa} <br>
    <b>Linkki:</b> <a href="${osoite}">${osoite}</a>
    `;
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