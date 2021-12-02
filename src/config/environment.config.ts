import * as config from 'config';

const envMap = {
    LOCAL: 'LOCAL',
    DEV: 'DEV',
    PRODUCTION: 'PRODUCTION',
};

const env = config.get('env');

export const ENVIRONMENT = envMap[env];
