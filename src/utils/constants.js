import { config } from 'epicenter-libs';

if (config.isLocal()) {
    config.accountShortName = 'neely';
    config.projectShortName = 'editor-test';
    config.apiHost = 'epicenter-dev-2.forio.com';
}

export const MODEL_FILE = 'model.xlsx';
