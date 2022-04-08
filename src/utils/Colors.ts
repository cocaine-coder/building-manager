export const colors = ["#ed1299", "#09f9f5", "#246b93", "#cc8e12", "#d561dd", "#c93f00", "#ddd53e",
    "#4aef7b", "#e86502", "#9ed84e", "#39ba30", "#6ad157", "#8249aa", "#99db27", "#e07233", "#ff523f",
    "#ce2523", "#f7aa5d", "#cebb10", "#03827f", "#931635", "#373bbf", "#a1ce4c", "#ef3bb6", "#d66551",
    "#1a918f", "#ff66fc", "#2927c4", "#7149af", "#57e559", "#8e3af4", "#f9a270", "#22547f", "#db5e92",
    "#edd05e", "#6f25e8", "#0dbc21", "#280f7a", "#6373ed", "#5b910f", "#7b34c1", "#0cf29a", "#d80fc1",
    "#dd27ce", "#07a301", "#167275", "#391c82", "#2baeb5", "#925bea", "#63ff4f"]

export function getColors(num: number, ...excepts: string[]) {
    const colorsClone = colors.concat([]);
    const ret = new Array<string>();

    for (let i = 0; i < num; i++) {
        let color = colorsClone.pop();

        // 没有多余的颜色了
        if (color === undefined) {
            color = colors[Math.round(Math.random() * colors.length)];
        }

        // 出现重复
        else if (excepts.indexOf(color) !== -1) {
            i--;
            continue;
        }

        ret.push(color);
    }

    return ret;
}


export function hex2rgb(hex: string) {
    try {
        hex = hex.replaceAll('#', '');
        const r = Number.parseInt(hex.substring(0, 2));
        const g = Number.parseInt(hex.substring(2, 4));
        const b = Number.parseInt(hex.substring(4, 6));

        return { r, g, b };
    } catch (ex) {
        console.error(`hex : ${hex} to rgb failt`);
        return { r: 0, g: 0, b: 0 };
    }
}
