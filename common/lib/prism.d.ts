import "prismjs";
import PrismType from "prismjs";
import "prismjs/components/prism-cypher";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
declare global {
    type Prism = typeof PrismType;
}
