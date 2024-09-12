module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          react: 'preact/compat',
          'react-dom': 'preact/compat'
        }
      }]
    ]
  };