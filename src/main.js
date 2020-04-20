import {HomeServerApi} from "./matrix/net/HomeServerApi.js";
// import {RecordRequester, ReplayRequester} from "./matrix/net/request/replay.js";
import {fetchRequest} from "./matrix/net/request/fetch.js";
import {Reconnector} from "./matrix/net/Reconnector.js";
import {StorageFactory} from "./matrix/storage/idb/create.js";
import {SessionInfoStorage} from "./matrix/sessioninfo/localstorage/SessionInfoStorage.js";
import {BrawlViewModel} from "./domain/BrawlViewModel.js";
import {BrawlView} from "./ui/web/BrawlView.js";
import {Clock as DOMClock} from "./ui/web/dom/Clock.js";
import {OnlineStatus} from "./ui/web/dom/OnlineStatus.js";

export default async function main(container) {
    try {
        // to replay:
        // const fetchLog = await (await fetch("/fetchlogs/constrainterror.json")).json();
        // const replay = new ReplayRequester(fetchLog, {delay: false});
        // const request = replay.request;

        // to record:
        // const recorder = new RecordRequester(fetchRequest);
        // const request = recorder.request;
        // window.getBrawlFetchLog = () => recorder.log();
        // normal network:
        const request = fetchRequest;
        const clock = new DOMClock();

        const vm = new BrawlViewModel({
            storageFactory: new StorageFactory(),
            createHsApi: (homeServer, accessToken, reconnector) => new HomeServerApi({homeServer, accessToken, request, reconnector}),
            sessionInfoStorage: new SessionInfoStorage("brawl_sessions_v1"),
            clock: new DOMClock(),
        });
        await vm.load();
        const view = new BrawlView(vm);
        container.appendChild(view.mount());
    } catch(err) {
        console.error(`${err.message}:\n${err.stack}`);
    }
}
