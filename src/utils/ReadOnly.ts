type ReadonlyType<T> = {
    readonly [P in keyof T]: T[P];
}

type DeepReadonlyType<T> = {
    readonly [P in keyof T]: DeepReadonlyType<T[P]>;
};

function Readonly<T>(value:T):ReadonlyType<T>{
    const v : ReadonlyType<T> = value;
    return v;
}

function DeepReadonly<T>(value:T) :DeepReadonlyType<T>{
    const v : DeepReadonlyType<T> = value;
    return v;
}

export{
    Readonly,
    DeepReadonly
}