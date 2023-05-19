const palette = {
    red: "#F66B65",
    gold: "#EBC53D",
    yellow: "#FFE4A7",
    green: "#02DAC9",
    skyBlue: "#92E4FC",
    blue: "#7BA0FF",
    pink: "#FFA9E8",
    purple: "#E69CFF",
    deepPurple: "#0E053F",
    deepGrey: "#383649",
    black: "#09022F",
    white: "#FFFFFF",
} as const;

type ColorKey = "background" | "entity" | "relation" | "attribute" | "edge" | "inferred" | "error" | "vertexBackground";

export interface GraphVisualisationTheme {
    colors: {
        numeric: {[key in ColorKey]: number};
        hex: {[key in ColorKey]: string};
    }
}

type ColorMapping = {[key in ColorKey]: string};

const defaultColorMapping: ColorMapping = {
    background: palette.deepPurple,
    entity: palette.purple,
    relation: palette.gold,
    attribute: palette.skyBlue,
    edge: palette.blue,
    inferred: palette.green,
    error: palette.red,
    vertexBackground: palette.deepGrey,
}

const defaultTheme: GraphVisualisationTheme = {
    colors: {
        numeric: Object.entries(defaultColorMapping).reduce((current, [nextKey, nextValue]) => {
            current[nextKey as ColorKey] = Number(`0x${nextValue.slice(1)}`);
            return current;
        }, {} as {[key in ColorKey]: number}),

        hex: Object.entries(defaultColorMapping).reduce((current, [nextKey, nextValue]) => {
            current[nextKey as ColorKey] = nextValue;
            return current;
        }, {} as {[key in ColorKey]: string}),
    }
}

export const defaultGraphVisualisationTheme = defaultTheme;

export const defaultStyles = {
    fontFamily: "Ubuntu Mono",
    fontFamilyFallback: "monospace",

    vertexLabel: {
        fontSize: 20,
    },

    edgeLabel: {
        fontSize: 18,
    },
};
