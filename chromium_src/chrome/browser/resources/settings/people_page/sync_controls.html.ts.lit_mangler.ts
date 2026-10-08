// Copyright (c) 2026 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import { mangle } from 'lit_mangler'

mangle((root) => {
  // We don't sync payments.
  const paymentsToggle = root.querySelector('#paymentsCheckbox')
  const paymentsRow = paymentsToggle?.closest('.list-item')
  if (!paymentsRow) {
    throw new Error(
      `[Settings] Sync controls: couldn't find the payments toggle row`)
  }
  paymentsRow.remove()

  // The AI Chat toggle follows the other data types. Like theirs, it is hidden
  // once the sync prefs load and its data type isn't registered.
  const syncDataTypes = root.querySelector('#sync-data-types')
  if (!syncDataTypes) {
    throw new Error(`[Settings] Sync controls: couldn't find #sync-data-types`)
  }
  syncDataTypes.insertAdjacentHTML(
    'beforeend',
    `<div class="list-item"
        ?hidden="\${!!this.syncPrefs && !this.syncPrefs.aiChatRegistered}">
      <div id="aiChatCheckboxLabel">$i18n{aiChatCheckboxLabel}</div>
      <cr-policy-indicator indicator-type="userPolicy"
          ?hidden="\${!this.showPolicyIndicator_(
              this.syncPrefs?.aiChatManaged)}">
      </cr-policy-indicator>
      <cr-toggle .checked="\${!!this.syncPrefs?.aiChatSynced}"
          @change="\${this.onSingleSyncDataTypeChange_}"
          ?disabled="\${this.disableTypeCheckBox_(
              this.syncPrefs?.aiChatManaged)}"
          aria-labelledby="aiChatCheckboxLabel"
          data-type="\${UserSelectableType.AI_CHAT}"
          data-pref="aiChatSynced">
      </cr-toggle>
    </div>`)
})
