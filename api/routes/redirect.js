import express from 'express';

const router = express.Router();

// generic
router.get('*.html', (req, res) => {
    const redirected_path = req.path.replace('.html','');
    const protocol = req.protocol;
    const host = req.get('host');
    res.redirect(301, `${protocol}://${host}${redirected_path}`)
});
// router.get("/service-worker.js", (req, res) => res.sendStatus(200));

// discord | slack
router.get('/slack', (req, res) => res.redirect(302, '/discord'));
router.get('/discord', (req, res) => res.redirect(302, 'https://discord.gg/grakn'));

// website
router.get('/download/latest', (req, res) => res.redirect(302, 'https://grakn.ai/download'));
router.get('/grakn-kbms', (req, res) => res.redirect(301, `/grakn-kgms`));
router.get("/sitemap.xml", (req, res) => res.sendFile(path.join(dist, 'sitemap.xml')));

// docs
const docsBase = 'https://docs.grakn.ai/docs';

router.get('/pages/*', (req, res) => res.redirect(302, docsBase));
router.get('/download-academy', (req, res) => res.redirect(302, docsBase));
router.get('/javadocs', (req, res) => res.redirect(302, `${docsBase}/client-api/java`));
router.get('/docs/*', (req, res) => res.redirect(301, docsBase) );
router.get('/academy/*', (req, res) => res.redirect(301, `${docsBase}/academy`));
router.get('/overview', (req, res) => res.redirect(301, `${docsBase}`));
router.get('/install', (req, res) => res.redirect(301, `${docsBase}/docs/running-grakn/install-and-run`));

export default router;
