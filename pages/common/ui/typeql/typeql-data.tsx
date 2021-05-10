export interface TypeQLGraph {
    vertices: TypeQLVertex[];
    edges: TypeQLEdge[];
}

type TypeQLVertexEncoding = "entity";

export interface TypeQLVertex {
    id: number;
    name: string;
    encoding: TypeQLVertexEncoding;
    x: number;
    y: number;
}

type TypeQLEdgeEncoding = "sub";

export interface TypeQLEdge {
    source: number;
    target: number;
    encoding: TypeQLEdgeEncoding;
}
