package grakn.web_main.server.api;

import com.eclipsesource.json.JsonObject;
import play.mvc.Controller;
import play.mvc.Result;

import static grakn.web_main.server.api.APIUtils.okResult;

public class TypeDBController extends Controller {
    public Result version() {
        return okResult(new JsonObject().add("version", "2.0.1").toString());
    }
}
