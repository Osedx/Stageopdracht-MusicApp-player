import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable()
export class SettingService {
    showToplistCount : number;

    constructor(@Inject(APP_CONFIG) private config : IAppConfig) {
    this.showToplistCount = config.showToplistCount;
    }
}