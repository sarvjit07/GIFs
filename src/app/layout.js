const React = require('react');
require('./globals.css');
const SessionProvider = require('./SessionProvider');

async function RootLayout({ children }) {
  return (
    React.createElement(
      'html',
      { lang: 'en', className: 'h-full bg-gray-900' },
      React.createElement(
        'body',
        { className: 'h-full' },
        React.createElement(SessionProvider, null, children)
      )
    )
  );
}

module.exports = RootLayout;
