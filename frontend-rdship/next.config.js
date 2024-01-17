const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants");

const environment = process.env.ENVIRONMENT || PHASE_DEVELOPMENT_SERVER;

const baseConfig = {
    reactStrictMode: false,
    swcMinify: true,
};

const environmentConfigs = {
    [PHASE_DEVELOPMENT_SERVER]: {
        ...baseConfig,
        env: {
            IMAGE_BASE_URL: "http://localhost:3000",
            BASE_URL: "http://localhost:3001",
        }
    },
    "QA": {
        ...baseConfig,
        env: {
            IMAGE_BASE_URL: "https://rdship-qa.com",
            BASE_URL: "https://rdship-qa.com",
        },
    },
    "PROD": {
        ...baseConfig,
        env: {
            IMAGE_BASE_URL: "https://rdship.com",
            BASE_URL: "https://rdship.com",
        },
    },
};

module.exports = async (phase, { defaultConfig }) => {
    console.log('running environment:', environment);
    const config = environmentConfigs[environment] || baseConfig;

    return config;
};