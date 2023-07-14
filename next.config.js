/** @type {import('next').NextConfig} */
const nextConfig = {
    babel: {
        presets: ['next/babel', '@babel/preset-typescript'],
        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
    },
}

module.exports = nextConfig
