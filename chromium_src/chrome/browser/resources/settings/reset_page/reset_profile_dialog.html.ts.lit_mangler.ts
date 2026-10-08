// Copyright (c) 2026 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import { mangle } from 'lit_mangler'

// We don't send reset settings to Google, so uncheck, disable and hide the
// checkbox, along with the footer it sits in. The upload itself stays blocked
// by reset_report_uploader.cc.patch. Hidden rather than removed, since the
// element's `$` declares #sendSettings and reads it when resetting.
mangle((root) => {
  const sendSettings = root.querySelector('#sendSettings')
  if (!sendSettings) {
    throw new Error(
      `[Settings] Reset profile dialog: couldn't find #sendSettings`)
  }
  sendSettings.removeAttribute('checked')
  sendSettings.setAttribute('disabled', '')
  sendSettings.setAttribute('hidden', '')
  const footer = sendSettings.parentElement
  if (!footer) {
    throw new Error(
      `[Settings] Reset profile dialog: couldn't find the footer`)
  }
  footer.setAttribute('hidden', '')
})
