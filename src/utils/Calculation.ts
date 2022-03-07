export function getRangeValue(origin: number, from: number, to: number) {
    if(origin < from ) return from;
    if(origin > to ) return to;

    return origin;
}