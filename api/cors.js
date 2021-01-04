const corsDevAllowedOrigins = [
    'http://localhost:4005', 'https://localhost:4005',
    'http://grakn-web-dev-wip.herokuapp.com', 'https://grakn-web-dev-wip.herokuapp.com',
    'http://localhost:3000', 'https://localhost:3000',
    'http://grakn-web-staging.herokuapp.com', 'https://grakn-web-staging.herokuapp.com'
]

const corsProdAllowedOrigins = [
    'http://docs.grakn.ai', 'https://docs.grakn.ai',
    'http://discuss.grakn.ai', 'http://discuss.grakn.ai',
    'http://grakn.ai', 'https://grakn.ai'
]

const corsAllowedOrigins = corsDevAllowedOrigins.concat(corsProdAllowedOrigins);

export const corsOptions = {
    origin: corsAllowedOrigins,
    methods: ['POST', 'GET'],
    allowedHeaders: ['Grakn-Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}