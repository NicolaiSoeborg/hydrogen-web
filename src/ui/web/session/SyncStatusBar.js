import {TemplateView} from "../general/TemplateView.js";

export class SyncStatusBar extends TemplateView {
    render(t, vm) {
        return t.div({className: {
            "SyncStatusBar": true,
            "SyncStatusBar_shown": true,
        }}, [
            vm => vm.status,
            t.if(vm => !vm.isSyncing, t.createTemplate(t => t.button({onClick: () => vm.trySync()}, "Try syncing"))),
            window.DEBUG ? t.button({id: "showlogs"}, "Show logs") : ""
        ]);
    }
}
