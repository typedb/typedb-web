package com.vaticle.web.main.server.api;

import com.eclipsesource.json.JsonObject;
import play.mvc.Controller;
import play.mvc.Result;

import static com.vaticle.web.main.server.api.APIUtils.okResult;

public class TypeDBController extends Controller {
    public Result version() {
        return okResult(new JsonObject().add("version", "2.16.1").toString());
    }
}
