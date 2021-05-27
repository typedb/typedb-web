export interface TypeQLGraph {
    vertices: TypeQLVertex[];
    edges: TypeQLEdge[];
}

type TypeQLVertexEncoding = "entity" | "relation" | "attribute";

export interface TypeQLVertex {
    id: number;
    text: string;
    encoding: TypeQLVertexEncoding;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface TypeQLEdge {
    source: number;
    target: number;
    label: string;
    error?: boolean;
}
