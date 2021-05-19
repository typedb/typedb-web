package grakn.web.server.api;

import play.mvc.Result;

import static play.mvc.Results.ok;

class APIUtils {
    static Result okResult(String content) {
        return ok(content).withHeaders(responseHeaders());
    }

    static String[] responseHeaders() {
        if (System.getProperty("environment").equals("local")) return new String[] { "access-control-allow-origin", "http://localhost:4200" };
        else return new String[] {};
    }
}
