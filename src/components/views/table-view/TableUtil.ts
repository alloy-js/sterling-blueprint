import { AlloyField, AlloySignature, AlloySkolem } from 'alloy-ts';

export type ASigField = AlloySignature | AlloyField;
export type SigFieldSkolem = AlloySignature | AlloyField | AlloySkolem;
export type ASortFunction = (a: SigFieldSkolem, b: SigFieldSkolem) => number;

function alphaSort (getName: (item: SigFieldSkolem) => string, asc: boolean = true): ASortFunction {
    const one = asc ? 1 : -1;
    return (a: SigFieldSkolem, b: SigFieldSkolem) => {
        const aname = getName(a);
        const bname = getName(b);
        if (aname < bname) return -one;
        if (bname < aname) return one;
        return 0;
    }
}

function builtinSort (a: AlloySignature, b: AlloySignature): number {
    let aBuiltin = a.isBuiltin(),
        bBuiltin = b.isBuiltin();
    return aBuiltin === bBuiltin
        ? 0
        : aBuiltin
            ? 1
            : -1;
}

function numSort (asc: boolean = true): ASortFunction {
    const one = asc ? 1 : -1;
    return (a: SigFieldSkolem, b: SigFieldSkolem) => {
        const alen = getLength(a);
        const blen = getLength(b);
        return (alen - blen)*one;
    }
}

function getLength (item: SigFieldSkolem) {
    if (item.expressionType() === 'field')
        return (item as AlloyField).tuples().length;
    if (item.expressionType() === 'signature')
        return (item as AlloySignature).atoms().length;
    if (item.expressionType() === 'skolem')
        return (item as AlloySkolem).tuples().length;
    throw Error('Item is not a signature, field, or skolem');
}

function nameFunction (remove_this: boolean): (item: SigFieldSkolem) => string {
    return (item: SigFieldSkolem) => {
        return remove_this
            ? removeThis(item.id())
            : item.id();
    }
}

function removeThis (name: string): string {
    return name.replace(/^this\//, '');
}

function itemsEqual (a: SigFieldSkolem, b: SigFieldSkolem): boolean {
    return a.id() === b.id();
}

export { alphaSort, builtinSort, itemsEqual, nameFunction, numSort };
