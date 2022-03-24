import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";

export const EDITOR_JS_TOOLS = {
    header:Header,
    list:List,
    embed:{
        class: Embed,
        config:{
            services:{
            youtube:true,
            coub: true
            }
        }
    }
};
