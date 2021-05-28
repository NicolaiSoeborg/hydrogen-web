/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {TemplateView} from "../../../general/TemplateView.js";
import {renderMessage} from "./common.js";

export class MissingAttachmentView extends TemplateView {
    render(t, vm) {
        const remove = t.button({className: "link", onClick: () => vm.abortSending()}, vm.i18n`Remove`);
        return renderMessage(t, vm, t.p({className: "Timeline_messageBody"}, [vm.label, " ", remove]));
    }
}
