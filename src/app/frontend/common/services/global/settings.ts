// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Settings} from '@api/backendapi';
import {AuthorizerService} from './authorizer';

@Injectable()
export class SettingsService {
  private readonly globalSettingsEndpoint_ = 'api/v1/settings/global';
  private globalSettings_: Settings;
  private isInitialized_ = false;

  constructor(private http_: HttpClient, private authorizer_: AuthorizerService) {}

  init() {
    this.getGlobalSettings().subscribe(
        (globalSettings) => {
          this.globalSettings_ = globalSettings;
          this.isInitialized_ = true;
        },
        () => {
          this.isInitialized_ = false;
        });
  }

  isInitialized() {
    return this.isInitialized_;
  }

  getGlobalSettings() {
    return this.authorizer_.proxyGET<Settings>(this.globalSettingsEndpoint_);
  }

  getClusterName() {
    let clusterName = '';
    if (this.globalSettings_) {
      clusterName = this.globalSettings_.clusterName;
    }
    return clusterName;
  }

  getItemsPerPage() {
    let itemsPerPage = 10;
    if (this.globalSettings_) {
      itemsPerPage = this.globalSettings_.itemsPerPage;
    }
    return itemsPerPage;
  }

  getAutoRefreshTimeInterval() {
    let autoRefreshTimeInterval = 5;
    if (this.globalSettings_) {
      autoRefreshTimeInterval = this.globalSettings_.autoRefreshTimeInterval;
    }
    return autoRefreshTimeInterval;
  }
}